import * as React from 'react';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ChatRounded from '@mui/icons-material/ChatRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import type { MarkdownHeaders } from '@mui/internal-markdown';
import {
  FigmaIcon,
  BundleSizeIcon,
  W3CIcon,
  MaterialDesignIcon,
  SketchIcon,
  MarkdownIcon,
} from '../svgIcons';
import { useTranslate } from '../i18n';

const Root = styled('ul')(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  '& .MuiChip-root': {
    height: 26,
    padding: '0 8px',
    gap: 6,
    '& .MuiChip-label': { padding: 0 },
    '& .MuiChip-iconSmall': {
      margin: 0,
      fontSize: 14,
    },
  },
}));

const defaultPackageNames: Record<string, string | undefined> = {
  'material-ui': '@mui/material',
  system: '@mui/system',
};

export interface ComponentLinkHeaderProps {
  design?: boolean;
  markdown: {
    headers: MarkdownHeaders;
  };
}

export function ComponentLinkHeader(props: ComponentLinkHeaderProps) {
  const {
    markdown: { headers },
    design,
  } = props;
  const t = useTranslate();
  const router = useRouter();

  const packageName =
    headers.packageName ?? defaultPackageNames[headers.productId] ?? '@mui/material';

  return (
    <Root>
      {packageName === '@mui/material' && (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            href={`${router.pathname}.md`}
            icon={<MarkdownIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Markdown"
            data-ga-event-split="0.1"
            label="View as Markdown"
          />
        </li>
      )}
      {headers.githubLabel ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`${process.env.SOURCE_CODE_REPO}/labels/${encodeURIComponent(
              headers.githubLabel,
            )}`}
            icon={<ChatRounded color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('githubLabel')}
            data-ga-event-split="0.1"
            label={t('githubLabel')}
          />
        </li>
      ) : null}
      <li>
        <Tooltip title={t('bundleSizeTooltip')} describeChild>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`https://bundlephobia.com/package/${packageName}@latest`}
            icon={<BundleSizeIcon color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('bundleSize')}
            data-ga-event-split="0.1"
            label={t('bundleSize')}
          />
        </Tooltip>
      </li>
      {headers.githubSource ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={`${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}/${headers.githubSource}`}
            icon={<GitHubIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Source"
            data-ga-event-split="0.1"
            label="Source"
          />
        </li>
      ) : null}
      {headers.waiAria ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={headers.waiAria}
            icon={<W3CIcon color="primary" />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="WAI-ARIA"
            data-ga-event-split="0.1"
            label="WAI-ARIA"
          />
        </li>
      ) : null}
      {headers.materialDesign ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            size="small"
            variant="outlined"
            rel="nofollow"
            href={headers.materialDesign}
            icon={<MaterialDesignIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Material Design"
            data-ga-event-split="0.1"
            label="Material Design"
          />
        </li>
      ) : null}
      {design === false ? null : (
        <React.Fragment>
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              size="small"
              variant="outlined"
              rel="nofollow"
              href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<FigmaIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Figma"
              data-ga-event-split="0.1"
              label="Figma"
            />
          </li>
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              size="small"
              variant="outlined"
              rel="nofollow"
              href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<SketchIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Sketch"
              data-ga-event-split="0.1"
              label="Sketch"
            />
          </li>
        </React.Fragment>
      )}
    </Root>
  );
}
