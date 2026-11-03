import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { SandboxDependencies } from './Dependencies';

describe('Dependencies', () => {
  beforeAll(() => {
    process.env.SOURCE_CODE_REPO = 'https://github.com/mui/material-ui';
  });

  afterAll(() => {
    delete process.env.SOURCE_CODE_REPO;
  });

  const s1 = `
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import FooBar, { Qux } from '@foo-bar/bip';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl
`;

  it('should handle @ dependencies', () => {
    const { dependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'JS',
    });
    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      'prop-types': 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Draggable from 'react-draggable';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/material/styles';
const suggestions = [
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-draggable': 'latest',
    });
  });

  it('should support direct import', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider as MuiPickersLocalizationProvider, KeyboardTimePicker, KeyboardDatePicker } from '@mui/lab';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('should support import for side effect', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import '@mui/material/Grid';
import '@mui/material/styles';
import '@mui/lab/AdapterDateFns';
import '@mui/lab';
import 'exceljs';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@mui/lab': 'next',
      exceljs: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    const { dependencies, devDependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      typescript: 'latest',
    });

    expect(devDependencies).to.deep.equal({
      '@types/foo-bar__bip': 'latest',
      '@types/prop-types': 'latest',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
    });
  });

  it('should handle @types correctly', () => {
    const { dependencies, devDependencies } = SandboxDependencies({
      raw: `import utils from '../utils';`,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      typescript: 'latest',
    });

    expect(devDependencies).to.deep.equal({
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
    });
  });

  it('should handle multilines', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('can use codesandbox deploys if a commit is given', () => {
    const source = `
import * as Material from '@mui/material';
import * as IconsMaterial from '@mui/icons-material';
import * as Lab from '@mui/lab';
import * as System from '@mui/system';
import * as Utils from '@mui/utils';
    `;

    const { dependencies } = SandboxDependencies(
      {
        raw: source,
        codeVariant: 'JS',
      },
      { commitRef: '2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f' },
    );

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material':
        'https://pkg.pr.new/mui/material-ui/@mui/material@2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f',
      '@mui/icons-material':
        'https://pkg.pr.new/mui/material-ui/@mui/icons-material@2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f',
      '@mui/lab':
        'https://pkg.pr.new/mui/material-ui/@mui/lab@2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f',
      '@mui/system':
        'https://pkg.pr.new/mui/material-ui/@mui/system@2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f',
      '@mui/utils':
        'https://pkg.pr.new/mui/material-ui/@mui/utils@2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f',
    });
  });

  it('should generate correct Base UI dependencies', () => {
    const source = `import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import OutlinedInput from '@mui/material/OutlinedInput';
`;

    const { dependencies, devDependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      // #npm-tag-reference
      '@mui/material': 'next',
      '@base-ui/react': 'latest',
      typescript: 'latest',
    });
    expect(devDependencies).to.deep.equal({
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
    });
  });
});
