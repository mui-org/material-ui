import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Facebook from './Facebook';
import ClientProvider from './client';

export default createDemo(import.meta.url, Facebook, { ClientProvider });
