import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EmptyTextarea() {
  return (
    // @focus-start @padding 2
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    />
    // @focus-end
  );
}
