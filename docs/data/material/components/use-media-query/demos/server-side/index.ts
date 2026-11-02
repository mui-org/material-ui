import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ServerSide from './ServerSide';
import ClientProvider from './client';

export default createDemo(import.meta.url, ServerSide, { ClientProvider });
