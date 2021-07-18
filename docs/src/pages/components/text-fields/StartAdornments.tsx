import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default function StartAdornments() {
  const [amount, setAmount] = React.useState('');
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(target.value);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <TextField
          sx={{ m: 1, width: '30ch' }}
          id="outlined-adornment-amount-shrunk"
          value={amount}
          onChange={handleChange}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          sx={{ m: 1, width: '30ch' }}
          id="outlined-adornment-amount-width"
          value={amount}
          onChange={handleChange}
          label="With startAdornmentWidth"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          startAdornmentWidth={9}
        />
      </div>
      <div>
        <TextField
          sx={{ m: 1, width: '30ch' }}
          variant="filled"
          id="filled-adornment-amount-shrunk"
          value={amount}
          onChange={handleChange}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          sx={{ m: 1, width: '30ch' }}
          variant="filled"
          id="filled-adornment-amount-width"
          value={amount}
          onChange={handleChange}
          label="With startAdornmentWidth"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          startAdornmentWidth={9}
        />
      </div>
      <div>
        <TextField
          sx={{ m: 1, width: '30ch' }}
          variant="standard"
          id="standard-adornment-amount-shrunk"
          value={amount}
          onChange={handleChange}
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          sx={{ m: 1, width: '30ch' }}
          variant="standard"
          id="standard-adornment-amount-width"
          value={amount}
          onChange={handleChange}
          label="With startAdornmentWidth"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          startAdornmentWidth={9}
        />
      </div>
    </Box>
  );
}
