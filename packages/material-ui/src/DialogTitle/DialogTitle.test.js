import * as React from 'react';
import { describeConformanceV5, createClientRender } from 'test/utils';
import DialogTitle, { dialogTitleClasses as classes } from '@material-ui/core/DialogTitle';

describe('<DialogTitle />', () => {
  const render = createClientRender();

  describeConformanceV5(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: 'h2',
    render,
    muiName: 'MuiDialogTitle',
    refInstanceof: window.HTMLHeadingElement,
    testVariantProps: { 'data-color': 'red' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render JSX children', () => {
    const children = <span data-testid="test-children" />;
    const { getByTestId } = render(<DialogTitle>{children}</DialogTitle>);

    getByTestId('test-children');
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const { getByText } = render(<DialogTitle>{children}</DialogTitle>);

    getByText('Hello');
  });
});
