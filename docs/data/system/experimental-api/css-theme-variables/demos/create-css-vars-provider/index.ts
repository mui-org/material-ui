import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CreateCssVarsProvider from './CreateCssVarsProvider';
import ClientProvider from './client';

export default createDemo(import.meta.url, CreateCssVarsProvider, { ClientProvider });
