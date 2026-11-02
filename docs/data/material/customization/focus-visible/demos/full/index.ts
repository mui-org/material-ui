import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import FullFocusVisibleDemo from './FullFocusVisibleDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, FullFocusVisibleDemo, { ClientProvider });
