import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import { typographyClasses } from '@material-ui/core/Typography';
import CardHeader, { cardHeaderClasses as classes } from '@material-ui/core/CardHeader';

describe('<CardHeader />', () => {
  const render = createClientRender();

  describeConformanceV5(<CardHeader />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardHeader',
    refInstanceof: window.HTMLDivElement,
    testDeepOverrides: { slotName: 'content', slotClassName: classes.content },
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'foo' },
    skip: ['componentsProp'],
  }));

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
    let avatar;
    let cardHeader;

    beforeEach(() => {
      avatar = <span />;
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
});
