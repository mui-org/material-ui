import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface BaselineRowProps {
  children: React.ReactNode;
  label: string;
}

function BaselineRow(props: BaselineRowProps) {
  const { children, label } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 16,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.75,
      }}
    >
      <span style={{ width: 88 }}>{label}</span>
      {children}
    </div>
  );
}

export default function BaselineAlignButtons() {
  return (
    <Stack spacing={2}>
      <BaselineRow label="Plain">
        <Button variant="outlined">Archive</Button>
      </BaselineRow>
      <BaselineRow label="Start icon">
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </BaselineRow>
      <BaselineRow label="End icon">
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </BaselineRow>
    </Stack>
  );
}
