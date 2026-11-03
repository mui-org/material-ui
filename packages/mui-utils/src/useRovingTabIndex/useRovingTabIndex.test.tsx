import { describe, test, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { useRovingTabIndexRoot, useRovingTabIndexItem } from './useRovingTabIndex';
import type { UseRovingTabIndexParams, UseRovingTabIndexReturnValue } from './useRovingTabIndex';
import { RovingTabIndexContext } from './RovingTabIndexContext';

interface TestItem {
  id: string;
  ariaDisabled?: boolean;
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  render?: boolean;
  selected?: boolean;
  tabIndex?: number;
}

let focusNext: ReturnType<typeof useRovingTabIndexRoot<string>>['focusNext'];
let getItemMap: ReturnType<typeof useRovingTabIndexRoot<string>>['getItemMap'];

const defaultItems: TestItem[] = [
  { id: 'button-1' },
  { id: 'button-2' },
  { id: 'button-3', disabled: true },
  { id: 'button-4' },
];

function TestButton(props: TestItem & { buttonRef?: React.Ref<HTMLButtonElement> }) {
  const { id, ariaDisabled, buttonRef, disabled, focusableWhenDisabled, selected, tabIndex } =
    props;
  const rovingItemProps = useRovingTabIndexItem({
    id,
    ref: buttonRef,
    disabled,
    focusableWhenDisabled,
    selected,
  });

  return (
    <button
      {...rovingItemProps}
      aria-disabled={ariaDisabled || (focusableWhenDisabled && disabled) ? 'true' : undefined}
      data-testid={id}
      disabled={disabled && !focusableWhenDisabled ? true : undefined}
      role="tab"
      tabIndex={tabIndex ?? rovingItemProps.tabIndex}
    >
      {id}
    </button>
  );
}

function TestComponent(
  props: Partial<UseRovingTabIndexParams<string>> & {
    items?: TestItem[];
    buttonRef?: React.Ref<HTMLButtonElement>;
    onKeyDown?: React.KeyboardEventHandler;
    onFocus?: React.FocusEventHandler;
  },
) {
  const {
    items = defaultItems,
    buttonRef,
    orientation = 'horizontal',
    onKeyDown,
    onFocus,
    ...options
  } = props;
  const rootParams: UseRovingTabIndexParams<string> = {
    ...(options as Omit<UseRovingTabIndexParams<string>, 'orientation'>),
    orientation,
  };

  const root = useRovingTabIndexRoot(rootParams);

  focusNext = root.focusNext;
  getItemMap = root.getItemMap;

  return (
    <RovingTabIndexContext.Provider value={root as UseRovingTabIndexReturnValue<unknown>}>
      <div
        data-testid="container"
        tabIndex={-1}
        {...root.getContainerProps(undefined, onFocus, onKeyDown)}
      >
        {items
          .filter((item) => item.render !== false)
          .map((item) => (
            <TestButton
              key={item.id}
              {...item}
              buttonRef={item.id === 'button-1' ? buttonRef : undefined}
            />
          ))}
      </div>
    </RovingTabIndexContext.Provider>
  );
}

describe('useRovingTabIndexRoot + useRovingTabIndexItem', () => {
  const { render } = createRenderer();

  test('sets the first enabled item as the default tab stop', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('button-1')).to.have.attribute('tabindex', '0');
    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-3')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-4')).to.have.attribute('tabindex', '-1');
  });

  test('uses activeItemId when provided', () => {
    render(<TestComponent activeItemId="button-2" />);

    expect(screen.getByTestId('button-1')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '0');
  });

  test('syncs to activeItemId when it changes', () => {
    const { setProps } = render(<TestComponent activeItemId="button-2" />);

    setProps({ activeItemId: 'button-4' });

    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-4')).to.have.attribute('tabindex', '0');
  });

  test('activeItemId=null falls back to the first focusable item', () => {
    render(<TestComponent activeItemId={null} />);

    expect(screen.getByTestId('button-1')).to.have.attribute('tabindex', '0');
    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '-1');
  });

  test('moves to the next focusable item when the requested item is disabled', () => {
    render(<TestComponent activeItemId="button-3" />);

    expect(screen.getByTestId('button-3')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-4')).to.have.attribute('tabindex', '0');
  });

  test('re-resolves when mounted item metadata changes', async () => {
    const { setProps, user } = render(
      <TestComponent items={[{ id: 'button-1' }, { id: 'button-2' }, { id: 'button-3' }]} />,
    );

    setProps({
      items: [{ id: 'button-1', disabled: true }, { id: 'button-2' }, { id: 'button-3' }],
    });

    act(() => {
      screen.getByTestId('container').focus();
    });

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-2')).toHaveFocus();
  });

  test('cleans up item map entries when items unregister', () => {
    const { setProps } = render(
      <TestComponent items={[{ id: 'button-1' }, { id: 'button-2' }, { id: 'button-3' }]} />,
    );

    expect(Array.from(getItemMap().keys())).to.deep.equal(['button-1', 'button-2', 'button-3']);

    setProps({
      items: [{ id: 'button-1' }, { id: 'button-3' }],
    });

    expect(Array.from(getItemMap().keys())).to.deep.equal(['button-1', 'button-3']);
  });

  test('should not infinite loop when focusNext is called with no children', () => {
    let focusNextResult: string | null = null;

    function EmptyContainer() {
      const root = useRovingTabIndexRoot<string>({
        orientation: 'horizontal',
      });
      const { getContainerProps, focusNext: focusNextFn } = root;

      focusNext = focusNextFn;

      return <div data-testid="container" tabIndex={-1} {...getContainerProps()} />;
    }

    render(<EmptyContainer />);

    act(() => {
      focusNextResult = focusNext();
    });

    expect(focusNextResult).to.equal(null);
  });

  test('should not infinite loop on arrow key navigation with no children', async () => {
    function EmptyContainer() {
      const root = useRovingTabIndexRoot<string>({
        orientation: 'horizontal',
      });

      return <div data-testid="container" tabIndex={-1} {...root.getContainerProps()} />;
    }

    const { user } = render(<EmptyContainer />);

    const container = screen.getByTestId('container');
    container.focus();

    // These would hang if the bug is present
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{Home}');
    await user.keyboard('{End}');

    expect(container).toHaveFocus();
  });

  test('should not infinite loop on arrow key navigation with no children (vertical)', async () => {
    function EmptyContainer() {
      const root = useRovingTabIndexRoot<string>({
        orientation: 'vertical',
      });

      return <div data-testid="container" tabIndex={-1} {...root.getContainerProps()} />;
    }

    const { user } = render(<EmptyContainer />);

    const container = screen.getByTestId('container');
    container.focus();

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');

    expect(container).toHaveFocus();
  });

  test('leaves all items at tabindex -1 when none are focusable', () => {
    render(
      <TestComponent
        items={[
          { id: 'button-1', disabled: true },
          { id: 'button-2', disabled: true },
        ]}
      />,
    );

    expect(screen.getByTestId('button-1')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '-1');
  });

  test('updates the active item when a child receives focus', async () => {
    const { user } = render(<TestComponent />);

    await user.click(screen.getByTestId('button-2'));

    expect(screen.getByTestId('button-1')).to.have.attribute('tabindex', '-1');
    expect(screen.getByTestId('button-2')).to.have.attribute('tabindex', '0');
  });

  test('supports horizontal keyboard navigation and skips disabled items', async () => {
    const { user } = render(<TestComponent />);

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-2')).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-4')).toHaveFocus();

    await user.keyboard('{ArrowLeft}');

    expect(screen.getByTestId('button-2')).toHaveFocus();
  });

  test('supports vertical keyboard navigation', async () => {
    const { user } = render(<TestComponent orientation="vertical" />);

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowDown}');

    expect(screen.getByTestId('button-2')).toHaveFocus();

    await user.keyboard('{ArrowUp}');

    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('does not wrap when wrap is false', async () => {
    const { user } = render(<TestComponent wrap={false} />);

    await user.click(screen.getByTestId('button-4'));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-4')).toHaveFocus();
  });

  test('supports Home and End navigation', async () => {
    const { user } = render(<TestComponent />);

    await user.click(screen.getByTestId('button-2'));
    await user.keyboard('{End}');

    expect(screen.getByTestId('button-4')).toHaveFocus();

    await user.keyboard('{Home}');

    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('starts from the root when navigating from root focus', async () => {
    const { user } = render(<TestComponent />);
    const container = screen.getByTestId('container');

    container.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('ignores modifier key navigation', () => {
    render(<TestComponent />);
    const button1 = screen.getByTestId('button-1');

    act(() => {
      button1.focus();
    });

    fireEvent.keyDown(button1, { key: 'ArrowRight', ctrlKey: true });

    expect(button1).toHaveFocus();
  });

  test('reverses horizontal navigation in RTL mode', async () => {
    const { user } = render(<TestComponent isRtl />);

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByTestId('button-2')).toHaveFocus();
  });

  test('does not apply RTL reversal to vertical navigation', async () => {
    const { user } = render(<TestComponent orientation="vertical" isRtl />);

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowDown}');

    expect(screen.getByTestId('button-2')).toHaveFocus();
  });

  test('supports item-based isItemFocusable overrides', async () => {
    const { user } = render(
      <TestComponent
        isItemFocusable={(item) =>
          item.id !== 'button-2' &&
          item.element?.dataset.disabled !== 'true' &&
          !item.disabled &&
          item.element?.getAttribute('aria-disabled') !== 'true'
        }
      />,
    );

    screen.getByTestId('button-4').dataset.disabled = 'true';

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowRight}');

    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('keeps the current active item when new items register', async () => {
    const { setProps, user } = render(
      <TestComponent items={[{ id: 'button-1' }, { id: 'button-2' }]} />,
    );

    await user.click(screen.getByTestId('button-2'));

    setProps({
      items: [{ id: 'button-0' }, { id: 'button-1' }, { id: 'button-2' }],
    });

    expect(screen.getByTestId('button-2')).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('re-resolves when the active item unregisters', async () => {
    const { setProps, user } = render(
      <TestComponent items={[{ id: 'button-1' }, { id: 'button-2' }]} />,
    );

    await user.click(screen.getByTestId('button-2'));

    setProps({
      items: [{ id: 'button-1' }, { id: 'button-2', render: false }],
    });

    act(() => {
      screen.getByTestId('container').focus();
    });

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-1')).toHaveFocus();
  });

  test('focusNext moves focus to the next focusable item and returns its id', async () => {
    const { user } = render(<TestComponent />);
    let focusNextResult: string | null = null;

    await user.click(screen.getByTestId('button-1'));

    act(() => {
      focusNextResult = focusNext();
    });

    expect(screen.getByTestId('button-2')).toHaveFocus();
    expect(focusNextResult).to.equal('button-2');
  });

  test('focusNext returns null when no focusable item matches', async () => {
    const { user } = render(<TestComponent />);
    let focusNextResult: string | null = null;

    await user.click(screen.getByTestId('button-1'));

    act(() => {
      focusNextResult = focusNext(() => false);
    });

    expect(focusNextResult).to.equal(null);
  });

  test('supports external refs on items', () => {
    const buttonRef = React.createRef<HTMLButtonElement>();

    render(<TestComponent buttonRef={buttonRef} />);

    expect(buttonRef.current).to.equal(screen.getByTestId('button-1'));
  });

  test('navigates in DOM order after dynamic item insertion', async () => {
    const { user, setProps } = render(
      <TestComponent items={[{ id: 'button-1' }, { id: 'button-2' }]} />,
    );

    setProps({
      items: [{ id: 'button-0' }, { id: 'button-1' }, { id: 'button-2' }],
    });

    await user.click(screen.getByTestId('button-0'));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-1')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-2')).toHaveFocus();
  });

  test('allows navigation to disabled items with focusableWhenDisabled', async () => {
    const { user } = render(
      <TestComponent
        items={[
          { id: 'button-1' },
          { id: 'button-2', disabled: true, focusableWhenDisabled: true },
          { id: 'button-3' },
        ]}
      />,
    );

    await user.click(screen.getByTestId('button-1'));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-2')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-3')).toHaveFocus();
  });

  test("composes with a user's onFocus and onKeyDown handlers", async () => {
    const onFocusSpy = spy();
    const onKeyDownSpy = spy();

    const { user } = render(<TestComponent onFocus={onFocusSpy} onKeyDown={onKeyDownSpy} />);

    await user.click(screen.getByTestId('button-1'));

    expect(onFocusSpy.callCount).to.equal(1);

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-2')).toHaveFocus();

    expect(onKeyDownSpy.callCount).to.equal(1);
  });

  test('runs the onFocus and onKeyDown handlers even when the event is prevented', async () => {
    const onFocusSpy = spy();
    const onKeyDownSpy = spy();

    const { user } = render(
      <TestComponent
        onFocus={(event) => {
          event.preventDefault();
          onFocusSpy();
        }}
        onKeyDown={(event) => {
          event.preventDefault();
          onKeyDownSpy();
        }}
      />,
    );

    await user.click(screen.getByTestId('button-1'));

    expect(onFocusSpy.callCount).to.equal(1);

    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('button-1')).toHaveFocus();

    expect(onKeyDownSpy.callCount).to.equal(1);
  });

  test('runs consumer onKeyDown even without arrow key navigation', async () => {
    const onKeyDownSpy = spy();

    const { user } = render(
      <TestComponent
        onKeyDown={(event) => {
          event.preventDefault();
          onKeyDownSpy();
        }}
      />,
    );

    await user.click(screen.getByTestId('button-1'));

    await user.keyboard('{Enter}');
    expect(onKeyDownSpy.callCount).to.equal(1);
  });
});
