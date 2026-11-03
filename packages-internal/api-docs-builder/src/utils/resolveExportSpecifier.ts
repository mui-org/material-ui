import * as ts from '@typescript/typescript6';
import type { TypeScriptProject } from './createTypeScriptProject';

function shouldAliasSymbol(symbol: ts.Symbol) {
  const declaration = symbol.declarations?.[0];
  if (!declaration) {
    return false;
  }

  /**
   * - `export { XXX }`
   * - `export { XXX } from './modules'`
   */
  if (ts.isExportSpecifier(declaration)) {
    return true;
  }

  /**
   * - `export default XXX`
   */
  if (ts.isExportAssignment(declaration)) {
    /**
     * Return `true` only for `export default XXX`
     * Not for `export default React.memo(XXX)` for example.
     */
    return declaration.expression.kind === ts.SyntaxKind.Identifier;
  }

  return false;
}

/**
 * Goes to the root symbol of ExportSpecifier
 * That corresponds to one of the following patterns
 * - `export { XXX }`
 * - `export { XXX } from './modules'`
 * - `export default XXX`
 *
 * Do not go to the root definition for TypeAlias (ie: `export type XXX = YYY`)
 * Because we usually want to keep the description and tags of the aliased symbol.
 */
export function resolveExportSpecifier(symbol: ts.Symbol, project: TypeScriptProject) {
  let resolvedSymbol = symbol;

  while (shouldAliasSymbol(resolvedSymbol)) {
    let newResolvedSymbol;
    try {
      newResolvedSymbol = project.checker.getImmediateAliasedSymbol(resolvedSymbol);
    } catch (err) {
      newResolvedSymbol = null;
    }

    if (!newResolvedSymbol) {
      throw new Error(`Impossible to resolve export specifier for symbol "${symbol.escapedName}"`);
    }

    resolvedSymbol = newResolvedSymbol;
  }

  return resolvedSymbol;
}
