import * as React from 'react';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { act, describeConformanceV5, createClientRender, fireEvent, screen } from 'test/utils';
import Rating, { ratingClasses as classes } from '@material-ui/core/Rating';

describe('<Rating />', () => {
  const render = createClientRender();

  describeConformanceV5(<Rating />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiRating',
    testVariantProps: { variant: 'foo' },
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render', () => {
    const { container } = render(<Rating />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should round the value to the provided precision', () => {
    const { container } = render(<Rating name="rating-test" value={3.9} precision={0.2} />);

    expect(container.querySelector('input[name="rating-test"]:checked')).to.have.property(
      'value',
      '4',
    );
  });

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating />);
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      left: 0,
      right: 100,
    }));
    stub(container.firstChild.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 20,
    }));
    fireEvent.mouseMove(container.firstChild, {
      clientX: 19,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);
    fireEvent.mouseMove(container.firstChild, {
      clientX: 21,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);
  });

  it('should clear the rating', () => {
    const handleChange = spy();
    const { container } = render(<Rating name="rating-test" onChange={handleChange} value={2} />);

    fireEvent.click(container.querySelector('input[name="rating-test"][value="2"]'), {
      clientX: 1,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(null);
  });

  it('should select the rating', () => {
    const handleChange = spy();
    const { container } = render(<Rating name="rating-test" onChange={handleChange} value={2} />);
    fireEvent.click(container.querySelector('input[name="rating-test"][value="3"]'));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(3);
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('should change the value to null', () => {
    const handleChange = spy();
    render(<Rating name="rating-test" onChange={handleChange} value={2} />);
    fireEvent.click(document.querySelector('#rating-test-empty'));
    expect(handleChange.args[0][1]).to.equal(null);
  });

  it('should select the empty input if value is null', () => {
    const { container } = render(<Rating name="rating-test" value={null} />);
    const input = container.querySelector('#rating-test-empty');
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('');
  });

  it('should support a defaultValue', () => {
    const { container } = render(<Rating defaultValue={3} name="rating-test" />);
    let checked;
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('3');

    fireEvent.click(container.querySelector('input[name="rating-test"][value="2"]'));
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('has a customization point for the label of the empty value when it is active', () => {
    const { container } = render(
      <Rating classes={{ labelEmptyValueActive: 'customized' }} name="" value={null} />,
    );

    expect(container.querySelector('.customized')).to.equal(null);

    act(() => {
      const noValueRadio = screen.getAllByRole('radio').find((radio) => {
        return radio.checked;
      });

      noValueRadio.focus();
    });

    expect(container.querySelector('.customized')).to.have.tagName('label');
  });

  describe('prop: readOnly', () => {
    it('renders a role="img"', () => {
      render(<Rating readOnly value={2} />);

      expect(screen.getByRole('img')).toHaveAccessibleName('2 Stars');
    });

    it('can be labelled with getLabelText', () => {
      render(<Rating getLabelText={(value) => `Stars: ${value}`} readOnly value={2} />);

      expect(screen.getByRole('img')).toHaveAccessibleName('Stars: 2');
    });
  });

  describe('<form> integration', () => {
    before(function beforeHook() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM has issues with form validation for certain elements.
        // We could adress them individually but that doesn't add much value if we already have a working environment.
        this.skip();
      }
    });

    [
      {
        ratingProps: { name: 'rating', defaultValue: 2 },
        formData: [['rating', '2']],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, disabled: true },
        formData: [],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, readOnly: true },
        // native <input type="radio" /> and our Radio/Checkbox don't implement readOnly as well
        formData: [],
      },
      {
        ratingProps: { name: 'rating', required: true },
        // FIXME: `Rating` does not implement `required`.
        //        Native <input type="radio" /> would not pass validation
        // formData: undefined,
        formData: [['rating', '']],
      },
    ].forEach((testData, testNumber) => {
      it(`submits the expected form data #${testNumber + 1}`, () => {
        /**
         * @type FormData
         */
        let data;
        const handleSubmit = spy((event) => {
          // Prevent navigation
          event.preventDefault();
          // populate FormData with the submitted form
          data = new FormData(event.target);
        });
        render(
          <form onSubmit={handleSubmit}>
            <Rating {...testData.ratingProps} />
            <button type="submit" />
          </form>,
        );
        const submitter = document.querySelector('button[type="submit"]');

        act(() => {
          // form.submit() would not run form validation
          submitter.click();
        });

        if (testData.formData === undefined) {
          expect(handleSubmit.callCount).to.equal(0);
        } else {
          expect(Array.from(data.entries())).to.deep.equal(testData.formData);
        }
      });
    });
  });
});
