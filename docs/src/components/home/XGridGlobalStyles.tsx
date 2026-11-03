import { alpha } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function XGridGlobalStyles({
  selector = 'body',
  pro = false,
}: {
  selector?: string;
  pro?: boolean;
}) {
  return (
    <GlobalStyles
      styles={(theme) => [
        {
          [selector]: {
            '& .MuiDataGrid-root': {
              fontSize: '0.75rem',
              '--DataGrid-rowBorderColor': (theme.vars || theme).palette.grey[200],
              // toolbar
              // style GridToolbar
              '& .MuiDataGrid-toolbar': {
                flexShrink: 0,
                padding: theme.spacing(0.5),
                gap: theme.spacing(0.75),
                minHeight: 'auto',
                borderColor: (theme.vars || theme).palette.divider,
                '& > .MuiIconButton-root, & > .MuiDataGrid-toolbarQuickFilter > .MuiIconButton-root':
                  {
                    flexShrink: 0,
                    border: '1px solid',
                    padding: theme.spacing(0.75),
                    borderColor: (theme.vars || theme).palette.divider,
                    '& svg': {
                      fontSize: '1.125rem',
                    },
                  },
                '& .MuiDataGrid-toolbarDivider': {
                  display: 'none',
                },
                '& .MuiInputBase-input': {
                  padding: theme.spacing(0.75, 1),
                },
              },
              '& .MuiCheckbox-root': {
                color: (theme.vars || theme).palette.grey[600],
                padding: theme.spacing(0.5),
                '& > svg': {
                  fontSize: '1.2rem',
                },
              },
              '& .MuiIconButton-root:not(.Mui-disabled)': {
                color: (theme.vars || theme).palette.primary.main,
              },
              // table head elements
              '& .MuiDataGrid-menuIcon svg': {
                fontSize: '1rem',
              },
              '& .MuiDataGrid-columnSeparator': {
                color: (theme.vars || theme).palette.grey[200],
                '&.MuiDataGrid-columnSeparator--resizable:hover': {
                  color: (theme.vars || theme).palette.primary.main,
                },
                ...(!pro && { display: 'none' }),
              },
              // -------------------------------
              // table body elements
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: (theme.vars || theme).palette.grey[50],
              },
              '& .MuiDataGrid-editInputCell': {
                fontSize: '0.75rem',
                '& > input': {
                  padding: theme.spacing(0, 1),
                },
              },
              '& .MuiDataGrid-cell--editing': {
                '& .MuiSelect-root': {
                  '& .MuiListItemIcon-root': {
                    display: 'none',
                  },
                  '& .MuiTypography-root': {
                    fontSize: '0.75rem',
                  },
                },
              },
              '& .MuiTablePagination-root': {
                marginRight: theme.spacing(1),
                '& .MuiIconButton-root': {
                  '&:not([disabled])': {
                    color: (theme.vars || theme).palette.primary.main,
                    borderColor: (theme.vars || theme).palette.grey[400],
                  },
                  borderRadius: (theme.vars || theme).shape.borderRadius,
                  padding: theme.spacing(0.5),
                  border: '1px solid',
                  borderColor: (theme.vars || theme).palette.grey[200],
                  '&:last-of-type': {
                    marginLeft: theme.spacing(1),
                  },
                  '& > svg': {
                    fontSize: '1rem',
                  },
                },
              },
            },
            '& .MuiDataGrid-gridMenuList': {
              boxShadow: '0px 4px 20px rgb(61 71 82 / 25%)',
              borderRadius: '10px',
              '& .MuiMenuItem-root': {
                fontSize: '0.75rem',
              },
            },
          },
        },
        theme.applyDarkStyles({
          [selector]: {
            '& .MuiDataGrid-root': {
              '--DataGrid-rowBorderColor': alpha(theme.palette.primaryDark[500], 0.5),
              '& .MuiDataGrid-toolbar': {
                '& > button': {
                  borderColor: (theme.vars || theme).palette.divider,
                },
              },
              '& .MuiCheckbox-root': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiIconButton-root:not(.Mui-disabled)': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .MuiDataGrid-columnSeparator': {
                color: (theme.vars || theme).palette.primaryDark[400],
              },
              // -------------------------------
              // table body elements
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              },
              '& .MuiTablePagination-root': {
                '& .MuiIconButton-root': {
                  '&:not([disabled])': {
                    color: (theme.vars || theme).palette.primaryDark[100],
                    borderColor: (theme.vars || theme).palette.primaryDark[400],
                  },
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            },
          },
        }),
      ]}
    />
  );
}
