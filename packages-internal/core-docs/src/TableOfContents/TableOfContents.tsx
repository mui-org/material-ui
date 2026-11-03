import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import { Link } from '../Link';
import { useTranslate } from '../i18n';
import { FEATURE_TOGGLE as featureToggle } from '../constants/featureToggle';

export const TOC_WIDTH = 242;

const NavLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 0, 1, 1.4),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightSemiBold,
  textTransform: 'uppercase',
  letterSpacing: '.1rem',
  color: (theme.vars || theme).palette.text.tertiary,
}));

const NavList = styled('ul')({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

export const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'level',
})<{ active?: boolean; level?: number }>(({ theme }) => {
  const activeStyles = {
    borderLeftColor: (theme.vars || theme).palette.primary[200],
    color: (theme.vars || theme).palette.primary[600],
    '&:hover': {
      borderLeftColor: (theme.vars || theme).palette.primary[600],
      color: (theme.vars || theme).palette.primary[600],
    },
  };
  const activeDarkStyles = {
    borderLeftColor: (theme.vars || theme).palette.primary[600],
    color: (theme.vars || theme).palette.primary[300],
    '&:hover': {
      borderLeftColor: (theme.vars || theme).palette.primary[400],
      color: (theme.vars || theme).palette.primary[400],
    },
  };

  return [
    {
      boxSizing: 'border-box' as const,
      padding: '6px 0 6px 12px',
      borderLeft: `1px solid transparent`,
      display: 'block',
      fontSize: theme.typography.pxToRem(13),
      fontWeight: theme.typography.fontWeightMedium,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '&:hover': {
        borderLeftColor: (theme.vars || theme).palette.grey[400],
        color: (theme.vars || theme).palette.grey[600],
      },
      // TODO: We probably want `aria-current="location"` instead.
      variants: [
        {
          props: ({ active }: { active?: boolean }) => !!active,
          style: [activeStyles, theme.applyDarkStyles(activeDarkStyles)],
        },
        {
          props: ({ active }: { active?: boolean }) => !active,
          style: [
            {
              color: (theme.vars || theme).palette.text.primary,
            },
            theme.applyDarkStyles({
              color: (theme.vars || theme).palette.grey[500],
            }),
          ],
        },
        {
          props: ({ level }: { level?: number }) => level === 2,
          style: {
            padding: `6px 0 6px ${theme.spacing(3)}`,
          },
        },
        {
          props: ({ level }: { level?: number }) => level === 3,
          style: {
            padding: `6px 0 6px ${theme.spacing(4.5)}`,
          },
        },
      ],
      '&:active': activeStyles,
    },
    theme.applyDarkStyles({
      '&:hover': {
        borderLeftColor: (theme.vars || theme).palette.grey[500],
        color: (theme.vars || theme).palette.grey[200],
      },
      '&:active': activeDarkStyles,
    }),
  ];
});

function shouldShowJobAd() {
  const date = new Date();
  const timeZoneOffset = date.getTimezoneOffset();
  // Hide for time zones UT+5.5 - UTC+14 & UTC-8 - UTC-12
  if (timeZoneOffset <= -5.5 * 60 || timeZoneOffset >= 8 * 60) {
    return false;
  }
  return true;
}

const showJobAd = featureToggle.enable_job_banner && shouldShowJobAd();

export interface TocItem {
  text: string;
  hash: string;
  children: TocItem[];
}

export interface TableOfContentsProps {
  toc: TocItem[];
  itemLink: (item: TocItem, level: number, onLinkClick?: () => void) => React.ReactNode;
  onLinkClick?: () => void;
}

export function TableOfContents({ toc, itemLink, onLinkClick }: TableOfContentsProps) {
  const t = useTranslate();

  return (
    <React.Fragment>
      <NoSsr>
        {showJobAd && (
          <Link
            href="https://jobs.ashbyhq.com/MUI?utm_source=2vOWXNv1PE"
            target="_blank"
            sx={[
              (theme) => ({
                mb: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: alpha(theme.palette.grey[50], 0.4),
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[200],
                borderRadius: 1,
                transitionProperty: 'all',
                transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',
                '&:hover, &:focus-visible': {
                  borderColor: (theme.vars || theme).palette.primary[200],
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primary[900], 0.2),
                  borderColor: (theme.vars || theme).palette.primaryDark[700],
                  '&:hover, &:focus-visible': {
                    borderColor: (theme.vars || theme).palette.primaryDark[500],
                  },
                }),
            ]}
          >
            <Typography
              component="span"
              variant="button"
              sx={{ fontWeight: '500', color: 'text.primary' }}
            >
              {'🚀 Join the MUI team!'}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              sx={{ fontWeight: 'normal', color: 'text.secondary', mt: 0.5 }}
            >
              {"We're looking for React Engineers and other amazing roles－come find out more!"}
            </Typography>
          </Link>
        )}
      </NoSsr>
      {toc.length > 0 ? (
        <React.Fragment>
          <NavLabel>{t('tableOfContents')}</NavLabel>
          <NavList>
            {toc.map((item) => (
              <li key={item.text}>
                {itemLink(item, 1, onLinkClick)}
                {item.children.length > 0 ? (
                  <NavList>
                    {item.children.map((subitem) => (
                      <li key={subitem.text}>
                        {itemLink(subitem, 2, onLinkClick)}
                        {subitem.children?.length > 0 ? (
                          <NavList>
                            {subitem.children.map((nestedSubItem) => (
                              <li key={nestedSubItem.text}>
                                {itemLink(nestedSubItem, 3, onLinkClick)}
                              </li>
                            ))}
                          </NavList>
                        ) : null}
                      </li>
                    ))}
                  </NavList>
                ) : null}
              </li>
            ))}
          </NavList>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
