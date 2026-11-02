import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ButtonDemo from './ButtonDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, ButtonDemo, { ClientProvider });
