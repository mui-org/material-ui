import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useMultiApp } from 'docs/src/components/pricing/MultiAppContext';

export default function InfoPrioritySupport(props: {
  value: React.ReactNode;
  value2?: React.ReactNode;
  metadata?: React.ReactNode;
  metadata2?: React.ReactNode;
}) {
  const { value, value2, metadata, metadata2 } = props;
  const { multiApp } = useMultiApp();

  return (
    <React.Fragment>
      {multiApp ? (
        <React.Fragment>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {value}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'normal',
              display: 'block',
              mt: 0.4,
              textAlign: 'center',
            }}
          >
            {metadata}
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {value2}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'normal',
              display: 'block',
              mt: 0.4,
              textAlign: 'center',
            }}
          >
            {metadata2}
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
