import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CustomStyles from './CustomStyles';
import ClientProvider from './client';

export default createDemo(import.meta.url, CustomStyles, { ClientProvider });
