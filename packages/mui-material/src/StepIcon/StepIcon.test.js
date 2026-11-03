import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import StepIcon, { stepIconClasses as classes } from '@mui/material/StepIcon';
import SvgIcon from '@mui/material/SvgIcon';
import describeConformance from '../../test/describeConformance';

describe('<StepIcon />', () => {
  const { render } = createRenderer();

  describeConformance(<StepIcon icon={1} />, () => ({
    classes,
    inheritComponent: SvgIcon,
    render,
    muiName: 'MuiStepIcon',
    testVariantProps: { completed: true },
    refInstanceof: window.SVGSVGElement,
    skip: ['componentProp'],
  }));

  it('renders <CheckCircle> when completed', () => {
    render(<StepIcon completed icon={1} />);

    expect(screen.getAllByTestId('CheckCircleIcon')).to.have.length(1);
  });

  it('renders <Warning> when error occurred', () => {
    render(<StepIcon icon={1} error />);
    expect(screen.getAllByTestId('WarningIcon')).to.have.length(1);
  });

  it('contains text "3" when position is "3"', () => {
    render(<StepIcon icon={3} />);
    expect(screen.queryByText('3')).not.to.equal(null);
  });

  it('renders the custom icon', () => {
    const { container } = render(<StepIcon icon={<span className="my-icon" />} />);
    expect(container.querySelectorAll('.my-icon')).to.have.length(1);
  });
});
