import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import StatFullTemplate from './StatFullTemplate';
import ClientProvider from './client';

export default createDemo(import.meta.url, StatFullTemplate, { ClientProvider });
