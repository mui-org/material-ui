export default function isEmpty(display: unknown) {
  return display == null || (typeof display === 'string' && !display.trim());
}
