import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import ImageList from '@mui/material/ImageList';
import ImageListItem, { imageListItemClasses as classes } from '@mui/material/ImageListItem';
import describeConformance from '../../test/describeConformance';

describe('<ImageListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ImageListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
    muiName: 'MuiImageListItem',
    testVariantProps: { variant: 'masonry' },
    skip: ['componentProp'],
  }));

  const itemData = {
    img: '/fake.png',
    title: 'Breakfast',
    author: 'jill111',
  };

  function mountMockImage(imgEl) {
    const Image = React.forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => imgEl, []);

      return <img alt="test" {...props} />;
    });
    Image.muiName = 'Image';

    return render(
      <ImageListItem>
        <Image />
        {null}
      </ImageListItem>,
    );
  }

  describe('mount image', () => {
    it('should handle missing image', () => {
      mountMockImage(null);
    });
  });

  const children = <img src={itemData.img} alt={itemData.title} data-testid="test-children" />;

  describe('props:', () => {
    describe('prop: children', () => {
      it('should render children by default', () => {
        render(<ImageListItem>{children}</ImageListItem>);

        expect(screen.getByTestId('test-children')).not.to.equal(null);
      });
    });

    describe('prop: component', () => {
      it('should render a different component', () => {
        const { container } = render(<ImageListItem component="div">{children}</ImageListItem>);
        expect(container.firstChild).to.have.property('nodeName', 'DIV');
      });
    });

    describe('prop: variant', () => {
      it('should render with the  woven class', () => {
        render(
          <ImageList variant="woven">
            <ImageListItem data-testid="test-children" />
          </ImageList>,
        );

        expect(screen.getByTestId('test-children')).to.have.class(classes.root);
        expect(screen.getByTestId('test-children')).to.have.class(classes.woven);
      });
    });
  });

  describe('classes:', () => {
    it('should render with the root and standard classes by default', () => {
      render(
        <ImageList>
          <ImageListItem data-testid="test-children" />
        </ImageList>,
      );

      expect(screen.getByTestId('test-children')).to.have.class(classes.root);
      expect(screen.getByTestId('test-children')).to.have.class(classes.standard);
    });

    it('should render img with the img class', () => {
      render(<ImageListItem>{children}</ImageListItem>);

      expect(screen.getByTestId('test-children')).to.have.class(classes.img);
    });

    it('should not render a non-img with the img class', () => {
      render(
        <ImageListItem>
          <div data-testid="test-children" />
        </ImageListItem>,
      );

      expect(screen.getByTestId('test-children')).not.to.have.class(classes.img);
    });
  });
});
