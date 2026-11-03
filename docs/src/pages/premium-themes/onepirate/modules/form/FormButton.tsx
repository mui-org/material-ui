import * as React from 'react';
import type { ButtonProps } from '@mui/material/Button';
import Button from '../components/Button';
import defer from './defer';

interface FormButtonProps {
  disabled?: boolean;
  mounted?: boolean;
}

function FormButton<C extends React.ElementType>(
  props: FormButtonProps & ButtonProps<C, { component?: C }>,
) {
  const { disabled, mounted, ...other } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...(other as ButtonProps<C, { component?: C }>)}
    />
  );
}
export default defer(FormButton);
