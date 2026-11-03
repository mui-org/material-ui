import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import CardActionArea, { cardActionAreaClasses as classes } from '@mui/material/CardActionArea';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

const CustomButtonBase = React.forwardRef(({ focusVisibleClassName, ...props }, ref) => {
  return <ButtonBase {...props} ref={ref} />;
});

describe('<CardActionArea />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActionArea />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCardActionArea',
    testDeepOverrides: { slotName: 'focusHighlight', slotClassName: classes.focusHighlight },
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomButtonBase,
      },
      focusHighlight: {
        expectedClassName: classes.focusHighlight,
      },
    },
  }));

  it('should not forward root ref to the focusHighlight slot', () => {
    const ref = React.createRef();

    const { container } = render(<CardActionArea ref={ref}>Content</CardActionArea>);

    const focusHighlight = container.querySelector(`.${classes.focusHighlight}`);

    expect(ref.current).not.equal(focusHighlight);
  });

  it('forwards nativeButton={false} through useSlot to ButtonBase', () => {
    const CustomSpan = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <CardActionArea component={CustomSpan} nativeButton={false}>
        Content
      </CardActionArea>,
    );

    expect(container.firstChild).to.have.tagName('SPAN');
    expect(container.firstChild).to.have.attribute('role', 'button');
    expect(container.firstChild).not.to.have.attribute('type');

    // Proves nativeButton={false} was forwarded — without it, ButtonBase
    // would warn about a non-button host with nativeButton omitted.
    expect(errorSpy.mock.calls.length).to.equal(0);
    errorSpy.mockRestore();
  });
});
