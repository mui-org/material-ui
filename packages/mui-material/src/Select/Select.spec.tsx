import * as React from 'react';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { expectType } from '@mui/types';

function genericValueTest() {
  function handleChangeWithSameTypeAsSelect(event: SelectChangeEvent<number>) {}
  <Select<number> onChange={handleChangeWithSameTypeAsSelect} />;

  function handleChangeWithDifferentTypeFromSelect(
    event: React.ChangeEvent<{ name?: string; value: string }>,
  ) {}
  <Select<number>
    // @ts-expect-error: A numeric Select cannot use a change handler restricted to string values.
    onChange={handleChangeWithDifferentTypeFromSelect}
  />;

  <Select<string>
    // @ts-expect-error defaultValue should be a string
    defaultValue={1}
    // @ts-expect-error Value should be a string
    value={10}
  />;

  <Select
    onChange={(event) => {
      function testString(value: string) {}
      function testNumber(value: number) {}

      testString(event.target.value);
      // @ts-expect-error: This Select infers string values, which testNumber rejects.
      testNumber(event.target.value);
    }}
    value="1"
  />;

  <Select onChange={(event) => console.log(event.target.value)} value="1">
    <MenuItem value="1" />
    {/* Whoops. The value in onChange won't be a string */}
    <MenuItem value={2} />
  </Select>;

  // notched prop should be available (inherited from OutlinedInputProps) and NOT throw typescript error
  <Select notched />;

  // disabledUnderline prop should be available (inherited from InputProps) and NOT throw typescript error
  <Select disableUnderline />;

  // Tests presence of `root` class in SelectClasses
  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
    },
  });

  // tests deep slot prop forwarding up to the modal backdrop
  <Select
    MenuProps={{
      slotProps: {
        root: {
          slotProps: {
            backdrop: {
              style: {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    }}
  />;

  <Select variant="filled" />;
  <Select variant="standard" />;
  <Select variant="outlined" />;
  <Select />;

  <Select variant="filled" hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in standard variant
  <Select variant="standard" hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select variant="outlined" hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select hiddenLabel />;

  const defaultProps: SelectProps<number> = {};
  const outlinedProps: SelectProps<number> = {
    variant: 'outlined',
  };
  const filledProps: SelectProps<number> = {
    variant: 'filled',
  };
  const standardProps: SelectProps<number> = {
    variant: 'standard',
  };

  <Select {...defaultProps} />;
  <Select {...outlinedProps} />;
  <Select {...filledProps} />;
  <Select {...standardProps} />;
  <Select<number> {...outlinedProps} />;
  <Select<number> {...defaultProps} />;
  <Select<number> {...filledProps} />;

  const rawDefaultProps: SelectProps = {};
  const rawOutlinedProps: SelectProps = {
    variant: 'outlined',
  };
  const rawFilledProps: SelectProps = {
    variant: 'filled',
  };

  <Select {...rawDefaultProps} />;
  <Select {...rawOutlinedProps} />;
  <Select {...rawFilledProps} />;

  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select {...defaultProps} hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in outlined variant
  <Select {...outlinedProps} hiddenLabel />;
  <Select {...filledProps} hiddenLabel />;
  // @ts-expect-error hiddenLabel is not present in standard variant
  <Select {...standardProps} hiddenLabel />;

  interface OtherProps {
    otherProp?: number;
  }

  const SelectWrapper1 = <Value,>(props: SelectProps<Value> & OtherProps) => {
    const { otherProp, ...materialSelectProps } = props;

    return <Select<Value> {...materialSelectProps} />;
  };

  <SelectWrapper1 />;
  <SelectWrapper1<number> variant="filled" hiddenLabel />;
  <SelectWrapper1 variant="filled" hiddenLabel />;
}

type Options<T> = { text: string; value: T } | T;

type Props<T> = (
  | {
      value: T;
      multiple?: false;
      onChange: (value: T) => void;
    }
  | {
      value: T[];
      multiple: true;
      onChange: (value: T[]) => void;
    }
) & {
  options: Options<T>[];
};

// test for https://github.com/mui/material-ui/issues/41375
const AppSelect = <T extends string>(props: Props<T>) => {
  const getOptionText = (option: Options<T>) => {
    if (typeof option === 'object') {
      return option.text;
    }
    return option;
  };

  const getOptionValue = (option: Options<T>) => {
    if (typeof option === 'object') {
      return option.value;
    }
    return option;
  };

  return (
    <Select
      value={props.value}
      multiple={props.multiple}
      onChange={(event) => {
        if (props.multiple) {
          props.onChange(event.target.value as T[]);
        } else {
          props.onChange(event.target.value as T);
        }
      }}
    >
      {props.options.map((option, index) => (
        <MenuItem key={index} value={getOptionValue(option)}>
          {getOptionText(option)}
        </MenuItem>
      ))}
    </Select>
  );
};

// test for applying Select's static muiName property type to wrapper components
AppSelect.muiName = Select.muiName;

<Select<'option1' | 'option2'>
  value="option1"
  onChange={(event) => {
    expectType<'option1' | 'option2', typeof event.target.value>(event.target.value);
  }}
>
  <MenuItem value="option1" />
  {/* Whoops. The value in onChange won't be a string */}
  <MenuItem value="option2" />
</Select>;

<Select<number | ''>
  value={1}
  onChange={(event) => {
    expectType<number | '', typeof event.target.value>(event.target.value);
  }}
>
  <MenuItem value={1} />
  {/* Whoops. The value in onChange won't be a string */}
  <MenuItem value={2} />
</Select>;
