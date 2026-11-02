import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleDialogDemo from './SimpleDialogDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleDialogDemo, { ClientProvider });
