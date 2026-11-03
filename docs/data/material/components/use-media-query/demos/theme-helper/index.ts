import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ThemeHelper from './ThemeHelper';
import ClientProvider from './client';

export default createDemo(import.meta.url, ThemeHelper, { ClientProvider });
