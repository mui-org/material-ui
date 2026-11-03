import * as React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import getMessage from './message';
import styles from './FocusedLiveEdit.module.css';

export default function FocusedLiveEdit() {
  const [count, setCount] = React.useState(0);
  const theme = useTheme();
  const themeLabel = 'validationLabel' in theme ? String(theme.validationLabel) : 'base';

  return (
    <section className={styles.root} data-testid="focused-preview">
      {/* @focus-start */}
      <span data-testid="focused-message">{getMessage('Ready')}</span>
      <span data-testid="focused-theme">{themeLabel}</span>
      <Button data-testid="focused-count" onClick={() => setCount((value) => value + 1)}>
        Count: {count}
      </Button>
      {/* @focus-end */}
    </section>
  );
}
