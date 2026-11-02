// In our repo, type declarations for icons are only added at build time
declare module '@mui/icons-material/*' {
  import SvgIcon from '@mui/material/SvgIcon';

  export default SvgIcon;
}

// Stylesheets imported for their side effects (e.g. `syntax.css` in tests).
declare module '*.css';
