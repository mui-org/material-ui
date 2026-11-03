import * as React from 'react';
import clsx from 'clsx';
import { styled, alpha, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChevronDownIcon from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem as MuiTreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { blue, blueDark } from '@mui/internal-core-docs/branding';

function getType(value: any) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  if (/^(#|rgb|rgba|hsl|hsla)/.test(value)) {
    return 'color';
  }

  return typeof value;
}
/**
 * @param {unknown} value
 * @param {ReturnType<typeof getType>} type
 */
function getLabel(value: any, type: string) {
  switch (type) {
    case 'array':
      return `Array(${value.length})`;
    case 'null':
      return 'null';
    case 'undefined':
      return 'undefined';
    case 'function':
      return `f ${value.name}()`;
    case 'object':
      return 'Object';
    case 'string':
      return `"${value}"`;
    case 'symbol':
      return `Symbol(${String(value)})`;
    case 'bigint':
    case 'boolean':
    case 'number':
    default:
      return String(value);
  }
}

function getTokenType(type: string) {
  switch (type) {
    case 'color':
      return 'string';
    case 'object':
    case 'array':
      return 'comment';
    default:
      return type;
  }
}

const Color = styled('span')(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'inline-block',
  marginBottom: -1,
  marginRight: theme.spacing(0.5),
  border: '1px solid',
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fsvg%3E")',
}));

function ObjectEntryLabel(props: { objectKey: string; objectValue: any }) {
  const { objectKey, objectValue } = props;
  const type = getType(objectValue);
  const label = getLabel(objectValue, type);
  const tokenType = getTokenType(type);

  return (
    <React.Fragment>
      {`${objectKey}: `}
      {type === 'color' ? (
        <Color style={{ borderColor: lighten(label, 0.7) }}>
          <Box
            component="span"
            sx={{ display: 'block', width: 11, height: 11 }}
            style={{ backgroundColor: label }}
          />
        </Color>
      ) : null}
      <span className={clsx('token', tokenType)}>{label}</span>
    </React.Fragment>
  );
}

function CustomEndIcon() {
  return <div style={{ width: 24 }} />;
}

const TreeItem = styled(MuiTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: 4,
    borderRadius: 8,
    '&:hover': {
      backgroundColor: alpha(blueDark[600], 0.2),
    },
    '&:focus': {
      [`& .${treeItemClasses.content}`]: {
        backgroundColor: lighten(blue[900], 0.05),
        outline: `2px dashed ${lighten(blue[900], 0.3)}`,
      },
    },
    [`& .${treeItemClasses.label}`]: {
      fontFamily: 'Menlo, Consolas, Droid Sans Mono, monospace',
      fontSize: theme.typography.pxToRem(13),
    },
  },
}));

function ObjectEntry(props: {
  itemId: string;
  objectKey: string;
  objectValue: any;
  depth: number;
}) {
  const { itemId, objectKey, objectValue, depth } = props;
  const keyPrefix = itemId;
  let children = null;

  if (
    (objectValue !== null && typeof objectValue === 'object') ||
    typeof objectValue === 'function'
  ) {
    children =
      Object.keys(objectValue).length === 0
        ? undefined
        : Object.keys(objectValue).map((key) => {
            return (
              <ObjectEntry
                key={key}
                itemId={`${keyPrefix}.${key}`}
                objectKey={key}
                depth={depth + 1}
                objectValue={objectValue[key]}
              />
            );
          });
  }

  return (
    <TreeItem
      sx={{
        paddingLeft: depth,
      }}
      itemId={itemId}
      label={<ObjectEntryLabel objectKey={objectKey} objectValue={objectValue} />}
    >
      {children}
    </TreeItem>
  );
}

function computeItemIds(object: Record<string, any>, prefix: string) {
  if ((object !== null && typeof object === 'object') || typeof object === 'function') {
    const ids: Array<string> = [];
    Object.keys(object).forEach((key) => {
      ids.push(`${prefix}${key}`, ...computeItemIds(object[key], `${prefix}${key}.`));
    });

    return ids;
  }
  return [];
}

export function useItemIdsLazy(object: Record<string, any>) {
  const [allItemIds, setAllItemIds] = React.useState<Array<string>>([]);
  // technically we want to compute them lazily until we need them (expand all)
  // yielding is good enough. technically we want to schedule the computation
  // with low pri  and upgrade the priority later
  React.useEffect(() => {
    setAllItemIds(computeItemIds(object, ''));
  }, [object]);

  return allItemIds;
}

export default function ThemeViewer({
  data,
  expandPaths = [],
  ...other
}: {
  data: Record<string, any>;
  expandPaths: Array<string> | null;
}) {
  const keyPrefix = React.useId();
  const defaultExpanded = React.useMemo(
    () =>
      Array.isArray(expandPaths)
        ? expandPaths.map((expandPath) => `${keyPrefix}.${expandPath}`)
        : [],
    [expandPaths, keyPrefix],
  );
  // for default*  to take effect we need to remount
  const key = React.useMemo(() => defaultExpanded.join(''), [defaultExpanded]);
  return (
    <SimpleTreeView
      key={key}
      slots={{
        expandIcon: ChevronRightIcon,
        collapseIcon: ChevronDownIcon,
        endIcon: CustomEndIcon,
      }}
      defaultExpandedItems={defaultExpanded}
      {...other}
      sx={{
        color: '#FFF',
        p: 1.5,
        bgcolor: 'hsl(210, 25%, 9%)', // one-off code container color
        borderRadius: 3,
        border: `1px solid ${blueDark[700]}`,
      }}
    >
      {Object.keys(data).map((objectKey) => {
        return (
          <ObjectEntry
            key={objectKey}
            itemId={`${keyPrefix}.${objectKey}`}
            objectKey={objectKey}
            objectValue={data[objectKey]}
            depth={0}
          />
        );
      })}
    </SimpleTreeView>
  );
}
