export function flattenRelativeImports(rawCode: string) {
  return rawCode.replace(/from (['"])\..*\//g, `from $1./`);
}
