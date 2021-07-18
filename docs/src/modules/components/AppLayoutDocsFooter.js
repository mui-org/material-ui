/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Snackbar from '@material-ui/core/Snackbar';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const Footer = styled('footer')(({ theme }) => {
  return {
    marginTop: theme.spacing(12),
  };
});

const PaginationDiv = styled('div')(({ theme }) => {
  return {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  };
});

const PageLinkButton = styled(Button)(({ theme }) => {
  return {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  };
});

const FeedbackGrid = styled(Grid)(({ theme }) => {
  return {
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      order: 3,
      width: '100%',
    },
  };
});

const FeedbackMessage = styled(Typography)(({ theme }) => {
  return {
    margin: theme.spacing(0, 2),
  };
});

/**
 * @typedef {import('docs/src/pages').MuiPage} MuiPage
 * @typedef {import('docs/src/pages').OrderedMuiPage} OrderedMuiPage
 */

/**
 * @param {MuiPage[]} pages
 * @param {MuiPage[]} [current]
 * @returns {OrderedMuiPage[]}
 */
function orderedPages(pages, current = []) {
  return pages
    .reduce((items, item) => {
      if (item.children && item.children.length > 1) {
        items = orderedPages(item.children, items);
      } else {
        items.push(item.children && item.children.length === 1 ? item.children[0] : item);
      }
      return items;
    }, current)
    .filter((page) => {
      return (
        page.ordered !== false &&
        // ignore external pages
        page.pathname.startsWith('/')
      );
    });
}

async function postFeedback(data) {
  const env = window.location.host.indexOf('material-ui.com') !== -1 ? 'prod' : 'dev';
  try {
    const response = await fetch(`${process.env.FEEDBACK_URL}/${env}/feedback`, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserFeedback(id) {
  const env = location.hostname === 'material-ui.com' ? 'prod' : 'dev';
  const URL = `${process.env.FEEDBACK_URL}/${env}/feedback/${id}`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      cache: 'no-store',
      referrerPolicy: 'origin',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function submitFeedback(page, rating, comment, language) {
  const data = {
    id: getCookie('feedbackId'),
    page,
    rating,
    comment,
    version: process.env.LIB_VERSION,
    language,
  };

  const result = await postFeedback(data);
  if (result) {
    document.cookie = `feedbackId=${result.id};path=/;max-age=31536000`;
    setTimeout(async () => {
      const userFeedback = await getUserFeedback(result.id);
      if (userFeedback) {
        document.cookie = `feedback=${JSON.stringify(userFeedback)};path=/;max-age=31536000`;
      }
    });
  }
  return result;
}

function getCurrentRating(pathname) {
  let userFeedback;
  if (process.browser) {
    userFeedback = getCookie('feedback');
    userFeedback = userFeedback && JSON.parse(userFeedback);
  }
  return userFeedback && userFeedback[pathname] && userFeedback[pathname].rating;
}

/**
 * @returns { { prevPage: OrderedMuiPage | null; nextPage: OrderedMuiPage | null } }
 */
function usePageNeighbours() {
  const { activePage, pages } = React.useContext(PageContext);
  const pageList = orderedPages(pages);
  const currentPageNum = pageList.indexOf(activePage);
  if (currentPageNum === -1) {
    return { prevPage: undefined, nextPage: undefined };
  }

  const prevPage = pageList[currentPageNum - 1] ?? null;
  const nextPage = pageList[currentPageNum + 1] ?? null;

  return { prevPage, nextPage };
}

export default function AppLayoutDocsFooter() {
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { activePage } = React.useContext(PageContext);
  const [rating, setRating] = React.useState();
  const [comment, setComment] = React.useState('');
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const inputRef = React.useRef();

  const { nextPage, prevPage } = usePageNeighbours();

  const setCurrentRatingFromCookie = React.useCallback(() => {
    if (activePage !== null) {
      setRating(getCurrentRating(activePage.pathname));
    }
  }, [activePage]);

  React.useEffect(() => {
    setCurrentRatingFromCookie();
  }, [setCurrentRatingFromCookie]);

  async function processFeedback() {
    if (activePage === null) {
      setSnackbarMessage(t('feedbackFailed'));
    }

    const result = await submitFeedback(activePage.pathname, rating, comment, userLanguage);
    if (result) {
      setSnackbarMessage(t('feedbackSubmitted'));
    } else {
      setCurrentRatingFromCookie();
      setSnackbarMessage(t('feedbackFailed'));
    }
    setSnackbarOpen(true);
  }

  const handleClickThumb = (vote) => async () => {
    if (vote !== rating) {
      setRating(vote);
      setCommentOpen(true);
    }
  };

  const handleChangeTextfield = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setCommentOpen(false);
    processFeedback();
  };

  const handleCancelComment = () => {
    setCommentOpen(false);
    setCurrentRatingFromCookie();
  };

  const handleEntered = () => {
    inputRef.current.focus();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const hidePagePagination = activePage === null || activePage.ordered === false;

  return (
    <React.Fragment>
      <Footer>
        {hidePagePagination ? null : (
          <React.Fragment>
            <Divider />
            <PaginationDiv>
              {prevPage !== null ? (
                <PageLinkButton
                  component={Link}
                  noLinkStyle
                  href={prevPage.pathname}
                  size="large"
                  startIcon={<ChevronLeftIcon />}
                >
                  {pageToTitleI18n(prevPage, t)}
                </PageLinkButton>
              ) : (
                <div />
              )}
              <FeedbackGrid
                container
                role="group"
                justifyContent="center"
                alignItems="center"
                aria-labelledby="feedback-message"
              >
                <FeedbackMessage
                  align="center"
                  component="div"
                  id="feedback-message"
                  variant="subtitle1"
                >
                  {t('feedbackMessage')}
                </FeedbackMessage>
                <div>
                  <Tooltip title={t('feedbackYes')}>
                    <IconButton onClick={handleClickThumb(1)} aria-pressed={rating === 1}>
                      <ThumbUpIcon color={rating === 1 ? 'primary' : undefined} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('feedbackNo')}>
                    <IconButton onClick={handleClickThumb(0)} aria-pressed={rating === 0}>
                      <ThumbDownIcon color={rating === 0 ? 'error' : undefined} />
                    </IconButton>
                  </Tooltip>
                </div>
              </FeedbackGrid>
              {nextPage !== null ? (
                <PageLinkButton
                  component={Link}
                  noLinkStyle
                  href={nextPage.pathname}
                  size="large"
                  endIcon={<ChevronRightIcon />}
                >
                  {pageToTitleI18n(nextPage, t)}
                </PageLinkButton>
              ) : null}
            </PaginationDiv>
          </React.Fragment>
        )}
        <Collapse in={commentOpen} onEntered={handleEntered}>
          <form
            aria-labelledby="feedback-message"
            onReset={handleCancelComment}
            onSubmit={handleSubmitComment}
          >
            <Typography component="div" variant="h6" gutterBottom>
              {t('feedbackTitle')}
            </Typography>
            <div>
              <Typography id="feedback-description" color="text.secondary" gutterBottom>
                {rating === 1 ? t('feedbackMessageUp') : t('feedbackMessageDown')}
              </Typography>
              <TextField
                multiline
                margin="dense"
                name="comment"
                fullWidth
                rows={6}
                value={comment}
                onChange={handleChangeTextfield}
                inputProps={{
                  'aria-label': t('feedbackCommentLabel'),
                  'aria-describedby': 'feedback-description',
                  ref: inputRef,
                }}
              />
            </div>
            <DialogActions>
              <Button type="reset">{t('cancel')}</Button>
              <Button type="submit">{t('submit')}</Button>
            </DialogActions>
          </form>
        </Collapse>
      </Footer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
