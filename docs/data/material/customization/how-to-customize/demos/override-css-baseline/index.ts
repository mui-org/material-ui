import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import OverrideCssBaseline from './OverrideCssBaseline';
import ClientProvider from './client';

export default createDemo(import.meta.url, OverrideCssBaseline, { ClientProvider });
