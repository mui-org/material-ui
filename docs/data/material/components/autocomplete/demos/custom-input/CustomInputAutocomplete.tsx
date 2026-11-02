import Autocomplete from '@mui/material/Autocomplete';

const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  return (
    // @focus-start @padding 2
    <label>
      Value:{' '}
      <Autocomplete
        sx={(theme) => ({
          display: 'inline-block',
          '& input': {
            width: 200,
            bgcolor: 'background.paper',
            color: theme.palette.getContrastText(theme.palette.background.paper),
          },
        })}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.slotProps.input.ref}>
            <input type="text" {...params.slotProps.htmlInput} />
          </div>
        )}
      />
    </label>
    // @focus-end
  );
}
