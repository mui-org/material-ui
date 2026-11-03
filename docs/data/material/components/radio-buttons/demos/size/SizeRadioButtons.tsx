import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function SizeRadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    slotProps: { input: { 'aria-label': item } },
  });

  return (
    <div>
      {/* @focus-start */}
      <Radio {...controlProps('a')} size="small" />
      <Radio {...controlProps('b')} />
      <Radio
        {...controlProps('c')}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }}
      />
      {/* @focus-end */}
    </div>
  );
}
