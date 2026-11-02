import type { TablePaginationOwnerState } from '@mui/material/TablePagination';
import TablePagination from '@mui/material/TablePagination';
import SvgIcon from '@mui/material/SvgIcon';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import { expectType } from '@mui/types';

function SampleIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function CustomIconButton(props: IconButtonProps) {
  const { children, ...other } = props;
  return (
    <IconButton {...other} color="secondary" size="large">
      {children}
    </IconButton>
  );
}

function classesTest() {
  const defaultProps = {
    count: 1,
    onPageChange: () => {},
    page: 1,
    rowsPerPage: 1,
  };

  <TablePagination classes={{ actions: 'actions' }} {...defaultProps} />;
  // @ts-expect-error: alignCenter is not a TablePagination class key.
  <TablePagination classes={{ alignCenter: 'center' }} {...defaultProps} />;
}

// slots and slotProps type test
<TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={1}
  rowsPerPage={1}
  page={1}
  onPageChange={() => {}}
  showFirstButton
  showLastButton
  slots={{
    actions: {
      firstButton: CustomIconButton,
      lastButton: CustomIconButton,
      nextButton: CustomIconButton,
      previousButton: CustomIconButton,

      firstButtonIcon: SampleIcon,
      lastButtonIcon: SampleIcon,
      nextButtonIcon: SampleIcon,
      previousButtonIcon: SampleIcon,
    },
  }}
  slotProps={{
    actions: {
      firstButton: {
        disableFocusRipple: true,
      },
      lastButton: {
        disableTouchRipple: true,
      },
      nextButton: {
        disableRipple: true,
      },
      previousButton: {
        centerRipple: true,
      },

      firstButtonIcon: {
        fontSize: 'small',
      },
      lastButtonIcon: {
        color: 'success',
      },
      nextButtonIcon: {
        inheritViewBox: true,
      },
      previousButtonIcon: {
        fill: 'currentColor',
      },
    },
    select: {
      size: 'small',
      variant: 'filled',
      hiddenLabel: true,
      disableUnderline: true,
    },
  }}
/>;
<TablePagination
  count={1}
  rowsPerPage={1}
  page={1}
  onPageChange={() => {}}
  slots={{
    root: 'div',
    toolbar: 'div',
    spacer: 'div',
    displayedRows: 'p',
    select: 'select',
    selectLabel: 'label',
    menuItem: 'div',
  }}
  slotProps={{
    root: {
      id: 'root',
    },
    toolbar: {
      id: 'toolbar',
      disableGutters: true,
    },
    displayedRows: {
      id: 'displayedRows',
    },
    menuItem: {
      id: 'menuItem',
    },
    selectLabel: {
      id: 'selectLabel',
    },
    spacer: {
      id: 'spacer',
    },
  }}
/>;
<TablePagination
  count={1}
  rowsPerPage={1}
  page={1}
  onPageChange={() => {}}
  slotProps={{
    root: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'root',
      };
    },
    toolbar: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'toolbar',
        disableGutters: true,
      };
    },
    displayedRows: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'displayedRows',
      };
    },
    menuItem: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'menuItem',
      };
    },
    selectLabel: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'selectLabel',
      };
    },
    spacer: (ownerState) => {
      expectType<TablePaginationOwnerState, typeof ownerState>(ownerState);
      return {
        id: 'spacer',
      };
    },
  }}
/>;
