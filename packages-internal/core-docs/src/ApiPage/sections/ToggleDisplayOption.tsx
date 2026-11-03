import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export type ApiDisplayLayout = 'collapsed' | 'expanded' | 'table';

const options: ApiDisplayLayout[] = ['collapsed', 'expanded', 'table'];

export const DEFAULT_API_LAYOUT_STORAGE_KEYS = {
  slots: 'apiPage_slots',
  props: 'apiPage_props',
  classes: 'apiPage_classes',
} as const;

let neverHydrated = true;

function getOption(storageKey: string, defaultValue: ApiDisplayLayout): ApiDisplayLayout {
  if (neverHydrated) {
    return defaultValue;
  }
  try {
    const savedOption = localStorage.getItem(storageKey);

    if (savedOption !== null && options.includes(savedOption as ApiDisplayLayout)) {
      return savedOption as ApiDisplayLayout;
    }
  } catch (error) {
    return defaultValue;
  }
  return defaultValue;
}

export function useApiPageOption(
  storageKey: string,
  defaultValue: ApiDisplayLayout,
): [ApiDisplayLayout, (newOption: ApiDisplayLayout) => void] {
  const [option, setOption] = React.useState(getOption(storageKey, defaultValue));

  useEnhancedEffect(() => {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- useEnhancedEffect uses useEffect under the hood
    neverHydrated = false;
    const newOption = getOption(storageKey, defaultValue);
    setOption(newOption);
  }, [storageKey, defaultValue]);

  React.useEffect(() => {
    if (option !== defaultValue) {
      const id = document.location.hash.slice(1);
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }
    return undefined;
  }, [option, defaultValue]);

  const updateOption = React.useCallback(
    (newOption: ApiDisplayLayout) => {
      try {
        localStorage.setItem(storageKey, newOption);
      } catch (error) {
        // Do nothing
      }
      setOption(newOption);
    },
    [storageKey],
  );

  return [option, updateOption];
}

interface ToggleDisplayOptionProps {
  displayOption: ApiDisplayLayout;
  setDisplayOption: (newValue: ApiDisplayLayout) => void;
  /**
   * The type of section. This value is used to send correct event to Google Analytics.
   */
  sectionType: 'classes' | 'props' | 'slots';
}

export function ToggleDisplayOption(props: ToggleDisplayOptionProps) {
  const { displayOption, setDisplayOption, sectionType } = props;

  const id = React.useId();
  const buttonId = `${id}-view-switching-button`;
  const menuId = `${id}-view-options-menu`;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (newDisplayOption: ApiDisplayLayout) => {
    setDisplayOption(newDisplayOption);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={<ArrowDropDownRoundedIcon />}
        sx={{ height: '1.875rem', p: '6px 4px 6px 8px', textTransform: 'capitalize' }}
      >
        <Box component="span" sx={{ fontWeight: 'medium', mr: 0.5 }}>
          {'View:'}
        </Box>
        {displayOption}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1, '.MuiMenuItem-root': { pl: 1 } }}
      >
        <MenuItem
          value="table"
          onClick={() => handleMenuItemClick('table')}
          selected={displayOption === 'table'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="table"
        >
          {'Table'}
          <CheckIcon
            sx={{ fontSize: '0.85rem', ml: 'auto', opacity: displayOption === 'table' ? 1 : 0 }}
          />
        </MenuItem>
        <MenuItem
          value="expanded"
          onClick={() => handleMenuItemClick('expanded')}
          selected={displayOption === 'expanded'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="expanded"
        >
          {'Expanded list'}
          <CheckIcon
            sx={{ fontSize: '0.85rem', ml: 'auto', opacity: displayOption === 'expanded' ? 1 : 0 }}
          />
        </MenuItem>
        <MenuItem
          value="collapsed"
          onClick={() => handleMenuItemClick('collapsed')}
          selected={displayOption === 'collapsed'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="collapsed"
        >
          {'Collapsed list'}
          <CheckIcon
            sx={{ fontSize: '0.85rem', ml: 'auto', opacity: displayOption === 'collapsed' ? 1 : 0 }}
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
