import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import BadgeUnstyled, {
  badgeUnstyledClasses as classes,
} from '@material-ui/unstyled/BadgeUnstyled';

describe('<BadgeUnstyled />', () => {
  const render = createClientRender();

  describeConformance(
    <BadgeUnstyled>
      <div />
    </BadgeUnstyled>,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
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

    render(<BadgeUnstyled components={{ Root }} />);

    expect(styleProps).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <BadgeUnstyled
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('styleProps')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
