import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem, { imageListItemClasses as classes } from '@material-ui/core/ImageListItem';

describe('<ImageListItem />', () => {
  const render = createClientRender();

  describeConformanceV5(<ImageListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
    muiName: 'MuiImageListItem',
    testVariantProps: { variant: 'masonry' },
    skip: ['componentProp', 'componentsProp'],
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
        const { getByTestId } = render(<ImageListItem>{children}</ImageListItem>);

        expect(getByTestId('test-children')).not.to.equal(null);
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
        const { getByTestId } = render(
          <ImageList variant="woven">
            <ImageListItem data-testid="test-children" />
          </ImageList>,
        );

        expect(getByTestId('test-children')).to.have.class(classes.root);
        expect(getByTestId('test-children')).to.have.class(classes.woven);
      });
    });
  });

  describe('classes:', () => {
    it('should render with the root and standard classes by default', () => {
      const { getByTestId } = render(
        <ImageList>
          <ImageListItem data-testid="test-children" />
        </ImageList>,
      );

      expect(getByTestId('test-children')).to.have.class(classes.root);
      expect(getByTestId('test-children')).to.have.class(classes.standard);
    });

    it('should render img with the img class', () => {
      const { getByTestId } = render(<ImageListItem>{children}</ImageListItem>);

      expect(getByTestId('test-children')).to.have.class(classes.img);
    });

    it('should not render a non-img with the img class', () => {
      const { getByTestId } = render(
        <ImageListItem>
          <div data-testid="test-children" />
        </ImageListItem>,
      );

      expect(getByTestId('test-children')).not.to.have.class(classes.img);
    });
  });
});
