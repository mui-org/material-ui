import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import FormControlLabel, {
  formControlLabelClasses as classes,
} from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

describe('<FormControlLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<FormControlLabel label="Pizza" control={<Checkbox />} />, () => ({
    classes,
    inheritComponent: 'label',
    render,
    muiName: 'MuiFormControlLabel',
    testVariantProps: { disabled: true },
    refInstanceof: window.HTMLLabelElement,
    slots: {
      typography: { expectedClassName: classes.label },
    },
    skip: ['componentProp'],
  }));

  describe('prop: label', () => {
    it('should render the label text inside an additional element', () => {
      const { container } = render(<FormControlLabel label="Pizza" control={<div />} />);
      const root = container.firstChild;

      expect(root).to.have.property('nodeName', 'LABEL');
      expect(root).to.have.class(classes.root);
      expect(screen.getByText(/Pizza/)).not.to.have.class(classes.root);
      expect(screen.getByText(/Pizza/)).to.have.class(classes.label);
    });

    it('should render numeric labels', () => {
      render(<FormControlLabel label={5} control={<div />} />);

      expect(screen.getByText(/5/)).not.to.equal(null);
    });

    it('should render node labels', () => {
      render(<FormControlLabel label={<p>Pizza</p>} control={<div />} />);

      expect(screen.getByText(/Pizza/)).not.to.equal(null);
      expect(screen.getByText(/Pizza/).tagName).to.equal('P');
    });

    it('should render fragment labels', () => {
      render(
        <FormControlLabel
          label={
            <React.Fragment>
              <strong>Delicious</strong>
              <p>Pizza</p>
            </React.Fragment>
          }
          control={<div />}
        />,
      );

      expect(screen.getByText(/Pizza/)).not.to.equal(null);
      expect(screen.getByText(/Pizza/).tagName).to.equal('P');
    });

    it('should render with nullish labels', () => {
      render(
        <React.Fragment>
          <FormControlLabel
            data-testid="undefined-form-label"
            control={<div data-testid="undefined-control" />}
          />
          <FormControlLabel
            data-testid="null-form-label"
            label={null}
            control={<div data-testid="null-control" />}
          />
        </React.Fragment>,
      );

      expect(screen.getByTestId('undefined-form-label')).not.to.equal(null);
      expect(screen.getByTestId('undefined-control')).not.to.equal(null);

      expect(screen.getByTestId('null-form-label')).not.to.equal(null);
      expect(screen.getByTestId('null-control')).not.to.equal(null);
    });
  });

  describe('prop: disabled', () => {
    it('should disable everything 1', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" disabled control={<div data-testid="control" />} />,
      );
      const root = container.firstChild;
      const control = screen.getByTestId('control');
      const label = screen.getByText(/Pizza/);

      expect(root).to.have.class(classes.disabled);
      expect(control).to.have.attribute('disabled');
      expect(label).to.have.class(classes.disabled);
    });

    it('should disable everything 2', () => {
      const { container } = render(
        <FormControlLabel
          label="Pizza"
          disabled
          control={<div data-testid="control" disabled />}
        />,
      );
      const root = container.firstChild;
      const control = screen.getByTestId('control');
      const label = screen.getByText(/Pizza/);

      expect(root).to.have.class(classes.disabled);
      expect(control).to.have.attribute('disabled');
      expect(label).to.have.class(classes.disabled);
    });
  });

  describe('prop: labelPlacement', () => {
    it('should have the `start` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="start" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementStart);
    });

    it('should have the `end` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="end" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementEnd);
    });

    it('should have the `end` class by default', () => {
      const { container } = render(<FormControlLabel label="Pizza" control={<div />} />);

      expect(container.firstChild).to.have.class(classes.labelPlacementEnd);
    });

    it('should have the `top` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="top" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementTop);
    });

    it('should have the `bottom` class', () => {
      const { container } = render(
        <FormControlLabel label="Pizza" labelPlacement="bottom" control={<div />} />,
      );

      expect(container.firstChild).to.have.class(classes.labelPlacementBottom);
    });
  });

  describe('prop: disableTypography', () => {
    it('should not add a typography component', () => {
      render(
        <FormControlLabel
          label={<div name="test">Pizza</div>}
          disableTypography
          data-testid="FormControlLabel"
          control={<div />}
        />,
      );

      expect(screen.getByTestId('FormControlLabel').children[1]).to.have.attribute('name', 'test');
    });

    it('should auto disable when passed a Typography component', () => {
      render(
        <FormControlLabel
          label={<Typography name="test">Pizza</Typography>}
          data-testid="FormControlLabel"
          control={<div />}
        />,
      );

      expect(screen.getByTestId('FormControlLabel').children[1]).to.have.attribute('name', 'test');
    });
  });

  describe('prop: required', () => {
    it('should visually show an asterisk but not include it in the a11y tree', () => {
      const { container } = render(<FormControlLabel required label="Pizza" control={<div />} />);

      expect(container.querySelector('label')).to.have.text('Pizza\u2009*');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelector(`.${classes.asterisk}`)).toBeInaccessible();
    });

    it('should not show an asterisk by default', () => {
      const { container } = render(<FormControlLabel label="Pizza" control={<div />} />);

      expect(container.querySelector('label')).to.have.text('Pizza');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(0);
    });
  });

  describe('slotProps: typography', () => {
    it('should spread its contents to the typography element', () => {
      render(
        <FormControlLabel
          label="Pizza"
          slotProps={{
            typography: {
              'data-testid': 'labelTypography',
              name: 'test',
            },
          }}
          control={<div />}
        />,
      );

      expect(screen.getByTestId('labelTypography')).to.have.attribute('name', 'test');
    });
  });

  describe('with FormControl', () => {
    describe('error', () => {
      it('should have the error class', () => {
        render(
          <FormControl error>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).to.have.class(classes.error);
      });
    });

    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).not.to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              disabled
              label="Pizza"
            />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).to.have.class(classes.disabled);
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).to.have.class(classes.disabled);
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              disabled={false}
              label="Pizza"
            />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).not.to.have.class(classes.disabled);
      });
    });

    describe('required', () => {
      it('should not have the required class', () => {
        render(
          <FormControl required>
            <FormControlLabel data-testid="FormControlLabel" control={<div />} label="Pizza" />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).not.to.have.class(classes.required);
      });

      it('should be overridden by props', () => {
        render(
          <FormControl required>
            <FormControlLabel
              data-testid="FormControlLabel"
              control={<div />}
              required
              label="Pizza"
            />
          </FormControl>,
        );

        expect(screen.getByTestId('FormControlLabel')).to.have.class(classes.required);
      });

      it('should not have the required attribute', () => {
        const { container } = render(
          <FormControl required>
            <FormControlLabel data-testid="FormControlLabel" control={<input />} label="Pizza" />
          </FormControl>,
        );
        const input = container.querySelector('input');
        expect(input).to.have.property('required', false);
      });
    });
  });

  it('should not inject extra props', () => {
    function Control(props) {
      return <div data-testid="control" name="Dave" {...props} />;
    }
    render(<FormControlLabel label="Pizza" control={<Control />} />);

    expect(screen.getByTestId('control')).to.have.attribute('name', 'Dave');
  });

  it('should forward some props', () => {
    render(<FormControlLabel value="test" label="Pizza" control={<div data-testid="control" />} />);

    expect(screen.getByTestId('control')).to.have.attribute('value', 'test');
  });

  // Deterministic checks for the WCAG success criteria the FormControlLabel
  // report rates as the label's own. See ./accessibility.md.
  describe('WCAG 2.2 conformance', () => {
    it('1.3.1 Info and Relationships: associates the control with its label by wrapping it', () => {
      const { container } = render(
        <FormControlLabel control={<Checkbox />} label="Email notifications" />,
      );
      const label = container.firstChild;

      expect(label).to.have.tagName('label');
      expect(label).to.contain(screen.getByRole('checkbox'));
      expect(label).to.contain(screen.getByText('Email notifications'));
    });

    it('2.5.3 Label in Name: a Checkbox exposes the visible label as its accessible name', () => {
      render(<FormControlLabel control={<Checkbox />} label="Email notifications" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('checkbox', { name: 'Email notifications' })).not.to.equal(null);
    });

    it('2.5.3 Label in Name: a Radio exposes the visible label as its accessible name', () => {
      render(<FormControlLabel control={<Radio />} value="standard" label="Standard shipping" />);

      expect(screen.getByRole('radio', { name: 'Standard shipping' })).not.to.equal(null);
    });

    it('2.5.3 Label in Name: a Switch exposes the visible label as its accessible name', () => {
      render(<FormControlLabel control={<Switch />} label="Dark mode" />);

      expect(screen.getByRole('switch', { name: 'Dark mode' })).not.to.equal(null);
    });

    describe('4.1.2 Name, Role, Value', () => {
      it('exposes the control role with the label as its accessible name', () => {
        render(<FormControlLabel control={<Checkbox />} label="Subscribe" />);

        expect(screen.getByRole('checkbox', { name: 'Subscribe' })).to.have.property(
          'checked',
          false,
        );
      });

      it('forwards required to the control without adding the asterisk to the name', () => {
        const { container } = render(
          <FormControlLabel required control={<Checkbox />} label="Accept the terms" />,
        );
        const checkbox = screen.getByRole('checkbox', { name: 'Accept the terms' });

        expect(checkbox).to.have.property('required', true);
        // The visible text carries the asterisk, but the control's name does not.
        expect(container.querySelector('label')).to.have.text('Accept the terms\u2009*');
      });
    });

    it('toggles the wrapped control when the label text is clicked', async () => {
      const { user } = render(
        <FormControlLabel control={<Checkbox />} label="Email notifications" />,
      );
      const checkbox = screen.getByRole('checkbox', { name: 'Email notifications' });
      expect(checkbox).to.have.property('checked', false);

      await user.click(screen.getByText('Email notifications'));
      expect(checkbox).to.have.property('checked', true);
    });

    it('2.5.2 Pointer Cancellation: a press on the label text does not toggle the control', async () => {
      const { user } = render(
        <React.Fragment>
          <FormControlLabel control={<Checkbox />} label="Email notifications" />
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const checkbox = screen.getByRole('checkbox', { name: 'Email notifications' });
      const labelText = screen.getByText('Email notifications');

      // The label is part of the target. Nothing toggles on the down event, and
      // releasing away from the label cancels. A click activates on pointer up.
      await user.pointer([
        { keys: '[MouseLeft>]', target: labelText },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(checkbox).to.have.property('checked', false);

      await user.click(labelText);
      expect(checkbox).to.have.property('checked', true);
    });

    it('1.3.2 Meaningful Sequence: keeps the control before the label in the DOM for every labelPlacement', () => {
      ['end', 'start', 'top', 'bottom'].forEach((labelPlacement) => {
        const { container, unmount } = render(
          <FormControlLabel
            control={<Checkbox />}
            label="Email notifications"
            labelPlacement={labelPlacement}
          />,
        );
        const input = container.querySelector('input');
        const labelText = screen.getByText('Email notifications');

        // DOM order is control then label regardless of the visual placement.
        // The control and the label are in separate subtrees, so the position
        // is exactly DOCUMENT_POSITION_FOLLOWING when the label comes after it.
        expect(input.compareDocumentPosition(labelText)).to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
        unmount();
      });
    });
  });
});
