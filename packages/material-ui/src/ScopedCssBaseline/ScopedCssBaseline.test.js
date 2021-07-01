import * as React from 'react';
import { describeConformanceV5, createClientRender } from 'test/utils';
import ScopedCssBaseline, {
  scopedCssBaselineClasses as classes,
} from '@material-ui/core/ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const render = createClientRender();

  describeConformanceV5(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiScopedCssBaseline',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp', 'themeVariants'],
  }));
});
