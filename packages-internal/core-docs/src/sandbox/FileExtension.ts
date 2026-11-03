export function getFileExtension(codeVariant: 'TS' | 'JS') {
  if (codeVariant === 'TS') {
    return 'tsx';
  }
  if (codeVariant === 'JS') {
    return 'js';
  }
  throw new Error(`Unsupported codeVariant: ${codeVariant}`);
}
