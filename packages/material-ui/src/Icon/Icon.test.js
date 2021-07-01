import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Icon, { iconClasses as classes } from '@material-ui/core/Icon';

describe('<Icon />', () => {
  const render = createClientRender();

  describeConformanceV5(<Icon>account_circle</Icon>, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiIcon',
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
    skip: ['themeVariants', 'componentsProp'],
  }));

  it('renders children by default', () => {
    const { getByTestId } = render(<Icon data-testid="root">account_circle</Icon>);

    expect(getByTestId('root')).to.have.text('account_circle');
  });

  describe('optional classes', () => {
    it('should render with the secondary color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="secondary">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="action">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="error">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" color="primary">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
    });

    it('should render without the default class', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" baseClassName="material-icons-round">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).not.to.have.class('material-icons');
    });

    it('should render with the supplied base class', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" baseClassName="material-icons-round">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class('material-icons-round');
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { getByTestId } = render(
        <Icon data-testid="root" fontSize="inherit">
          account_circle
        </Icon>,
      );

      expect(getByTestId('root')).to.have.class(classes.fontSizeInherit);
    });
  });
});
