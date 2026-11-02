import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import RtlDemo from './RtlDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, RtlDemo, { ClientProvider });
