import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SpinnerDemo from './SpinnerDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, SpinnerDemo, { ClientProvider });
