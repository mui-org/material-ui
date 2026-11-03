import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import AnchorPlayground from './AnchorPlayground';
import ClientProvider from './client';

export default createDemo(import.meta.url, AnchorPlayground, { ClientProvider });
