import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { DemoErrorOverlay } from './DemoErrorOverlay';

describe('DemoErrorOverlay', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  it('delays visible errors by 300ms and clears them immediately', () => {
    const { rerender } = render(<DemoErrorOverlay message="Error: broken (2:4)" />);

    expect(screen.queryByRole('alert')).to.equal(null);
    act(() => clock.tick(299));
    expect(screen.queryByRole('alert')).to.equal(null);
    act(() => clock.tick(1));
    expect(screen.getByRole('alert')).to.have.text('Error: broken');

    rerender(<DemoErrorOverlay message={null} />);
    expect(screen.queryByRole('alert')).to.equal(null);

    rerender(<DemoErrorOverlay message="Error: broken (2:4)" />);
    expect(screen.queryByRole('alert')).to.equal(null);
    act(() => clock.tick(300));
    expect(screen.getByRole('alert')).to.have.text('Error: broken');
  });

  it('shows only the latest error after rapid updates', () => {
    const { rerender } = render(<DemoErrorOverlay message="first" />);
    act(() => clock.tick(200));
    rerender(<DemoErrorOverlay message="second" />);
    act(() => clock.tick(299));

    expect(screen.queryByRole('alert')).to.equal(null);
    act(() => clock.tick(1));
    expect(screen.getByRole('alert')).to.have.text('second');
  });
});
