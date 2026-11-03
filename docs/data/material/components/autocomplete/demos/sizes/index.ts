import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import Sizes from './Sizes';
import ClientProvider from './client';

export default createDemo(import.meta.url, Sizes, { ClientProvider });
