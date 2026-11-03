import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  return (
    // @focus-start @padding 2
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
    // @focus-end
  );
}
