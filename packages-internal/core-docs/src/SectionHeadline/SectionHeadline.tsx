import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface SectionHeadlineProps {
  alwaysCenter?: boolean;
  description?: React.ReactNode;
  id?: string;
  /**
   * For using with dark background.
   */
  inverted?: boolean;
  overline?: React.ReactNode;
  title: string | React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export default function SectionHeadline(props: SectionHeadlineProps) {
  const { alwaysCenter = false, description, id, inverted = false, overline, title } = props;
  return (
    <Box sx={{ m: alwaysCenter ? 'auto' : null }}>
      {overline && (
        <Typography
          id={id}
          component="div"
          variant="body2"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
            ...(alwaysCenter && {
              textAlign: 'center',
            }),
          }}
        >
          {overline}
        </Typography>
      )}
      {typeof title === 'string' ? (
        <Typography
          variant="h2"
          sx={(theme) => ({
            maxWidth: 500,
            ...(inverted
              ? {
                  color: '#fff',
                }
              : {
                  color: 'primaryDark.900',
                  ...theme.applyDarkStyles({
                    color: 'grey.100',
                  }),
                }),
            ...(alwaysCenter && {
              textAlign: 'center',
              maxWidth: '100%',
            }),
          })}
        >
          {title}
        </Typography>
      ) : (
        React.cloneElement(title, {
          style: {
            maxWidth: 500,
            ...(alwaysCenter && {
              maxWidth: '100%',
              textAlign: 'center',
            }),
            ...(inverted && {
              color: '#fff',
            }),
          },
        })
      )}
      {description && (
        <Typography
          sx={(theme) => ({
            mt: 1,
            mb: 3,
            maxWidth: 500,
            ...(inverted
              ? {
                  color: 'grey.400',
                }
              : {
                  color: 'grey.800',
                  ...theme.applyDarkStyles({
                    color: 'grey.500',
                  }),
                }),
            ...(alwaysCenter && {
              textAlign: 'center',
              mx: 'auto',
            }),
          })}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
