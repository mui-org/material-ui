import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import BasicStack from './BasicStack';
import ClientProvider from './client';

export default createDemo(import.meta.url, BasicStack, { ClientProvider });
