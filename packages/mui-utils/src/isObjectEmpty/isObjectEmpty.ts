export default function isObjectEmpty(object: any): boolean {
  if (object == null) {
    return true;
  }
  // eslint-disable-next-line
  for (const _ in object) {
    return false;
  }
  return true;
}
