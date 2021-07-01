import * as React from 'react';
import Box from '@material-ui/core/Box';
import { styled, useTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const mainColors = [
  'Red',
  'Pink',
  'Purple',
  'Deep Purple',
  'Indigo',
  'Blue',
  'Light Blue',
  'Cyan',
  'Teal',
  'Green',
  'Light Green',
  'Lime',
  'Yellow',
  'Amber',
  'Orange',
  'Deep Orange',
  'Brown',
  'Grey',
  'Blue Grey',
];

const mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const altPalette = ['A100', 'A200', 'A400', 'A700'];

const ColorGroup = styled('ul', { name: 'ColorGroup' })(({ theme }) => ({
  padding: 0,
  margin: theme.spacing(0, 2, 2, 0),
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    flexGrow: 0,
    width: '30%',
  },
}));

const ColorValue = styled('span', { name: 'ColorValue' })(({ theme }) => ({
  ...theme.typography.caption,
  color: 'inherit',
  fontWeight: 'inherit',
}));

const ColorBlock = styled('li', { name: 'ColorBlock' })(
  ({ theme }) => theme.typography.body2,
);

function getColorBlock(theme, colorName, colorValue, colorTitle) {
  const bgColor = colors[colorName][colorValue];
  const fgColor = theme.palette.getContrastText(bgColor);

  let blockTitle;
  if (colorTitle) {
    blockTitle = <Box sx={{ mb: '60px' }}>{colorName}</Box>;
  }

  let rowStyle = {
    backgroundColor: bgColor,
    color: fgColor,
    listStyle: 'none',
    padding: 15,
  };

  if (colorValue.toString().indexOf('A1') === 0) {
    rowStyle = {
      ...rowStyle,
      marginTop: 4,
    };
  }

  return (
    <ColorBlock style={rowStyle} key={colorValue}>
      {blockTitle}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{colorValue}</span>
        <ColorValue>{bgColor}</ColorValue>
      </Box>
    </ColorBlock>
  );
}

function getColorGroup(options) {
  const { theme, color, showAltPalette } = options;
  const cssColor = color
    .replace(' ', '')
    .replace(color.charAt(0), color.charAt(0).toLowerCase());
  let colorsList = [];
  colorsList = mainPalette.map((mainValue) =>
    getColorBlock(theme, cssColor, mainValue),
  );

  if (showAltPalette) {
    altPalette.forEach((altValue) => {
      colorsList.push(getColorBlock(theme, cssColor, altValue));
    });
  }

  return (
    <ColorGroup key={cssColor}>
      {getColorBlock(theme, cssColor, 500, true)}
      <Box sx={{ height: 4, listStyle: 'none' }} component="li" role="separator" />
      {colorsList}
    </ColorGroup>
  );
}

function Color() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {mainColors.map((mainColor) =>
        getColorGroup({
          theme,
          color: mainColor,
          showAltPalette: true,
        }),
      )}
    </Box>
  );
}

export default Color;
