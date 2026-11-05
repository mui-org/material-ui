import * as React from 'react';
import { spy } from 'sinon';
import { describe, it, expect } from 'vitest';
import { act, createRenderer } from '@mui/internal-test-utils';
import type { LazyRipple } from './useLazyRipple';
import useLazyRipple from './useLazyRipple';
import type { TouchRippleActions } from '../ButtonBase/TouchRipple';

describe('useLazyRipple', () => {
  const { render } = createRenderer();

  function Fixture({ onRipple }: { onRipple: (ripple: LazyRipple) => void }) {
    const ripple = useLazyRipple();
    onRipple(ripple);
    return null;
  }

  it('resolves mount() even when no ripple is rendered', async () => {
    let ripple!: LazyRipple;
    render(
      <Fixture
        onRipple={(instance) => {
          ripple = instance;
        }}
      />,
    );

    await act(async () => {
      ripple.start({} as React.SyntheticEvent);
    });

    await ripple.mount();

    expect(ripple.shouldMount).to.equal(true);
    expect(ripple.ref.current).to.equal(null);
  });

  it('forwards queued actions to the ripple when one is mounted', async () => {
    let ripple!: LazyRipple;
    render(
      <Fixture
        onRipple={(instance) => {
          ripple = instance;
        }}
      />,
    );

    const actions = { start: spy(), stop: spy(), pulsate: spy() };
    ripple.ref.current = actions as unknown as TouchRippleActions;

    const event = {} as React.SyntheticEvent;
    await act(async () => {
      ripple.start(event);
    });
    await ripple.mount();

    expect(actions.start.callCount).to.equal(1);
    expect(actions.start.firstCall.args[0]).to.equal(event);
  });
});
