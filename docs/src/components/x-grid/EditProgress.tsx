import * as React from 'react';
import type { GridRenderEditCellParams } from '@mui/x-data-grid';
import { useGridApiContext } from '@mui/x-data-grid';
import { debounce } from '@mui/material/utils';
import { alpha } from '@mui/material/styles';
import type { SliderValueLabelProps } from '@mui/material/Slider';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} arrow>
      {children}
    </Tooltip>
  );
}

export default function EditProgress(props: GridRenderEditCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  const [valueState, setValueState] = React.useState(Number(value));

  const updateCellEditProps = React.useCallback(
    (newValue: number | number[]) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    },
    [field, id, apiRef],
  );

  const debouncedUpdateCellEditProps = React.useMemo(
    () => debounce(updateCellEditProps, 60),
    [updateCellEditProps],
  );

  const handleChange = (event: Event, newValue: number) => {
    setValueState(newValue);
    debouncedUpdateCellEditProps(newValue);
  };

  React.useEffect(() => {
    setValueState(Number(value));
  }, [value]);

  const handleRef = (element: any) => {
    if (element) {
      const input = element.querySelector('input') as null | HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <Slider
      ref={handleRef}
      sx={[
        {
          p: 0,
          height: '100%',
          borderRadius: '0px',
          '& .MuiSlider-rail': {
            bgcolor: 'grey.100',
          },
          '& .MuiSlider-track': {
            border: 0,
            ...(valueState < 0.3 && {
              bgcolor: 'error.500',
            }),
            ...(valueState >= 0.3 &&
              valueState <= 0.7 && {
                bgcolor: 'warning.500',
              }),
            ...(valueState > 0.7 && {
              bgcolor: 'success.500',
            }),
          },
          '& .MuiSlider-thumb': {
            cursor: 'col-resize',
            height: '100%',
            width: 5,
            borderRadius: '0px',
            marginTop: 0,
            backgroundColor: alpha('#000000', 0.2),
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            '& .MuiSlider-rail': {
              bgcolor: 'primaryDark.700',
            },
            '& .MuiSlider-track': {
              ...(valueState < 0.3 && {
                bgcolor: 'error.800',
              }),
              ...(valueState >= 0.3 &&
                valueState <= 0.7 && {
                  bgcolor: 'warning.800',
                }),
              ...(valueState > 0.7 && {
                bgcolor: 'success.800',
              }),
            },
          }),
      ]}
      value={valueState}
      max={1}
      step={0.00001}
      onChange={handleChange}
      slots={{
        valueLabel: ValueLabelComponent,
      }}
      valueLabelDisplay="auto"
      valueLabelFormat={(newValue) => `${(newValue * 100).toLocaleString()} %`}
    />
  );
}
