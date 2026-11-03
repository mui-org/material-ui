import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function InputAdornments() {
  // @focus-start @padding 1
  const outlinedStartId = React.useId();
  const outlinedWeightId = React.useId();
  const outlinedPasswordId = React.useId();
  const outlinedAmountId = React.useId();
  const filledStartId = React.useId();
  const filledWeightId = React.useId();
  const filledPasswordId = React.useId();
  const filledAmountId = React.useId();
  const standardStartId = React.useId();
  const standardWeightId = React.useId();
  const standardPasswordId = React.useId();
  const standardAmountId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // An endAdornment coexists with the Select's chevron without overlapping it.
  const infoEndAdornment = (
    <InputAdornment position="end">
      <InfoOutlined />
    </InputAdornment>
  );
  const infoStartAdornment = (
    <InputAdornment position="start">
      <InfoOutlined />
    </InputAdornment>
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <TextField
          label="With normal TextField"
          id={`${outlinedStartId}-input`}
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            },
          }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id={`${outlinedWeightId}-input`}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby={`${outlinedWeightId}-helper-text`}
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id={`${outlinedWeightId}-helper-text`}>
            Weight
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Password</InputLabel>
          <OutlinedInput
            id={`${outlinedPasswordId}-input`}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel htmlFor={`${outlinedAmountId}-input`}>Amount</InputLabel>
            <OutlinedInput
              id={`${outlinedAmountId}-input`}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
          <TextField
            select
            label="Select"
            defaultValue={20}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{ select: { endAdornment: infoEndAdornment } }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField
            select
            label="Native"
            defaultValue={20}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              select: { native: true, startAdornment: infoStartAdornment },
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </TextField>
        </div>
      </div>
      <div>
        <TextField
          label="With normal TextField"
          id={`${filledStartId}-input`}
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            },
          }}
          variant="filled"
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <FilledInput
            id={`${filledWeightId}-input`}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby={`${filledWeightId}-helper-text`}
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id={`${filledWeightId}-helper-text`}>
            Weight
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor={`${filledPasswordId}-input`}>Password</InputLabel>
          <FilledInput
            id={`${filledPasswordId}-input`}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
            <InputLabel htmlFor={`${filledAmountId}-input`}>Amount</InputLabel>
            <FilledInput
              id={`${filledAmountId}-input`}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <TextField
            select
            label="Select"
            defaultValue={20}
            variant="filled"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{ select: { endAdornment: infoEndAdornment } }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField
            select
            label="Native"
            defaultValue={20}
            variant="filled"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              select: { native: true, startAdornment: infoStartAdornment },
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </TextField>
        </div>
      </div>
      <div>
        <TextField
          label="With normal TextField"
          id={`${standardStartId}-input`}
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            },
          }}
          variant="standard"
        />
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            id={`${standardWeightId}-input`}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby={`${standardWeightId}-helper-text`}
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id={`${standardWeightId}-helper-text`}>
            Weight
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor={`${standardPasswordId}-input`}>Password</InputLabel>
          <Input
            id={`${standardPasswordId}-input`}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor={`${standardAmountId}-input`}>Amount</InputLabel>
            <Input
              id={`${standardAmountId}-input`}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <TextField
            select
            label="Select"
            defaultValue={20}
            variant="standard"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{ select: { endAdornment: infoEndAdornment } }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField
            select
            label="Native"
            defaultValue={20}
            variant="standard"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              select: { native: true, startAdornment: infoStartAdornment },
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </TextField>
        </div>
      </div>
    </Box>
  );
  // @focus-end
}
