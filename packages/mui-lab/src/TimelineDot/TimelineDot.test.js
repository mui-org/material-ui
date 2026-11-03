import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import TimelineDot, { timelineDotClasses as classes } from '@mui/lab/TimelineDot';
import describeConformance from '../../test/describeConformance';

describe('<TimelineDot />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineDot />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineDot',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { color: 'secondary', variant: 'outlined' },
    skip: ['componentProp'],
  }));

  it('should render with color inherit', () => {
    expect(() =>
      render(
        <React.Fragment>
          <TimelineDot color="inherit" />
          <TimelineDot variant="outlined" color="inherit" />
        </React.Fragment>,
      ),
    ).not.to.throw();
  });
});
