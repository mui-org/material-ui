import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import ImageListItemBar, {
  imageListItemBarClasses as classes,
} from '@material-ui/core/ImageListItemBar';

describe('<ImageListItemBar />', () => {
  const render = createClientRender();

  describeConformanceV5(<ImageListItemBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiImageListItemBar',
    testDeepOverrides: { slotName: 'titleWrap', slotClassName: classes.titleWrap },
    testVariantProps: { position: 'top', actionPosition: 'left' },
    skip: ['componentProp', 'componentsProp'],
  }));

  const itemData = {
    img: '/fake.png',
    title: 'Breakfast',
    author: 'jill111',
  };

  describe('props:', () => {
    describe('prop: title', () => {
      it('should render a title', () => {
        const { container } = render(<ImageListItemBar title={itemData.title} />);

        expect(container.querySelector('div')).to.have.text(itemData.title);
      });
    });

    describe('prop: subtitle', () => {
      it('should render a subtitle', () => {
        const { container } = render(<ImageListItemBar subtitle={itemData.author} />);

        expect(container.querySelector('div')).to.have.text(itemData.author);
      });
    });

    describe('prop: position', () => {
      describe('position="top"', () => {
        it('should render the positionTop class', () => {
          const { container } = render(<ImageListItemBar title="text" position="top" />);

          expect(container.querySelector('div')).to.have.class(classes.root);
          expect(container.querySelector('div')).to.have.class(classes.positionTop);
        });
      });

      describe('position="below"', () => {
        it('should render the positionBelow class', () => {
          const { container } = render(<ImageListItemBar title="text" position="below" />);

          expect(container.querySelector('div')).to.have.class(classes.root);
          expect(container.querySelector('div')).to.have.class(classes.positionBelow);
        });

        it('should render a child div with the titleWrapBelow class', () => {
          const { container } = render(<ImageListItemBar title="text" position="below" />);

          expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
          expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrapBelow);
        });
      });
    });

    describe('prop: actionPosition', () => {
      it('should render a child div with the titleWrapActionPosLeft class', () => {
        const { container } = render(
          <ImageListItemBar title="text" actionIcon={<div />} actionPosition="left" />,
        );

        expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
        expect(container.firstChild.querySelector('div')).to.have.class(
          classes.titleWrapActionPosLeft,
        );
      });
    });
  });

  describe('classes:', () => {
    it('should render with the root and positionBottom classes by default', () => {
      const { container } = render(<ImageListItemBar title="text" />);

      expect(container.querySelector('div')).to.have.class(classes.root);
      expect(container.querySelector('div')).to.have.class(classes.positionBottom);
    });
  });
});
