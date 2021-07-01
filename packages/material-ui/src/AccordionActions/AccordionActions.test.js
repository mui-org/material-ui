import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@material-ui/core/AccordionActions';

describe('<AccordionActions />', () => {
  const render = createClientRender();

  describeConformanceV5(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
