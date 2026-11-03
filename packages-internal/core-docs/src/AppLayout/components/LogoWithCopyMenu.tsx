import * as React from 'react';
import copy from 'clipboard-copy';
import Portal from '@mui/material/Portal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link } from '../../Link';
import { MuiLogomarkIcon, muiSvgLogomarkString, muiSvgLogotypeString } from '../../svgIcons';
import type { RootSvgProps } from '../../svgIcons';

interface LogoWithCopyMenuProps {
  logo?: React.ComponentType<RootSvgProps>;
  logomarkSvgString?: string;
  logotypeSvgString?: string;
  marginLeft?: boolean;
}

export function LogoWithCopyMenu({
  logo: LogoSvg = MuiLogomarkIcon,
  logomarkSvgString = muiSvgLogomarkString,
  logotypeSvgString = muiSvgLogotypeString,
  marginLeft,
}: LogoWithCopyMenuProps) {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 8,
            mouseY: event.clientY - 8,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopy = (svgSnippet: string) => {
    setCopied(true);
    copy(svgSnippet).then(() => {
      setTimeout(() => setCopied(false), 3500);
      handleClose();
    });
  };

  return (
    <React.Fragment>
      <Box
        component={Link}
        href="/"
        aria-label="Go to the homepage"
        onContextMenu={handleContextMenu}
        sx={{
          mr: 1,
          ml: marginLeft ? 1.5 : undefined,
          '& > svg': { m: '0 !important' }, // override the 2px margin-left coming from the Link component
        }}
      >
        <LogoSvg height={28} width={28} />
      </Box>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
        sx={(theme) => ({
          '& .MuiMenuItem-root': {
            gap: 1,
            '& path': {
              fill: (theme.vars || theme).palette.text.tertiary,
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '&:hover, &:focus-visible': {
              '& path': {
                fill: (theme.vars || theme).palette.text.primary,
                color: (theme.vars || theme).palette.text.primary,
              },
            },
          },
        })}
      >
        <MenuItem onClick={() => handleCopy(logomarkSvgString)}>
          <LogoSvg height={16} width={18} />
          Copy logomark as SVG
        </MenuItem>
        <MenuItem onClick={() => handleCopy(logotypeSvgString)}>
          <TextFieldsRoundedIcon sx={{ fontSize: '18px' }} />
          Copy logotype as SVG
        </MenuItem>
      </Menu>
      <Portal container={() => document.body}>
        <Snackbar
          open={copied}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          slots={{ transition: Slide }}
          message={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircleRoundedIcon sx={{ fontSize: '18px', color: 'success.main' }} />
              Logo SVG copied to clipboard!
            </Box>
          }
        />
      </Portal>
    </React.Fragment>
  );
}
