import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
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

type CustomListProps = {
  'aria-label': string;
  items: readonly number[];
  selected: readonly number[];
  handleToggle: (value: number) => () => void;
};

const CustomList = React.forwardRef(function CustomList(
  props: CustomListProps,
  ref: React.Ref<HTMLDivElement & { focus: () => void }>,
) {
  const { 'aria-label': ariaLabel, items, selected, handleToggle } = props;

  return (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <MenuList
        aria-label={ariaLabel}
        aria-multiselectable="true"
        role="listbox"
        dense
        component="div"
        ref={ref}
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`;
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
    </Paper>
  );
});

export default function TransferList() {
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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setSelected(not(selected, left));
    rightListRef.current?.focus();
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

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setSelected(not(selected, right));
    leftListRef.current?.focus();
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <CustomList
        aria-label="choices"
        ref={leftListRef}
        items={left}
        selected={selected}
        handleToggle={handleToggle}
      />
      <Stack>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
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
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Stack>
      <CustomList
        aria-label="chosen"
        ref={rightListRef}
        items={right}
        selected={selected}
        handleToggle={handleToggle}
      />
    </Grid>
  );
  // @focus-end
}
