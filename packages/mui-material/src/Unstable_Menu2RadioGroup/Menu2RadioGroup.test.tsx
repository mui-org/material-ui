import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioGroup, {
  menu2RadioGroupClasses as classes,
} from '@mui/material/Unstable_Menu2RadioGroup';
import describeConformance from '../../test/describeConformance';

describe('<Menu2RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioGroup>Group</Menu2RadioGroup>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    muiName: 'MuiMenu2RadioGroup',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  it('preserves labels, props, refs, and handlers on a custom render element', async () => {
    const groupRef = React.createRef<HTMLElement>();
    const renderRef = React.createRef<HTMLElement>();
    const onClick = vi.fn();
    const onRenderClick = vi.fn();
    let received: string[] = [];
    const CustomRoot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
      function CustomRoot(props, ref) {
        received = Object.keys(props);
        return <section {...props} ref={ref} />;
      },
    );
    const { user, unmount } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2RadioGroup
            ref={groupRef}
            defaultValue="one"
            onClick={onClick}
            className="external-group"
            title="Choose a size"
            render={
              <CustomRoot
                ref={renderRef}
                onClick={onRenderClick}
                className="custom-group"
                data-custom="value"
              />
            }
          >
            <Menu2GroupLabel>Size</Menu2GroupLabel>
            <Menu2RadioItem value="one">One</Menu2RadioItem>
            <Menu2RadioItem value="two">Two</Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );
    const group = screen.getByRole('group', { name: 'Size' });
    const label = screen.getByText('Size');
    const item = screen.getByRole('menuitemradio', { name: 'Two' });
    expect(group.tagName).to.equal('SECTION');
    expect(groupRef.current).to.equal(group);
    expect(renderRef.current).to.equal(group);
    expect(group).to.have.attribute('aria-labelledby', label.id);
    expect(group).to.have.attribute('title', 'Choose a size');
    expect(group).to.have.attribute('data-custom', 'value');
    [classes.root, 'external-group', 'custom-group'].forEach((className) =>
      expect(group).to.have.class(className),
    );
    expect(label.parentElement).to.equal(group);
    expect(item.parentElement).to.equal(group);
    [
      'ownerState',
      'sx',
      'classes',
      'value',
      'defaultValue',
      'onValueChange',
      'internalRender',
      'internalRenderState',
    ].forEach((prop) => expect(received).not.to.include(prop));

    await user.click(item);
    expect(item).to.have.attribute('aria-checked', 'true');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRenderClick).toHaveBeenCalledTimes(1);
    expect(groupRef.current).to.equal(group);
    expect(renderRef.current).to.equal(group);
    unmount();
    expect(groupRef.current).to.equal(null);
    expect(renderRef.current).to.equal(null);
  });

  [false, true].forEach((controlled) => {
    [false, true].forEach((cancel) => {
      it(`preserves ${controlled ? 'controlled' : 'uncontrolled'} selection through render, cancel=${cancel}`, async () => {
        const onValueChange = vi.fn();
        const states: object[] = [];
        function Fixture() {
          const [value, setValue] = React.useState('one');
          return (
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                <Menu2RadioGroup
                  {...(controlled ? { value } : { defaultValue: 'one' })}
                  onValueChange={(nextValue, details) => {
                    onValueChange(nextValue, details);
                    if (cancel) {
                      details.cancel();
                    } else if (controlled) {
                      setValue(nextValue);
                    }
                  }}
                  render={(props, state) => {
                    states.push(state);
                    return <section {...props} />;
                  }}
                >
                  <Menu2RadioItem value="one">One</Menu2RadioItem>
                  <Menu2RadioItem value="two">Two</Menu2RadioItem>
                </Menu2RadioGroup>
              </Menu2Popup>
            </Menu2>
          );
        }
        const { user } = render(<Fixture />);
        const group = screen.getByRole('group');
        const one = screen.getByRole('menuitemradio', { name: 'One' });
        const two = screen.getByRole('menuitemradio', { name: 'Two' });
        expect(one).to.have.attribute('aria-checked', 'true');
        expect(two).to.have.attribute('aria-checked', 'false');

        await user.click(two);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange.mock.calls[0][0]).to.equal('two');
        expect(one).to.have.attribute('aria-checked', String(cancel));
        expect(two).to.have.attribute('aria-checked', String(!cancel));
        expect(screen.getByRole('group')).to.equal(group);
        expect(states.length).to.be.greaterThan(0);
        states.forEach((state) => expect(state).to.deep.equal({ disabled: false }));
      });
    });
  });

  it('updates disabled render state, classes, and theme styles without exposing the value', async () => {
    const onValueChange = vi.fn();
    const states: object[] = [];
    const theme = createTheme({
      spacing: 10,
      components: {
        MuiMenu2RadioGroup: {
          defaultProps: {
            render: (props, state) => {
              states.push(state);
              return <section {...props} data-render-disabled={String(state.disabled)} />;
            },
          },
          styleOverrides: {
            root: ({ ownerState }) => ({
              paddingLeft: '13px',
              '--group-disabled': String(ownerState.disabled),
            }),
          },
          variants: [{ props: { disabled: true }, style: { paddingBottom: '19px' } }],
        },
      },
    });
    function Fixture() {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <ThemeProvider theme={theme}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup transitionDuration={0}>
              <Menu2Item closeOnClick={false} onClick={() => setDisabled(!disabled)}>
                Toggle disabled
              </Menu2Item>
              <Menu2RadioGroup
                disabled={disabled || undefined}
                defaultValue="one"
                onValueChange={onValueChange}
                classes={{ disabled: 'custom-disabled' }}
                sx={[false, (t) => ({ paddingRight: t.spacing(3) })]}
              >
                <Menu2GroupLabel>Size</Menu2GroupLabel>
                <Menu2RadioItem value="one">One</Menu2RadioItem>
                <Menu2RadioItem value="two">Two</Menu2RadioItem>
              </Menu2RadioGroup>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>
      );
    }
    const { user } = render(<Fixture />);
    const group = screen.getByRole('group', { name: 'Size' });
    const two = screen.getByRole('menuitemradio', { name: 'Two' });
    expect(group.tagName).to.equal('SECTION');
    expect(group).to.have.attribute('data-render-disabled', 'false');
    expect(group).not.to.have.class(classes.disabled);
    expect(group).not.to.have.class('custom-disabled');
    expect(group).not.to.have.attribute('data-disabled');
    expect(group).not.to.have.attribute('aria-disabled');
    expect(getComputedStyle(group).paddingLeft).to.equal('13px');
    expect(getComputedStyle(group).paddingRight).to.equal('30px');
    expect(getComputedStyle(group).getPropertyValue('--group-disabled').trim()).to.equal('false');
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    await user.click(screen.getByRole('menuitem', { name: 'Toggle disabled' }));
    expect(group).to.have.attribute('data-render-disabled', 'true');
    expect(group).to.have.attribute('data-disabled');
    expect(group).to.have.attribute('aria-disabled', 'true');
    expect(group).to.have.class(classes.disabled);
    expect(group).to.have.class('custom-disabled');
    expect(getComputedStyle(group).paddingBottom).to.equal('19px');
    expect(getComputedStyle(group).getPropertyValue('--group-disabled').trim()).to.equal('true');
    expect(two).to.have.attribute('aria-disabled', 'true');
    await act(async () => two.focus());
    await user.keyboard('[Space][Enter]');
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole('menuitem', { name: 'Toggle disabled' }));
    expect(group).to.have.attribute('data-render-disabled', 'false');
    expect(group).not.to.have.class(classes.disabled);
    expect(group).not.to.have.class('custom-disabled');
    expect(group).not.to.have.attribute('data-disabled');
    expect(group).not.to.have.attribute('aria-disabled');
    expect(getComputedStyle(group).getPropertyValue('--group-disabled').trim()).to.equal('false');
    expect(two).not.to.have.attribute('aria-disabled');
    await user.click(two);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(two).to.have.attribute('aria-checked', 'true');
    expect(states).to.deep.include({ disabled: true });
    states.forEach((state) => expect(Object.keys(state)).to.deep.equal(['disabled']));
    expect(group).not.to.have.attribute('ownerState');
    expect(group).not.to.have.attribute('sx');
    expect(group).not.to.have.attribute('value');
  });

  it('keeps keyboard navigation and typeahead through a custom radio group', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup transitionDuration={0}>
          <Menu2Item>Before</Menu2Item>
          <Menu2RadioGroup defaultValue="alpha" render={(props) => <section {...props} />}>
            <Menu2GroupLabel>Size</Menu2GroupLabel>
            <Menu2RadioItem value="alpha">Alpha</Menu2RadioItem>
            <Menu2RadioItem value="zebra">Zebra</Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus();
    await user.keyboard('z');
    const zebra = screen.getByRole('menuitemradio', { name: 'Zebra' });
    expect(zebra).toHaveFocus();
    expect(zebra.parentElement).to.equal(screen.getByRole('group', { name: 'Size' }));
    await user.keyboard('[Enter]');
    expect(zebra).to.have.attribute('aria-checked', 'true');
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'After' })).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(zebra).toHaveFocus();
  });
});
