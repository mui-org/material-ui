import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DemoModeToggle from './DemoModeToggle';
import ClientProvider from './client';

export default createDemo(import.meta.url, DemoModeToggle, { ClientProvider });
