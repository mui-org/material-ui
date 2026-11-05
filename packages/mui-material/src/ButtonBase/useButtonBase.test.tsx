import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import type { UseButtonBaseParameters } from './useButtonBase';
import useButtonBase from './useButtonBase';

interface ButtonProps extends Omit<UseButtonBaseParameters, 'nativeButton' | 'disabled'> {
  id?: string | undefined;
  nativeButton?: boolean | undefined;
  disabled?: boolean | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  onKeyDown?: React.KeyboardEventHandler<any> | undefined;
  onKeyUp?: React.KeyboardEventHandler<any> | undefined;
}

function useFixtureButtonBase(props: ButtonProps, internalNativeButtonValue: boolean) {
  const {
    id,
    nativeButton: nativeButtonOverride,
    nativeButtonProp,
    internalNativeButton: internalNativeButtonProp = internalNativeButtonValue,
    allowInferredHostMismatch,
    disabled = false,
    type,
    hasFormAction,
    tabIndex,
    focusableWhenDisabled,
    stopEventPropagation,
    onBeforeKeyDown,
    onBeforeKeyUp,
    onClick,
    onKeyDown,
    onKeyUp,
  } = props;
  const nativeButton = nativeButtonOverride ?? nativeButtonProp ?? internalNativeButtonProp;
  const { getButtonProps, rootRef } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton: internalNativeButtonProp,
    allowInferredHostMismatch,
    disabled,
    type,
    hasFormAction,
    tabIndex,
    focusableWhenDisabled,
    stopEventPropagation,
    onBeforeKeyDown,
    onBeforeKeyUp,
  });

  return {
    id,
    rootProps: getButtonProps({
      onClick,
      onKeyDown,
      onKeyUp,
    }),
    rootRef,
  };
}

function NonNativeButton(props: ButtonProps) {
  const { id, rootProps, rootRef } = useFixtureButtonBase(props, false);

  return (
    <div data-testid={id ?? 'root'} ref={rootRef as React.Ref<HTMLDivElement>} {...rootProps} />
  );
}

function NativeButton(props: ButtonProps) {
  const { id, rootProps, rootRef } = useFixtureButtonBase(props, true);

  return (
    <button
      data-testid={id ?? 'root'}
      ref={rootRef as React.Ref<HTMLButtonElement>}
      {...(rootProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}

describe('useButtonBase', () => {
  const { render } = createRenderer();

  describe('onClick composition', () => {
    it('calls onClick when not disabled', async () => {
      const handleClick = vi.fn();
      const { user } = render(<NonNativeButton onClick={handleClick} />);

      await user.click(screen.getByTestId('root'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const { user } = render(<NonNativeButton disabled onClick={handleClick} />);

      await user.click(screen.getByTestId('root'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('stopEventPropagation stops propagation even when disabled', async () => {
      const handleParentClick = vi.fn();
      const handleClick = vi.fn();

      const { user } = render(
        <div onClick={handleParentClick}>
          <NonNativeButton disabled onClick={handleClick} stopEventPropagation />
        </div>,
      );

      await user.click(screen.getByTestId('root'));

      expect(handleParentClick).not.toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard activation', () => {
    describe('non-native button', () => {
      it('runs onBeforeKeyDown before onKeyDown', async () => {
        const handleBeforeKeyDown = vi.fn();
        const handleKeyDown = vi.fn();

        const { user } = render(
          <NonNativeButton onBeforeKeyDown={handleBeforeKeyDown} onKeyDown={handleKeyDown} />,
        );

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        await user.keyboard('{Enter}');

        expect(handleBeforeKeyDown).toHaveBeenCalledTimes(1);
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
        expect(handleBeforeKeyDown.mock.invocationCallOrder[0]).toBeLessThan(
          handleKeyDown.mock.invocationCallOrder[0],
        );
      });

      it('Enter on keyDown activates click', async () => {
        const handleClick = vi.fn();

        const { user } = render(<NonNativeButton onClick={handleClick} />);

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });
        await user.keyboard('{Enter}');

        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('Space on keyDown prevents default and keyUp activates click', () => {
        const handleClick = vi.fn();
        const handleKeyDown = vi.fn();

        render(<NonNativeButton onClick={handleClick} onKeyDown={handleKeyDown} />);

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        fireEvent.keyDown(el, { key: ' ' });
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
        expect(handleKeyDown.mock.calls[0][0].defaultPrevented).toBe(true);
        expect(handleClick).not.toHaveBeenCalled();

        fireEvent.keyUp(el, { key: ' ' });
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('does not fire when the event comes from a child element', () => {
        const handleClick = vi.fn();

        function TestWithChild(
          props: UseButtonBaseParameters & {
            onClick?: React.MouseEventHandler<any> | undefined;
          },
        ) {
          const { onClick, ...params } = props;
          const { getButtonProps, rootRef } = useButtonBase(params);

          return (
            <div
              data-testid="root"
              ref={rootRef as React.Ref<HTMLDivElement>}
              {...getButtonProps({ onClick })}
            >
              <button type="button" data-testid="child">
                child
              </button>
            </div>
          );
        }

        render(<TestWithChild disabled={false} nativeButton={false} onClick={handleClick} />);

        const child = screen.getByTestId('child');
        act(() => {
          child.focus();
        });

        fireEvent.keyDown(child, { key: 'Enter' });
        fireEvent.keyUp(child, { key: ' ' });

        expect(handleClick).not.toHaveBeenCalled();
      });

      it('does not call key handlers or fire when disabled', async () => {
        const handleClick = vi.fn();
        const handleKeyDown = vi.fn();
        const handleKeyUp = vi.fn();

        const { user } = render(
          <NonNativeButton
            disabled
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />,
        );

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        await user.keyboard('{Enter}');
        await user.keyboard(' ');

        expect(handleKeyDown).not.toHaveBeenCalled();
        expect(handleKeyUp).not.toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe('native button', () => {
      it('does not synthesize clicks', () => {
        const handleClick = vi.fn();

        render(<NativeButton onClick={handleClick} />);

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        fireEvent.keyDown(el, { key: 'Enter' });
        fireEvent.keyUp(el, { key: ' ' });

        expect(handleClick).not.toHaveBeenCalled();
      });

      it('resolves keyboard behavior from the resolved host', () => {
        const handleClick = vi.fn();
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<NativeButton nativeButton={false} onClick={handleClick} />);

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        fireEvent.keyDown(el, { key: 'Enter' });

        expect(handleClick).not.toHaveBeenCalled();
        errorSpy.mockRestore();
      });

      it('does not call key handlers for disabled focusable buttons', () => {
        const handleKeyDown = vi.fn();
        const handleKeyUp = vi.fn();

        render(
          <NativeButton
            disabled
            focusableWhenDisabled
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />,
        );

        const el = screen.getByTestId('root');
        act(() => {
          el.focus();
        });

        fireEvent.keyDown(el, { key: 'Enter' });
        fireEvent.keyUp(el, { key: ' ' });

        expect(handleKeyDown).not.toHaveBeenCalled();
        expect(handleKeyUp).not.toHaveBeenCalled();
      });
    });
  });

  describe('param: focusableWhenDisabled', () => {
    it('allows disabled native buttons to receive focus', async () => {
      const { user } = render(<NativeButton disabled focusableWhenDisabled />);

      const button = screen.getByRole('button');

      expect(button).not.toHaveFocus();
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('only calls focus and blur for disabled focusable non-native buttons', async () => {
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      const handleKeyUp = vi.fn();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();

      function FocusableNonNativeButton(
        props: UseButtonBaseParameters & {
          onClick?: React.MouseEventHandler<any> | undefined;
          onKeyDown?: React.KeyboardEventHandler<any> | undefined;
          onKeyUp?: React.KeyboardEventHandler<any> | undefined;
          onFocus?: React.FocusEventHandler<HTMLDivElement> | undefined;
          onBlur?: React.FocusEventHandler<HTMLDivElement> | undefined;
        },
      ) {
        const { onClick, onKeyDown, onKeyUp, onFocus, onBlur, ...params } = props;
        const { getButtonProps, rootRef } = useButtonBase(params);

        return (
          <div
            data-testid="root"
            ref={rootRef as React.Ref<HTMLDivElement>}
            {...getButtonProps({ onBlur, onClick, onFocus, onKeyDown, onKeyUp })}
          />
        );
      }

      const { user } = render(
        <FocusableNonNativeButton
          disabled
          nativeButton={false}
          focusableWhenDisabled
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />,
      );

      const button = screen.getByRole('button');

      expect(button).not.toHaveFocus();
      expect(handleFocus).not.toHaveBeenCalled();

      await user.tab();
      expect(button).toHaveFocus();
      expect(handleFocus).toHaveBeenCalledTimes(1);
      handleKeyDown.mockClear();
      handleKeyUp.mockClear();

      await user.keyboard('{Enter}');
      expect(handleKeyDown).not.toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();

      await user.keyboard(' ');
      expect(handleKeyDown).not.toHaveBeenCalled();
      expect(handleKeyUp).not.toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();

      expect(handleBlur).not.toHaveBeenCalled();
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
      expect(button).not.toHaveFocus();
    });
  });

  describe('getButtonProps', () => {
    describe('native button', () => {
      it('returns type="button" and disabled', () => {
        render(<NativeButton />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('type')).toBe('button');
        expect(el.getAttribute('role')).toBeNull();
        expect((el as HTMLButtonElement).disabled).toBe(false);
      });

      it('returns disabled=true when disabled', () => {
        render(<NativeButton disabled />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('type')).toBe('button');
        expect((el as HTMLButtonElement).disabled).toBe(true);
        expect(el.getAttribute('tabindex')).toBe('-1');
      });

      it('does not default type when hasFormAction is true', () => {
        render(<NativeButton hasFormAction />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('type')).toBeNull();
      });

      it('returns aria-disabled instead of disabled for focusable disabled buttons', () => {
        render(<NativeButton disabled focusableWhenDisabled />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('type')).toBe('button');
        expect(el.hasAttribute('disabled')).toBe(false);
        expect(el.getAttribute('aria-disabled')).toBe('true');
        expect(el.getAttribute('tabindex')).toBe('0');
      });
    });

    describe('non-native button', () => {
      it('returns role="button" and aria-disabled', () => {
        render(<NonNativeButton disabled />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('role')).toBe('button');
        expect(el.getAttribute('aria-disabled')).toBe('true');
        expect(el.getAttribute('type')).toBeNull();
        expect(el.getAttribute('tabindex')).toBe('-1');
      });

      it('returns tabIndex=0 when enabled', () => {
        render(<NonNativeButton />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('role')).toBe('button');
        expect(el.getAttribute('aria-disabled')).toBeNull();
        expect(el.getAttribute('tabindex')).toBe('0');
      });

      it('respects custom tabIndex', () => {
        render(<NonNativeButton tabIndex={5} />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('tabindex')).toBe('5');
      });

      it('overrides custom tabIndex to -1 when disabled', () => {
        render(<NonNativeButton disabled tabIndex={5} />);

        const el = screen.getByTestId('root');
        expect(el.getAttribute('tabindex')).toBe('-1');
      });
    });
  });

  describe('warnings', () => {
    function getWarningMessages(errorSpy: ReturnType<typeof vi.spyOn>) {
      return errorSpy.mock.calls.map((call: [unknown, ...unknown[]]) =>
        String(call[0]).replace(/\s+/g, ' ').trim().toLowerCase(),
      );
    }

    function expectWarningWithFragments(
      errorSpy: ReturnType<typeof vi.spyOn>,
      fragments: string[],
    ) {
      const messages = getWarningMessages(errorSpy);

      expect(messages.length).toBeGreaterThanOrEqual(1);
      expect(
        messages.some((message: string) =>
          fragments.every((fragment: string) => message.includes(fragment.toLowerCase())),
        ),
      ).toBe(true);
    }

    it('warns when nativeButton is omitted and a custom component resolves to a button host', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NativeButton internalNativeButton={false} />);

      expectWarningWithFragments(errorSpy, ['nativebutton={true}', 'native <button>']);
      errorSpy.mockRestore();
    });

    it('warns when nativeButton is omitted and a custom component resolves to a non-button host', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NonNativeButton internalNativeButton />);

      expectWarningWithFragments(errorSpy, ['nativebutton={false}', 'non-<button>']);
      errorSpy.mockRestore();
    });

    it('warns when nativeButton=true but the resolved host is not a button', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NonNativeButton nativeButtonProp />);

      expectWarningWithFragments(errorSpy, ['nativebutton', 'true', 'native <button>']);
      errorSpy.mockRestore();
    });

    it('warns when nativeButton=false but the resolved host is a button', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NativeButton nativeButtonProp={false} />);

      expectWarningWithFragments(errorSpy, ['nativebutton', 'false', 'non-<button>']);
      errorSpy.mockRestore();
    });

    it('does not warn when the inferred host matches the resolved host', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NativeButton />);
      render(<NonNativeButton internalNativeButton={false} id="non-native" />);

      expect(errorSpy.mock.calls.length).toBe(0);
      errorSpy.mockRestore();
    });

    it('does not warn when nativeButton={false} matches the resolved host', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NonNativeButton nativeButtonProp={false} />);

      expect(errorSpy.mock.calls.length).toBe(0);
      errorSpy.mockRestore();
    });

    it('does not warn when inferred host mismatches are allowed', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NativeButton internalNativeButton={false} allowInferredHostMismatch />);

      expect(errorSpy.mock.calls.length).toBe(0);
      errorSpy.mockRestore();
    });
  });
});
