import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import StyledComponentsTheme from './StyledComponentsTheme';
import ClientProvider from './client';

export default createDemo(import.meta.url, StyledComponentsTheme, { ClientProvider });
