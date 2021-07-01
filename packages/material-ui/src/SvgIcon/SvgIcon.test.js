import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, createClientRender } from 'test/utils';
import SvgIcon, { svgIconClasses as classes } from '@material-ui/core/SvgIcon';

describe('<SvgIcon />', () => {
  const render = createClientRender();

  let path;

  before(() => {
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />;
  });

  describeConformanceV5(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      classes,
      inheritComponent: 'svg',
      render,
      muiName: 'MuiSvgIcon',
      refInstanceof: window.SVGSVGElement,
      testComponentPropWith: (props) => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {props.children}
        </svg>
      ),
      skip: ['themeVariants', 'componentsProp'],
    }),
  );

  it('renders children by default', () => {
    const { container, queryByTestId } = render(<SvgIcon>{path}</SvgIcon>);

    expect(queryByTestId('test-path')).not.to.equal(null);
    expect(container.firstChild).to.have.attribute('aria-hidden', 'true');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const { container, queryByText } = render(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );

      expect(queryByText('Network')).not.to.equal(null);
      expect(container.firstChild).not.to.have.attribute('aria-hidden');
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const { container } = render(<SvgIcon className="meow">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class('meow');
    });

    it('should render with the secondary color', () => {
      const { container } = render(<SvgIcon color="secondary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      const { container } = render(<SvgIcon color="action">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      const { container } = render(<SvgIcon color="error">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      const { container } = render(<SvgIcon color="primary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorPrimary);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { container } = render(<SvgIcon fontSize="inherit">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeInherit);
    });
  });
});
