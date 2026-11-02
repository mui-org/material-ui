import { it, expect, describe, beforeAll, afterAll } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  strictModeDoubleLoggingSuppressed,
  waitFor,
  flushEffects,
  isJsdom,
} from '@mui/internal-test-utils';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses as classes } from '@mui/material/Tabs';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createSvgIcon } from '@mui/material/utils';
import capitalize from '../utils/capitalize';
import describeConformance from '../../test/describeConformance';

const isJSDOM = isJsdom();

const ArrowBackIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowBack');
const ArrowForwardIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowForward');

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

// jsdom has no ResizeObserver and no layout, so observed elements are mapped to their callback
// to let tests fire resizes by hand.
function mockResizeObserver() {
  const callbacks = new Map();
  const original = globalThis.ResizeObserver;

  globalThis.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
    }

    observe(element) {
      this.elements.add(element);
      callbacks.set(element, this.callback);
    }

    unobserve(element) {
      this.elements.delete(element);
      callbacks.delete(element);
    }

    disconnect() {
      this.elements.forEach((element) => {
        callbacks.delete(element);
      });
      this.elements.clear();
    }
  };

  return {
    callbacks,
    restore() {
      globalThis.ResizeObserver = original;
    },
  };
}

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isFirefox = /firefox/i.test(navigator.userAgent);

describe.skipIf(isSafari)('<Tabs />', () => {
  const { clock, render, renderToString } = createRenderer();

  describeConformance(<Tabs value={0} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTabs',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testStateOverrides: { prop: 'orientation', value: 'vertical', styleKey: 'vertical' },
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      scroller: {
        expectedClassName: classes.scroller,
      },
      list: {
        expectedClassName: classes.list,
      },
      indicator: {
        expectedClassName: classes.indicator,
      },
    },
    skip: ['themeVariants'],
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

  it('should not add tabindex to the tabs if the selected tab already has it', () => {
    render(
      <Tabs value={0}>
        <Tab tabIndex={-1} />
        <Tab tabIndex={0} />
      </Tabs>,
    );

    const tabElements = screen.getAllByRole('tab');

    expect(tabElements[0].tabIndex).to.equal(-1);
    expect(tabElements[1].tabIndex).to.equal(0);
  });

  describe('keyboard navigation', () => {
    it('should move focus to the next tab when pressing the right arrow key', async () => {
      const { user } = render(
        <Tabs value={0}>
          <Tab />
          <Tab disabled />
          <Tab />
        </Tabs>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowRight}');
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowRight}');
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowLeft}');
      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowLeft}');
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });

    it('should preserve keyboard navigation for wrapped Tab children', async () => {
      const WrappedTab = React.forwardRef(function WrappedTab(props, ref) {
        return <Tab ref={ref} {...props} />;
      });

      const { user } = render(
        <Tabs value={0}>
          <WrappedTab />
          <WrappedTab />
        </Tabs>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      expect(tabElements[0]).toHaveFocus();
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');

      await user.keyboard('{ArrowRight}');
      expect(tabElements[1]).toHaveFocus();
      expect(tabElements[1]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');
    });

    it('should add tabindex="0" to the focused tab', async () => {
      const { user } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      const tabElements = screen.getAllByRole('tab');

      fireEvent.focus(tabElements[1]);
      expect(tabElements[1]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.click(tabElements[0]);
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });
  });

  describe('warnings', () => {
    it('should warn if the input is invalid', () => {
      expect(() => {
        render(<Tabs value={0} centered variant="scrollable" />);
      }).toErrorDev([
        'MUI: You can not use the `centered={true}` and `variant="scrollable"`',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: You can not use the `centered={true}` and `variant="scrollable"`',
        'MUI: You can not use the `centered={true}` and `variant="scrollable"`',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: You can not use the `centered={true}` and `variant="scrollable"`',
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
      const selector = `.${classes.list}.${classes.centered}`;
      expect(container.querySelector(selector).nodeName).to.equal('DIV');
    });
  });

  describe('prop: children', () => {
    it('should accept a null child', () => {
      render(
        <Tabs value={0}>
          {null}
          <Tab />
        </Tabs>,
      );

      expect(screen.getAllByRole('tab')).to.have.lengthOf(1);
    });

    it('should support empty children', () => {
      render(<Tabs value={1} />);
    });

    it('puts the selected child in tab order', () => {
      const { setProps } = render(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(screen.getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([
        -1, 0,
      ]);

      setProps({ value: 0 });

      expect(screen.getAllByRole('tab').map((tab) => tab.tabIndex)).to.have.ordered.members([
        0, -1,
      ]);
    });

    it('keeps the focused tab in tab order when the selected value changes externally', async () => {
      const { setProps, user } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
      );

      const tabElements = screen.getAllByRole('tab');

      await user.tab();
      await user.keyboard('{ArrowRight}{ArrowRight}');

      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      setProps({ value: 1 });

      expect(tabElements[2]).toHaveFocus();
      expect(tabElements[2]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });
  });

  it('props: slots and slotProps, should render custom start and end icons', () => {
    const tabs = (
      <Tabs
        value={0}
        variant="scrollable"
        scrollButtons
        textColor="secondary"
        slots={{
          startScrollButtonIcon: ArrowBackIcon,
          endScrollButtonIcon: ArrowForwardIcon,
        }}
        slotProps={{
          endScrollButtonIcon: (ownerState) => ({
            'data-testid': 'test-label-scrollButtonEnd',
            fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
          }),
          startScrollButtonIcon: (ownerState) => ({
            'data-testid': 'test-label-scrollButtonStart',
            fontSize: ownerState.textColor === 'secondary' ? 'large' : 'small',
          }),
        }}
      >
        <Tab />
        <Tab />
      </Tabs>
    );

    render(tabs);
    expect(screen.getAllByTestId('test-label-scrollButtonStart')).to.have.lengthOf(1);
    expect(screen.getAllByTestId('test-label-scrollButtonEnd')).to.have.lengthOf(1);
    expect(screen.getByTestId('test-label-scrollButtonStart')).to.have.class(
      svgIconClasses.fontSizeLarge,
    );
    expect(screen.getByTestId('test-label-scrollButtonEnd')).to.have.class(
      svgIconClasses.fontSizeLarge,
    );
  });

  describe('prop: value', () => {
    const tabs = (
      <Tabs value={1}>
        <Tab />
        <Tab />
      </Tabs>
    );

    it('should pass selected prop to children', () => {
      render(tabs);
      const tabElements = screen.getAllByRole('tab');
      expect(tabElements[0]).to.have.attribute('aria-selected', 'false');
      expect(tabElements[1]).to.have.attribute('aria-selected', 'true');
    });

    it('should accept any value as selected tab value', () => {
      const tab0 = {};
      const tab1 = {};
      expect(tab0).not.to.equal(tab1);

      render(
        <Tabs value={tab0}>
          <Tab value={tab0} />
          <Tab value={tab1} />
        </Tabs>,
      );

      const tabElements = screen.getAllByRole('tab');
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
        const { container } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tabElements = screen.getAllByRole('tab');
        expect(tabElements[0].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(tabElements[1].querySelector(`.${classes.indicator}`)).to.equal(null);
        expect(container.querySelector(`.${classes.indicator}`)).not.to.equal(null);
      });

      it('should update the indicator at each render', function test() {
        const { forceUpdate, container } = render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = screen.getByRole('tablist').parentElement;
        const tab = screen.getByRole('tablist').children[1];

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
        const { forceUpdate, container } = render(
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

        const tablistContainer = screen.getByRole('tablist').parentElement;
        const tab = screen.getByRole('tablist').children[1];

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

      it.skipIf(isJSDOM)(
        'should align the indicator with the selected tab when an ancestor is scaled',
        () => {
          const { container } = render(
            <div style={{ transform: 'scale(2)' }}>
              <Tabs value={1} style={{ width: 400 }}>
                <Tab style={{ width: 120, minWidth: 'auto' }} />
                <Tab style={{ width: 120, minWidth: 'auto' }} />
                <Tab style={{ width: 120, minWidth: 'auto' }} />
              </Tabs>
            </div>,
          );
          const tab = screen.getByRole('tablist').children[1];
          const indicator = container.querySelector(`.${classes.indicator}`);

          expect(parseFloat(indicator.style.left)).to.be.closeTo(tab.offsetLeft, 0.5);
          expect(parseFloat(indicator.style.width)).to.be.closeTo(tab.offsetWidth, 0.5);
        },
      );

      it.skipIf(isJSDOM)(
        'should align the indicator with the selected vertical tab when an ancestor is scaled',
        () => {
          const { container } = render(
            <div style={{ transform: 'scaleY(0.5)', transformOrigin: 'top left' }}>
              <Tabs value={1} orientation="vertical">
                <Tab style={{ height: 60 }} />
                <Tab style={{ height: 60 }} />
                <Tab style={{ height: 60 }} />
              </Tabs>
            </div>,
          );
          const tab = screen.getByRole('tablist').children[1];
          const indicator = container.querySelector(`.${classes.indicator}`);

          expect(parseFloat(indicator.style.top)).to.be.closeTo(tab.offsetTop, 0.5);
          expect(parseFloat(indicator.style.height)).to.be.closeTo(tab.offsetHeight, 0.5);
        },
      );

      it.skipIf(isJSDOM)(
        'should keep the sub-pixel indicator measurement when no transform is applied',
        () => {
          const { container } = render(
            <Tabs value={1} variant="fullWidth" style={{ width: 300.5 }}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );
          const tablistContainer = screen.getByRole('tablist').parentElement;
          const tab = screen.getByRole('tablist').children[1];
          const indicator = container.querySelector(`.${classes.indicator}`);
          const tablistContainerRect = tablistContainer.getBoundingClientRect();
          const tabRect = tab.getBoundingClientRect();

          expect(parseFloat(indicator.style.left)).to.be.closeTo(
            tabRect.left - tablistContainerRect.left,
            0.001,
          );
          expect(parseFloat(indicator.style.width)).to.be.closeTo(tabRect.width, 0.001);
        },
      );
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
          // The warning is logged only once (see `warnedTabValueInvalid`).
        }).toErrorDev(['You can provide one of the following values: 1, 3']);
      });

      describe.skipIf(!isJsdom())('hidden tab / tabs', () => {
        let nodeEnv;

        beforeAll(function test() {
          nodeEnv = process.env.NODE_ENV;
          Object.defineProperty(process.env, 'NODE_ENV', {
            value: 'development',
            configurable: true,
            writable: true,
            enumerable: true,
          });
        });

        afterAll(() => {
          Object.defineProperty(process.env, 'NODE_ENV', {
            value: nodeEnv,
            configurable: true,
            writable: true,
            enumerable: true,
          });
        });

        it.skipIf(isJSDOM)('should warn if a `Tab` has display: none', function test() {
          expect(() => {
            render(
              <Tabs value="hidden-tab">
                <Tab value="hidden-tab" style={{ display: 'none' }} />
              </Tabs>,
            );
          }).toErrorDev([
            [
              'MUI: The `value` provided to the Tabs component is invalid.',
              'The Tab with this `value` ("hidden-tab") is not part of the document layout.',
              "Make sure the tab item is present in the document or that it's not `display: none`.",
            ].join('\n'),
          ]);
        });

        it('should not warn if the whole Tabs is hidden', function test() {
          expect(() => {
            render(
              <Tabs value="demo" style={{ display: 'none' }}>
                <Tab value="demo" style={{ display: 'none' }} />
              </Tabs>,
            );
          }).not.toErrorDev();
        });
      });
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when clicking', () => {
      const handleChange = spy();

      render(
        <Tabs value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      fireEvent.click(screen.getAllByRole('tab')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(1);
    });

    it('should not call onChange when already selected', () => {
      const handleChange = spy();

      render(
        <Tabs value={0} onChange={handleChange}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      fireEvent.click(screen.getAllByRole('tab')[0]);
      expect(handleChange.callCount).to.equal(0);
    });

    it('when `selectionFollowsFocus` should call if an unselected tab gets focused', async () => {
      const handleChange = spy();

      render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );

      const [, lastTab] = screen.getAllByRole('tab');

      await act(async () => {
        lastTab.focus();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.args[1]).to.equal(1);
    });

    it('when `selectionFollowsFocus` should not call if an selected tab gets focused', async () => {
      const handleChange = spy();

      render(
        <Tabs value={0} onChange={handleChange} selectionFollowsFocus>
          <Tab />
          <Tab />
        </Tabs>,
      );

      const [firstTab] = screen.getAllByRole('tab');

      await act(async () => {
        firstTab.focus();
      });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: variant="scrollable"', () => {
    const tabs = (
      <Tabs value={0} style={{ width: 200 }} variant="scrollable">
        <Tab style={{ width: 120, minWidth: 'auto' }} />
        <Tab style={{ width: 120, minWidth: 'auto' }} />
        <Tab style={{ width: 120, minWidth: 'auto' }} />
      </Tabs>
    );

    it('should render with the scrollable class', () => {
      const { container } = render(tabs);
      const selector = `.${classes.scroller}.${classes.scrollableX}`;
      expect(container.querySelector(selector).tagName).to.equal('DIV');
      expect(container.querySelectorAll(selector)).to.have.lengthOf(1);
    });

    it('should get a scrollbar size listener', () => {
      const { setProps } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablistContainer = screen.getByRole('tablist').parentElement;
      expect(tablistContainer.style.overflow).to.equal('hidden');
      setProps({
        variant: 'scrollable',
      });
      expect(tablistContainer.style.overflow).to.equal('');
    });

    it('should handle theme styleOverrides for scrollable tabs without crashing', () => {
      const theme = createTheme({
        components: {
          MuiTabs: {
            styleOverrides: {
              root: ({ ownerState: { orientation } }) => ({
                ...(orientation === 'vertical'
                  ? {
                      background: 'magenta',
                    }
                  : {
                      background: 'lime',
                    }),
              }),
            },
          },
        },
      });

      expect(() =>
        render(
          <ThemeProvider theme={theme}>
            <Tabs sx={{ width: 200 }} value={0} variant="scrollable">
              <Tab label="First" />
              <Tab label="Second" />
            </Tabs>
          </ThemeProvider>,
        ),
      ).not.to.throw();
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
    it('should render scroll buttons', () => {
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons>
          <Tab />
          <Tab />
        </Tabs>,
      );
      expect(container.querySelectorAll(`.${classes.scrollButtons}`)).to.have.lengthOf(2);
    });

    it('should append className from slotProps.scrollButtons', () => {
      const { container } = render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons
          slotProps={{ scrollButtons: { className: 'foo' } }}
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

    describe('scroll button visibility states', () => {
      it('should set neither left nor right scroll button state', function test() {
        const { container } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 50, minWidth: 'auto' }} />
            <Tab style={{ width: 50, minWidth: 'auto' }} />
          </Tabs>,
        );

        expect(hasLeftScrollButton(container)).to.equal(false);
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it.skipIf(isJSDOM)('should set only left scroll button state', async function test() {
        const { container } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablistContainer = screen.getByRole('tablist').parentElement;

        tablistContainer.scrollLeft = 240;

        await waitFor(() => {
          expect(hasLeftScrollButton(container)).to.equal(true);
        });
        expect(hasRightScrollButton(container)).to.equal(false);
      });

      it.skipIf(isJSDOM)('should set only right scroll button state', async function test() {
        const { container } = render(
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab />
            <Tab />
            <Tab />
          </Tabs>,
        );
        const tablistContainer = screen.getByRole('tablist').parentElement;

        tablistContainer.scrollLeft = 0;

        await waitFor(() => {
          expect(hasLeftScrollButton(container)).to.equal(false);
        });
        await waitFor(() => {
          expect(hasRightScrollButton(container)).to.equal(true);
        });
      });

      it.skipIf(isJSDOM)(
        'should set both left and right scroll button state',
        async function test() {
          const { container } = render(
            <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
              <Tab style={{ width: 120, minWidth: 'auto' }} />
              <Tab style={{ width: 120, minWidth: 'auto' }} />
            </Tabs>,
          );
          const tablistContainer = screen.getByRole('tablist').parentElement;

          tablistContainer.scrollLeft = 5;

          await waitFor(() => {
            expect(hasLeftScrollButton(container)).to.equal(true);
          });
          await waitFor(() => {
            expect(hasRightScrollButton(container)).to.equal(true);
          });
        },
      );
    });
  });

  // Firefox reports fractional `scrollLeft`/`scrollTop` in Vitest browser mode, so the
  // exact integer assertions in these scroll tests fail.
  // See https://github.com/vitest-dev/vitest/issues/9223
  describe.skipIf(isFirefox)('scroll button behavior', () => {
    clock.withFakeTimers();

    it.skipIf(isJSDOM)('should scroll visible items', async function test() {
      clock.restore();
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
          <Tab style={{ width: 100, minWidth: 'auto' }} />
          <Tab style={{ width: 50, minWidth: 'auto' }} />
          <Tab style={{ width: 100, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablistContainer = screen.getByRole('tablist').parentElement;

      tablistContainer.scrollLeft = 20;

      await waitFor(() => {
        expect(hasLeftScrollButton(container)).to.equal(true);
      });
      expect(hasRightScrollButton(container)).to.equal(true);

      fireEvent.click(findScrollButton(container, 'left'));
      await waitFor(() => {
        expect(tablistContainer.scrollLeft).not.to.be.above(0);
      });

      tablistContainer.scrollLeft = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      await waitFor(() => {
        expect(tablistContainer.scrollLeft).equal(100);
      });
    });

    it('should horizontally scroll by width of partially visible item', () => {
      const { container } = render(
        <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
          <Tab style={{ width: 220, minWidth: 'auto' }} />
          <Tab style={{ width: 200, minWidth: 'auto' }} />
          <Tab style={{ width: 200, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablistContainer = screen.getByRole('tablist').parentElement;
      const tabs = screen.getAllByRole('tab');
      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
      Object.defineProperty(tabs[0], 'clientWidth', { value: 220 });
      Object.defineProperty(tabs[1], 'clientWidth', { value: 200 });
      Object.defineProperty(tabs[2], 'clientWidth', { value: 200 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 620 });

      tablistContainer.scrollLeft = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).equal(200);
    });

    it('should not animate scroll buttons when reduced motion is always', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Tabs value={0} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 220, minWidth: 'auto' }} />
            <Tab style={{ width: 200, minWidth: 'auto' }} />
            <Tab style={{ width: 200, minWidth: 'auto' }} />
          </Tabs>
        </ThemeProvider>,
      );
      const tablistContainer = screen.getByRole('tablist').parentElement;
      const tabs = screen.getAllByRole('tab');
      Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
      Object.defineProperty(tabs[0], 'clientWidth', { value: 220 });
      Object.defineProperty(tabs[1], 'clientWidth', { value: 200 });
      Object.defineProperty(tabs[2], 'clientWidth', { value: 200 });
      Object.defineProperty(tablistContainer, 'scrollWidth', { value: 620 });

      tablistContainer.scrollLeft = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      expect(tablistContainer.scrollLeft).equal(200);
    });

    it('should vertically scroll by width of partially visible item', () => {
      const { container } = render(
        <Tabs
          value={0}
          variant="scrollable"
          orientation="vertical"
          scrollButtons
          style={{ height: 100 }}
        >
          <Tab style={{ height: 48 }} />
          <Tab style={{ height: 60 }} />
          <Tab style={{ height: 60 }} />
        </Tabs>,
      );
      const tablistContainer = screen.getByRole('tablist').parentElement;
      const tabs = screen.getAllByRole('tab');
      Object.defineProperty(tablistContainer, 'clientHeight', { value: 100 });
      Object.defineProperty(tabs[0], 'clientHeight', { value: 48 });
      Object.defineProperty(tabs[1], 'clientHeight', { value: 60 });
      Object.defineProperty(tabs[2], 'clientHeight', { value: 60 });
      Object.defineProperty(tablistContainer, 'scrollHeight', { value: 168 });

      tablistContainer.scrollTop = 0;
      fireEvent.click(findScrollButton(container, 'right'));
      clock.tick(1000);
      expect(tablistContainer.scrollTop).equal(48);
    });
  });

  describe('scroll into view behavior', () => {
    clock.withFakeTimers();

    it('should scroll left tab into view', function test() {
      const { forceUpdate } = render(
        <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablist = screen.getByRole('tablist');
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

    // Firefox reports fractional `scrollLeft` in Vitest browser mode.
    // See https://github.com/vitest-dev/vitest/issues/9223
    it.skipIf(isFirefox)(
      'should scroll the selected tab into view when the scroller resizes (scrollButtons="auto")',
      () => {
        const { callbacks, restore } = mockResizeObserver();

        try {
          render(
            <Tabs value={2} variant="scrollable" scrollButtons="auto" style={{ width: 200 }}>
              <Tab style={{ width: 120, minWidth: 'auto' }} />
              <Tab style={{ width: 120, minWidth: 'auto' }} />
              <Tab style={{ width: 120, minWidth: 'auto' }} />
            </Tabs>,
          );

          const tablist = screen.getByRole('tablist');
          const tablistContainer = tablist.parentElement;
          const selectedTab = tablist.children[2];

          // Mounting the scroll buttons narrows the scroller, leaving the selected tab
          // overhanging its right edge by 110px.
          tablistContainer.getBoundingClientRect = () => ({ left: 40, right: 160 });
          selectedTab.getBoundingClientRect = () => ({ left: 150, right: 270 });
          tablistContainer.scrollLeft = 0;

          const scrollerCallback = callbacks.get(tablistContainer);
          expect(scrollerCallback).not.to.equal(undefined);

          scrollerCallback([]);

          expect(tablistContainer.scrollLeft).to.equal(110);
        } finally {
          restore();
        }
      },
    );

    it('should not observe the scroller when scrollButtons is not "auto"', () => {
      const { callbacks, restore } = mockResizeObserver();

      try {
        render(
          <Tabs value={2} variant="scrollable" scrollButtons style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );

        const tablistContainer = screen.getByRole('tablist').parentElement;

        expect(callbacks.has(tablistContainer)).to.equal(false);
      } finally {
        restore();
      }
    });

    it('should stop observing the scroller on unmount', () => {
      const { callbacks, restore } = mockResizeObserver();

      try {
        const { unmount } = render(
          <Tabs value={2} variant="scrollable" scrollButtons="auto" style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );

        const tablistContainer = screen.getByRole('tablist').parentElement;
        expect(callbacks.has(tablistContainer)).to.equal(true);

        unmount();

        expect(callbacks.has(tablistContainer)).to.equal(false);
      } finally {
        restore();
      }
    });

    // Firefox reports fractional `scrollLeft`/`scrollTop` in Vitest browser mode, so the exact
    // integer assertions in the scroll-padding tests fail there.
    // See https://github.com/vitest-dev/vitest/issues/9223
    it.skipIf(isFirefox)(
      'should account for scroll-padding-left when scrolling a tab into view on the left',
      function test() {
        const { forceUpdate } = render(
          <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablist = screen.getByRole('tablist');
        const tablistContainer = tablist.parentElement;
        const tab = tablist.children[0];

        tablistContainer.style.scrollPaddingLeft = '15px';
        Object.defineProperty(tablistContainer, 'clientWidth', { value: 100 });
        tablistContainer.scrollLeft = 100;
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 10,
          width: 50,
          right: 60,
        });
        forceUpdate();
        clock.tick(1000);
        expect(tablistContainer.scrollLeft).to.equal(95);
      },
    );

    it.skipIf(isFirefox)(
      'should account for scroll-padding-right when scrolling a tab into view on the right',
      function test() {
        const { forceUpdate } = render(
          <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablist = screen.getByRole('tablist');
        const tablistContainer = tablist.parentElement;
        const tab = tablist.children[0];

        tablistContainer.style.scrollPaddingRight = '20px';
        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
        tablistContainer.scrollLeft = 0;
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 100,
          width: 50,
          right: 150,
        });
        forceUpdate();
        clock.tick(1000);
        expect(tablistContainer.scrollLeft).to.equal(70);
      },
    );

    it.skipIf(isFirefox)(
      'should resolve a percentage scroll-padding against the scroller clientWidth',
      function test() {
        const { forceUpdate } = render(
          <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
            <Tab style={{ width: 120, minWidth: 'auto' }} />
          </Tabs>,
        );
        const tablist = screen.getByRole('tablist');
        const tablistContainer = tablist.parentElement;
        const tab = tablist.children[0];

        tablistContainer.style.scrollPaddingRight = '10%';
        // Deliberately wider than the 100px bounding rect below: the expected 70 only holds if
        // the percentage resolves against `clientWidth` (the scrollport) and not against the rect.
        Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
        tablistContainer.scrollLeft = 0;
        tablistContainer.getBoundingClientRect = () => ({
          left: 0,
          right: 100,
        });
        tab.getBoundingClientRect = () => ({
          left: 100,
          width: 50,
          right: 150,
        });
        forceUpdate();
        clock.tick(1000);
        expect(tablistContainer.scrollLeft).to.equal(70);
      },
    );

    it.skipIf(isFirefox)(
      'should account for scroll-padding-bottom when scrolling a vertical tab into view',
      function test() {
        const { forceUpdate } = render(
          <Tabs value={0} variant="scrollable" orientation="vertical" style={{ height: 200 }}>
            <Tab style={{ height: 120 }} />
            <Tab style={{ height: 120 }} />
            <Tab style={{ height: 120 }} />
          </Tabs>,
        );
        const tablist = screen.getByRole('tablist');
        const tablistContainer = tablist.parentElement;
        const tab = tablist.children[0];

        tablistContainer.style.scrollPaddingBottom = '20px';
        Object.defineProperty(tablistContainer, 'clientHeight', { value: 200 });
        tablistContainer.scrollTop = 0;
        tablistContainer.getBoundingClientRect = () => ({
          top: 0,
          bottom: 100,
        });
        tab.getBoundingClientRect = () => ({
          top: 100,
          height: 50,
          bottom: 150,
        });
        forceUpdate();
        clock.tick(1000);
        expect(tablistContainer.scrollTop).to.equal(70);
      },
    );

    it.skipIf(isFirefox)(
      'should account for scroll-padding-top when scrolling a vertical tab into view',
      function test() {
        const { forceUpdate } = render(
          <Tabs value={0} variant="scrollable" orientation="vertical" style={{ height: 200 }}>
            <Tab style={{ height: 120 }} />
            <Tab style={{ height: 120 }} />
            <Tab style={{ height: 120 }} />
          </Tabs>,
        );
        const tablist = screen.getByRole('tablist');
        const tablistContainer = tablist.parentElement;
        const tab = tablist.children[0];

        tablistContainer.style.scrollPaddingTop = '15px';
        Object.defineProperty(tablistContainer, 'clientHeight', { value: 100 });
        tablistContainer.scrollTop = 100;
        tablistContainer.getBoundingClientRect = () => ({
          top: 0,
          bottom: 100,
        });
        tab.getBoundingClientRect = () => ({
          top: 10,
          height: 50,
          bottom: 60,
        });
        forceUpdate();
        clock.tick(1000);
        expect(tablistContainer.scrollTop).to.equal(95);
      },
    );

    it.skipIf(isFirefox)('should treat a scroll-padding of `auto` as no padding', function test() {
      const { forceUpdate } = render(
        <Tabs value={0} variant="scrollable" style={{ width: 200 }}>
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
          <Tab style={{ width: 120, minWidth: 'auto' }} />
        </Tabs>,
      );
      const tablist = screen.getByRole('tablist');
      const tablistContainer = tablist.parentElement;
      const tab = tablist.children[0];

      tablistContainer.style.scrollPaddingRight = 'auto';
      Object.defineProperty(tablistContainer, 'clientWidth', { value: 100 });
      tablistContainer.scrollLeft = 0;
      tablistContainer.getBoundingClientRect = () => ({
        left: 0,
        right: 100,
      });
      tab.getBoundingClientRect = () => ({
        left: 100,
        width: 50,
        right: 150,
      });
      forceUpdate();
      clock.tick(1000);
      expect(tablistContainer.scrollLeft).to.equal(50);
    });

    it.skipIf(isFirefox)(
      'should align the start edge when the tab is larger than the padded scrollport',
      function test() {
        const { callbacks, restore } = mockResizeObserver();

        try {
          const { forceUpdate } = render(
            <Tabs value={0} variant="scrollable" scrollButtons="auto" style={{ width: 200 }}>
              <Tab style={{ width: 120, minWidth: 'auto' }} />
              <Tab style={{ width: 120, minWidth: 'auto' }} />
              <Tab style={{ width: 120, minWidth: 'auto' }} />
            </Tabs>,
          );
          const tablist = screen.getByRole('tablist');
          const tablistContainer = tablist.parentElement;
          const tab = tablist.children[0];

          // 60 + 120 + 60 doesn't fit in the 200px scrollport, so neither edge can clear its
          // scroll-padding: aligning the end edge would push the start edge back out.
          tablistContainer.style.scrollPaddingLeft = '60px';
          tablistContainer.style.scrollPaddingRight = '60px';
          Object.defineProperty(tablistContainer, 'clientWidth', { value: 200 });
          tablistContainer.scrollLeft = 0;
          tablistContainer.getBoundingClientRect = () => ({
            left: 0,
            right: 200,
          });
          tab.getBoundingClientRect = () => ({
            left: 120,
            width: 120,
            right: 240,
          });
          forceUpdate();
          clock.tick(1000);
          expect(tablistContainer.scrollLeft).to.equal(60);

          // The tab now sits at [60, 180] and still overhangs the padded end edge. A second pass
          // has to leave it alone instead of scrolling it back.
          tab.getBoundingClientRect = () => ({
            left: 60,
            width: 120,
            right: 180,
          });
          callbacks.get(tablistContainer)([]);
          clock.tick(1000);
          expect(tablistContainer.scrollLeft).to.equal(60);
        } finally {
          restore();
        }
      },
    );

    it.skipIf(isJSDOM)(
      'should scroll the selected tab into view when an ancestor is scaled',
      function test() {
        render(
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
            <Tabs value={3} variant="scrollable" scrollButtons={false} style={{ width: 200 }}>
              <Tab style={{ width: 100, minWidth: 'auto' }} />
              <Tab style={{ width: 100, minWidth: 'auto' }} />
              <Tab style={{ width: 100, minWidth: 'auto' }} />
              <Tab style={{ width: 100, minWidth: 'auto' }} />
              <Tab style={{ width: 100, minWidth: 'auto' }} />
              <Tab style={{ width: 100, minWidth: 'auto' }} />
            </Tabs>
          </div>,
        );
        const tablistContainer = screen.getByRole('tablist').parentElement;

        expect(tablistContainer.scrollLeft).to.be.closeTo(200, 0.5);
      },
    );
  });

  describe('slotProps: indicator', () => {
    it('should merge the style', () => {
      const { container } = render(
        <Tabs value={0} slotProps={{ indicator: { style: { backgroundColor: 'green' } } }}>
          <Tab />
        </Tabs>,
      );
      const style = container.querySelector(`.${classes.indicator}`).style;
      expect(style.backgroundColor).to.equal('green');
    });
  });

  describe('prop: orientation', () => {
    it('should support orientation="vertical"', function test() {
      const { forceUpdate, container } = render(
        <Tabs value={1} variant="scrollable" scrollButtons orientation="vertical">
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tablist = screen.getByRole('tablist');
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
    it('should let the selected <Tab /> render the indicator server-side', () => {
      const { container } = renderToString(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const indicator = container.firstChild.querySelectorAll(`button > .${classes.indicator}`);
      expect(indicator).to.have.lengthOf(1);
    });

    it('renders the selected tab as tabbable server-side', () => {
      const { container } = renderToString(
        <Tabs value={1}>
          <Tab />
          <Tab />
        </Tabs>,
      );
      const tabElements = container.querySelectorAll('[role="tab"]');

      expect(tabElements[0]).to.have.attribute('tabindex', '-1');
      expect(tabElements[1]).to.have.attribute('tabindex', '0');
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
      beforeAll(() => {
        const theme = createTheme({ direction });
        wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
      });

      describe(`when focus is on a tab element in a ${orientation} ${direction} tablist`, () => {
        describe(`${previousItemKey}`, () => {
          it('moves focus to the last tab without activating it if focus is on the first tab', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              firstTab.focus();
            });

            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('when `selectionFollowsFocus` moves focus to the last tab while activating it if focus is on the first tab', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              firstTab.focus();
            });
            fireEvent.keyDown(firstTab, { key: previousItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('moves focus to the previous tab without activating it', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, secondTab] = screen.getAllByRole('tab');
            await act(async () => {
              secondTab.focus();
            });
            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('when `selectionFollowsFocus` moves focus to the previous tab while activating it', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, secondTab] = screen.getAllByRole('tab');
            await act(async () => {
              secondTab.focus();
            });
            fireEvent.keyDown(secondTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('skips over disabled tabs', async () => {
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              lastTab.focus();
            });
            fireEvent.keyDown(lastTab, { key: previousItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });
        });

        describe(`${nextItemKey}`, () => {
          it('moves focus to the first tab without activating it if focus is on the last tab', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              lastTab.focus();
            });
            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('when `selectionFollowsFocus` moves focus to the first tab while activating it if focus is on the last tab', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              lastTab.focus();
            });
            fireEvent.keyDown(lastTab, { key: nextItemKey });

            expect(firstTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('moves focus to the next tab without activating it it', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [, secondTab, lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              secondTab.focus();
            });
            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(0);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('when `selectionFollowsFocus` moves focus to the next tab while activating it it', async () => {
            const handleChange = spy();
            const handleKeyDown = spy();

            render(
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

            const [, secondTab, lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              secondTab.focus();
            });
            fireEvent.keyDown(secondTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleChange.callCount).to.equal(1);
            expect(handleChange.firstCall.args[1]).to.equal(2);
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });

          it('skips over disabled tabs', async () => {
            const handleKeyDown = spy();

            render(
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

            const [firstTab, , lastTab] = screen.getAllByRole('tab');
            await act(async () => {
              firstTab.focus();
            });
            fireEvent.keyDown(firstTab, { key: nextItemKey });

            expect(lastTab).toHaveFocus();
            expect(handleKeyDown.callCount).to.equal(1);
            expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

            await flushEffects();
          });
        });
      });
    });

    describe('when focus is on a tab regardless of orientation', () => {
      describe('Home', () => {
        it('moves focus to the first tab without activating it', async () => {
          const handleChange = spy();
          const handleKeyDown = spy();

          render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );

          const [firstTab, , lastTab] = screen.getAllByRole('tab');
          await act(async () => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });

        it('when `selectionFollowsFocus` moves focus to the first tab without activating it', async () => {
          const handleChange = spy();
          const handleKeyDown = spy();

          render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );

          const [firstTab, , lastTab] = screen.getAllByRole('tab');
          await act(async () => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(firstTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });

        it('moves focus to first non-disabled tab', async () => {
          const handleKeyDown = spy();

          render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab disabled />
              <Tab />
              <Tab />
            </Tabs>,
          );

          const [, secondTab, lastTab] = screen.getAllByRole('tab');
          await act(async () => {
            lastTab.focus();
          });

          fireEvent.keyDown(lastTab, { key: 'Home' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });
      });

      describe('End', () => {
        it('moves focus to the last tab without activating it', async () => {
          const handleChange = spy();
          const handleKeyDown = spy();

          render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} value={1}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );

          const [firstTab, , lastTab] = screen.getAllByRole('tab');
          await act(async () => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(0);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });

        it('when `selectionFollowsFocus` moves focus to the last tab without activating it', async () => {
          const handleChange = spy();
          const handleKeyDown = spy();

          render(
            <Tabs onChange={handleChange} onKeyDown={handleKeyDown} selectionFollowsFocus value={0}>
              <Tab />
              <Tab />
              <Tab />
            </Tabs>,
          );

          const [firstTab, , lastTab] = screen.getAllByRole('tab');
          await act(async () => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(lastTab).toHaveFocus();
          expect(handleChange.callCount).to.equal(1);
          expect(handleChange.firstCall.args[1]).to.equal(2);
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });

        it('moves focus to first non-disabled tab', async () => {
          const handleKeyDown = spy();

          render(
            <Tabs onKeyDown={handleKeyDown} selectionFollowsFocus value={2}>
              <Tab />
              <Tab />
              <Tab disabled />
            </Tabs>,
          );

          const [firstTab, secondTab] = screen.getAllByRole('tab');
          await act(async () => {
            firstTab.focus();
          });

          fireEvent.keyDown(firstTab, { key: 'End' });

          expect(secondTab).toHaveFocus();
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);

          await flushEffects();
        });
      });
    });

    it('should allow to focus first tab when there are no active tabs', () => {
      render(
        <Tabs value={false}>
          <Tab />
          <Tab />
        </Tabs>,
      );

      expect(screen.getAllByRole('tab').map((tab) => tab.getAttribute('tabIndex'))).to.deep.equal([
        '0',
        '-1',
      ]);
    });

    ['Alt', 'Shift', 'Ctrl', 'Meta'].forEach((modifierKey) => {
      it(`does not navigate when ${modifierKey} is pressed with ArrowLeft`, async () => {
        render(
          <Tabs value={1}>
            <Tab />
            <Tab />
          </Tabs>,
        );

        const [firstTab, secondTab] = screen.getAllByRole('tab');
        await act(async () => {
          secondTab.focus();
        });

        fireEvent.keyDown(secondTab, {
          key: 'ArrowLeft',
          [`${modifierKey.toLowerCase()}Key`]: true,
        });

        expect(secondTab).toHaveFocus();
        expect(firstTab).not.toHaveFocus();
      });
    });
  });

  describe('keyboard navigation in shadow DOM', () => {
    it('should navigate between tabs using arrow keys when rendered in shadow DOM', async function test() {
      // Create a shadow root
      const shadowHost = document.createElement('div');
      document.body.appendChild(shadowHost);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

      // Render directly into shadow root
      const shadowContainer = document.createElement('div');
      shadowRoot.appendChild(shadowContainer);

      const { unmount, user } = render(
        <Tabs value={0}>
          <Tab />
          <Tab />
          <Tab />
        </Tabs>,
        { container: shadowContainer },
      );

      const tabs = shadowRoot.querySelectorAll('[role="tab"]');
      const [firstTab, secondTab, thirdTab] = Array.from(tabs);

      await act(async () => {
        firstTab.focus();
      });

      // Verify first tab has focus
      expect(shadowRoot.activeElement).to.equal(firstTab);

      // Navigate to second tab using ArrowRight
      await user.keyboard('{ArrowRight}');
      expect(shadowRoot.activeElement).to.equal(secondTab);

      // Navigate to third tab using ArrowRight
      await user.keyboard('{ArrowRight}');
      expect(shadowRoot.activeElement).to.equal(thirdTab);

      // Navigate back to second tab using ArrowLeft
      await user.keyboard('{ArrowLeft}');
      expect(shadowRoot.activeElement).to.equal(secondTab);

      // Cleanup
      unmount();
      if (shadowHost.parentNode) {
        document.body.removeChild(shadowHost);
      }
    });
  });

  describe('dynamic tabs', () => {
    const pause = (timeout) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });

    // https://github.com/mui/material-ui/issues/31936
    it('should not show scroll buttons if a tab added or removed in vertical mode', async function test() {
      function DynamicTabs() {
        const [value, setValue] = React.useState(0);
        const handleChange = (event, newValue) => {
          setValue(newValue);
        };
        const [tabs, setTabs] = React.useState(['item1', 'item2']);
        return (
          <React.Fragment>
            <button
              data-testid="add"
              onClick={() => {
                setTabs([...tabs, `item${tabs.length + 1}`]);
              }}
            >
              add
            </button>
            <button
              data-testid="delete"
              onClick={() => {
                setTabs(tabs.slice(0, tabs.length - 1));
                setValue(0);
              }}
            >
              delete
            </button>
            <Tabs
              onChange={handleChange}
              value={value}
              orientation="vertical"
              variant="scrollable"
              scrollButtons
              style={{ width: '260px' }}
            >
              {tabs.map((label, index) => (
                <Tab key={`tab${index}`} label={label} />
              ))}
            </Tabs>
          </React.Fragment>
        );
      }
      const { container, user } = render(<DynamicTabs />);
      const addButton = screen.getByTestId('add');
      const deleteButton = screen.getByTestId('delete');

      await user.click(addButton);
      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(false);

      const tabs = screen.getAllByRole('tab');
      const lastTab = tabs[tabs.length - 1];
      await user.click(lastTab);
      await pause(400);

      await user.click(deleteButton);
      expect(hasLeftScrollButton(container)).to.equal(false);
      expect(hasRightScrollButton(container)).to.equal(false);
    });
  });

  describe('scrollButtons slot', () => {
    it('should render start and end scroll buttons', () => {
      render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons
          slotProps={{
            scrollButtons: { 'data-testid': 'scroll-button', className: 'foo' },
          }}
        />,
      );
      expect(screen.getAllByTestId('scroll-button')).to.have.length(2);
      expect(screen.getAllByTestId('scroll-button')[0]).to.have.class(classes.scrollButtons);
      expect(screen.getAllByTestId('scroll-button')[0]).to.have.class('foo');
      expect(screen.getAllByTestId('scroll-button')[1]).to.have.class(classes.scrollButtons);
      expect(screen.getAllByTestId('scroll-button')[1]).to.have.class('foo');
    });

    it('should render a custom scroll button', () => {
      function CustomButton({ ownerState, slots, slotProps, ...props }) {
        return <button data-testid="scroll-button" {...props} />;
      }
      render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons
          slots={{
            scrollButtons: CustomButton,
          }}
          slotProps={{
            scrollButtons: { className: 'foo' },
          }}
        />,
      );
      expect(screen.getAllByTestId('scroll-button')).to.have.length(2);
      expect(screen.getAllByTestId('scroll-button')[0]).to.have.class(classes.scrollButtons);
      expect(screen.getAllByTestId('scroll-button')[0]).to.have.class('foo');
      expect(screen.getAllByTestId('scroll-button')[1]).to.have.class(classes.scrollButtons);
      expect(screen.getAllByTestId('scroll-button')[1]).to.have.class('foo');
    });

    it('should render a start and end scroll button icons', () => {
      render(
        <Tabs
          value={0}
          variant="scrollable"
          scrollButtons
          slotProps={{
            startScrollButtonIcon: { 'data-testid': 'start-scroll-button-icon', className: 'foo' },
            endScrollButtonIcon: { 'data-testid': 'end-scroll-button-icon', className: 'bar' },
          }}
        />,
      );

      expect(screen.getByTestId('start-scroll-button-icon')).to.have.class('foo');
      expect(screen.getByTestId('end-scroll-button-icon')).to.have.class('bar');
    });
  });
});
