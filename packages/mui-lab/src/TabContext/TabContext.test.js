// @ts-check
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TabContext, { getPanelId, getTabId, useTabContext } from './TabContext';

describe('<TabContext />', () => {
  const { render, renderToString } = createRenderer();

  it('is null by default', () => {
    let value;
    function Tabs() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- value is used outside of component
      value = useTabContext();
      return null;
    }

    render(<Tabs />);

    expect(value).to.equal(null);
  });

  it('provides an id prefix for IDREFs and the active value', () => {
    /**
     *
     * @param {{value: string}} props
     */
    function Tabs({ value }) {
      const context = useTabContext();
      if (context === null) {
        throw new TypeError();
      }

      return (
        <React.Fragment>
          <div data-testid="active-value" data-value={context.value} />
          <div role="tab" id={getTabId(context, value)} />
          <div role="tabpanel" id={getPanelId(context, value)} />
        </React.Fragment>
      );
    }

    render(
      <TabContext value="0">
        <Tabs value="0" />
      </TabContext>,
    );

    const tabId = screen.getByRole('tab').id;
    const tabpanelId = screen.getByRole('tabpanel').id;
    expect(tabId.length).to.at.least(1);
    expect(tabpanelId.length).to.at.least(1);
    expect(tabId).not.to.equal(tabpanelId);
    expect(screen.getByTestId('active-value')).to.have.attribute('data-value', '0');
  });

  it('provides undefined tab and panel prefixes and the active value when ssr', () => {
    /**
     *
     * @param {{value: string}} props
     */
    function Tabs({ value }) {
      const context = useTabContext();
      if (context === null) {
        throw new TypeError();
      }

      return (
        <React.Fragment>
          <div data-testid="active-value" data-value={context.value} />
          <div role="tab" id={getTabId(context, value)} />
          <div role="tabpanel" id={getPanelId(context, value)} />
        </React.Fragment>
      );
    }

    const view = ReactDOMServer.renderToStaticMarkup(
      <TabContext value="0">
        <Tabs value="0" />
      </TabContext>,
    );

    expect(view).to.equal(
      '<div data-testid="active-value" data-value="0"></div><div role="tab"></div><div role="tabpanel"></div>',
    );
  });

  it('hydrates tab and tabpanel prefixes', () => {
    /**
     * @param {{value: string}} props
     */
    function Tabs({ value }) {
      const context = useTabContext();
      if (context === null) {
        throw new TypeError();
      }

      return (
        <React.Fragment>
          <div role="tab" id={getTabId(context, value)} />
          <div role="tabpanel" id={getPanelId(context, value)} />
        </React.Fragment>
      );
    }
    const reactElement = (
      <TabContext value="0">
        <Tabs value="0" />
      </TabContext>
    );
    const { hydrate } = renderToString(reactElement);
    hydrate();

    const tabId = screen.getByRole('tab').id;
    const tabpanelId = screen.getByRole('tabpanel').id;
    expect(tabId.length).to.at.least(1);
    expect(tabpanelId.length).to.at.least(1);
    expect(tabId).not.to.equal(tabpanelId);
  });
});
