import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Order from './Order';
import ClientProvider from './client';

export default createDemo(import.meta.url, Order, { ClientProvider });
