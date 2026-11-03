import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.includes(value));
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

type CustomListProps = {
  title: string;
  items: readonly number[];
  selected: readonly number[];
  handleToggle: (value: number) => () => void;
  handleToggleAll: (items: readonly number[]) => () => void;
  numberOfChecked: (items: readonly number[]) => number;
};

const CustomList = React.forwardRef(function CustomList(
  props: CustomListProps,
  ref: React.Ref<HTMLDivElement & { focus: () => void }>,
) {
  const { title, items, selected, handleToggle, handleToggleAll, numberOfChecked } =
    props;

  const ariaLabel = `Select all ${title}`;

  return (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 0.5 }}
        avatar={
          <Checkbox
            size="small"
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            slotProps={{
              input: { 'aria-label': ariaLabel },
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <MenuList
        aria-label={title}
        aria-multiselectable="true"
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="listbox"
        ref={ref}
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          const isSelected = selected.includes(value);
          const SelectionIcon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

          return (
            <MenuItem
              component="div"
              key={value}
              role="option"
              aria-selected={isSelected}
              aria-labelledby={labelId}
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <SelectionIcon
                  sx={{
                    color: isSelected ? 'primary.main' : 'text.secondary',
                    padding: '9px',
                    boxSizing: 'content-box',
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </MenuItem>
          );
        })}
      </MenuList>
    </Card>
  );
});

export default function SelectAllTransferList() {
  // @focus-start @padding 1
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftSelected = intersection(selected, left);
  const rightSelected = intersection(selected, right);

  const leftListRef = React.useRef<HTMLDivElement & { focus: () => void }>(null);
  const rightListRef = React.useRef<HTMLDivElement & { focus: () => void }>(null);

  const handleToggle = (value: number) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(selected, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setSelected(not(selected, items));
    } else {
      setSelected(union(selected, items));
    }
  };

  const handleSelectedRight = () => {
    setRight(right.concat(leftSelected));
    setLeft(not(left, leftSelected));
    setSelected(not(selected, leftSelected));
    rightListRef.current?.focus();
  };

  const handleSelectedLeft = () => {
    setLeft(left.concat(rightSelected));
    setRight(not(right, rightSelected));
    setSelected(not(selected, rightSelected));
    leftListRef.current?.focus();
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <CustomList
        ref={leftListRef}
        title="Choices"
        items={left}
        selected={selected}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
        numberOfChecked={numberOfChecked}
      />
      <Stack>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleSelectedRight}
          disabled={leftSelected.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleSelectedLeft}
          disabled={rightSelected.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
      </Stack>
      <CustomList
        ref={rightListRef}
        title="Chosen"
        items={right}
        selected={selected}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
        numberOfChecked={numberOfChecked}
      />
    </Grid>
  );
  // @focus-end
}
