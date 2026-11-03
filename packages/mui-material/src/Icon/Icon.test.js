import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Icon, { iconClasses as classes } from '@mui/material/Icon';
import describeConformance from '../../test/describeConformance';

describe('<Icon />', () => {
  const { render } = createRenderer();

  describeConformance(<Icon>account_circle</Icon>, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiIcon',
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
    skip: ['themeVariants'],
  }));

  it('renders children by default', () => {
    render(<Icon data-testid="root">account_circle</Icon>);

    expect(screen.getByTestId('root')).to.have.text('account_circle');
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      render(
        <Icon data-testid="root" color="secondary">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      render(
        <Icon data-testid="root" color="action">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      render(
        <Icon data-testid="root" color="error">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      render(
        <Icon data-testid="root" color="primary">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.colorPrimary);
    });

    it('should render without the default class', () => {
      render(
        <Icon data-testid="root" baseClassName="material-icons-round">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).not.to.have.class('material-icons');
    });

    it('should render with the supplied base class', () => {
      render(
        <Icon data-testid="root" baseClassName="material-icons-round">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class('material-icons-round');
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      render(
        <Icon data-testid="root" fontSize="inherit">
          account_circle
        </Icon>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.fontSizeInherit);
    });
  });
});
