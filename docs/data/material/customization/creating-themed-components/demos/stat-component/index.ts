import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import StatComponent from './StatComponent';
import ClientProvider from './client';

export default createDemo(import.meta.url, StatComponent, { ClientProvider });
