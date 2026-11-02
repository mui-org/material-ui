import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DynamicCSSVariables from './DynamicCSSVariables';
import ClientProvider from './client';

export default createDemo(import.meta.url, DynamicCSSVariables, { ClientProvider });
