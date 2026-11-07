import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem, {
  menu2RadioItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItem';

describe('Menu2RadioItem indicator slot', () => {
  const { render } = createRenderer();

  // A real browser reports the transform as a matrix, jsdom as written.
  function getScale(element: Element) {
    const { transform } = window.getComputedStyle(element);
    return Number(/^(?:matrix|scale)\(([^,)]+)/.exec(transform)?.[1]);
  }

  function renderGroup(indicatorProps: Record<string, any> = {}) {
    return render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2RadioGroup defaultValue="one">
            <Menu2RadioItem
              value="one"
              slotProps={{ indicator: { 'data-testid': 'checked', ...indicatorProps } }}
            >
              One
            </Menu2RadioItem>
            <Menu2RadioItem
              value="two"
              slotProps={{ indicator: { 'data-testid': 'unchecked', ...indicatorProps } }}
            >
              Two
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );
  }

  describe('icons', () => {
    it('renders both Radio layers and scales the dot with the state', () => {
      renderGroup();

      const checked = screen.getByTestId('checked');
      const unchecked = screen.getByTestId('unchecked');

      [checked, unchecked].forEach((indicator) => {
        expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
          null,
        );
      });

      expect(getScale(checked.querySelector('[data-testid="RadioButtonCheckedIcon"]')!)).to.equal(
        1,
      );
      expect(getScale(unchecked.querySelector('[data-testid="RadioButtonCheckedIcon"]')!)).to.equal(
        0,
      );
    });

    it.skipIf(isJsdom())('keeps the transition the real Radio animates the dot with', () => {
      renderGroup();

      const dot = screen
        .getByTestId('checked')
        .querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
      expect(window.getComputedStyle(dot).transitionProperty).to.contain('transform');
    });

    it('keeps the icon and dot mounted when selection changes', async () => {
      const { user } = renderGroup();
      const indicator = screen.getByTestId('unchecked');
      const icon = indicator.firstElementChild;
      const dot = indicator.querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
      expect(getScale(dot)).to.equal(0);

      await user.click(screen.getByRole('menuitemradio', { name: 'Two' }));
      expect(indicator.firstElementChild).to.equal(icon);
      expect(indicator.querySelector('[data-testid="RadioButtonCheckedIcon"]')).to.equal(dot);
      await waitFor(() => expect(getScale(dot)).to.equal(1));

      await user.click(screen.getByRole('menuitemradio', { name: 'One' }));
      expect(indicator.firstElementChild).to.equal(icon);
      expect(indicator.querySelector('[data-testid="RadioButtonCheckedIcon"]')).to.equal(dot);
      await waitFor(() => expect(getScale(dot)).to.equal(0));
    });

    it('keeps the highlighted item on the default icons', async () => {
      const { user } = renderGroup();

      const item = screen.getByRole('menuitemradio', { name: 'Two' });
      await user.hover(item);
      // user.hover() has no movement delta. Base UI ignores that event in WebKit.
      fireEvent.mouseMove(item, { movementX: 1, movementY: 0 });

      const indicator = screen.getByTestId('unchecked');
      expect(indicator).to.have.class(classes.highlighted);
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
        null,
      );
    });

    it('lets children replace the icon', () => {
      renderGroup({ children: <span data-testid="custom-icon" /> });

      const indicator = screen.getByTestId('checked');
      expect(indicator.querySelector('[data-testid="custom-icon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).to.equal(null);
    });
  });
});
