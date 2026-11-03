import * as path from 'path';
import * as babel from '@babel/core';
import * as fs from 'node:fs/promises';
import glob from 'fast-glob';

function getTestFilesNames(filepath: string) {
  return glob.sync(
    path
      .join(
        path.dirname(filepath),
        `/{tests/,}{*.,}${path.basename(filepath, path.extname(filepath))}.test.{js,ts,tsx}`,
      )
      .replace(/\\/g, '/'),
    { absolute: true },
  );
}

async function parseWithConfig(filename: string) {
  const source = await fs.readFile(filename, { encoding: 'utf8' });
  const partialConfig = babel.loadPartialConfig({
    filename,
  });

  if (partialConfig === null) {
    throw new Error(`Could not load a babel config for ${filename}.`);
  }

  return babel.parseAsync(source, partialConfig.options);
}

function findConformanceDescriptor(
  file: babel.ParseResult,
): null | { name: string; body: babel.types.ObjectExpression } {
  const { types: t } = babel;

  let descriptor = null;
  babel.traverse(file, {
    CallExpression(babelPath) {
      const { node: callExpression } = babelPath;
      const { callee } = callExpression;
      if (t.isIdentifier(callee) && callee.name.startsWith('describeConformance')) {
        const [, optionsFactory] = callExpression.arguments;
        if (
          t.isArrowFunctionExpression(optionsFactory) &&
          t.isObjectExpression(optionsFactory.body)
        ) {
          // describeConformance(element, () => options);
          descriptor = {
            name: callee.name,
            body: optionsFactory.body,
          };
        } else {
          throw new Error(
            `Only an arrow function returning an object expression is supported as the second argument to \`describeConformance\` ` +
              `e.g. \`describeConformance(element, () => ({ someOption: someValue }))\` `,
          );
        }
      }
    },
  });

  return descriptor;
}

function getRefInstance(valueNode: babel.Node): string | undefined {
  if (babel.types.isIdentifier(valueNode)) {
    return valueNode.name;
  }

  if (!babel.types.isMemberExpression(valueNode)) {
    throw new Error(
      'Expected a member expression (for example window.HTMLDivElement) or a global identifier (for example Object) in refInstanceof. ' +
        'If the ref will not be resolved use `refInstanceof: undefined`.',
    );
  }

  const { object, property } = valueNode;
  if (!babel.types.isIdentifier(object)) {
    throw new Error(
      `Expected an Identifier as the object of the MemberExpression of refInstanceOf but got '${object.type}'`,
    );
  }
  if (!babel.types.isIdentifier(property)) {
    throw new Error(
      `Expected an Identifier as the property of the MemberExpression of refInstanceOf but got '${object.type}'`,
    );
  }

  switch (object.name) {
    case 'window':
      return property.name;
    case 'React':
      return `React.${property.name}`;
    default:
      throw new Error(`Unrecognized member expression starting with '${object.name}'`);
  }
}

function getInheritComponentName(valueNode: babel.types.Node): string | undefined {
  return (valueNode as any).name;
}

function getSkippedTests(valueNode: babel.types.Node): string[] {
  if (!babel.types.isArrayExpression(valueNode)) {
    throw new TypeError(
      `Unable to determine skipped tests from '${valueNode.type}'. Expected an 'ArrayExpression' i.e. \`skippedTests: ["a", "b"]\`.`,
    );
  }

  return valueNode.elements.map((element) => {
    if (!babel.types.isStringLiteral(element)) {
      throw new TypeError(
        `Unable to determine skipped test from '${element?.type}'. Expected a 'StringLiter' i.e. \`"a"\`.`,
      );
    }
    return element.value;
  });
}

export interface ParseResult {
  forwardsRefTo: string | undefined;
  inheritComponent: string | undefined;
  spread: boolean | undefined;
  themeDefaultProps: boolean | undefined | null;
}

export default async function parseTest(componentFilename: string): Promise<ParseResult> {
  const testFilenames = getTestFilesNames(componentFilename);

  if (testFilenames.length === 0) {
    throw new Error(
      `Could not find any test file next to ${componentFilename}. The test filename should end with '.test.{js,ts,tsx}'.`,
    );
  }

  let descriptor: ReturnType<typeof findConformanceDescriptor> = null;

  try {
    for await (const testFilename of testFilenames) {
      if (descriptor === null) {
        const babelParseResult = await parseWithConfig(testFilename);
        if (babelParseResult === null) {
          throw new Error(`Could not parse ${testFilename}.`);
        }
        descriptor = findConformanceDescriptor(babelParseResult);
      }
    }
  } catch (error) {
    console.error(error);
  }

  const result: ParseResult = {
    forwardsRefTo: undefined,
    inheritComponent: undefined,
    spread: undefined,
    themeDefaultProps: null,
  };

  if (descriptor === null) {
    return result;
  }

  let skippedTests: string[] = [];
  descriptor.body.properties.forEach((property) => {
    if (!babel.types.isObjectProperty(property)) {
      return;
    }

    const key: string = (property.key as any).name;

    switch (key) {
      case 'refInstanceof':
        result.forwardsRefTo = getRefInstance(property.value);
        break;
      case 'inheritComponent':
        result.inheritComponent = getInheritComponentName(property.value);
        break;
      case 'skip':
        skippedTests = getSkippedTests(property.value);
        break;
      default:
        break;
    }
  });

  result.spread = !skippedTests.includes('propsSpread');
  result.themeDefaultProps =
    descriptor.name === 'describeConformanceUnstyled'
      ? undefined
      : !skippedTests.includes('themeDefaultProps');

  return result;
}
