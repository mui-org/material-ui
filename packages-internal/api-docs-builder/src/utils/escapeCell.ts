function escapePipesOutsideBackticks(value: string): string {
  // Split into chunks that are either code spans or normal text.
  // Capturing group keeps the code chunks in the array.
  return value
    .split(/(`[^`]*`)/g)
    .map((chunk) => (chunk.startsWith('`') ? chunk : chunk.replace(/\|/g, '\\|')))
    .join('');
}

export default function escapeCell(value: string): string {
  // As the pipe is use for the table structure
  const newValue = escapePipesOutsideBackticks(value);

  return newValue.replace(/</g, '&lt;').replace(/`&lt;/g, '`<');
}
