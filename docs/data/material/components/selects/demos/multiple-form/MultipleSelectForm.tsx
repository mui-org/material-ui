import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';

const options = [
  { value: 'react', label: 'React' },
  { value: 'dotnet', label: '.NET' },
  { value: 'accessibility', label: 'Accessibility' },
];

export default function MultipleSelectForm() {
  // @focus-start @padding 1
  const id = React.useId();
  const [tags, setTags] = React.useState<string[]>([]);
  const [submittedTags, setSubmittedTags] = React.useState<string[] | null>(null);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const { value } = event.target;
    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmittedTags(formData.getAll('tags').map(String));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id={`${id}-label`}>Tags</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            multiple
            value={tags}
            onChange={handleChange}
            label="Tags"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* The Select has no name. Each value gets its own form entry. */}
        {tags.map((tag) => (
          <input key={tag} type="hidden" name="tags" value={tag} />
        ))}
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button type="button" onClick={() => setTags([])}>
            Clear selection
          </Button>
        </Stack>
        <Box component="output" aria-label="Submitted tags" aria-live="polite">
          {submittedTags === null
            ? 'Submit the form to inspect its data.'
            : JSON.stringify(submittedTags)}
        </Box>
      </Stack>
    </Box>
  );
  // @focus-end
}
