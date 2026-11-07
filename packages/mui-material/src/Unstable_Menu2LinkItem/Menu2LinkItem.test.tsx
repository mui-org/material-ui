import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Link from '@mui/material/Link';
import { touchRippleClasses } from '@mui/material/ButtonBase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import type { Menu2LinkItemProps } from '@mui/material/Unstable_Menu2LinkItem';
import Menu2LinkItem, {
  menu2LinkItemClasses as classes,
} from '@mui/material/Unstable_Menu2LinkItem';
import describeConformance from '../../test/describeConformance';

interface RouterLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  to: string;
}

const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function RouterLink(
  { to, ...props },
  ref,
) {
  return (
    <a {...props} href={to} ref={ref}>
      {props.children}
    </a>
  );
});

const renderCases: { name: string; render?: Menu2LinkItemProps['render'] }[] = [
  { name: 'default link' },
  { name: 'Material Link', render: <Link /> },
  { name: 'router link', render: <RouterLink to="/profile" /> },
];

describe('<Menu2LinkItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2LinkItem href="/profile">Profile</Menu2LinkItem>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLAnchorElement,
    skip: ['componentProp', 'slotsProp'],
    muiName: 'MuiMenu2LinkItem',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  it('forwards anchor props and both refs to a custom render element without internal props', () => {
    let received: string[] = [];
    const rootRef = React.createRef<HTMLElement>();
    const renderRef = React.createRef<HTMLAnchorElement>();
    const CustomLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
      function CustomLink(props, ref) {
        received = Object.keys(props);
        return <RouterLink {...props} ref={ref} />;
      },
    );
    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2LinkItem
            ref={rootRef}
            target="_blank"
            rel="noopener"
            download="profile.html"
            render={<CustomLink to="/profile" ref={renderRef} data-custom="value" />}
          >
            Profile
          </Menu2LinkItem>
        </Menu2Popup>
      </Menu2>,
    );

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    expect(item.tagName).to.equal('A');
    expect(item).to.have.attribute('href', '/profile');
    expect(item).to.have.attribute('target', '_blank');
    expect(item).to.have.attribute('rel', 'noopener');
    expect(item).to.have.attribute('download', 'profile.html');
    expect(item).to.have.attribute('data-custom', 'value');
    expect(rootRef.current).to.equal(item);
    expect(renderRef.current).to.equal(item);
    expect(received).to.include('className');
    ['ownerState', 'sx', 'disableRipple', 'internalRender', 'internalRenderState'].forEach((prop) =>
      expect(received).not.to.include(prop),
    );
  });

  it('keeps Material styles, theme defaults, and sx with a Material Link render element', () => {
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiMenu2LinkItem: {
          defaultProps: { dense: true, render: <Link className="custom-link" /> },
          styleOverrides: { root: { paddingTop: '21px' } },
          variants: [{ props: { dense: true }, style: { paddingBottom: '19px' } }],
        },
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2LinkItem
              href="/profile"
              className="external-link"
              sx={[false, (t) => ({ paddingLeft: t.spacing(3) })]}
            >
              Profile
            </Menu2LinkItem>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    const item = screen.getByRole('menuitem', { name: 'Profile' });
    expect(item).to.have.class(classes.root);
    expect(item).to.have.class(classes.dense);
    expect(item).to.have.class('MuiLink-root');
    expect(item).to.have.class('MuiButtonBase-root');
    expect(item).to.have.class('custom-link');
    expect(item).to.have.class('external-link');
    const styles = getComputedStyle(item);
    expect(styles.display).to.equal('flex');
    expect(styles.paddingTop).to.equal('21px');
    expect(styles.paddingBottom).to.equal('19px');
    expect(styles.paddingLeft).to.equal('30px');
  });

  // An anchor without `href` takes the same non-native path as the other items,
  // where Base UI and ButtonBase both emulate the keyboard activation.
  it('fires once per keyboard activation without an href', async () => {
    const onClick = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2LinkItem closeOnClick={false} onClick={onClick}>
            Profile
          </Menu2LinkItem>
        </Menu2Popup>
      </Menu2>,
    );

    const item = screen.getByRole('menuitem', { name: 'Profile' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onClick.callCount).to.equal(1);

    await user.keyboard('[Enter]');
    expect(onClick.callCount).to.equal(2);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  renderCases.forEach(({ name, render: renderProp }) => {
    (['pointer', 'Enter', 'Space'] as const).forEach((activation) => {
      it(`preserves a ${name} after ${activation} activation without closing by default`, async () => {
        const onClick = spy((event: React.MouseEvent<HTMLAnchorElement>) => {
          expect(event.defaultPrevented).to.equal(false);
          event.preventDefault();
        });
        const onOpenChange = spy();
        const { user } = render(
          <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
            <Menu2Popup anchor={document.body}>
              <Menu2LinkItem href="/profile" onClick={onClick} render={renderProp}>
                Profile
              </Menu2LinkItem>
            </Menu2Popup>
          </Menu2>,
        );

        const item = screen.getByRole('menuitem', { name: 'Profile' });
        expect(item.tagName).to.equal('A');
        expect(item).to.have.attribute('href', '/profile');

        if (activation === 'pointer') {
          await user.click(item);
        } else {
          await act(async () => {
            item.focus();
          });
          await user.keyboard(`[${activation}]`);
        }

        expect(onClick.callCount).to.equal(1);
        expect(onOpenChange.callCount).to.equal(0);
        expect(screen.getByRole('menu')).not.to.equal(null);
      });
    });

    it(`preserves modified and middle clicks on a ${name}`, async () => {
      const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
        expect(event.defaultPrevented).to.equal(false);
        event.preventDefault();
      });
      const onAuxClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
        expect(event.defaultPrevented).to.equal(false);
        event.preventDefault();
      });
      const onOpenChange = vi.fn();
      const { user } = render(
        <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
          <Menu2Popup anchor={document.body}>
            <Menu2LinkItem
              href="/profile"
              render={renderProp}
              onClick={onClick}
              onAuxClick={onAuxClick}
            >
              Profile
            </Menu2LinkItem>
          </Menu2Popup>
        </Menu2>,
      );
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      await user.keyboard('{Control>}');
      await user.click(item);
      await user.keyboard('{/Control}{Meta>}');
      await user.click(item);
      await user.keyboard('{/Meta}');
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(onClick.mock.calls[0][0].ctrlKey).to.equal(true);
      expect(onClick.mock.calls[1][0].metaKey).to.equal(true);

      await user.pointer({ keys: '[MouseMiddle]', target: item });
      expect(onAuxClick).toHaveBeenCalledTimes(1);
      expect(onAuxClick.mock.calls[0][0].button).to.equal(1);
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(screen.getByRole('menu')).not.to.equal(null);
    });
  });

  it.skipIf(isJsdom())(
    'retains ripple through a render callback and respects disableRipple',
    async () => {
      const { user } = render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2LinkItem
              href="/profile"
              onClick={(event) => event.preventDefault()}
              render={(props, state) => (
                <RouterLink {...props} to="/profile" data-disabled={String(state.disabled)} />
              )}
            >
              Profile
            </Menu2LinkItem>
            <Menu2LinkItem
              href="/settings"
              disableRipple
              onClick={(event) => event.preventDefault()}
              render={<Link />}
            >
              Settings
            </Menu2LinkItem>
          </Menu2Popup>
        </Menu2>,
      );
      const item = screen.getByRole('menuitem', { name: 'Profile' });
      expect(item).to.have.attribute('data-disabled', 'false');
      await user.pointer({ keys: '[MouseLeft>]', target: item });
      await waitFor(() =>
        expect(item.querySelector(`.${touchRippleClasses.rippleVisible}`)).not.to.equal(null),
      );
      await user.pointer({ keys: '[/MouseLeft]', target: item });
      const disabledRipple = screen.getByRole('menuitem', { name: 'Settings' });
      await user.pointer({ keys: '[MouseLeft>]', target: disabledRipple });
      expect(disabledRipple.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
      await user.pointer({ keys: '[/MouseLeft]', target: disabledRipple });
    },
  );

  renderCases.forEach(({ name, render: renderProp }) => {
    it(`closes a ${name} with item-press when closeOnClick is true`, async () => {
      const onClick = spy((event: React.MouseEvent<HTMLAnchorElement>) => {
        expect(event.defaultPrevented).to.equal(false);
        event.preventDefault();
      });
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
          <Menu2Popup anchor={document.body}>
            <Menu2LinkItem href="/profile" closeOnClick onClick={onClick} render={renderProp}>
              Profile
            </Menu2LinkItem>
          </Menu2Popup>
        </Menu2>,
      );

      await user.click(screen.getByRole('menuitem', { name: 'Profile' }));

      expect(onClick.callCount).to.equal(1);
      await waitFor(() => {
        expect(screen.queryByRole('menu')).to.equal(null);
      });
      expect(onOpenChange.callCount).to.equal(1);
      expect(onOpenChange.args[0][0]).to.equal(false);
      expect(onOpenChange.args[0][1].reason).to.equal('item-press');
    });
  });
});
