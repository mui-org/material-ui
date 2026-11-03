import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import { Link } from '../Link';
import type { LinkProps } from '../Link';

interface GlowingIconContainerProps {
  icon: React.ReactNode;
}

export function GlowingIconContainer({ icon }: GlowingIconContainerProps) {
  return (
    <Box
      sx={(theme) => ({
        width: 36,
        height: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'primary.200',
        bgcolor: 'primary.50',
        boxShadow: `0px 0 0 2px ${alpha(theme.palette.primary[500], 0.1)}, 0px 2px 12px 0px rgba(234, 237, 241, 0.3) inset`,
        '& .MuiSvgIcon-root': {
          fontSize: theme.typography.pxToRem(18),
        },
        ...theme.applyDarkStyles({
          borderColor: alpha(theme.palette.primary[400], 0.25),
          bgcolor: alpha(theme.palette.primary[900], 0.2),
          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary[600], 0.1)}, 0px 2px 12px 0px rgba(0, 0, 0, 0.25) inset`,
        }),
      })}
    >
      {icon}
    </Box>
  );
}

interface InfoCardProps {
  classNameDescription?: string;
  classNameTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  link?: string;
  prefetch?: LinkProps['prefetch'];
  svg?: React.ReactNode;
  title: string;
  titleProps?: TypographyProps;
}

export function InfoCard(props: InfoCardProps) {
  const {
    classNameDescription,
    classNameTitle,
    description,
    icon,
    link,
    svg,
    title,
    titleProps,
    ...other
  } = props;
  return (
    <Paper
      variant="outlined"
      component={link ? Link : 'div'}
      href={link}
      {...(link
        ? {
            noLinkStyle: true,
            // Fix overloading with prefetch={false}, only prefetch on hover.
            prefetch: false,
          }
        : {})}
      sx={(theme) => ({
        p: 2.5,
        height: '100%',
        background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        ...theme.applyDarkStyles({
          bgcolor: alpha(theme.palette.primaryDark[800], 0.25),
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderColor: 'primaryDark.700',
        }),
      })}
      {...other}
    >
      {svg && svg}
      {icon && <GlowingIconContainer icon={icon} />}
      <Typography
        component="h3"
        variant="body2"
        className={classNameTitle}
        {...titleProps}
        sx={[
          {
            fontWeight: 'semiBold',
            color: 'text.primary',
            mt: icon ? 2 : 0,
            mb: description ? 0.5 : 0,
          },
          ...(Array.isArray(titleProps?.sx) ? titleProps.sx : [titleProps?.sx]),
        ]}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }} className={classNameDescription}>
        {description}
      </Typography>
    </Paper>
  );
}
