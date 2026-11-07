import { describe, it, expect } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import FormLabel, { formLabelClasses as classes } from '@mui/material/FormLabel';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import { createTheme, hexToRgb } from '@mui/material/styles';
import defaultTheme from '../styles/defaultTheme';
import describeConformance from '../../test/describeConformance';
import getOverlayAlpha from '../styles/getOverlayAlpha';
import { blend, contrastRatio, WCAG_MINIMUM_RATIO } from '../../test/contrast';
import { FAILING_PALETTE_COLORS, PALETTE_CONTRAST_COLORS } from '../../test/contrastContract';

describe('<FormLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<FormLabel />, () => ({
    classes,
    inheritComponent: 'label',
    render,
    refInstanceof: window.HTMLLabelElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormLabel',
    testVariantProps: { color: 'secondary' },
  }));

  describe('prop: required', () => {
    it('should visually show an asterisk but not include it in the a11y tree', () => {
      const { container } = render(<FormLabel required>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name\u2009*');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeInaccessible();
    });

    it('should not show an asterisk by default', () => {
      const { container } = render(<FormLabel>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(0);
    });
  });

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormLabel required error />);

      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelector(`.${classes.asterisk}`)).to.have.class(classes.error);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeInaccessible();
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    describe('error', () => {
      function Wrapper(props) {
        return <FormControl error {...props} />;
      }

      it(`should have the error class`, () => {
        const { container } = render(<FormLabel />, {
          wrapper: Wrapper,
        });

        expect(container.querySelector('label')).to.have.class(classes.error);
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(
          <FormLabel data-testid="FormLabel" error={false} />,
          {
            wrapper: Wrapper,
          },
        );

        expect(container.querySelector('label')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(container.querySelector('label')).to.have.class(classes.error);
      });
    });

    describe('focused', () => {
      const FormController = React.forwardRef((_, ref) => {
        const formControl = useFormControl();
        React.useImperativeHandle(ref, () => formControl, [formControl]);
        return null;
      });

      it(`should have the focused class`, () => {
        const formControlRef = React.createRef();
        const { container } = render(
          <FormControl error>
            <FormLabel data-testid="FormLabel" />
            <FormController ref={formControlRef} />
          </FormControl>,
        );

        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        act(() => {
          formControlRef.current.onFocus();
        });
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });

      it('should be overridden by props', () => {
        const formControlRef = React.createRef();
        function Wrapper({ children }) {
          return (
            <FormControl error>
              {children}
              <FormController ref={formControlRef} />
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };
        const { container, setProps } = render(<FormLabel data-testid="FormLabel" />, {
          wrapper: Wrapper,
        });
        act(() => {
          formControlRef.current.onFocus();
        });

        expect(container.querySelector('label')).to.have.class(classes.focused);

        setProps({ focused: false });
        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        setProps({ focused: true });
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });
    });

    describe('required', () => {
      it('should show an asterisk', () => {
        const { container } = render(
          <FormControl required>
            <FormLabel>name</FormLabel>
          </FormControl>,
        );

        expect(container).to.have.text('name\u2009*');
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(<FormLabel required={false}>name</FormLabel>, {
          wrapper: (props) => <FormControl required {...props} />,
        });

        expect(container).to.have.text('name');

        setProps({ required: true });
        expect(container).to.have.text('name\u2009*');
      });
    });
  });

  describe('prop: color', () => {
    it('should have color secondary class', () => {
      const { container } = render(<FormLabel color="secondary" />);
      expect(container.firstChild).to.have.class(classes.colorSecondary);
    });

    it('should have the focused class and style', () => {
      const { container } = render(<FormLabel data-testid="FormLabel" color="secondary" focused />);
      expect(container.querySelector(`.${classes.colorSecondary}`)).to.have.class(classes.focused);
      expect(screen.getByTestId('FormLabel')).toHaveComputedStyle({
        color: hexToRgb(defaultTheme.palette.secondary.main),
      });
    });

    it('should have the error class and style, even when focused', () => {
      const { container } = render(
        <FormLabel data-testid="FormLabel" color="secondary" focused error />,
      );
      expect(container.querySelector(`.${classes.colorSecondary}`)).to.have.class(classes.error);
      expect(screen.getByTestId('FormLabel')).toHaveComputedStyle({
        color: hexToRgb(defaultTheme.palette.error.main),
      });
    });

    it('should have the disabled class and style, even when focused', () => {
      const { container } = render(
        <FormLabel data-testid="FormLabel" color="secondary" focused disabled />,
      );
      expect(container.querySelector(`.${classes.colorSecondary}`)).to.have.class(classes.disabled);
      expect(screen.getByTestId('FormLabel')).toHaveComputedStyle({
        color: defaultTheme.palette.text.disabled,
      });
    });
  });

  describe('WCAG 2.2 conformance', () => {
    describe('1.3.1 Info and Relationships', () => {
      it('renders a legend element that names the fieldset group', () => {
        render(
          <FormControl component="fieldset">
            <FormLabel component="legend">Notification method</FormLabel>
            <input type="radio" name="method" aria-label="Email" />
          </FormControl>,
        );

        const group = screen.getByRole('group');
        const legend = screen.getByText('Notification method');
        expect(legend).to.have.tagName('legend');
        expect(legend.parentElement).to.equal(group);
        expect(group).toHaveAccessibleName('Notification method');
      });

      it('forwards htmlFor as the for attribute of the label', () => {
        render(
          <React.Fragment>
            <FormLabel htmlFor="full-name">Full name</FormLabel>
            <input id="full-name" />
          </React.Fragment>,
        );

        const label = screen.getByText('Full name');
        expect(label).to.have.tagName('label');
        expect(label).to.have.attribute('for', 'full-name');
        expect(screen.getByRole('textbox')).toHaveAccessibleName('Full name');
      });

      it('does not pass the required state to a Checkbox (documented gap)', () => {
        render(
          <FormControl component="fieldset" required>
            <FormLabel component="legend">Terms</FormLabel>
            <Checkbox slotProps={{ input: { 'aria-label': 'Accept' } }} />
          </FormControl>,
        );

        // When this fails, the gap is fixed: update FormLabel/accessibility.md and knownGaps.json.
        expect(screen.getByRole('checkbox')).not.to.have.attribute('required');
      });
    });

    describe('1.4.3 Contrast (Minimum)', () => {
      it('focused labels fall short of 4.5:1 only in the documented palette colors', () => {
        const theme = createTheme();
        render(
          <React.Fragment>
            {PALETTE_CONTRAST_COLORS.map((color) => (
              <FormLabel key={color} color={color} focused>
                {color}
              </FormLabel>
            ))}
          </React.Fragment>,
        );

        // A focused label is `main` on the page background.
        const failing = PALETTE_CONTRAST_COLORS.filter((color) => {
          const { color: textColor } = window.getComputedStyle(screen.getByText(color));
          return (
            contrastRatio(textColor, theme.palette.background.default) <
            WCAG_MINIMUM_RATIO.normalText
          );
        });
        expect(failing).to.deep.equal([...FAILING_PALETTE_COLORS]);
      });

      it('the dark-mode error label falls short of 4.5:1 on a Paper with elevation 2 or more', () => {
        const theme = createTheme({ palette: { mode: 'dark' } });
        const ratios = [2, 24].map((elevation) =>
          contrastRatio(
            theme.palette.error.main,
            blend('#fff', getOverlayAlpha(elevation), theme.palette.background.paper),
          ),
        );

        // When this fails, the gap is fixed: update FormLabel/accessibility.md and knownGaps.json.
        ratios.forEach((ratio) => {
          expect(ratio).to.be.lessThan(WCAG_MINIMUM_RATIO.normalText);
        });
      });
    });

    it('2.5.3 Label in Name: the accessible name of the field is the visible label', () => {
      const { container } = render(
        <FormControl required>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <input id="email" />
        </FormControl>,
      );

      // The hidden asterisk adds nothing to the name.
      expect(container.querySelector(`.${classes.asterisk}`)).to.have.attribute(
        'aria-hidden',
        'true',
      );
      expect(screen.getByRole('textbox')).toHaveAccessibleName('Email address');
    });

    describe('3.3.2 Labels or Instructions', () => {
      it('shows the asterisk, and an Input inside the FormControl gets the required state', () => {
        const { container } = render(
          <FormControl required>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <Input id="name" />
          </FormControl>,
        );

        expect(container.querySelector(`.${classes.asterisk}`)).not.to.equal(null);
        expect(screen.getByRole('textbox')).to.have.attribute('required');
      });
    });
  });
});
