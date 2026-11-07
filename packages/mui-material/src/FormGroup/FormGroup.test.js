import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, within, isJsdom } from '@mui/internal-test-utils';
import FormGroup, { formGroupClasses as classes } from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import describeConformance from '../../test/describeConformance';

describe('<FormGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<FormGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiFormGroup',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { row: true },
    skip: ['componentProp'],
  }));

  it('should render a div with a div child', () => {
    render(
      <FormGroup>
        <div data-testid="test-children" />
      </FormGroup>,
    );

    expect(screen.queryByTestId('test-children')).not.to.equal(null);
  });

  describe('with FormControl', () => {
    describe('error', () => {
      it(`should have the error class`, () => {
        render(
          <FormControl error>
            <FormGroup data-testid="FormGroup">
              <div />
            </FormGroup>
          </FormControl>,
        );

        expect(screen.getByTestId('FormGroup')).to.have.class(classes.error);
      });
    });
  });

  describe('accessibility', () => {
    it('renders no role of its own', () => {
      const { container } = render(
        <FormGroup>
          <input type="checkbox" aria-label="Cheese" />
        </FormGroup>,
      );

      expect(container.firstChild).not.to.have.attribute('role');
      expect(screen.queryByRole('group')).to.equal(null);
    });

    it('gets its group name from a fieldset legend', () => {
      render(
        <FormControl component="fieldset">
          <FormLabel component="legend">Toppings</FormLabel>
          <FormGroup>
            <input type="checkbox" aria-label="Cheese" />
          </FormGroup>
        </FormControl>,
      );

      const group = screen.getByRole('group', { name: 'Toppings' });
      expect(within(group).getByRole('checkbox', { name: 'Cheese' })).not.to.equal(null);
    });

    it('makes the controls of a row group tab stops in DOM order', async () => {
      const { user } = render(
        <FormGroup row>
          <input type="checkbox" aria-label="Email" />
          <input type="checkbox" aria-label="Push" />
          <input type="checkbox" aria-label="Text message" />
        </FormGroup>,
      );

      for (const name of ['Email', 'Push', 'Text message']) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab();
        expect(screen.getByRole('checkbox', { name })).toHaveFocus();
      }
    });
  });

  describe('WCAG 2.2 conformance', () => {
    it('1.3.1 Info and Relationships: becomes a named group with role="group" and aria-labelledby', () => {
      render(
        <React.Fragment>
          <span id="share">Share with</span>
          <FormGroup role="group" aria-labelledby="share">
            <input type="checkbox" aria-label="Team" />
          </FormGroup>
        </React.Fragment>,
      );

      expect(screen.getByRole('group')).toHaveAccessibleName('Share with');
    });

    // JSDOM has no layout
    it.skipIf(isJsdom())(
      '2.4.3 Focus Order: a row group shows its controls from left to right in tab order',
      async () => {
        const { user } = render(
          <FormGroup row>
            <input type="checkbox" aria-label="Email" />
            <input type="checkbox" aria-label="Push" />
            <input type="checkbox" aria-label="Text message" />
          </FormGroup>,
        );

        let previousLeft = -Infinity;
        for (const name of ['Email', 'Push', 'Text message']) {
          // eslint-disable-next-line no-await-in-loop
          await user.tab();
          const checkbox = screen.getByRole('checkbox', { name });
          expect(checkbox).toHaveFocus();
          const { left } = checkbox.getBoundingClientRect();
          expect(left).to.be.above(previousLeft);
          previousLeft = left;
        }
      },
    );
  });
});
