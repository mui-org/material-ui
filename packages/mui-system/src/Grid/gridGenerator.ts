import type { Breakpoints } from '../createBreakpoints/createBreakpoints';
import type { Spacing } from '../createTheme/createSpacing';
import type { ResponsiveStyleValue } from '../styleFunctionSx';
import type { GridDirection, GridOwnerState } from './GridProps';
import { traverseBreakpoints } from './traverseBreakpoints';

interface Props {
  theme: { breakpoints: Breakpoints; spacing?: Spacing | undefined };
  ownerState: GridOwnerState;
}

function getSelfSpacingVar(axis: 'row' | 'column') {
  return `--Grid-${axis}Spacing`;
}

function getParentSpacingVar(axis: 'row' | 'column') {
  return `--Grid-parent-${axis}Spacing`;
}

const selfColumnsVar = '--Grid-columns';
const parentColumnsVar = '--Grid-parent-columns';

export const generateGridSizeStyles = ({ theme, ownerState }: Props) => {
  const styles = {};
  traverseBreakpoints<'auto' | 'grow' | number | false>(
    theme.breakpoints,
    ownerState.size,
    (appendStyle, value) => {
      let style = {};
      if (value === 'grow') {
        style = {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%',
        };
      }
      if (value === 'auto') {
        style = {
          flexBasis: 'auto',
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: 'none',
          width: 'auto',
        };
      }
      if (typeof value === 'number') {
        style = {
          flexGrow: 0,
          flexBasis: 'auto',
          width: `calc(100% * ${value} / var(${parentColumnsVar}) - (var(${parentColumnsVar}) - ${value}) * (var(${getParentSpacingVar('column')}) / var(${parentColumnsVar})))`,
        };
      }
      appendStyle(styles, style);
    },
  );
  return styles;
};

export const generateGridOffsetStyles = ({ theme, ownerState }: Props) => {
  const styles = {};
  traverseBreakpoints<number | 'auto'>(
    theme.breakpoints,
    ownerState.offset,
    (appendStyle, value) => {
      let style = {};
      if (value === 'auto') {
        style = {
          marginLeft: 'auto',
        };
      }
      if (typeof value === 'number') {
        style = {
          marginLeft:
            value === 0
              ? '0px'
              : `calc(100% * ${value} / var(${parentColumnsVar}) + var(${getParentSpacingVar('column')}) * ${value} / var(${parentColumnsVar}))`,
        };
      }
      appendStyle(styles, style);
    },
  );
  return styles;
};

export const generateGridColumnsStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {
    [selfColumnsVar]: 12,
  };
  traverseBreakpoints<number>(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
    const columns = value ?? 12;
    appendStyle(styles, {
      [selfColumnsVar]: columns,
      '> *': {
        [parentColumnsVar]: columns,
      },
    });
  });
  return styles;
};

export const generateGridRowSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.rowSpacing,
    (appendStyle, value) => {
      const spacing = typeof value === 'string' ? value : theme.spacing?.(value);
      appendStyle(styles, {
        [getSelfSpacingVar('row')]: spacing,
        '> *': {
          [getParentSpacingVar('row')]: spacing,
        },
      });
    },
  );
  return styles;
};

export const generateGridColumnSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.columnSpacing,
    (appendStyle, value) => {
      const spacing = typeof value === 'string' ? value : theme.spacing?.(value);
      appendStyle(styles, {
        [getSelfSpacingVar('column')]: spacing,
        '> *': {
          [getParentSpacingVar('column')]: spacing,
        },
      });
    },
  );
  return styles;
};

export const generateGridDirectionStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.direction,
    (appendStyle, value) => {
      appendStyle(styles, { flexDirection: value });
    },
  );
  return styles;
};

export const generateGridStyles = ({ ownerState }: Props): {} => {
  return {
    minWidth: 0,
    boxSizing: 'border-box',
    ...(ownerState.container && {
      display: 'flex',
      flexWrap: 'wrap',
      ...(ownerState.wrap &&
        ownerState.wrap !== 'wrap' && {
          flexWrap: ownerState.wrap,
        }),
      gap: `var(${getSelfSpacingVar('row')}) var(${getSelfSpacingVar('column')})`,
    }),
  };
};

export const generateSizeClassNames = (size: GridOwnerState['size']) => {
  const classNames: string[] = [];
  Object.entries(size).forEach(([key, value]) => {
    if (value !== false && value !== undefined) {
      classNames.push(`grid-${key}-${String(value)}`);
    }
  });

  return classNames;
};

export const generateSpacingClassNames = (
  spacing: GridOwnerState['spacing'],
  smallestBreakpoint: string = 'xs',
) => {
  function isValidSpacing(val: GridOwnerState['spacing'] | null) {
    if (val === undefined) {
      return false;
    }
    return (
      (typeof val === 'string' && !Number.isNaN(Number(val))) ||
      (typeof val === 'number' && val > 0)
    );
  }
  if (isValidSpacing(spacing)) {
    return [`spacing-${smallestBreakpoint}-${String(spacing)}`];
  }
  if (typeof spacing === 'object' && !Array.isArray(spacing)) {
    const classNames: string[] = [];
    Object.entries(spacing).forEach(([key, value]) => {
      if (isValidSpacing(value)) {
        classNames.push(`spacing-${key}-${String(value)}`);
      }
    });
    return classNames;
  }
  return [];
};

export const generateDirectionClasses = (
  direction: ResponsiveStyleValue<GridDirection> | undefined,
): string[] => {
  if (direction === undefined) {
    return [];
  }
  if (typeof direction === 'object') {
    return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
  }

  return [`direction-xs-${String(direction)}`];
};
