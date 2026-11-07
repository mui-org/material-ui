import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Tooltip from '@mui/material/Tooltip';
import { touchRippleClasses } from '@mui/material/ButtonBase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import type { Menu2ItemProps } from '@mui/material/Unstable_Menu2Item';
import Menu2Item, { menu2ItemClasses as classes } from '@mui/material/Unstable_Menu2Item';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Item />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Item>Item</Menu2Item>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'slotsProp'],
    muiName: 'MuiMenu2Item',
    testVariantProps: { dense: true },
  }));

  it('forwards DOM props and refs to a custom render element without internal props', async () => {
    let received: string[] = [];
    const rootRef = React.createRef<HTMLElement>();
    const renderRef = React.createRef<HTMLDivElement>();
    const CustomRoot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
      function CustomRoot(props, ref) {
        received = Object.keys(props);
        return <div ref={ref} {...props} />;
      },
    );

    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item ref={rootRef} render={<CustomRoot ref={renderRef} data-custom="value" />}>
            Item
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const item = await screen.findByRole('menuitem', { name: 'Item' });
    expect(rootRef.current).to.equal(item);
    expect(renderRef.current).to.equal(item);
    expect(item).to.have.attribute('data-custom', 'value');
    expect(received).to.include('className');
    expect(received).not.to.include('disableRipple');
    expect(received).not.to.include('nativeButton');
    expect(received).not.to.include('ownerState');
    expect(received).not.to.include('sx');
    expect(received).not.to.include('internalRender');
    expect(received).not.to.include('internalRenderState');
  });

  it('keeps Material styles, theme overrides, and sx on a rendered element', () => {
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiMenu2Item: {
          styleOverrides: { root: { paddingTop: '21px' } },
          variants: [{ props: { dense: true }, style: { paddingBottom: '19px' } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item
              dense
              className="external-item"
              render={<li className="custom-item" />}
              sx={[false, (t) => ({ paddingLeft: t.spacing(3) })]}
            >
              Item
            </Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    const item = screen.getByRole('menuitem', { name: 'Item' });
    expect(item.tagName).to.equal('LI');
    expect(item).to.have.class(classes.root);
    expect(item).to.have.class(classes.dense);
    expect(item).to.have.class('MuiButtonBase-root');
    expect(item).to.have.class('custom-item');
    expect(item).to.have.class('external-item');
    expect(item).not.to.have.attribute('sx');
    const styles = getComputedStyle(item);
    expect(styles.display).to.equal('flex');
    expect(styles.paddingTop).to.equal('21px');
    expect(styles.paddingBottom).to.equal('19px');
    expect(styles.paddingLeft).to.equal('30px');
  });

  it.skipIf(isJsdom())('updates render state without replacing the focused item', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup transitionDuration={0} slotProps={{ list: { dense: true } }}>
          <Menu2Item>Before</Menu2Item>
          <Menu2Item
            divider
            disableGutters
            render={(props, state) => (
              <div
                {...props}
                data-render-highlighted={String(state.highlighted)}
                data-render-disabled={String(state.disabled)}
                data-render-dense={String(state.dense)}
                data-render-divider={String(state.divider)}
                data-render-gutters={String(state.disableGutters)}
              />
            )}
          >
            Item
          </Menu2Item>
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const item = await screen.findByRole('menuitem', { name: 'Item' });
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
    expect(item).to.have.attribute('data-render-highlighted', 'false');
    expect(item).to.have.attribute('data-render-disabled', 'false');
    expect(item).to.have.attribute('data-render-dense', 'true');
    expect(item).to.have.attribute('data-render-divider', 'true');
    expect(item).to.have.attribute('data-render-gutters', 'true');

    await user.keyboard('{ArrowDown}{ArrowDown}');
    await waitFor(() => expect(item).toHaveFocus());
    expect(item).to.have.attribute('data-render-highlighted', 'true');
    expect(screen.getByRole('menuitem', { name: 'Item' })).to.equal(item);

    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(item).to.have.attribute('data-render-highlighted', 'false'));
    expect(screen.getByRole('menuitem', { name: 'Item' })).to.equal(item);
  });

  it('passes disabled state to render and prevents keyboard activation', async () => {
    const onClick = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item
            disabled
            onClick={onClick}
            render={(props, state) => <div {...props} data-disabled={String(state.disabled)} />}
          >
            Item
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    const item = screen.getByRole('menuitem', { name: 'Item' });
    expect(item).to.have.attribute('aria-disabled', 'true');
    expect(item).to.have.attribute('data-disabled', 'true');
    await act(async () => item.focus());
    await user.keyboard('[Space][Enter]');
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  const renderCases: { name: string; render: NonNullable<Menu2ItemProps['render']> }[] = [
    { name: 'element', render: <div /> },
    { name: 'callback', render: (props) => <div {...props} /> },
    {
      name: 'tooltip callback',
      render: (props) => (
        <Tooltip title="Create a file" describeChild enterDelay={0} leaveDelay={0}>
          <div {...props} />
        </Tooltip>
      ),
    },
  ];

  renderCases.forEach(({ name, render: renderProp }) => {
    it.skipIf(isJsdom())(`keeps the first-press ripple with a ${name}`, async () => {
      const { user } = render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body} transitionDuration={0}>
            <Menu2Item render={renderProp} closeOnClick={false}>
              Item
            </Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      const item = screen.getByRole('menuitem', { name: 'Item' });
      await user.pointer({ keys: '[MouseLeft>]', target: item });
      await waitFor(() =>
        expect(item.querySelector(`.${touchRippleClasses.rippleVisible}`)).not.to.equal(null),
      );
      expect(item).to.have.text('Item');
      await user.pointer({ keys: '[/MouseLeft]', target: item });
    });
  });

  it.skipIf(isJsdom())('respects disableRipple with a rendered element', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item render={<div />} disableRipple closeOnClick={false}>
            Item
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    const item = screen.getByRole('menuitem', { name: 'Item' });
    await user.pointer({ keys: '[MouseLeft>]', target: item });
    expect(item.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
    await user.pointer({ keys: '[/MouseLeft]', target: item });
  });

  it('merges render-element handlers with menu handlers and activates once per key', async () => {
    const onClick = vi.fn();
    const renderOnClick = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item
            closeOnClick={false}
            onClick={onClick}
            render={<div onClick={renderOnClick} />}
          >
            Item
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    const item = screen.getByRole('menuitem', { name: 'Item' });
    await act(async () => item.focus());
    await user.keyboard('[Space][Enter]');
    await user.click(item);
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(renderOnClick).toHaveBeenCalledTimes(3);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to fire the item twice.
  it('fires once per activation without closing when closeOnClick is false', async () => {
    const onClick = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2Item closeOnClick={false} onClick={onClick}>
            Item
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const item = screen.getByRole('menuitem', { name: 'Item' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onClick.callCount).to.equal(1);

    await user.keyboard('[Enter]');
    expect(onClick.callCount).to.equal(2);

    await user.click(item);
    expect(onClick.callCount).to.equal(3);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  (['pointer', 'Enter', 'Space'] as const).forEach((activation) => {
    it(`closes by default after ${activation} activation`, async () => {
      const onClick = spy();
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item onClick={onClick}>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      const item = screen.getByRole('menuitem', { name: 'Item' });
      onOpenChange.resetHistory();

      if (activation === 'pointer') {
        await user.click(item);
      } else {
        await act(async () => {
          item.focus();
        });
        await user.keyboard(`[${activation}]`);
      }

      expect(onClick.callCount).to.equal(1);
      await waitFor(() => {
        expect(screen.queryByRole('menu')).to.equal(null);
      });
      expect(onOpenChange.callCount).to.equal(1);
      expect(onOpenChange.args[0][0]).to.equal(false);
      expect(onOpenChange.args[0][1].reason).to.equal('item-press');
      expect(onOpenChange.args[0][1].event).to.be.instanceOf(Event);
      expect(onOpenChange.args[0][1].event).to.equal(onClick.args[0][0].nativeEvent);
    });
  });
});
