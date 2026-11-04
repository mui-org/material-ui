/* eslint-disable default-case, no-return-assign, curly, prefer-template, @typescript-eslint/no-unused-vars */

/**
 * Copied from https://github.com/styled-components/stylis-plugin-rtl/blob/main/src/stylis-rtl.ts
 * with a modification at line 67 to handle layer rules.
 */

// @ts-expect-error: cssjanus does not ship TypeScript declarations.
import cssjanus from 'cssjanus';
import type { Middleware } from 'stylis';
import {
  COMMENT,
  compile,
  DECLARATION,
  IMPORT,
  RULESET,
  serialize,
  strlen,
  KEYFRAMES,
  MEDIA,
  SUPPORTS,
  LAYER,
} from 'stylis';

type MiddlewareParams = Parameters<Middleware>;

function stringifyPreserveComments(
  element: MiddlewareParams[0],
  index: MiddlewareParams[1],
  children: MiddlewareParams[2],
): string {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
    case COMMENT:
      return (element.return = element.return || element.value);
    case RULESET: {
      element.value = Array.isArray(element.props) ? element.props.join(',') : element.props;

      if (Array.isArray(element.children)) {
        element.children.forEach((x) => {
          if (x.type === COMMENT) x.children = x.value;
        });
      }
    }
  }

  const serializedChildren = serialize(
    Array.prototype.concat(element.children),
    stringifyPreserveComments,
  );

  return strlen(serializedChildren)
    ? (element.return = element.value + '{' + serializedChildren + '}')
    : '';
}

function stylisRTLPlugin(
  element: MiddlewareParams[0],
  index: MiddlewareParams[1],
  children: MiddlewareParams[2],
  callback: MiddlewareParams[3],
): string | void {
  if (
    element.type === KEYFRAMES ||
    element.type === SUPPORTS ||
    (element.type === RULESET &&
      (!element.parent ||
        element.parent.type === MEDIA ||
        element.parent.type === RULESET ||
        element.parent.type === LAYER))
  ) {
    const stringified = cssjanus.transform(stringifyPreserveComments(element, index, children));

    element.children = stringified ? compile(stringified)[0].children : [];

    element.return = '';
  }
}

// stable identifier that will not be dropped by minification unless the whole module
// is unused
Object.defineProperty(stylisRTLPlugin, 'name', { value: 'stylisRTLPlugin' });

export default stylisRTLPlugin;
