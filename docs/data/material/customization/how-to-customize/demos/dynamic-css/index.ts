import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DynamicCSS from './DynamicCSS';
import ClientProvider from './client';

export default createDemo(import.meta.url, DynamicCSS, { ClientProvider });
