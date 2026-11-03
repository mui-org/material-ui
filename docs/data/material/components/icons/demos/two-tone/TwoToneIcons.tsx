import { useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
};

export default function TwoToneIcons() {
  const isDarkMode = useIsDarkMode();

  return (
    // @focus-start @padding 2
    <Icon
      sx={[isDarkMode && { filter: 'invert(1)' }]}
      baseClassName="material-icons-two-tone"
    >
      add_circle
    </Icon>
    // @focus-end
  );
}
