import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TabPanel, { tabPanelClasses as classes } from '@material-ui/lab/TabPanel';
import TabContext from '../TabContext';

describe('<TabPanel />', () => {
  const render = createClientRender();

  describeConformanceV5(<TabPanel value="0" />, () => ({
    classes,
    inheritComponent: 'div',
    render: (node) => render(<TabContext value="0">{node}</TabContext>),
    wrapMount: (mount) => (node) => mount(<TabContext value="0">{node}</TabContext>),
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiTabPanel',
    skip: [
      'componentProp',
      'componentsProp',
      'reactTestRenderer',
      'themeDefaultProps',
      'themeVariants',
    ],
  }));

  it('renders a [role="tabpanel"]', () => {
    const { getByTestId } = render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0" />
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.attribute('role', 'tabpanel');
  });

  it('is [hidden] when TabPanel#value !== TabContext#value and does not mount children', () => {
    const { getByTestId, queryByTestId } = render(
      <TabContext value="1">
        <TabPanel data-testid="tabpanel" value="0">
          <div data-testid="child" />
        </TabPanel>
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).to.have.property('hidden', true);
    expect(queryByTestId('child')).to.equal(null);
  });

  it('is accessible when TabPanel#value === TabContext#value', () => {
    const { getByTestId } = render(
      <TabContext value="0">
        <TabPanel data-testid="tabpanel" value="0" />
      </TabContext>,
    );

    expect(getByTestId('tabpanel')).not.toBeInaccessible();
  });

  it('allows flow content', () => {
    render(
      <TabContext value="0">
        <TabPanel value="0">
          <h2>Panel 0</h2>
          <p>The content of panel 0</p>
        </TabPanel>
      </TabContext>,
    );
  });
});
