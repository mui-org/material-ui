import * as React from 'react';
import Input from '@mui/material/Input';

function Textarea() {
  const [value, setValue] = React.useState(
    `Hey, sorry for being late to respond. Here is a codesandbox. It actually happens when I reduce the font-size of the input. Try adding some text or paste a long paragraph and you will the bottom margin being increased. It works fine with the default font-size.`,
  );

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Input
        sx={{
          width: 200,
          '& .MuiInput-input': {
            fontSize: 13,
            boxSizing: 'border-box',
            border: '10px solid black',
            padding: 0,
          },
          '&.MuiInput-root': {
            padding: '4px 0 5px',
          },
        }}
        multiline
        value={value}
        onChange={handleChange}
      />
      <Input
        sx={{
          width: 200,
          '& .MuiInput-input': { fontSize: 13, boxSizing: 'content-box', padding: '10px' },
          '&.MuiInput-root': {
            padding: '4px 0 5px',
          },
        }}
        multiline
        value={value}
        onChange={handleChange}
      />
      <Input style={{ width: 200 }} multiline placeholder="rows" rows={3} />
      <Input style={{ width: 200 }} multiline value={value} onChange={handleChange} maxRows={4} />
      <Input style={{ width: 200 }} multiline placeholder="long placeholder long placeholder" />
      <Input
        style={{ width: 200 }}
        multiline
        defaultValue="long default value long default value"
      />
    </div>
  );
}

export default Textarea;
