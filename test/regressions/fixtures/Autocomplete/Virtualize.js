import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { List, useListRef } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

function RowComponent({ index, itemData, style }) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: (style.top ?? 0) + LISTBOX_PADDING,
  };

  if ('group' in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key, ...optionProps } = dataSet[0];

  return (
    <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
      {`#${dataSet[2] + 1} - ${dataSet[1]}`}
    </Typography>
  );
}

// Adapter for react-window v2

RowComponent.propTypes = {
  index: PropTypes.number.isRequired,
  itemData: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string]).isRequired,
      ),
      PropTypes.shape({
        children: PropTypes.node,
        group: PropTypes.string.isRequired,
        key: PropTypes.number.isRequired,
      }),
    ]).isRequired,
  ).isRequired,
  style: PropTypes.object.isRequired,
};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, internalListRef, onItemsBuilt, ...other } = props;
  const itemData = [];
  const optionIndexMap = React.useMemo(() => new Map(), []);

  children.forEach((item) => {
    itemData.push(item);
    if ('children' in item && Array.isArray(item.children)) {
      itemData.push(...item.children);
    }
  });

  // Map option values to their indices in the flattened array
  itemData.forEach((item, index) => {
    if (Array.isArray(item) && item[1]) {
      optionIndexMap.set(item[1], index);
    }
  });

  React.useEffect(() => {
    if (onItemsBuilt) {
      onItemsBuilt(optionIndexMap);
    }
  }, [onItemsBuilt, optionIndexMap]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  // Separate className for List, other props for wrapper div (ARIA, handlers)
  const { className, style, ...otherProps } = other;

  return (
    <div ref={ref} {...otherProps}>
      <List
        className={className}
        listRef={internalListRef}
        key={itemCount}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        rowComponent={RowComponent}
        rowProps={{ itemData }}
        style={{
          height: getHeight() + 2 * LISTBOX_PADDING,
          width: '100%',
        }}
        overscanCount={5}
        tagName="ul"
      />
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  internalListRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        element: PropTypes.object,
        scrollToRow: PropTypes.func.isRequired,
      }),
    }),
  ]),
  onItemsBuilt: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const OPTIONS = [...Array(100).keys()]
  .map(
    (number) =>
      `${characters[number % characters.length].repeat(10)}${Math.floor(number / characters.length)}`,
  )
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

export default function Virtualize() {
  // Use react-window v2's useListRef hook for imperative API access
  const internalListRef = useListRef(null);
  const optionIndexMapRef = React.useRef(new Map());

  const handleItemsBuilt = React.useCallback((optionIndexMap) => {
    optionIndexMapRef.current = optionIndexMap;
  }, []);

  // Handle keyboard navigation by scrolling to highlighted option
  const handleHighlightChange = (event, option) => {
    if (option && internalListRef.current) {
      const index = optionIndexMapRef.current.get(option);
      if (index !== undefined) {
        internalListRef.current.scrollToRow({ index, align: 'auto' });
      }
    }
  };

  return (
    <div style={{ height: 400 }}>
      <Autocomplete
        disableCloseOnSelect
        sx={{ width: 300 }}
        disableListWrap
        options={OPTIONS}
        groupBy={(option) => option[0].toUpperCase()}
        renderInput={(params) => <TextField {...params} label="100 options" />}
        renderOption={(props, option, state) => [props, option, state.index]}
        renderGroup={(params) => params}
        onHighlightChange={handleHighlightChange}
        slots={{
          popper: StyledPopper,
        }}
        slotProps={{
          listbox: {
            component: ListboxComponent,
            internalListRef,
            onItemsBuilt: handleItemsBuilt,
          },
        }}
      />
    </div>
  );
}
