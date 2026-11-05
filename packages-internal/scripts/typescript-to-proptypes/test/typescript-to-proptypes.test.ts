/// <reference types="vite/client" />
import { describe, beforeAll, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import * as ts from '@typescript/typescript6';
import glob from 'fast-glob';
import prettier from 'prettier';
import type { TypeScriptProject } from '@mui/internal-docs-utils';
import { createTypeScriptProjectBuilder } from '@mui/internal-docs-utils';
import { generatePropTypes } from '../src/generatePropTypes';
import { injectPropTypesInFile } from '../src/injectPropTypesInFile';
import { getPropTypesFromFile } from '../src/getPropTypesFromFile';
import type { TestOptions } from './types';

const testCases = glob
  .sync('*/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname })
  .map((testPath) => {
    const dirname = path.dirname(testPath);
    const name = path.dirname(path.relative(__dirname, testPath));
    const outputPath = path.join(dirname, 'output.js');
    const inputJS = path.join(dirname, 'input.js');

    return {
      inputJS,
      name,
      outputPath,
      inputPath: testPath,
    };
  });

describe('typescript-to-proptypes', () => {
  let cachedProject: TypeScriptProject;
  function getProject() {
    return cachedProject;
  }

  beforeAll(function beforeHook() {
    const buildProject = createTypeScriptProjectBuilder({
      test: {
        rootPath: path.join(__dirname, '..'),
        tsConfigPath: 'tsconfig.test.json',
      },
    });

    cachedProject = buildProject('test', {
      files: testCases.map((testCase) => testCase.inputPath),
    });

    // Create program for all files to speed up tests
    // cachedProject = ttp.createTSProgram(
    //   testCases.map((testCase) => testCase.inputPath),
    //   ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json')),
    // );
  }, 20000);

  testCases.forEach((testCase) => {
    const { name: testName, inputPath, inputJS, outputPath } = testCase;

    it(`${testName}`, async () => {
      const project = getProject();
      let options: TestOptions = {};
      try {
        const optionsModule: any = await import(`./${testName}/options.ts`);
        options = optionsModule.default;
      } catch (error) {
        // Assume "Cannot find module" which means "no options".
      }

      const components = getPropTypesFromFile({ filePath: inputPath, project, ...options.parser });

      let inputSource: string | null = null;
      if (inputPath.endsWith('.d.ts')) {
        try {
          inputSource = fs.readFileSync(inputJS, 'utf8');
        } catch (error) {
          // ignore
        }
      } else {
        inputSource = ts.transpileModule(fs.readFileSync(inputPath, 'utf8'), {
          compilerOptions: {
            target: ts.ScriptTarget.ESNext,
            jsx: ts.JsxEmit.Preserve,
          },
        }).outputText;
      }

      let result = '';
      // For d.ts files we just generate the AST
      if (!inputSource) {
        result = components
          .map((component) => {
            return generatePropTypes(component, options.generator);
          })
          .join('\n');
      } else {
        // For .tsx? files we transpile them and inject the proptypes
        const injected = injectPropTypesInFile({
          components,
          target: inputSource,
          options: options.injector,
        });
        if (!injected) {
          throw new Error('Injection failed');
        }

        result = injected;
      }

      const prettierConfig = await prettier.resolveConfig(outputPath);
      const propTypes = await prettier.format(result, {
        ...prettierConfig,
        filepath: outputPath,
      });

      if (fs.existsSync(outputPath)) {
        expect(propTypes.replace(/\r?\n/g, '\n')).to.equal(
          fs.readFileSync(outputPath, 'utf8').replace(/\r?\n/g, '\n'),
        );
      } else {
        fs.writeFileSync(outputPath, propTypes);
      }
    });
  });
});
