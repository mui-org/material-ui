import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import InteractiveStack from './InteractiveStack';
import ClientProvider from './client';

export default createDemo(import.meta.url, InteractiveStack, { ClientProvider });
