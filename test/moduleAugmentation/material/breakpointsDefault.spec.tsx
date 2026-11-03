import { createTheme } from '@mui/material/styles';

const theme = createTheme();

theme.breakpoints.up('sm');
// @ts-expect-error Custom breakpoints from other fixtures must not apply here.
theme.breakpoints.up('tablet');
