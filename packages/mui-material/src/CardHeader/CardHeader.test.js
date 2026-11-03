import { describe, it, expect, beforeEach } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import { typographyClasses } from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardHeader, { cardHeaderClasses as classes } from '@mui/material/CardHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<CardHeader />', () => {
  const { render } = createRenderer();

  describeConformance(
    <CardHeader title="title" subheader="subheader" avatar={<Avatar />} action={<IconButton />} />,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiCardHeader',
      refInstanceof: window.HTMLDivElement,
      testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
      testComponentPropWith: 'span',
      testVariantProps: { variant: 'foo' },
      slots: {
        root: {
          expectedClassName: classes.root,
        },
        avatar: {
          expectedClassName: classes.avatar,
        },
        action: {
          expectedClassName: classes.action,
        },
        content: {
          expectedClassName: classes.content,
        },
        title: {
          expectedClassName: classes.title,
        },
        subheader: {
          expectedClassName: classes.subheader,
        },
      },
    }),
  );

  describe('without an avatar', () => {
    it('should render the title as headline text', () => {
      const cardHeader = render(<CardHeader title="Title" subheader="Subheader" />).container
        .firstChild;
      const wrapper = cardHeader.firstChild;
      const title = wrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(title).to.have.class(typographyClasses.h5);
    });

    it('should render the subheader as body1', () => {
      const cardHeader = render(<CardHeader title="Title" subheader="Subheader" />).container
        .firstChild;
      const wrapper = cardHeader.firstChild;
      const subheader = wrapper.childNodes[1];
      expect(subheader).to.have.class(typographyClasses.root);
      expect(subheader).to.have.class(typographyClasses.body1);
    });

    it('should not render the subheader if none is given', () => {
      const cardHeader = render(<CardHeader title="Title" />).container.firstChild;
      const wrapper = cardHeader.firstChild;
      const title = wrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(wrapper.childNodes.length).to.equal(1);
    });
  });

  describe('with an avatar', () => {
    const avatar = <span />;
    let cardHeader;

    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-lifecycle
      cardHeader = render(<CardHeader avatar={avatar} title="Title" subheader="Subhead" />)
        .container.firstChild;
    });

    it('should render the avatar inside the first child', () => {
      const avatarWrapper = cardHeader.childNodes[0];
      expect(avatarWrapper).to.have.tagName('div');
      expect(avatarWrapper).to.have.class(classes.avatar);
      expect(avatarWrapper.firstChild).to.have.tagName('span');
    });

    it('should render the title text inside the second child', () => {
      const titleWrapper = cardHeader.childNodes[1];
      expect(titleWrapper).to.have.class(classes.content, 'should have the content class');
      const title = titleWrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(title).to.have.class(typographyClasses.body2);
    });

    it('should render the subheader as body2 secondary text inside the second child', () => {
      const titleWrapper = cardHeader.childNodes[1];
      expect(titleWrapper).to.have.class(classes.content, 'should have the content class');
      const subHeader = titleWrapper.childNodes[1];
      expect(subHeader).to.have.class(typographyClasses.root);
      expect(subHeader).to.have.class(typographyClasses.body2);
    });
  });

  it('should merge className and style from props and from the theme if mergeClassNameAndStyle is true', () => {
    const { container } = render(
      <ThemeProvider
        theme={createTheme({
          components: {
            mergeClassNameAndStyle: true,
            MuiCardHeader: {
              defaultProps: {
                className: 'theme-class',
                style: { margin: '10px' },
                slotProps: {
                  root: {
                    className: 'theme-slot-props-root-class',
                    style: {
                      fontSize: '10px',
                    },
                  },
                  title: {
                    className: 'theme-slot-props-title-class',
                  },
                },
              },
            },
          },
        })}
      >
        <CardHeader
          title="Title"
          subheader="Subheader"
          className="component-class"
          style={{ padding: '10px' }}
          slotProps={{
            title: {
              className: 'slot-props-title-class',
            },
            root: {
              className: 'slot-props-root-class',
              style: {
                fontWeight: 'bold',
              },
            },
          }}
        />
      </ThemeProvider>,
    );
    const cardHeader = container.querySelector(`.${classes.root}`);
    expect(cardHeader).to.have.class('theme-class');
    expect(cardHeader).to.have.class('component-class');
    expect(cardHeader).to.have.class('theme-slot-props-root-class');
    expect(cardHeader).to.have.class('slot-props-root-class');
    expect(cardHeader.style.margin).to.equal('10px'); // from theme
    expect(cardHeader.style.padding).to.equal('10px'); // from props
    expect(cardHeader.style.fontWeight).to.equal('bold'); // from props slotProps
    expect(cardHeader.style.fontSize).to.equal('10px'); // from theme slotProps

    const title = container.querySelector(`.${classes.title}`);
    expect(title).to.have.class('theme-slot-props-title-class');
    expect(title).to.have.class('slot-props-title-class');
  });

  it('should not merge className and style from props and from the theme if mergeClassNameAndStyle is false', () => {
    render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiCardHeader: {
              defaultProps: {
                className: 'test-class-1',
                style: { margin: '10px' },
                slotProps: {
                  title: {
                    className: 'title-class-1',
                  },
                },
              },
            },
          },
        })}
      >
        <CardHeader
          title="Title"
          subheader="Subheader"
          className="test-class-2"
          style={{ padding: '10px' }}
          slotProps={{
            title: {
              className: 'title-class-2',
            },
          }}
        />
      </ThemeProvider>,
    );
    const cardHeader = document.querySelector(`.${classes.root}`);
    expect(cardHeader).to.not.have.class('test-class-1');
    expect(cardHeader).to.have.class('test-class-2');
    expect(cardHeader).to.not.have.style('margin', '10px');
    expect(cardHeader).to.have.style('padding', '10px');

    const title = cardHeader.querySelector(`.${classes.title}`);
    expect(title).to.not.have.class('title-class-1');
    expect(title).to.have.class('title-class-2');
  });
});
