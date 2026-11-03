import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CssLayersCaveat from './CssLayersCaveat';
import ClientProvider from './client';

export default createDemo(import.meta.url, CssLayersCaveat, { ClientProvider });
