import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent, describeConformanceV5 } from 'test/utils';
import { spy } from 'sinon';
import Avatar, { avatarClasses as classes } from '@material-ui/core/Avatar';
import CancelIcon from '../internal/svg-icons/Cancel';

describe('<Avatar />', () => {
  const render = createClientRender();

  describeConformanceV5(<Avatar />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiAvatar',
    testDeepOverrides: { slotName: 'fallback', slotClassName: classes.fallback },
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'rounded', styleKey: 'rounded' },
    skip: ['componentsProp'],
  }));

  describe('image avatar', () => {
    it('should render a div containing an img', () => {
      const { container } = render(
        <Avatar
          className="my-avatar"
          src="/fake.png"
          alt="Hello World!"
          data-my-prop="woofAvatar"
        />,
      );
      const avatar = container.firstChild;
      const img = avatar.firstChild;
      expect(avatar).to.have.tagName('div');
      expect(img).to.have.tagName('img');
      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
      expect(avatar).not.to.have.class(classes.colorDefault);
      expect(img).to.have.class(classes.img);
      expect(img).to.have.attribute('alt', 'Hello World!');
      expect(img).to.have.attribute('src', '/fake.png');
    });

    it('should be able to add more props to the image', () => {
      const onError = spy();
      const { container } = render(<Avatar src="/fake.png" imgProps={{ onError }} />);
      const img = container.querySelector('img');
      fireEvent.error(img);
      expect(onError.callCount).to.equal(1);
    });
  });

  describe('image avatar with unrendered children', () => {
    it('should render a div containing an img, not children', () => {
      const { container } = render(<Avatar src="/fake.png">MB</Avatar>);
      const avatar = container.firstChild;
      const imgs = container.querySelectorAll('img');
      expect(imgs.length).to.equal(1);
      expect(avatar).to.have.text('');
    });

    it('should be able to add more props to the image', () => {
      const onError = spy();
      const { container } = render(<Avatar src="/fake.png" imgProps={{ onError }} />);
      const img = container.querySelector('img');
      fireEvent.error(img);
      expect(onError.callCount).to.equal(1);
    });
  });

  describe('font icon avatar', () => {
    it('should render a div containing an font icon', () => {
      const { container } = render(
        <Avatar>
          <span className="my-icon-font" data-testid="icon">
            icon
          </span>
        </Avatar>,
      );
      const avatar = container.firstChild;
      const icon = avatar.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(icon).to.have.tagName('span');
      expect(icon).to.have.class('my-icon-font');
      expect(icon).to.have.text('icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const { container } = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <span>icon</span>
        </Avatar>,
      );
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      const { container } = render(
        <Avatar data-testid="avatar">
          <span>icon</span>
        </Avatar>,
      );
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('svg icon avatar', () => {
    it('should render a div containing an svg icon', () => {
      const container = render(
        <Avatar>
          <CancelIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      const cancelIcon = avatar.firstChild;
      expect(cancelIcon).to.have.attribute('data-testid', 'CancelIcon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          <CancelIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      const container = render(
        <Avatar>
          <CancelIcon />
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('text avatar', () => {
    it('should render a div containing a string', () => {
      const container = render(<Avatar>OT</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(avatar.firstChild).to.text('OT');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          OT
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      const container = render(<Avatar>OT</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorDefault);
    });
  });

  describe('falsey avatar', () => {
    it('should render with defaultColor class when supplied with a child with falsey value', () => {
      const container = render(<Avatar>{0}</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.tagName('div');
      expect(avatar.firstChild).to.text('0');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      const container = render(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          {0}
        </Avatar>,
      ).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.root);
      expect(avatar).to.have.class('my-avatar');
      expect(avatar).to.have.attribute('data-my-prop', 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      const container = render(<Avatar>{0}</Avatar>).container;
      const avatar = container.firstChild;

      expect(avatar).to.have.class(classes.colorDefault);
    });
  });
});
