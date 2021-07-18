import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { autocompleteClasses } from '@material-ui/core/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popper from '@material-ui/core/Popper';
import { useTheme, styled } from '@material-ui/core/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@material-ui/core/Typography';

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div">
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <li
      {...dataSet[0]}
      style={{
        ...style,
        top: (style.top as number) + LISTBOX_PADDING,
      }}
    >
      <Typography noWrap>{dataSet[1]}</Typography>
    </li>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(
  props,
  ref,
) {
  const { children, ...other } = props;
  const itemData = (children as React.ReactChild[]).reduce((acc: any, item: any) => {
    acc.push(item);
    return acc.concat(item.children);
  }, []);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactChild) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a: number, b: number) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

function random(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a: string, b: string) => a.toUpperCase().localeCompare(b.toUpperCase()));

export default function Virtualize() {
  return (
    <Autocomplete
      id="virtualize-demo"
      sx={{ width: 300 }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={
        ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>
      }
      options={OPTIONS}
      groupBy={(option) => option[0].toUpperCase()}
      renderInput={(params) => <TextField {...params} label="10,000 options" />}
      renderOption={(props, option) => [props, option]}
      renderGroup={(params) => params}
    />
  );
}
