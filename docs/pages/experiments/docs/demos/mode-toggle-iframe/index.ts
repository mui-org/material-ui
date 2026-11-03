import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DemoModeToggleIframe from './DemoModeToggleIframe';
import ClientProvider from './client';

export default createDemo(import.meta.url, DemoModeToggleIframe, { ClientProvider });
