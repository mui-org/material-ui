import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  menu2CheckboxItemIndicatorClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItem';

describe('Menu2CheckboxItem indicator slot', () => {
  const { render } = createRenderer();

  function renderItem(
    indicatorProps: Record<string, any> = {},
    itemProps: Record<string, any> = {},
  ) {
    return render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2CheckboxItem
            {...itemProps}
            slotProps={{ indicator: { 'data-testid': 'indicator', ...indicatorProps } }}
          >
            Ruler
          </Menu2CheckboxItem>
        </Menu2Popup>
      </Menu2>,
    );
  }

  describe('icons', () => {
    it('renders the outlined box when unchecked', () => {
      renderItem();

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).not.to.equal(
        null,
      );
      expect(indicator.querySelector('[data-testid="CheckBoxIcon"]')).to.equal(null);
    });

    it('renders the filled box when checked', () => {
      renderItem({}, { defaultChecked: true });

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="CheckBoxIcon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(null);
    });

    it('keeps the default icons on a disabled item', () => {
      renderItem({}, { disabled: true });

      const indicator = screen.getByTestId('indicator');
      expect(indicator).to.have.attribute('data-disabled', '');
      expect(indicator).to.have.class(classes.disabled);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).not.to.equal(
        null,
      );
    });

    it('lets children replace the icon', () => {
      renderItem({ children: <span data-testid="custom-icon" /> });

      const indicator = screen.getByTestId('indicator');
      expect(indicator.querySelector('[data-testid="custom-icon"]')).not.to.equal(null);
      expect(indicator.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(null);
    });
  });
});
