import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import NativeSelectDemo from './NativeSelectDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, NativeSelectDemo, { ClientProvider });
