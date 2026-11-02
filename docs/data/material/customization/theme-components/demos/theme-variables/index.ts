import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ThemeVariables from './ThemeVariables';
import ClientProvider from './client';

export default createDemo(import.meta.url, ThemeVariables, { ClientProvider });
