import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

describe('<TabContext /> integration', () => {
  const { render } = createRenderer();

  it('wires up aria attributes', () => {
    const { setProps } = render(
      <TabContext value="0">
        <TabList>
          <Tab label="label one" value="0" />
          <Tab label="label two" value="1" />
        </TabList>
        <TabPanel value="0" />
        <TabPanel value="1" />
      </TabContext>,
    );

    const [tabOne, tabTwo] = screen.getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
    let activePanel = document.getElementById(tabOne.getAttribute('aria-controls'));
    expect(activePanel).not.toBeInaccessible();
    expect(activePanel).toHaveAccessibleName('label one');

    setProps({ value: '1' });

    expect(tabOne).to.have.attribute('aria-selected', 'false');
    expect(tabTwo).to.have.attribute('aria-selected', 'true');
    activePanel = document.getElementById(tabTwo.getAttribute('aria-controls'));
    expect(activePanel).not.toBeInaccessible();
    expect(activePanel).toHaveAccessibleName('label two');
  });
});
