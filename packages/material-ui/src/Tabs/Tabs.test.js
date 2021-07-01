import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import {
  describeConformanceV5,
  act,
  createClientRender,
  fireEvent,
  screen,
  createServerRender,
} from 'test/utils';
import Tab from '@material-ui/core/Tab';
import Tabs, { tabsClasses as classes } from '@material-ui/core/Tabs';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import capitalize from '../utils/capitalize';

function findScrollButton(container, direction) {
  return container.querySelector(`svg[data-testid="KeyboardArrow${capitalize(direction)}Icon"]`);
}

function hasLeftScrollButton(container) {
  const scrollButton = findScrollButton(container, 'left');

  if (!scrollButton) {
    return false;
  }

  return !scrollButton.parentElement.classList.contains('Mui-disabled');
}

function hasRightScrollButton(container) {
  const scrollButton = findScrollButton(container, 'right');

  if (!scrollButton) {
    return false;
  }

  return !scrollButton.parentElement.classList.contains('Mui-disabled');
}

describe('<Tabs />', () => {
  // tests mocking getBoundingClientRect prevent mocha to exit
  const isJSDOM = navigator.userAgent === 'node.js';

  const render = createClientRender();

  before(function beforeHook() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // The test fails on Safari with just:
    //
    // container.scrollLeft = 200;
    // expect(container.scrollLeft).to.equal(200); 💥
    if (isSafari) {
      this.skip();
    }
  });

  describeConformanceV5(<Tabs value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTabs',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testStateOverrides: { prop: 'orientation', value: 'vertical', styleKey: 'vertical' },
    skip: ['componentsProp', 'themeVariants'],
  }));

  it('can be named via `aria-label`', () => {
    render(<Tabs aria-label="string label" />);

    expect(screen.getByRole('tablist')).toHaveAccessibleName('string label');
  });

  it('can be named via `aria-labelledby`', () => {
    render(
      <React.Fragment>
        <h3 id="label-id">complex name</h3>
        <Tabs aria-labelledby="label-id" />
      </React.Fragment>,
    );

    expect(screen.getByRole('tablist')).toHaveAccessibleName('complex name');
  });

  describe('warnings', () => {
    it('should warn if the input is invalid', () => {
      expect(() => {
        render(<Tabs value={0} centered variant="scrollable" />);
      }).toErrorDev([
        'Material-UI: You can not use the `centered={true}` and `variant="scrollable"`',
        React.version.startsWith('16') &&
          // StrictMode renders twice
          'Material-UI: You can not use the `centered={true}` and `variant="scrollable"`',
        'Material-UI: You can not use the `centered={true}` and `variant="scrollable"`',
        React.version.startsWith('16') &&
          // StrictMode renders twice
          'Material-UI: You can not use the `centered={true}` and `variant="scrollable"`',
      ]);
    });
  });

  describe('prop: action', () => {
    it('should be able to access updateIndicator function', () => {
      let tabsActions = {};
      render(
        <Tabs
          value={0}
          action={(actions) => {
            tabsActions = actions;
          }}
        >
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(typeof tabsActions.updateIndicator).to.equal('function');
      tabsActions.updateIndicator();
    });
  });

  describe('prop: centered', () => {
    it('should render with the centered class', () => {
      const { container } = render(
        <Tabs value={0} centered>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const selector = `.${classes.flexContainer}.${classes.centered}`;
      expect(container.querySelector(selector).nodeName).to.equal('DIV');
    });
  });

  describe('prop: children', () => {
    it('should accept a null child', () => {
      const { getAllByRole } = render(
        <Tabs value={0}>
          {null}
          <Tab />
        </Tabs>,
      );
      expect(getAllByRole('tab')).to.have.lengthOf(1);
    });

    it('should support empty children', () => {
      render(<Tabs value={1} />);
    });

    it('puts the selected child in tab order', () => {
      const { getAllByRole, setProps } = render(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([-1, 0]);

      setProps({ value: 0 });

      expect(getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([0, -1]);
    });
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs value={1}>
        <Tab />
        <Tab />
      </Tabs>
    );

    it('should pass selected prop to children', () => {
      const { getAllByRole } = render(tabs);
      const tabElements = getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'false');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'true');
    });

    it('should accept any value as selected tab value', () => {
      const tab0 = {};
      const tab1 = {};
      expect(tab0).not.to.equal(tab1);

      const { getAllByRole } = render(
        <Tabs value={tab0}>
          <Tab value={tab0} />
          <Tab value={tab1} />
        </Tabs>,
      );
      const tabElements = getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'true');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'false');
    });

    describe('indicator', () => {
      it('should accept a false value', () => {
        const { container } = render(
          <Tabs value={false}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        expect(container.querySelector(`.${classes.indicator}`).style.width).to.equal('0px');
      });

      it('should render the indicator', () => {
        const { container, getAllByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tabElements = getAllByRole('tab');
        expect(tabElements[0].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(tabElements[1].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(container.querySelector(`.${classes.indicator}`)).not.to.equal(null);
      });

      it('should update the indicator at each render', function test() {
        if (isJSDOM) {
          this.skip();
        }

        const { forceUpdate, container, getByRole } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;
        const tab = getByRole('tablist').children[1];

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 100 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 100 });
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 50,
          width: 50,
          right: 100,
        });
        forceUpdate();
        let style;
        style = container.querySelector(`.${classes.indicator}`).style;
        expect(style.left).to.equal('50px');
        expect(style.width).to.equal('50px');
        tab.getBoundingClientRect = () => ({
          left: 60,
          width: 50,
          right: 110,
        });
        forceUpdate();
        style = container.querySelector(`.${classes.indicator}`).style;
        expect(style.left).to.equal('60px');
        expect(style.width).to.equal('50px');
      });

      it('should have "right" for RTL', () => {
        const { forceUpdate, container, getByRole } = render(
          <div dir="rtl">
            <Tabs value={1}>
              <Tab />
              <Tab />
            </Tabs>
          </div>,
          {
            wrapper: ({ children }) => (
              <ThemeProvider theme={createTheme({ direction: 'rtl' })}>{children}</ThemeProvider>
            ),
          },
        );

        const tablistContainer = getByRole('tablist').parentElement;
        const tab = getByRole('tablist').children[1];

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 100 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 100 });
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 50,
          width: 50,
          right: 100,
        });
        forceUpdate();
        expect(container.querySelector(`.${classes.indicator}`)).toHaveInlineStyle({
          right: '0px',
          width: '50px',
        });
        tab.getBoundingClientRect = () => ({
          left: 40,
          width: 50,
          right: 90,
        });
        forceUpdate();
        expect(container.querySelector(`.${classes.indicator}`)).toHaveInlineStyle({
          right: '10px',
          width: '50px',
        });
      });
    });

    describe('warnings', () => {
      it('warns when the value is not present in any tab', () => {
        expect(() => {
          render(
            <Tabs value={2}>
              <Tab value={1} />
              <Tab value={3} />
            </Tabs>,
          );
        }).toErrorDev([
          'You can provide one of the following values: 1, 3',
          // StrictMode renders twice
          'You can provide one of the following values: 1, 3',
          'You can provide one of the following values: 1, 3',
          'You can provide one of the following values: 1, 3',
        ]);
      });

      describe('hidden tab', () => {
        let nodeEnv;

        before(function test() {
          if (!/jsdom/.test(window.navigator.userAgent)) {
            this.skip();
            return;
          }

          nodeEnv = process.env.NODE_ENV;
          // We can't use a regular assignment, because it causes a syntax error in Karma
          Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });
        });

        after(() => {
          Object.defineProperty(process.env, 'NODE_ENV', { value: nodeEnv });
        });

        it('should warn if a Tab has display: none', () => {
          expect(() => {
            render(
              <Tabs value="hidden-tab">
                <Tab value="hidden-tab" style={{ display: 'none' }} />
              </Tabs>,
            );
          }).toErrorDev([
            [
              'Material-UI: The value provided to the Tabs component is invalid.',
              'The Tab with this value (`hidden-tab`) is not part of the document layout.',
              "Make sure the tab item is present in the document or that it's not display none.",
            ].join('\n'),
          ]);
        });
      });
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      fireEvent.click(getAllByRole('tab')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(1);
    });

    it('should not call onChange when already selected', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      fireEvent.click(getAllByRole('tab')[0]);
      expect(handleChange.callCount).to.equal(0);
    });

    it('when `selectionFollowsFocus` should call if an unselected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const [, lastTab] = getAllByRole('tab');

      act(() => {
        lastTab.focus();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[1]).to.equal(1);
    });

    it('when `selectionFollowsFocus` should not call if an selected tab gets focused', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const [firstTab] = getAllByRole('tab');

      act(() => {
        firstTab.focus();
      });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: variant="scrollable"', () => {
    let clock;
    const tabs = (
      <Tabs value={0} style={{ width: 200 }} variant="scrollable">
        <Tab style={{ width: 120, minWidth: 'auto' }} />
        <Tab style={{ width: 120, minWidth: 'auto' }} />
        <Tab style={{ width: 120, minWidth: 'auto' }} />
      </Tabs>
    );

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should render with the scrollable class', () => {
      const { container } = render(tabs);
      const selector = `.${classes.scroller}.${classes.scrollableX}`;
      expect(container.querySelector(selector).tagName).to.equal('DIV');
      expect(container.querySelectorAll(selector)).to.have.lengthOf(1);
    });

    it('should response to scroll events', function test() {
      if (isJSDOM) {
        this.skip();
      }
      const { container, forceUpdate, getByRole } = render(tabs);
      const tablistContainer = getByRole('tablist').parentElement;

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
      tablistContainer.scrollLeft = 10;
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      Object.defineProperty(tablistContainer, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          right: 50,
        }),
      });
      forceUpdate();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);
      tablistContainer.scrollLeft = 0;
      fireEvent.scroll(container.querySelector(`.${classes.scroller}.${classes.scrollableX}`));
      clock.tick(166);

      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(true);
    });

    it('should get a scrollbar size listener', () => {
      const { setProps, getByRole } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentElement;
      expect(tablistContainer.style.overflow).to.equal('hidden');
      setProps({
        variant: 'scrollable',
      });
      expect(tablistContainer.style.overflow).to.equal('');
    });
  });

  describe('prop: !variant="scrollable"', () => {
    it('should not render with the scrollable class', () => {
      const { container } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const baseSelector = `.${classes.scroller}`;
      const selector = `.${classes.scroller}.${classes.scrollableX}`;
      expect(container.querySelector(baseSelector)).not.to.equal(null);
      expect(container.querySelector(selector)).to.equal(null);
    });
  });

  describe('prop: scrollButtons', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should render scroll buttons', () => {
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons>
          <Tab />
          <Tab />
        </Tabs>,
      );
      expect(container.querySelectorAll(`.${classes.scrollButtons}`)).to.have.lengthOf(2);
    });

    it('should append className from TabScrollButtonProps', () => {
      const { container } = render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons
          TabScrollButtonProps={{ className: 'foo' }}
        >
          <Tab />
          <Tab />
        </Tabs>,
      );
      expect(container.querySelectorAll(`.${classes.scrollButtons}`)).to.have.lengthOf(2);
      expect(container.querySelectorAll('.foo')).to.have.lengthOf(2);
    });

    it('should not hide scroll buttons when allowScrollButtonsMobile is true', () => {
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons allowScrollButtonsMobile>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(container.querySelectorAll(`.${classes.scrollButtonsHideMobile}`)).to.have.lengthOf(0);
    });

    it('should handle window resize event', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { container, forceUpdate, getByRole } = render(
        <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );

      const tablistContainer = getByRole('tablist').parentElement;

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
      tablistContainer.scrollLeft = 10;
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      Object.defineProperty(tablistContainer, 'getBoundingClientRect', {
        value: () => ({
          left: 0,
          right: 100,
        }),
      });
      forceUpdate();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);
      tablistContainer.scrollLeft = 0;

      window.dispatchEvent(new window.Event('resize', {}));
      clock.tick(166);

      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(true);
    });

    describe('scroll button visibility states', () => {
      it('should set neither left nor right scroll button state', () => {
        const { container, forceUpdate, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 50, minWidth: 'auto' }} />
            <Tab style={{ width: 50, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 200 - 40 * 2 });

        forceUpdate();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only left scroll button state', () => {
        const { container, forceUpdate, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 96;

        forceUpdate();
        expect(hasLeftScrollButton(container)).to.equal(true);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it('should set only right scroll button state', () => {
        const { container, forceUpdate, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 0;

        forceUpdate();
        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(true);
      });

      it('should set both left and right scroll button state', () => {
        const { container, forceUpdate, getByRole } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablistContainer = getByRole('tablist').parentElement;

        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
        Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
        tablistContainer.scrollLeft = 5;

        forceUpdate();
        expect(hasLeftScrollButton(container)).to.equal(true);
        expect(hasRightScrollButton(container)).to.equal(true);
      });
    });
  });

  describe('scroll button behavior', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should scroll visible items', () => {
      const { container, forceUpdate, getByRole, getAllByRole } = render(
        <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
          <Tab style={{ width: 100, minWidth: 'auto' }} />
          <Tab style={{ width: 50, minWidth: 'auto' }} />
          <Tab style={{ width: 100, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablistContainer = getByRole('tablist').parentElement;
      const tabs = getAllByRole('tab');
      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
      Object.defineProperty(tabs[0], 'clientWidth', { value: 100 });
      Object.defineProperty(tabs[1], 'clientWidth', { value: 50 });
      Object.defineProperty(tabs[2], 'clientWidth', { value: 100 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 100 + 50 + 100 });
      tablistContainer.scrollLeft = 20;
      forceUpdate();
      clock.tick(1000);
      expect(hasLeftScrollButton(container)).to.equal(true);
      expect(hasRightScrollButton(container)).to.equal(true);

      fireEvent.click(findScrollButton(container, 'left'));
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).not.to.be.above(0);

      tablistContainer.scrollLeft = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).equal(100);
    });
  });

  describe('scroll into view behavior', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should scroll left tab into view', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { forceUpdate, getByRole } = render(
        <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablist = getByRole('tablist');
      const tablistContainer = tablist.parentElement;
      const tab = tablist.children[0];

      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 - 40 * 2 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 216 });
      tablistContainer.scrollLeft = 20;
      tablistContainer.getBoundingClientRect = () => ({
        left: 0,
        right: 100,
      });
      tab.getBoundingClientRect = () => ({
        left: -20,
        width: 50,
        right: 30,
      });
      forceUpdate();
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).to.equal(0);
    });
  });

  describe('prop: TabIndicatorProps', () => {
    it('should merge the style', () => {
      const { container } = render(
        <Tabs value={0} TabIndicatorProps={{ style: { backgroundColor: 'green' } }}>
          <Tab />
        </Tabs>,
      );
      const style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.backgroundColor).to.equal('green');
    });
  });

  describe('prop: orientation', () => {
    it('should support orientation="vertical"', function test() {
      if (isJSDOM) {
        this.skip();
      }

      const { forceUpdate, container, getByRole } = render(
        <Tabs value={1} variant="scrollable" scrollButtons orientation="vertical">
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablist = getByRole('tablist');
      const tablistContainer = tablist.parentElement;
      const tab = tablist.children[1];

      Object.defineProperty(tablistContainer, 'clientHeight', { value: 100 });
      Object.defineProperty(tablistContainer, 'scrollHeight', { value: 100 });
      tablistContainer.getBoundingClientRect = () => ({
        top: 0,
        bottom: 100,
      });
      tab.getBoundingClientRect = () => ({
        top: 50,
        height: 50,
        bottom: 100,
      });
      forceUpdate();
      let style;
      style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.top).to.equal('50px');
      expect(style.height).to.equal('50px');
      tab.getBoundingClientRect = () => ({
        top: 60,
        height: 50,
        bottom: 110,
      });
      forceUpdate();
      style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.top).to.equal('60px');
      expect(style.height).to.equal('50px');
    });

    it('does not add aria-orientation by default', () => {
      render(<Tabs value={0} />);

      expect(screen.getByRole('tablist')).not.to.have.attribute('aria-orientation');
    });

    it('adds the proper aria-orientation when vertical', () => {
      render(<Tabs value={0} orientation="vertical" />);

      expect(screen.getByRole('tablist')).to.have.attribute('aria-orientation', 'vertical');
    });
  });

  describe('server-side render', () => {
    const serverRender = createServerRender({ expectUseLayoutEffectWarning: true });

    it('should let the selected <Tab /> render the indicator server-side', () => {
      const container = serverRender(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const indicator = container.firstChild.querySelectorAll(`button > .${classes.indicator}`);
      expect(indicator).to.have.lengthOf(1);
    });
  });

  describe('keyboard navigation when focus is on a tab', () => {
    [
      ['horizontal', 'ltr', 'ArrowLeft', 'ArrowRight'],
      ['horizontal', 'rtl', 'ArrowRight', 'ArrowLeft'],
      ['vertical', undefined, 'ArrowUp', 'ArrowDown'],
    ].forEach((entry) => {
      const [orientation, direction, previousItemKey, nextItemKey] = entry;

      let wrapper;
      before(() => {
        const theme = createTheme({ direction });
        wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
      });

      describe(`when focus is on a tab element in a ${orientation} ${direction} tablist`, () => {
        describe(previousItemKey, () => {
          it('moves focus to the last tab without activating it if focus is on the first tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the last tab while activating it if focus is on the first tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={0}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('moves focus to the previous tab without activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the previous tab while activating it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, secondTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('skips over disabled tabs', () => {
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab disabled />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });
        });

        describe(nextItemKey, () => {
          it('moves focus to the first tab without activating it if focus is on the last tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the first tab while activating it if focus is on the last tab', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={2}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              lastTab.focus();
            });

            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('moves focus to the next tab without activating it it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('when `selectionFollowsFocus` moves focus to the next tab while activating it it', () => {
            const handleChange = spy();
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [, secondTab, lastTab] = getAllByRole('tab');
            act(() => {
              secondTab.focus();
            });

            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });

          it('skips over disabled tabs', () => {
            const handleKeyDown = spy();
            const { getAllByRole } = render(
              <Tabs
                onKeyDown={handleKeyDown}
                orientation={orientation}
                selectionFollowsFocus
                value={1}
              >
                <Tab />
                <Tab disabled />
                <Tab />
              </Tabs>,
              { wrapper },
            );
            const [firstTab, , lastTab] = getAllByRole('tab');
            act(() => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          });
        });
      });
    });

    describe('when focus is on a tab regardless of orientation', () => {
      describe('Home', () => {
        it('moves focus to the first tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('when `selectionFollowsFocus` moves focus to the first tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('moves focus to first non-disabled tab', () => {
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab disabled />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [, secondTab, lastTab] = getAllByRole('tab');
          act(() => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });
      });

      describe('End', () => {
        it('moves focus to the last tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('when `selectionFollowsFocus` moves focus to the last tab without activating it', () => {
          const handleChange = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={0}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const [firstTab, , lastTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(2);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });

        it('moves focus to first non-disabled tab', () => {
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab />
              <Tab />
              <Tab disabled />
            </Tabs>,
          );
          const [firstTab, secondTab] = getAllByRole('tab');
          act(() => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
        });
      });
    });

    it('should allow to focus first tab when there are no active tabs', () => {
      const { getAllByRole } = render(
        <Tabs value={false}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(getAllByRole('tab').map((tab) => tab.getAttribute('tabIndex'))).to.deep.equal([
        '0',
        '-1',
      ]);
    });
  });
});
