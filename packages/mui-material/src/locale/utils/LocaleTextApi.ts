import type { ComponentsPropsList } from '../../styles/props';

export interface Localization {
  components?:
    | {
        MuiAlert?:
          | {
              defaultProps: Pick<ComponentsPropsList['MuiAlert'], 'closeText'>;
            }
          | undefined;
        MuiBreadcrumbs?:
          { defaultProps: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'> } | undefined;
        MuiTablePagination?:
          | {
              defaultProps: Pick<
                ComponentsPropsList['MuiTablePagination'],
                'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'
              >;
            }
          | undefined;
        MuiRating?:
          | {
              defaultProps: Pick<
                ComponentsPropsList['MuiRating'],
                'emptyLabelText' | 'getLabelText'
              >;
            }
          | undefined;
        MuiAutocomplete?:
          | {
              defaultProps: Pick<
                ComponentsPropsList['MuiAutocomplete'],
                'clearText' | 'closeText' | 'loadingText' | 'noOptionsText' | 'openText'
              >;
            }
          | undefined;
        // The core package has no dependencies on the @mui/lab components.
        // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
        MuiPagination?:
          | {
              defaultProps: Pick<
                ComponentsPropsList['MuiPagination'],
                'aria-label' | 'getItemAriaLabel'
              >;
            }
          | undefined;
      }
    | undefined;
}
