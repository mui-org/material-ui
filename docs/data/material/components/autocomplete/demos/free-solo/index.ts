import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import FreeSolo from './FreeSolo';
import ClientProvider from './client';

export default createDemo(import.meta.url, FreeSolo, { ClientProvider });
