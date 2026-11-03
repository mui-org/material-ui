import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import FrameDeferring from './FrameDeferring';
import ClientProvider from './client';

export default createDemo(import.meta.url, FrameDeferring, { ClientProvider });
