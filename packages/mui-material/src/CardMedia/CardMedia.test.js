import { describe, it, expect, beforeEach } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, screen } from '@mui/internal-test-utils';
import CardMedia, { cardMediaClasses as classes } from '@mui/material/CardMedia';
import describeConformance from '../../test/describeConformance';

describe('<CardMedia />', () => {
  const { render } = createRenderer();

  describeConformance(<CardMedia image="/fake.png" />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardMedia',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'foo' },
  }));

  it('has the img role if `image` is defined', () => {
    const { container } = render(<CardMedia image="/fake.png" />);

    const cardMedia = container.firstChild;
    expect(cardMedia).to.have.attribute('role', 'img');
  });

  it('should have the backgroundImage specified', () => {
    const { container } = render(<CardMedia image="/fake.png" />);
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/\/fake.png/m);
  });

  it('should have backgroundImage specified even though custom styles got passed', () => {
    const { container } = render(<CardMedia image="/fake.png" style={{ height: 200 }} />);
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/\/fake.png/m);
    expect(cardMedia.style.height).to.equal('200px');
  });

  it('should be possible to overwrite backgroundImage via custom styles', () => {
    const { container } = render(
      <CardMedia image="/fake.png" style={{ backgroundImage: 'url(fake2.png)' }} />,
    );
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/fake2.png/m);
  });

  describe('prop: component', () => {
    it('should have `src` prop when media component specified', () => {
      const { container } = render(<CardMedia image="/fake.png" component="iframe" />);
      const cardMedia = container.firstChild;
      expect(cardMedia).to.have.attribute('src', '/fake.png');
    });

    it('should not have `src` prop when picture media component specified', () => {
      const { container } = render(
        <CardMedia component="picture">
          <source media="(min-width: 600px)" srcSet="/fake.png" />
          <img src="/fake.png" alt="hello" />
        </CardMedia>,
      );
      const cardMedia = container.firstChild;
      expect(cardMedia).not.to.have.attribute('src');
    });

    it('should not have default inline style when media component specified', () => {
      const { container } = render(<CardMedia src="/fake.png" component="picture" />);
      const cardMedia = container.firstChild;
      expect(cardMedia.style.backgroundImage).to.equal('');
    });

    it('should not have `src` prop if not media component specified', () => {
      const { container } = render(<CardMedia image="/fake.png" component="table" />);
      const cardMedia = container.firstChild;
      expect(cardMedia).not.to.have.attribute('src');
    });

    it('should not have an explicit role when host components already apply image semantics', () => {
      render(
        <React.Fragment>
          <CardMedia data-testid="cardmedia" image="/fake.png" component="img" />
          <CardMedia data-testid="cardmedia" image="/fake.png" component="picture" />
        </React.Fragment>,
      );

      const [img, picture] = screen.getAllByTestId('cardmedia');
      expect(img).to.have.tagName('img');
      expect(img).not.to.have.attribute('role');
      expect(picture).to.have.tagName('picture');
      expect(picture).not.to.have.attribute('role');
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns when neither `children`, nor `image`, nor `src`, nor `component` are provided', () => {
      expect(() => {
        PropTypes.checkPropTypes(CardMedia.propTypes, { classes: {} }, 'prop', 'MockedName');
      }).toErrorDev(
        'MUI: Either `children`, `image`, `src` or `component` prop must be specified.',
      );
    });
  });
});
