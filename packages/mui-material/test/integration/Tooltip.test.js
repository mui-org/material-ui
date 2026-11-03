import { describe, expect, it } from 'vitest';
import { createRenderer, screen, isJsdom, act, fireEvent } from '@mui/internal-test-utils';
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';

function focusVisibleSync(element) {
  act(() => {
    element.blur();
  });
  fireEvent.keyDown(document.body, { key: 'Tab' });
  act(() => {
    element.focus();
  });
}

describe('<Tooltip> integration', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())(
    'does not throw error and closes Tooltip when Input becomes disabled while focused',
    () => {
      function TestCase({ disabled }) {
        return (
          <Tooltip
            title="Test"
            enterDelay={0}
            leaveDelay={0}
            slotProps={{ transition: { timeout: 0 } }}
          >
            <Input disabled={disabled} placeholder="click here and wait" />
          </Tooltip>
        );
      }

      const { setProps } = render(<TestCase disabled={false} />);

      const input = screen.getByRole('textbox');

      focusVisibleSync(input);

      expect(screen.getByRole('tooltip')).toBeVisible();

      expect(() => {
        setProps({ disabled: true });
      }).not.to.throw();

      expect(screen.getByRole('tooltip')).not.toBeVisible();
    },
  );
});
