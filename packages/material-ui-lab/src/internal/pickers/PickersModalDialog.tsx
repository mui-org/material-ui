import * as React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog, { DialogProps as MuiDialogProps, dialogClasses } from '@material-ui/core/Dialog';
import { styled } from '@material-ui/core/styles';
import { DIALOG_WIDTH } from './constants/dimensions';

export interface ExportedPickerModalProps {
  /**
   * Ok button text.
   * @default "OK"
   */
  okText?: React.ReactNode;
  /**
   * Cancel text message.
   * @default "CANCEL"
   */
  cancelText?: React.ReactNode;
  /**
   * Clear text message.
   * @default "CLEAR"
   */
  clearText?: React.ReactNode;
  /**
   * Today text message.
   * @default "TODAY"
   */
  todayText?: React.ReactNode;
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable?: boolean;
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton?: boolean;
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps?: Partial<MuiDialogProps>;
}

export interface PickersModalDialogProps extends ExportedPickerModalProps {
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  open: boolean;
}

const PickersModalDialogRoot = styled(Dialog, { skipSx: true })({
  [`& .${dialogClasses.container}`]: {
    outline: 0,
  },
  [`& .${dialogClasses.paper}`]: {
    outline: 0,
    minWidth: DIALOG_WIDTH,
  },
});

const PickersModalDialogContent = styled(DialogContent, { skipSx: true })({
  '&:first-of-type': {
    padding: 0,
  },
});

const PickersModalDialogActions = styled(DialogActions, { skipSx: true })<{
  styleProps: PickersModalDialogProps;
}>(({ styleProps }) => ({
  ...((styleProps.clearable || styleProps.showTodayButton) && {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/mui-org/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-of-type': {
      marginRight: 'auto',
    },
  }),
}));

const PickersModalDialog = (props: React.PropsWithChildren<PickersModalDialogProps>) => {
  const {
    cancelText = 'Cancel',
    children,
    clearable = false,
    clearText = 'Clear',
    DialogProps = {},
    okText = 'OK',
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    showTodayButton = false,
    todayText = 'Today',
  } = props;

  const styleProps = props;

  return (
    <PickersModalDialogRoot open={open} onClose={onDismiss} {...DialogProps}>
      <PickersModalDialogContent>{children}</PickersModalDialogContent>
      <PickersModalDialogActions styleProps={styleProps}>
        {clearable && (
          <Button data-mui-test="clear-action-button" onClick={onClear}>
            {clearText}
          </Button>
        )}
        {showTodayButton && (
          <Button data-mui-test="today-action-button" onClick={onSetToday}>
            {todayText}
          </Button>
        )}
        {cancelText && <Button onClick={onDismiss}>{cancelText}</Button>}
        {okText && <Button onClick={onAccept}>{okText}</Button>}
      </PickersModalDialogActions>
    </PickersModalDialogRoot>
  );
};

export default PickersModalDialog;
