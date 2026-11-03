import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleSnackbar from './SimpleSnackbar';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleSnackbar, { ClientProvider });
