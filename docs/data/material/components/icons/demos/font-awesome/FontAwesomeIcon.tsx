import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

export default function FontAwesomeIcon() {
  React.useEffect(() => {
    const href = 'https://use.fontawesome.com/releases/v5.14.0/css/all.css';
    if (document.querySelector(`link[href="${href}"]`)) {
      return undefined;
    }

    const node = loadCSS(
      href,
      // Inject before JSS
      (document.querySelector('#font-awesome-css') ||
        document.head.firstChild) as HTMLElement,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-end' }}>
      {/* @focus-start */}
      <Icon baseClassName="fas" className="fa-plus-circle" />
      <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        sx={{ color: green[500] }}
      />
      <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
      <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
      {/* @focus-end */}
    </Stack>
  );
}
