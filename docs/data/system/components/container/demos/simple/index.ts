import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SimpleContainer from './SimpleContainer';
import ClientProvider from './client';

export default createDemo(import.meta.url, SimpleContainer, { ClientProvider });
