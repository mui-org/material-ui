import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ChipsPlayground from './ChipsPlayground';
import ClientProvider from './client';

export default createDemo(import.meta.url, ChipsPlayground, { ClientProvider });
