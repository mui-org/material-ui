import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import RtlProvider from '@mui/system/RtlProvider';
import LinearProgress, { linearProgressClasses as classes } from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resetWarningFlags } from './LinearProgress';
import describeConformance from '../../test/describeConformance';

describe('<LinearProgress />', () => {
  const { render } = createRenderer();

  describeConformance(<LinearProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiLinearProgress',
    testDeepOverrides: { slotName: 'bar', slotClassName: classes.bar },
    testVariantProps: { variant: 'determinate', value: 25 },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should render indeterminate variant by default', () => {
    render(<LinearProgress />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.root);
    expect(progressbar).to.have.class(classes.indeterminate);
    expect(progressbar.children[0]).to.have.class(classes.bar1);
    expect(progressbar.children[1]).to.have.class(classes.bar2);
  });

  it('should render for the primary color by default', () => {
    render(<LinearProgress />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.colorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.bar);
    expect(progressbar.children[1]).to.have.class(classes.bar);
  });

  it('should render for the secondary color', () => {
    render(<LinearProgress color="secondary" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.colorSecondary);
    expect(progressbar.children[0]).to.have.class(classes.bar);
    expect(progressbar.children[1]).to.have.class(classes.bar);
  });

  it('should render with determinate classes for the primary color by default', () => {
    render(<LinearProgress value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar).to.have.class(classes.colorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.bar1);
  });

  it('should render with determinate classes for the primary color', () => {
    render(<LinearProgress color="primary" value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar).to.have.class(classes.colorPrimary);
    expect(progressbar.children[0]).to.have.class(classes.bar1);
  });

  it('should render with determinate classes for the secondary color', () => {
    render(<LinearProgress color="secondary" value={1} variant="determinate" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.determinate);
    expect(progressbar).to.have.class(classes.colorSecondary);
    expect(progressbar.children[0]).to.have.class(classes.bar1);
  });

  it('should set width of bar1 on determinate variant', () => {
    render(<LinearProgress variant="determinate" value={77} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.nested.property('style.transform', 'translateX(-23%)');
  });

  it('should set opposite width of bar1 on determinate variant in RTL', () => {
    render(
      <RtlProvider>
        <LinearProgress variant="determinate" value={77} />,
      </RtlProvider>,
    );
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.children[0]).to.have.nested.property('style.transform', 'translateX(23%)');
  });

  it('should render with buffer classes for the primary color by default', () => {
    render(<LinearProgress value={1} valueBuffer={1} variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.buffer);
    expect(progressbar.children[0]).to.have.class(classes.dashed);
    expect(progressbar.children[1]).to.have.class(classes.bar1);
    expect(progressbar.children[2]).to.have.class(classes.colorPrimary);
    expect(progressbar.children[2]).to.have.class(classes.bar2);
  });

  it('should render with buffer classes for the primary color', () => {
    render(<LinearProgress value={1} valueBuffer={1} color="primary" variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.buffer);
    expect(progressbar.children[0]).to.have.class(classes.dashed);
    expect(progressbar.children[1]).to.have.class(classes.bar1);
    expect(progressbar.children[2]).to.have.class(classes.colorPrimary);
    expect(progressbar.children[2]).to.have.class(classes.bar2);
  });

  it('should render with buffer classes for the secondary color', () => {
    render(<LinearProgress value={1} valueBuffer={1} color="secondary" variant="buffer" />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.buffer);
    expect(progressbar.children[0]).to.have.class(classes.dashed);
    expect(progressbar.children[1]).to.have.class(classes.bar1);
    expect(progressbar.children[2]).to.have.class(classes.colorSecondary);
    expect(progressbar.children[2]).to.have.class(classes.bar2);
  });

  it('should set width of bar1 and bar2 on buffer variant', () => {
    render(<LinearProgress variant="buffer" value={77} valueBuffer={85} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar.querySelector(`.${classes.bar1}`)).to.have.nested.property(
      'style.transform',
      'translateX(-23%)',
    );
    expect(progressbar.querySelector(`.${classes.bar2}`)).to.have.nested.property(
      'style.transform',
      'translateX(-15%)',
    );
  });

  it('should render with query classes', () => {
    render(<LinearProgress variant="query" />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.class(classes.query);
    expect(progressbar.children[0]).to.have.class(classes.bar1);
    expect(progressbar.children[1]).to.have.class(classes.bar2);
  });

  it.skipIf(isJsdom())('disables determinate transitions when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <LinearProgress variant="determinate" value={50} />
      </ThemeProvider>,
    );

    const progressbar = screen.getByRole('progressbar');
    const bar1 = progressbar.querySelector(`.${classes.bar1}`);

    expect(window.getComputedStyle(bar1).transitionProperty).to.equal('none');
  });

  it.skipIf(isJsdom())(
    'disables buffer transitions and animation when reduced motion is always',
    () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });
      render(
        <ThemeProvider theme={theme}>
          <LinearProgress variant="buffer" value={50} valueBuffer={70} />
        </ThemeProvider>,
      );

      const progressbar = screen.getByRole('progressbar');
      const dashed = progressbar.querySelector(`.${classes.dashed}`);
      const bar1 = progressbar.querySelector(`.${classes.bar1}`);
      const bar2 = progressbar.querySelector(`.${classes.bar2}`);

      expect(window.getComputedStyle(dashed).animationName).to.equal('none');
      expect(window.getComputedStyle(bar1).transitionProperty).to.equal('none');
      expect(window.getComputedStyle(bar2).transitionProperty).to.equal('none');
    },
  );

  it.skipIf(isJsdom())('uses a static indeterminate layout when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });
    render(
      <ThemeProvider theme={theme}>
        <LinearProgress />
      </ThemeProvider>,
    );

    const progressbar = screen.getByRole('progressbar');
    const bar1 = progressbar.querySelector(`.${classes.bar1}`);
    const bar2 = progressbar.querySelector(`.${classes.bar2}`);

    expect(window.getComputedStyle(bar1).animationName).to.equal('none');
    expect(window.getComputedStyle(bar1).display).not.to.equal('none');
    expect(window.getComputedStyle(bar2).animationName).to.equal('none');
    expect(window.getComputedStyle(bar2).display).to.equal('none');
  });

  it('exposes the current, min and max value to screen readers when determinate', () => {
    render(<LinearProgress variant="determinate" value={77} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).to.have.attribute('aria-valuenow', '77');
    expect(progressbar).to.have.attribute('aria-valuemin', '0');
    expect(progressbar).to.have.attribute('aria-valuemax', '100');
  });

  describe('prop: min & max', () => {
    it('should be able to use custom min and max values', () => {
      render(<LinearProgress variant="determinate" value={5} min={0} max={10} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.attribute('aria-valuenow', '5');
      expect(progressbar).to.have.attribute('aria-valuemin', '0');
      expect(progressbar).to.have.attribute('aria-valuemax', '10');
    });

    it('should be able to use decimal min, max and value props', () => {
      render(<LinearProgress variant="determinate" value={5.5} min={2.5} max={10.3} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.attribute('aria-valuenow', '5.5');
      expect(progressbar).to.have.attribute('aria-valuemin', '2.5');
      expect(progressbar).to.have.attribute('aria-valuemax', '10.3');
    });

    it('min and max values should be used to calculate the width of the bar', () => {
      render(<LinearProgress variant="determinate" value={15} min={10} max={30} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar.children[0]).to.have.nested.property(
        'style.transform',
        'translateX(-75%)',
      );
    });

    it('min and max values should be used to calculate the width of the buffer bar', () => {
      render(<LinearProgress variant="buffer" value={15} valueBuffer={25} min={10} max={30} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar.querySelector(`.${classes.bar1}`)).to.have.nested.property(
        'style.transform',
        'translateX(-75%)',
      );
      expect(progressbar.querySelector(`.${classes.bar2}`)).to.have.nested.property(
        'style.transform',
        'translateX(-25%)',
      );
    });

    it('should not add transform style to the progress bar when min is equal or larger than max', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<LinearProgress variant="determinate" value={5} min={10} max={0} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar.children[0].style.transform).to.equal('translateX(-100%)');

      errorSpy.mockRestore();
    });

    it('should fallback to an empty state (translateX(-100%)) for the buffer bar when min is equal or larger than max', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<LinearProgress variant="buffer" value={5} valueBuffer={5} min={10} max={0} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar.children[1].style.transform).to.equal('translateX(-100%)');
      expect(progressbar.children[2].style.transform).to.equal('translateX(-100%)');

      errorSpy.mockRestore();
    });

    describe('warnings and errors', () => {
      beforeEach(() => {
        resetWarningFlags();
      });

      it.each([
        { variant: 'determinate', value: -1, min: 0, max: 10 },
        { variant: 'determinate', value: 11, min: 0, max: 10 },
      ])(
        'should warn if value=$value is out of range (min=$min, max=$max)',
        ({ variant, value, min, max }) => {
          expect(() => {
            render(<LinearProgress variant={variant} value={value} min={min} max={max} />);
          }).toErrorDev([
            `MUI: The min, max, and value props in LinearProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`,
          ]);
        },
      );

      it.each([
        { value: 5, valueBuffer: 4, min: 0, max: 10 },
        { value: 5, valueBuffer: 11, min: 0, max: 10 },
        { value: 5, valueBuffer: -1, min: 0, max: 10 },
      ])(
        'should error if valueBuffer=$valueBuffer is out of range or less than value=$value',
        ({ value, valueBuffer, min, max }) => {
          expect(() => {
            render(
              <LinearProgress
                variant="buffer"
                value={value}
                valueBuffer={valueBuffer}
                min={min}
                max={max}
              />,
            );
          }).toErrorDev([
            `MUI: The min, max, value, and valueBuffer props in LinearProgress should be numbers where min < max and min <= value <= valueBuffer <= max. Received min=${min}, max=${max}, value=${value}, valueBuffer=${valueBuffer}.`,
          ]);
        },
      );

      it.each([
        { value: 5, min: 10, max: 0 },
        { value: 5, min: 10, max: 10 },
      ])('should error if min=$min is equal or greater than max=$max', ({ value, min, max }) => {
        expect(() => {
          render(<LinearProgress variant="determinate" value={value} min={min} max={max} />);
        }).toErrorDev([
          `MUI: The min, max, and value props in LinearProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`,
        ]);
      });

      it.each([
        { variant: 'indeterminate', min: 0, max: undefined },
        { variant: 'query', min: undefined, max: 100 },
      ])(
        'should warn if variant=$variant and min/max props are provided',
        ({ variant, min, max }) => {
          expect(() => {
            render(<LinearProgress variant={variant} min={min} max={max} />);
          }).toWarnDev([
            "MUI: You have provided the `min` or `max` props with an 'indeterminate' or 'query' variant. These props will have no effect.",
          ]);
        },
      );

      it('should error if value prop is not provided for the determinate variant', () => {
        expect(() => {
          render(<LinearProgress variant="determinate" value={undefined} />);
        }).toErrorDev(['MUI: You need to provide a value prop']);
      });

      it('should error if value and valueBuffer props are not provided for the buffer variant', () => {
        expect(() => {
          render(<LinearProgress variant="buffer" value={undefined} />);
        }).toErrorDev([
          'MUI: You need to provide a value prop',
          'MUI: You need to provide a valueBuffer prop',
        ]);
      });
    });
  });

  // Deterministic checks for the WCAG success criteria the report rates as
  // automatable. See packages/mui-material/src/LinearProgress/accessibility.md.
  describe('WCAG 2.2 conformance', () => {
    describe('4.1.2 Name, Role, Value', () => {
      it('always exposes the progressbar role', () => {
        render(<LinearProgress />);

        expect(screen.getByRole('progressbar')).not.to.equal(null);
      });

      it('exposes the value and its bounds when determinate', () => {
        render(<LinearProgress variant="determinate" value={40} />);
        const bar = screen.getByRole('progressbar');

        expect(bar).to.have.attribute('aria-valuenow', '40');
        expect(bar).to.have.attribute('aria-valuemin', '0');
        expect(bar).to.have.attribute('aria-valuemax', '100');
      });

      it('omits the value when indeterminate, leaving the state unknown', () => {
        render(<LinearProgress variant="indeterminate" />);

        expect(screen.getByRole('progressbar')).not.to.have.attribute('aria-valuenow');
      });

      it('takes an author-supplied accessible name', () => {
        render(<LinearProgress aria-label="Upload progress" />);

        expect(screen.getByRole('progressbar', { name: 'Upload progress' })).not.to.equal(null);
      });
    });
  });
});
