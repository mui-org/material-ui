import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Virtualize from './Virtualize';
import ClientProvider from './client';

export default createDemo(import.meta.url, Virtualize, { ClientProvider });
