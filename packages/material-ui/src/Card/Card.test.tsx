import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Card, { cardClasses as classes } from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

describe('<Card />', () => {
  const render = createClientRender();

  describeConformanceV5(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    muiName: 'MuiCard',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { raised: true },
    skip: ['componentsProp'],
  }));

  it('when raised should render Paper with 8dp', () => {
    const { container } = render(
      <Card
        raised
        classes={{
          // @ts-expect-error unknown class that's also ignored at runtime
          elevation8: 'card-elevation-8',
        }}
      />,
    );
    expect(container.firstChild).to.have.class('MuiPaper-elevation8');
    expect(container.firstChild).not.to.have.class('card-elevation-8');
  });

  it('should support variant="outlined"', () => {
    const { container } = render(<Card variant="outlined" />);
    expect(container.firstChild).to.have.class('MuiPaper-outlined');
  });
});
