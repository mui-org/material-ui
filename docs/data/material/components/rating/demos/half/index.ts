import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import HalfRating from './HalfRating';
import ClientProvider from './client';

export default createDemo(import.meta.url, HalfRating, { ClientProvider });
