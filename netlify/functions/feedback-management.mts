import querystring from 'node:querystring';
import type { BlockAction, ButtonAction } from '@slack/bolt';
import { App, AwsLambdaReceiver } from '@slack/bolt';
import type { Handler, Config } from '@netlify/functions';

// Rate-limit this public, unauthenticated endpoint so one client can't flood Slack with posts.
export const config: Config = {
  path: ['/.netlify/functions/feedback-management', '/.netlify/functions/feedback-management/'],
  rateLimit: {
    windowLimit: 6,
    windowSize: 60,
    aggregateBy: 'ip',
  },
};

const X_FEEBACKS_CHANNEL_ID = 'C04U3R2V9UK';
const JOY_FEEBACKS_CHANNEL_ID = 'C050VE13HDL';
const TOOLPAD_FEEBACKS_CHANNEL_ID = 'C050MHU703Z';
const CORE_FEEBACKS_CHANNEL_ID = 'C041SDSF32L';

const BASE_UI_FEEBACKS_CHANNEL_ID = 'C075LJG1LMP';
const MATERIAL_UI_FEEBACKS_CHANNEL_ID = 'C0757QYLK7V';
// const PIGMENT_CSS_FEEBACKS_CHANNEL_ID = 'C074TBW0JKZ';
const X_GRID_FEEBACKS_CHANNEL_ID = 'C0757R0KW67';
const X_CHARTS_FEEBACKS_CHANNEL_ID = 'C0757UBND98';
const X_EXPLORE_FEEBACKS_CHANNEL_ID = 'C074TBYQK2T';
// const DESIGN_KITS_FEEBACKS_CHANNEL_ID = 'C075ADGN0UU';

// The design feedback alert was removed in https://github.com/mui/material-ui/pull/39691
// This dead code is here to simplify the creation of special feedback channel
const DESIGN_FEEDBACKS_CHANNEL_ID = 'C05HHSFH2QJ';

export type MuiProductId =
  | 'null'
  | 'base-ui'
  | 'material-ui'
  | 'joy-ui'
  | 'system'
  | 'docs-infra'
  | 'docs'
  | 'x-data-grid'
  | 'x-date-pickers'
  | 'x-charts'
  | 'x-tree-view'
  | 'toolpad-studio'
  | 'toolpad-core';

const getSlackChannelId = (
  url: string,
  productId: MuiProductId,
  specialCases: { isDesignFeedback?: boolean },
) => {
  const { isDesignFeedback } = specialCases;

  if (isDesignFeedback) {
    return DESIGN_FEEDBACKS_CHANNEL_ID;
  }

  switch (productId) {
    case 'base-ui':
      return BASE_UI_FEEBACKS_CHANNEL_ID;
    case 'material-ui':
    case 'system':
      return MATERIAL_UI_FEEBACKS_CHANNEL_ID;
    case 'joy-ui':
      return JOY_FEEBACKS_CHANNEL_ID;
    case 'x-data-grid':
      return X_GRID_FEEBACKS_CHANNEL_ID;
    case 'x-date-pickers':
    case 'x-tree-view':
      return X_EXPLORE_FEEBACKS_CHANNEL_ID;
    case 'x-charts':
      return X_CHARTS_FEEBACKS_CHANNEL_ID;
    case 'toolpad-studio':
    case 'toolpad-core':
      return TOOLPAD_FEEBACKS_CHANNEL_ID;
    default:
      break;
  }

  // Fallback

  if (url.includes('/x/')) {
    return X_FEEBACKS_CHANNEL_ID;
  }
  return CORE_FEEBACKS_CHANNEL_ID;
};

// Slack's section text is capped at 3000 characters. Escaping can expand input up to 5x
// (e.g. `&` -> `&amp;`), so bound the final message to stay within the limit.
const MAX_SLACK_SECTION_LENGTH = 3000;

// Slack treats `<...>` and `&` as control syntax in mrkdwn. The feedback payload is
// public and unauthenticated, so escape user-authored text before it reaches Slack to
// prevent mention (e.g. `<!channel>`), link, and markup injection.
const escapeSlackMrkdwn = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Only link to MUI-owned https origins, so the bot can't post a link to an arbitrary
// destination while showing an attacker-chosen label. A genuine submission always sends a
// valid URL, so a malformed value can only be crafted input — letting `new URL` throw
// (and 500) is fine. Returns the normalized URL, or null for a valid non-MUI origin.
const parseMuiUrl = (value: string): string | null => {
  const { protocol, hostname, href } = new URL(value);
  if (protocol !== 'https:' || (hostname !== 'mui.com' && !hostname.endsWith('.mui.com'))) {
    return null;
  }
  return href;
};

// Setup of the slack bot (taken from https://slack.dev/bolt-js/deployments/aws-lambda)
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Define slack actions to answer
app.action<BlockAction<ButtonAction>>('delete_action', async ({ ack, body, client, logger }) => {
  try {
    await ack();

    const { channel, message } = body;

    const channelId = channel?.id;

    if (!channelId) {
      throw new Error('feedback-management: Unknown channel Id');
    }
    await client.chat.delete({
      channel: channelId,
      ts: message!.ts,
      as_user: true,
      token: process.env.SLACK_BOT_TOKEN,
    });
  } catch (error) {
    logger.error(JSON.stringify(error, null, 2));
  }
});

export const handler: Handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 };
  }
  try {
    const { payload } = querystring.parse(event.body ?? '') as { payload: any };
    const data = JSON.parse(payload);

    if (data.callback_id === 'send_feedback') {
      // We send the feedback to the appropriate slack channel
      const {
        rating,
        comment,
        currentLocationURL,
        commentSectionURL: inCommentSectionURL,
        commentSectionTitle,
        productId,
      } = data;

      // The design feedback alert was removed in https://github.com/mui/material-ui/pull/39691
      // This dead code is here to simplify the creation of special feedback channel
      const isDesignFeedback = inCommentSectionURL.includes('#new-docs-api-feedback');

      // Untrusted URLs render as plain text rather than links (see parseMuiUrl). Design
      // feedback intentionally carries no section link.
      const safeCurrentLocationURL = parseMuiUrl(currentLocationURL);
      const safeCommentSectionURL = isDesignFeedback ? null : parseMuiUrl(inCommentSectionURL);

      let sectionSuffix = '';
      if (commentSectionTitle) {
        const escapedTitle = escapeSlackMrkdwn(commentSectionTitle);
        sectionSuffix = safeCommentSectionURL
          ? ` (from section <${safeCommentSectionURL}|${escapedTitle}>)`
          : ` (from section ${escapedTitle})`;
      }

      const simpleSlackMessage = [
        `New comment ${rating === 1 ? '👍' : ''}${rating === 0 ? '👎' : ''}`,
        `>${escapeSlackMrkdwn(comment).split('\n').join('\n>')}`,
        `sent from ${safeCurrentLocationURL ?? 'an unknown page'}${sectionSuffix}`,
      ].join('\n\n');

      const boundedSlackMessage =
        simpleSlackMessage.length > MAX_SLACK_SECTION_LENGTH
          ? `${simpleSlackMessage.slice(0, MAX_SLACK_SECTION_LENGTH - 1)}…`
          : simpleSlackMessage;

      await app.client.chat.postMessage({
        channel: getSlackChannelId(currentLocationURL, productId, { isDesignFeedback }),
        text: boundedSlackMessage, // Fallback for notification
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: boundedSlackMessage,
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Delete',
                },
                // The delete handler only uses the message ref, not this value.
                value: 'delete_feedback',
                style: 'danger',
                action_id: 'delete_action',
              },
            ],
          },
        ],
        as_user: true,
        unfurl_links: false,
        unfurl_media: false,
      });
    } else {
      const awsHandler = await awsLambdaReceiver.start();
      // @ts-expect-error: The Slack receiver uses AWS Lambda event types rather than Netlify handler types.
      return awsHandler(event, context, callback);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({}),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
