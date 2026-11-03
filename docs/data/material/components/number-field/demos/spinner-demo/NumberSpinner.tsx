import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OutlinedInput from '@mui/material/OutlinedInput';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function NumberSpinner({
  id: idProp,
  label,
  error,
  size = 'medium',
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: 'small' | 'medium';
  error?: boolean;
}) {
  // @focus-start @padding 1
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }
  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
          sx={{
            '& .MuiButton-root': {
              borderColor: 'divider',
              minWidth: 0,
              bgcolor: 'action.hover',
              '&:not(.Mui-disabled)': {
                color: 'text.primary',
              },
            },
          }}
        >
          {props.children}
        </FormControl>
      )}
    >
      <BaseNumberField.ScrubArea
        render={
          <Box component="span" sx={{ userSelect: 'none', width: 'max-content' }} />
        }
      >
        <FormLabel
          htmlFor={id}
          sx={{
            display: 'inline-block',
            cursor: 'ew-resize',
            fontSize: '0.875rem',
            color: 'text.primary',
            fontWeight: 500,
            lineHeight: 1.5,
            mb: 0.5,
          }}
        >
          {label}
        </FormLabel>
        <BaseNumberField.ScrubAreaCursor>
          <OpenInFullIcon
            fontSize="small"
            sx={{ transform: 'translateY(12.5%) rotate(45deg)' }}
          />
        </BaseNumberField.ScrubAreaCursor>
      </BaseNumberField.ScrubArea>
      <Box sx={{ display: 'flex' }}>
        <BaseNumberField.Decrement
          render={
            <Button
              variant="outlined"
              aria-label="Decrease"
              size={size}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: '0px',
                '&.Mui-disabled': {
                  borderRight: '0px',
                },
              }}
            />
          }
        >
          <RemoveIcon fontSize={size} />
        </BaseNumberField.Decrement>

        <BaseNumberField.Input
          id={id}
          render={(props, state) => (
            <OutlinedInput
              inputRef={props.ref}
              value={state.inputValue}
              onBlur={props.onBlur}
              onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onFocus={props.onFocus}
              slotProps={{
                input: {
                  ...props,
                  size:
                    Math.max(
                      (other.min?.toString() || '').length,
                      state.inputValue.length || 1,
                    ) + 1,
                  sx: {
                    textAlign: 'center',
                  },
                },
              }}
              sx={{ pr: 0, borderRadius: 0, flex: 1 }}
            />
          )}
        />

        <BaseNumberField.Increment
          render={
            <Button
              variant="outlined"
              aria-label="Increase"
              size={size}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: '0px',
                '&.Mui-disabled': {
                  borderLeft: '0px',
                },
              }}
            />
          }
        >
          <AddIcon fontSize={size} />
        </BaseNumberField.Increment>
      </Box>
    </BaseNumberField.Root>
  );
  // @focus-end
}
