import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import FormGroup, { formGroupClasses as classes } from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
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
});
