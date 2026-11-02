import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses as classes } from '@mui/material/Tabs';
import TabList from './TabList';
import TabContext from '../TabContext';
import describeConformance from '../../test/describeConformance';

describe('<TabList />', () => {
  const { render } = createRenderer();

  describeConformance(<TabList />, () => ({
    classes,
    inheritComponent: Tabs,
    /**
     * @param {React.ReactNode} node
     */
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    skip: ['themeDefaultProps', 'themeStyleOverrides', 'themeVariants', 'rootClass'],
  }));

  // outside of TabContext pass every test in Tabs

  it('provides the active value to Tab so that they can be indicated as selected', () => {
    render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          <Tab value="1" />
        </TabList>
      </TabContext>,
    );

    const [tabOne, tabTwo] = screen.getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
  });

  it('should accept a null child', () => {
    render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          {null}
        </TabList>
      </TabContext>,
    );
  });
});
