import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import ListItemButton, { listItemButtonClasses as classes } from '@mui/material/ListItemButton';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';

describe('<ListItemButton />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemButton />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'a',
    muiName: 'MuiListItemButton',
    testVariantProps: { dense: true },
  }));

  it('should render with gutters classes', () => {
    render(<ListItemButton />);
    expect(screen.getByRole('button')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    render(<ListItemButton selected />);
    expect(screen.getByRole('button')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    render(<ListItemButton disableGutters />);
    expect(screen.getByRole('button')).not.to.have.class(classes.gutters);
  });

  it('does not pass classes.root to ButtonBase classes', () => {
    render(<ListItemButton classes={{ root: 'my-root-class' }}>Item</ListItemButton>);
    const button = screen.getByRole('button');
    const classList = button.className.split(' ');
    expect(classList.filter((c) => c === 'my-root-class')).to.have.length(1);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItemButton>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItemButton>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe.skipIf(isJsdom())('prop: focusVisibleClassName', () => {
    it('should merge the class names', async () => {
      render(<ListItemButton focusVisibleClassName="focusVisibleClassName" />);

      const button = screen.getByRole('button');

      fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });

      await act(async () => {
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });

  describe('prop: href', () => {
    const href = 'example.com';

    it('should render as link without specifying component="a"', () => {
      render(<ListItemButton href={href} />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as link when specifying component="div"', () => {
      render(<ListItemButton href={href} component="div" />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as link when specifying component="a"', () => {
      render(<ListItemButton href={href} component="a" />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as specifying component', () => {
      render(<ListItemButton href={href} component="h1" />);

      const heading = screen.getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });

  describe('prop: to', () => {
    const to = 'example.com';

    it('should render as link without specifying component="a"', () => {
      render(<ListItemButton to={to} />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as link when specifying component="div"', () => {
      render(<ListItemButton to={to} component="div" />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as link when specifying component="a"', () => {
      render(<ListItemButton to={to} component="a" />);

      const link = screen.getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should render as specifying component', () => {
      render(<ListItemButton to={to} component="h1" />);

      const heading = screen.getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });

  describe('prop: LinkComponent', () => {
    const href = 'example.com';
    const customLinkId = 'customLink';
    const CustomLink = React.forwardRef((props, ref) => {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a data-testid={customLinkId} ref={ref} {...props} />;
    });

    it('should render as LinkComponent when href is provided', () => {
      const { container } = render(<ListItemButton href={href} LinkComponent={CustomLink} />);
      const button = container.firstChild;

      expect(screen.getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should ignore LinkComponent is component is provided', () => {
      const { container } = render(
        <ListItemButton href={href} LinkComponent={CustomLink} component="h1" />,
      );
      const button = container.firstChild;

      expect(screen.queryByTestId(customLinkId)).to.equal(null);
      expect(button).to.have.property('nodeName', 'H1');
      expect(button).to.have.attribute('href', href);
    });

    it('should render as LinkComponent (from theme) when href is provided', () => {
      const theme = createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(screen.getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should render as LinkComponent (from theme MuiButtonBase) when href is provided', () => {
      const theme = createTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(screen.getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should prefer LinkComponent from MuiListItemButton over MuiButtonBase', () => {
      const WrongCustomLink = React.forwardRef((props, ref) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="wrong-link" ref={ref} {...props} />;
      });

      const theme = createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: WrongCustomLink,
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(screen.getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });
  });

  describe('prop: nativeButton', () => {
    it('uses link mode (not native-button) when href is present', () => {
      render(<ListItemButton href="https://example.com" />);

      const link = screen.getByRole('link');
      expect(link).to.have.tagName('A');
      expect(link).not.to.have.attribute('type', 'button');
      expect(link).not.to.have.attribute('role', 'button');
    });
  });
});
