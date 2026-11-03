import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Display from './Display';
import ClientProvider from './client';

export default createDemo(import.meta.url, Display, { ClientProvider });
