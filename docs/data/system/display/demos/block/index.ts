import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Block from './Block';
import ClientProvider from './client';

export default createDemo(import.meta.url, Block, { ClientProvider });
