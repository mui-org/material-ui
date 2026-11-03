import { describe, it, expect } from 'vitest';
import findComponentJSX from './findComponentJSX';
import { jscodeshift } from '../../testUtils';

describe('@mui/codemod', () => {
  describe('utils', () => {
    describe('findComponentJSX', () => {
      it('should find all the JSXElements of a given component name', () => {
        const j = jscodeshift;
        const root = j(`
          import { Accordion } from '@mui/material'; // ✅
          import Accordion2 from '@mui/material/Accordion'; // ✅
          import Accordion3 from '@mui/material/Accordion3'; // ❌
          <Accordion />;
          <Accordion2 />;
          <Accordion3 />;
        `);

        const componentName = 'Accordion';
        const foundElements = [];
        findComponentJSX(j, { root, componentName }, (path) => {
          foundElements.push(path);
        });

        expect(foundElements.length).to.equal(2);
      });

      it('should find with custom package name', () => {
        const j = jscodeshift;
        const root = j(`
          import { Accordion } from '@org/ui/material'; // ✅
          import Accordion2 from '@org/ui/material/Accordion'; // ✅
          import Accordion3 from '@org/ui/material/Accordion3'; // ❌
          <Accordion />;
          <Accordion2 />;
          <Accordion3 />;
        `);

        const componentName = 'Accordion';
        const foundElements = [];
        findComponentJSX(j, { root, componentName, packageName: '@org/ui/material' }, (path) => {
          foundElements.push(path);
        });

        expect(foundElements.length).to.equal(2);
      });
    });
  });
});
