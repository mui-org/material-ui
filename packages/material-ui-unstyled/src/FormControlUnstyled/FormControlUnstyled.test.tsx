import * as React from 'react';
import { createMount, createClientRender, describeConformanceUnstyled } from 'test/utils';
import FormControlUnstyled, {
  formControlUnstyledClasses,
} from '@material-ui/unstyled/FormControlUnstyled';

describe('<FormControlUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceUnstyled(<FormControlUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormControl',
    slots: {
      root: {
        expectedClassName: formControlUnstyledClasses.root,
      },
    },
  }));
});
