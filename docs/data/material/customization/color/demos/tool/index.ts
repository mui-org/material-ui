import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ColorTool from './ColorTool';
import ClientProvider from './client';

export default createDemo(import.meta.url, ColorTool, { ClientProvider });
