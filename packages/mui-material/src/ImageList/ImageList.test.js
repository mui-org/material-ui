import { describe, it, expect } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import ImageList, { imageListClasses as classes } from '@mui/material/ImageList';
import describeConformance from '../../test/describeConformance';

const itemsData = [
  {
    img: '/fake.png',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: '/fake.png',
    title: 'Tasty burger',
    author: 'director90',
  },
];

describe('<ImageList />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ImageList>
      <div />
    </ImageList>,
    () => ({
      classes,
      inheritComponent: 'ul',
      render,
      refInstanceof: window.HTMLUListElement,
      testComponentPropWith: 'li',
      muiName: 'MuiImageList',
      testVariantProps: { variant: 'masonry' },
      skip: ['componentProp'],
    }),
  );

  const children = itemsData.map((item) => (
    <span key={item.title} title={item.title} data-testid="test-children">
      <img src={item.img} alt="foo" />
    </span>
  ));

  it('should render children by default', () => {
    render(<ImageList>{children}</ImageList>);

    expect(screen.getAllByTestId('test-children').length).to.equal(2);
  });

  describe('classes:', () => {
    it('should render with the root and standard classes by default', () => {
      render(<ImageList data-testid="test-root">{children}</ImageList>);

      expect(screen.getByTestId('test-root')).to.have.class(classes.root);
      expect(screen.getByTestId('test-root')).to.have.class(classes.standard);
    });

    it('should render with the masonry class', () => {
      render(
        <ImageList data-testid="test-root" variant="masonry">
          {children}
        </ImageList>,
      );

      expect(screen.getByTestId('test-root')).to.have.class(classes.root);
      expect(screen.getByTestId('test-root')).to.have.class(classes.masonry);
    });

    it('should render with the quilted class', () => {
      render(
        <ImageList data-testid="test-root" variant="quilted">
          {children}
        </ImageList>,
      );

      expect(screen.getByTestId('test-root')).to.have.class(classes.root);
      expect(screen.getByTestId('test-root')).to.have.class(classes.quilted);
    });

    it('should render with the woven class', () => {
      render(
        <ImageList data-testid="test-root" variant="woven">
          {children}
        </ImageList>,
      );

      expect(screen.getByTestId('test-root')).to.have.class(classes.root);
      expect(screen.getByTestId('test-root')).to.have.class(classes.woven);
    });
  });

  describe('style attribute:', () => {
    it.skipIf(!isJsdom())(
      'should render with default grid-template-columns and gap styles',
      function test() {
        render(<ImageList data-testid="test-root">{children}</ImageList>);

        expect(screen.getByTestId('test-root').style['grid-template-columns']).to.equal(
          'repeat(2, 1fr)',
        );
        expect(screen.getByTestId('test-root').style.gap).to.equal('4px');
      },
    );

    it('should overwrite style', () => {
      const style = { backgroundColor: 'red' };

      render(
        <ImageList style={style} data-testid="test-root">
          {children}
        </ImageList>,
      );

      expect(screen.getByTestId('test-root')).toHaveInlineStyle({ backgroundColor: 'red' });
    });
  });

  describe('props:', () => {
    describe('prop: component', () => {
      it('should render a ul by default', () => {
        const { container } = render(<ImageList>{children}</ImageList>);
        expect(container.firstChild).to.have.property('nodeName', 'UL');
      });

      it('should render a different component', () => {
        const { container } = render(<ImageList component="div">{children}</ImageList>);
        expect(container.firstChild).to.have.property('nodeName', 'DIV');
      });
    });

    describe('prop: className', () => {
      it('should append the className to the root element', () => {
        const { container } = render(<ImageList className="foo">{children}</ImageList>);
        expect(container.firstChild).to.have.class('foo');
      });
    });

    describe('prop: variant', () => {
      it.skipIf(!isJsdom())(
        'should render with column-count and column-gap styles',
        function test() {
          render(
            <ImageList data-testid="test-root" variant="masonry">
              {children}
            </ImageList>,
          );

          expect(screen.getByTestId('test-root').style['column-count']).to.equal('2');
          expect(screen.getByTestId('test-root').style['column-gap']).to.equal('4px');
        },
      );
    });

    describe('prop: cols', () => {
      it.skipIf(!isJsdom())(
        'should render with modified grid-template-columns style',
        function test() {
          render(
            <ImageList data-testid="test-root" cols={4}>
              {children}
            </ImageList>,
          );

          expect(screen.getByTestId('test-root').style['grid-template-columns']).to.equal(
            'repeat(4, 1fr)',
          );
        },
      );

      it.skipIf(!isJsdom())('should render with modified column-count style', function test() {
        render(
          <ImageList data-testid="test-root" variant="masonry" cols={4}>
            {children}
          </ImageList>,
        );

        expect(screen.getByTestId('test-root').style['column-count']).to.equal('4');
      });
    });

    describe('prop: gap', () => {
      it.skipIf(isJsdom())(
        'should render with modified grid-template-columns style',
        function test() {
          render(
            <ImageList data-testid="test-root" gap={8}>
              {children}
            </ImageList>,
          );

          expect(screen.getByTestId('test-root')).toHaveComputedStyle({
            rowGap: '8px',
            columnGap: '8px',
          });
        },
      );

      it.skipIf(isJsdom())('should render with modified column-gap style', function test() {
        render(
          <ImageList data-testid="test-root" variant="masonry" gap={8}>
            {children}
          </ImageList>,
        );

        expect(screen.getByTestId('test-root')).toHaveComputedStyle({
          columnGap: '8px',
        });
      });
    });
  });
});
