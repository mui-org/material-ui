import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import ImageListItemBar, {
  imageListItemBarClasses as classes,
} from '@mui/material/ImageListItemBar';
import describeConformance from '../../test/describeConformance';

describe('<ImageListItemBar />', () => {
  const { render } = createRenderer();

  describeConformance(<ImageListItemBar title="conform?" />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiImageListItemBar',
    testDeepOverrides: { slotName: 'titleWrap', slotClassName: classes.titleWrap },
    testVariantProps: { position: 'top', actionPosition: 'left' },
    skip: ['componentProp'],
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

    describe('prop:actionPosition', () => {
      it('should render the actionPositionLeft class', () => {
        const { container } = render(<ImageListItemBar title="text" actionPosition="left" />);

        expect(container.querySelector('div')).to.have.class(classes.root);
        expect(container.querySelector('div')).to.have.class(classes.actionPositionLeft);
      });

      it('should render the actionPositionRight class', () => {
        const { container } = render(<ImageListItemBar title="text" actionPosition="right" />);

        expect(container.querySelector('div')).to.have.class(classes.root);
        expect(container.querySelector('div')).to.have.class(classes.actionPositionRight);
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

        it('should render the titleWrap class and positionBelow on the root', () => {
          const { container } = render(<ImageListItemBar title="text" position="below" />);

          expect(container.querySelector('div')).to.have.class(classes.positionBelow);
          expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
        });
      });
    });

    describe('prop: actionPosition', () => {
      it('should render the titleWrap class and actionPositionLeft on the root', () => {
        const { container } = render(
          <ImageListItemBar title="text" actionIcon={<div />} actionPosition="left" />,
        );

        expect(container.querySelector('div')).to.have.class(classes.actionPositionLeft);
        expect(container.firstChild.querySelector('div')).to.have.class(classes.titleWrap);
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
