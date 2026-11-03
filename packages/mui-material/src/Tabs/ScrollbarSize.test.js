import { describe, it, expect } from 'vitest';
import { spy, stub } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describe('mount', () => {
    it('should call on initial load', () => {
      const onChange = spy();
      render(<ScrollbarSize onChange={onChange} />);

      expect(onChange.called).to.equal(true);
    });

    it('should not block pointer events', () => {
      const onChange = spy();
      render(<ScrollbarSize data-testid="scrollbar-size" onChange={onChange} />);

      expect(screen.getByTestId('scrollbar-size').style.pointerEvents).to.equal('none');
    });
  });

  describe('prop: onChange', () => {
    it('should call on first resize event', async () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });

    it('should not call if height has not changed from previous resize', async () => {
      const onChange = spy();
      const { container } = render(<ScrollbarSize onChange={onChange} />);
      stub(container.firstChild, 'offsetHeight').get(() => 20);
      stub(container.firstChild, 'clientHeight').get(() => 0);

      onChange.resetHistory();

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][0]).to.equal(20);
    });
  });
});
