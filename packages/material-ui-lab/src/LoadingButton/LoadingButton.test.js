import * as React from 'react';
import { createClientRender, describeConformanceV5, screen } from 'test/utils';
import { expect } from 'chai';
import Button from '@material-ui/core/Button';
import LoadingButton, { loadingButtonClasses as classes } from '@material-ui/lab/LoadingButton';

describe('<LoadingButton />', () => {
  const render = createClientRender();

  describeConformanceV5(<LoadingButton>Conformance?</LoadingButton>, () => ({
    classes,
    inheritComponent: Button,
    render,
    muiName: 'MuiLoadingButton',
    testVariantProps: { loading: true },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('is in tab-order by default', () => {
    render(<LoadingButton />);

    expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('prop: classes can be appended to MuiButton', () => {
    render(<LoadingButton variant="outlined" classes={{ outlined: 'loading-button-outlined' }} />);
    const button = screen.getByRole('button');

    expect(button).to.have.class('MuiButton-outlined');
    expect(button).to.have.class('loading-button-outlined');
  });

  describe('prop: loading', () => {
    it('disables the button', () => {
      render(<LoadingButton loading />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('tabIndex', -1);
      expect(button).to.have.property('disabled', true);
    });

    it('cannot be enabled while `loading`', () => {
      render(<LoadingButton disabled={false} loading />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      render(<LoadingButton loadingIndicator="loading">Test</LoadingButton>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered before the children when `loading`', () => {
      render(
        <LoadingButton loadingIndicator="loading..." loading>
          Test
        </LoadingButton>,
      );

      expect(screen.getByRole('button')).to.have.text('loading...Test');
    });
  });
});
