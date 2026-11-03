import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Card, { cardClasses as classes } from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import describeConformance from '../../test/describeConformance';

describe('<Card />', () => {
  const { render } = createRenderer();

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    muiName: 'MuiCard',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { raised: true },
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
