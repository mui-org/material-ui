import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { styled } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  treeItemClasses,
  TreeItemContent,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemRoot,
} from '@mui/x-tree-view/TreeItem';
import type { UseTreeItemParameters } from '@mui/x-tree-view/useTreeItem';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';

type ExtendedTreeItemProps = {
  id: string;
  label: string;
  color?: 'primary' | 'default';
  children?: ExtendedTreeItemProps[];
};

const ITEMS: ExtendedTreeItemProps[] = [
  {
    id: '1',
    label: 'src',
    color: 'primary',
    children: [
      {
        id: '1.1',
        label: 'components',
        children: [
          { id: '1.1.1', label: 'Button.tsx' },
          { id: '1.1.2', label: 'Drawer.tsx' },
          { id: '1.1.3', label: 'Navbar.tsx' },
          { id: '1.1.4', label: 'TreeView.tsx' },
        ],
      },
      {
        id: '1.2',
        label: 'blocks',
        children: [
          { id: '1.2.1', label: 'SignupPage.tsx' },
          {
            id: '1.2.2',
            label: 'PricingTable',
            children: [
              { id: '1.2.2.1', label: 'PaymentOptions.tsx' },
              { id: '1.2.2.2', label: 'EarlyBirdDiscount.tsx' },
            ],
          },
        ],
      },
    ],
  },
];

function DotIcon() {
  return (
    <Box
      sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'warning.main', zIndex: 1, mr: 1 }}
    />
  );
}

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

const StyledTreeItemRoot = styled(TreeItemRoot)(({ theme }) => ({
  color: theme.palette.grey[800],
  position: 'relative',
  [`& .${treeItemClasses.groupTransition}`]: {
    paddingLeft: theme.spacing(0.5),
  },
  ...theme.applyStyles('dark', {
    color: theme.palette.grey[400],
  }),
})) as unknown as typeof TreeItemRoot;
const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  '&.Mui-expanded&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: '15px',
    top: '28px',
    height: 'calc(100% - 28px)',
    width: '1.5px',
    backgroundColor: (theme.vars || theme).palette.grey[100],
    ...theme.applyStyles('dark', {
      backgroundColor: (theme.vars || theme).palette.primaryDark[700],
    }),
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
      paddingLeft: 24,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

interface CustomLabelProps {
  children: React.ReactNode;
  expandable?: boolean;
  color: string;
}

function CustomLabel({ color, expandable, children, ...other }: CustomLabelProps) {
  let Icon: null | React.ElementType = null;
  if (expandable) {
    Icon = FolderRounded;
  } else {
    Icon = DotIcon;
  }
  return (
    <TreeItemLabel {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {Icon && (
        <Box component={Icon} className="labelIcon" sx={{ mr: 1, fontSize: '1rem', color }} />
      )}
      <Typography
        sx={(theme) => ({
          fontWeight: expandable
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
        })}
        variant="body2"
      >
        {children}
      </Typography>
    </TreeItemLabel>
  );
}

const isExpandable = (reactChildren: React.ReactNode): boolean => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

interface CustomTreeItemProps
  extends
    Omit<UseTreeItemParameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);

  return (
    <TreeItemProvider id={id} itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          status={status}
          {...getContentProps({
            className: clsx('content', {
              'Mui-expanded': status.expanded,
              'Mui-selected': status.selected,
              'Mui-focused': status.focused,
              'Mui-disabled': status.disabled,
            }),
          })}
        >
          <CustomLabel
            {...getLabelProps({
              expandable,
              color: item?.color === 'primary' ? 'primary.main' : 'grey.600',
            })}
          />
          {expandable && (
            <TreeItemIconContainer {...getIconContainerProps()}>
              <TreeItemIcon status={status} />
            </TreeItemIconContainer>
          )}
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}{' '}
      </StyledTreeItemRoot>
    </TreeItemProvider>
  );
});
function CustomEndIcon() {
  return <div style={{ width: 24 }} />;
}

function CustomExpandIcon() {
  return <KeyboardArrowDownRounded sx={{ fontSize: 16, color: 'primary.main' }} />;
}

function CustomCollapseIcon() {
  return <KeyboardArrowUpRounded sx={{ fontSize: 16, color: 'primary.main' }} />;
}

export default function TreeViewDemo() {
  return (
    <RichTreeView
      items={ITEMS}
      aria-label="file explorer"
      defaultExpandedItems={['1', '1.1', '1.2', '1.2.2']}
      defaultSelectedItems="1.1"
      sx={{ height: 'fit-content', flexGrow: 1, p: 1 }}
      itemChildrenIndentation={0}
      slots={{
        item: CustomTreeItem,
        endIcon: CustomEndIcon,
        expandIcon: CustomExpandIcon,
        collapseIcon: CustomCollapseIcon,
      }}
    />
  );
}
