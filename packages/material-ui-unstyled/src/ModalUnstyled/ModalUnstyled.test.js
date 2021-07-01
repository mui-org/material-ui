import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import ModalUnstyled, {
  modalUnstyledClasses as classes,
} from '@material-ui/unstyled/ModalUnstyled';

describe('<ModalUnstyled />', () => {
  const render = createClientRender();
  let savedBodyStyle;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
  });

  describeConformanceV5(
    <ModalUnstyled open>
      <div />
    </ModalUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'rootClass', // portal, can't determin the root
        'themeDefaultProps', // unstyled
        'themeStyleOverrides', // unstyled
        'themeVariants', // unstyled
        'reactTestRenderer', // portal https://github.com/facebook/react/issues/11565
      ],
    }),
  );

  it('forwards style props on the Root component', () => {
    let styleProps = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ styleProps: stylePropsProp, theme: themeProp, ...other }, ref) => {
        styleProps = stylePropsProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
      },
    );

    render(
      <ModalUnstyled open components={{ Root }}>
        <div />
      </ModalUnstyled>,
    );

    expect(styleProps).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <ModalUnstyled
        open
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      >
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('styleProps')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
