import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import LongTextSnackbar from './LongTextSnackbar';
import ClientProvider from './client';

export default createDemo(import.meta.url, LongTextSnackbar, { ClientProvider });
