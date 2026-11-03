import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { styled } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FolderRounded from '@mui/icons-material/FolderRounded';
import FolderOpenRounded from '@mui/icons-material/FolderOpenRounded';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import type { UseTreeItemParameters } from '@mui/x-tree-view/useTreeItem';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import {
  TreeItemContent,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemRoot,
  treeItemClasses,
} from '@mui/x-tree-view/TreeItem';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';

type FileType = 'image' | 'pdf' | 'video' | 'folder';

type ExtendedTreeItemProps = {
  fileType?: FileType;
  id: string;
  label: string;
  children?: ExtendedTreeItemProps[];
};

const ITEMS: ExtendedTreeItemProps[] = [
  {
    id: '1',
    label: 'Drive',
    children: [
      {
        id: '1.1',
        label: 'Backup',
        children: [
          { id: '1.1.1', label: 'Jan 2023.pdf', fileType: 'pdf' },
          { id: '1.1.2', label: 'Feb 2023.pdf', fileType: 'pdf' },
          { id: '1.1.3', label: 'Mar 2023.pdf', fileType: 'pdf' },
        ],
      },
      {
        id: '1.2',
        label: 'Photos',
        children: [
          { id: '1.2.1', label: 'family.jpeg', fileType: 'image' },
          { id: '1.2.2', label: 'my_dog.png', fileType: 'image' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Favorites',
    children: [
      {
        id: '2.1',
        label: 'MUI_retreat_photo.jpg',
        fileType: 'image',
      },
      {
        id: '2.2',
        label: 'v7_secrets.mkv',
        fileType: 'video',
      },
      {
        id: '2.3',
        label: 'Other pictures',
        children: [{ id: '2.3.1', label: 'my_avatar.jpeg', fileType: 'image' }],
      },
    ],
  },
];

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
    marginLeft: theme.spacing(3.5),
  },
  ...theme.applyStyles('dark', {
    color: theme.palette.grey[400],
  }),
})) as unknown as typeof TreeItemRoot;
const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  marginBottom: theme.spacing(0.2),
  marginTop: theme.spacing(0.2),
  padding: `${theme.spacing(0.3)} ${theme.spacing(0.5)}`,
  '&.Mui-expanded&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: '16px',
    top: '30px',
    height: 'calc(100% - 32px)',
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
  icon?: React.ElementType;
  expandable?: boolean;
}

function CustomLabel({ icon: Icon, expandable, children, ...other }: CustomLabelProps) {
  return (
    <TreeItemLabel {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          sx={(theme) => ({
            mr: 1,
            fontSize: '1rem',
            color: expandable ? theme.palette.primary.main : theme.palette.grey[600],
          })}
        />
      )}
      <Typography
        sx={(theme) => ({
          fontWeight: expandable
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
          color: expandable ? theme.palette.text.primary : theme.palette.text.secondary,
        })}
        variant="body2"
      >
        {children}
      </Typography>
    </TreeItemLabel>
  );
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case 'image':
      return ImageIcon;
    case 'pdf':
      return PictureAsPdfIcon;
    case 'video':
      return VideoCameraBackIcon;
    case 'folder':
      return FolderRounded;
    default:
      return FolderRounded;
  }
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
  let icon;
  if (expandable) {
    if (status.expanded) {
      icon = FolderOpenRounded;
    } else {
      icon = FolderRounded;
    }
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

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
          {expandable && (
            <TreeItemIconContainer {...getIconContainerProps()}>
              <TreeItemIcon status={status} />
            </TreeItemIconContainer>
          )}

          <CustomLabel {...getLabelProps({ icon, expandable })} />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItemProvider>
  );
});

const code = `
<RichTreeView
  items={ITEMS}
  aria-label="File explorer"
  defaultExpandedItems={['1', '1.1', '1.2', '2']}
  defaultSelectedItems="1.1"
  sx={{ height: 'fit-content', flexGrow: 1 }}
  slots={{ item: CustomTreeItem }}
/>`;

export default function XTreeViewDemo() {
  return (
    <Frame>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            maxWidth: '100%',
            bgcolor: '#FFF',
            borderRadius: '8px',
            padding: 2,
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <RichTreeView
            items={ITEMS}
            aria-label="File explorer"
            defaultExpandedItems={['1', '1.1', '1.2', '2']}
            defaultSelectedItems="1.1"
            sx={{ height: 'fit-content', flexGrow: 1 }}
            slots={{ item: CustomTreeItem }}
          />
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
