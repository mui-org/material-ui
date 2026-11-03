import { expect, describe, beforeEach, afterEach, it, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { replaceDemoWithSnippet, processMarkdownFile } from '../src/index';

describe('generate-llms-txt', () => {
  let tempDir: string;

  beforeEach(() => {
    // Create a temporary directory for test files
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'llms-txt-test-'));
  });

  afterEach(() => {
    // Clean up temporary directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('replaceDemoWithSnippet', () => {
    it('should replace demo syntax with code snippet', () => {
      const markdown = `# Test Component

Here is a demo:

{{"demo": "BasicButton.js"}}

More content here.`;

      const jsContent = `import React from 'react';

export default function BasicButton() {
  return <button>Click me</button>;
}`;

      // Create test files
      fs.writeFileSync(path.join(tempDir, 'BasicButton.js'), jsContent);

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('```jsx');
      expect(result).to.include(jsContent);
      expect(result).to.not.include('{{"demo": "BasicButton.js"}}');
    });

    it('should handle white spaces in demo syntax', () => {
      const markdown = `{{ "demo": "Component.js"  }}`;

      const jsContent = `// JavaScript version`;

      fs.writeFileSync(path.join(tempDir, 'Component.js'), jsContent);

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('```jsx');
      expect(result).to.include(jsContent);
    });

    it('should include only TS files', () => {
      const markdown = `{{"demo": "Component.js"}}`;

      const jsContent = `// JavaScript version`;
      const tsContent = `// TypeScript version`;

      fs.writeFileSync(path.join(tempDir, 'Component.js'), jsContent);
      fs.writeFileSync(path.join(tempDir, 'Component.tsx'), tsContent);

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('```tsx');
      expect(result).to.include(tsContent);
      expect(result).to.not.include('```jsx');
      expect(result).to.not.include(jsContent);
    });

    it('should only include JS file when TS file does not exist', () => {
      const markdown = `{{"demo": "Component.js"}}`;

      const jsContent = `// JavaScript version`;

      fs.writeFileSync(path.join(tempDir, 'Component.js'), jsContent);

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('```jsx');
      expect(result).to.include(jsContent);
      expect(result).to.not.include('```tsx');
    });

    it('should handle multiple demos in the same markdown', () => {
      const markdown = `# Multiple Demos

{{"demo": "First.js"}}

Some text in between.

{{"demo": "Second.js"}}`;

      fs.writeFileSync(path.join(tempDir, 'First.js'), 'First component');
      fs.writeFileSync(path.join(tempDir, 'Second.js'), 'Second component');

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('First component');
      expect(result).to.include('Second component');
      expect(result.match(/```jsx/g)).to.have.lengthOf(2);
    });

    it('should return original match when demo file is not found', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});

      const markdown = `{{"demo": "NonExistent.js"}}`;

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.equal(markdown);
      expect(console.warn).toHaveBeenCalledWith('Demo file not found: NonExistent.js');
    });

    it('should handle demos with additional properties', () => {
      const markdown = `{{"demo": "Button.js", "defaultCodeOpen": false}}`;

      fs.writeFileSync(path.join(tempDir, 'Button.js'), 'Button code');

      const result = replaceDemoWithSnippet(markdown, path.join(tempDir, 'test.md'), {
        basePath: tempDir,
      });

      expect(result).to.include('```jsx');
      expect(result).to.include('Button code');
    });
  });

  describe('processMarkdownFile', () => {
    it('should process a markdown file correctly', async () => {
      const markdownPath = path.join(tempDir, 'test.md');
      const markdown = `# Test

{{"demo": "Demo.js"}}`;

      fs.writeFileSync(markdownPath, markdown);
      fs.writeFileSync(path.join(tempDir, 'Demo.js'), 'Demo content');

      const result = await processMarkdownFile(markdownPath);

      expect(result).to.include('```jsx');
      expect(result).to.include('Demo content');
    });

    it('should handle nested directory structures', async () => {
      const subDir = path.join(tempDir, 'components', 'buttons');
      fs.mkdirSync(subDir, { recursive: true });

      const markdownPath = path.join(subDir, 'buttons.md');
      const markdown = `{{"demo": "BasicButton.js"}}`;

      fs.writeFileSync(markdownPath, markdown);
      fs.writeFileSync(path.join(subDir, 'BasicButton.js'), 'Button component');

      const result = await processMarkdownFile(markdownPath);

      expect(result).to.include('Button component');
    });

    // Writes a two-file demo (entry `Button.tsx` importing helper `data.ts`)
    // referenced by `buttons.md`, and returns the markdown file path.
    function writeFileComponentDemo(): string {
      const demoDir = path.join(tempDir, 'demos', 'basic');
      fs.mkdirSync(demoDir, { recursive: true });
      fs.writeFileSync(path.join(demoDir, 'data.ts'), "export const label = 'Click';\n");
      fs.writeFileSync(
        path.join(demoDir, 'Button.tsx'),
        [
          "import { label } from './data';",
          '',
          'export default function Button() {',
          '  // @highlight',
          '  return label;',
          '}',
          '',
        ].join('\n'),
      );
      fs.writeFileSync(
        path.join(demoDir, 'index.ts'),
        [
          "import { createDemo } from '@mui/internal-core-docs/utils/createDemo';",
          "import Button from './Button';",
          '',
          'export default createDemo(import.meta.url, Button);',
          '',
        ].join('\n'),
      );

      const markdownPath = path.join(tempDir, 'buttons.md');
      fs.writeFileSync(
        markdownPath,
        '# Buttons\n\n{{"component": "file://./demos/basic/index.ts"}}\n',
      );
      return markdownPath;
    }

    it('should expand a `file://` demo to its entry file only, by default', async () => {
      const markdownPath = writeFileComponentDemo();

      const result = await processMarkdownFile(markdownPath);

      // Entry file shown; the marker is gone.
      expect(result).to.include('```tsx');
      expect(result).to.include('export default function Button()');
      expect(result).to.not.include('file://');
      // No filename comment and no extra files by default.
      expect(result).to.not.include('/* Button.tsx */');
      expect(result).to.not.include('/* data.ts */');
      expect(result).to.not.include('export const label');
      // Emphasis annotation comments are stripped from the source.
      expect(result).to.not.include('@highlight');
    });

    it('should include extra files with filename comments when includeExtraFiles is set', async () => {
      const markdownPath = writeFileComponentDemo();

      const result = await processMarkdownFile(markdownPath, { includeExtraFiles: true });

      expect(result).to.include('/* Button.tsx */');
      expect(result).to.include('/* data.ts */');
      expect(result).to.include("export const label = 'Click'");
      expect(result).to.not.include('@highlight');
    });
  });
});
