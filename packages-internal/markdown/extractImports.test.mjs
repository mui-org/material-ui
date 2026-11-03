import { describe, it, expect } from 'vitest';
import extractImports from './extractImports.mjs';

describe('extractImports', () => {
  it('finds all imports', () => {
    const imports = extractImports(`
import {
  Component
} from '@angular2/core';
import defaultMember from "module-1";
import   *    as name from "module-2  ";
import   {  member }   from "  module-3";
import { member as alias } from "module-4";
import { member1 ,
member2 } from "module-5";
import { member1 , member2 as alias2 , member3 as alias3 } from "module-6";
import defaultMember, { member, member } from "module-7";
import defaultMember, * as name from "module-8";
import "module-9";
    import "module-10";
import * from './smdn';
import \${importName} from 'module11/\${importName}';
  `);

    expect(imports[0]).to.equal('@angular2/core');
    expect(imports[1]).to.equal('module-1');
    expect(imports[2]).to.equal('module-2');
    expect(imports[3]).to.equal('module-3');
    expect(imports[4]).to.equal('module-4');
    expect(imports[5]).to.equal('module-5');
    expect(imports[6]).to.equal('module-6');
    expect(imports[7]).to.equal('module-7');
    expect(imports[8]).to.equal('module-8');
    expect(imports[9]).to.equal('module-9');
    expect(imports[10]).to.equal('module-10');
    expect(imports[11]).to.equal('./smdn');
    expect(imports[12]).to.equal(undefined); // It's not a valid import
  });
});
