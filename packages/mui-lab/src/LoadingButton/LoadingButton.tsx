'use client';
import * as React from 'react';
import Button from '@mui/material/Button';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The LoadingButton component functionality is now part of the Button component from Material UI.',
        '',
        "You should use `import Button from '@mui/material/Button'`",
        "or `import { Button } from '@mui/material'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedLoadingButton(
  props: React.ComponentProps<typeof Button>,
  ref: React.Ref<HTMLButtonElement>,
) {
  warn();

  return <Button ref={ref} {...props} />;
}) as unknown as typeof Button;
