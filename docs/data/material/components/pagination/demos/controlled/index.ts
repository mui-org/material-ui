import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import PaginationControlled from './PaginationControlled';
import ClientProvider from './client';

export default createDemo(import.meta.url, PaginationControlled, { ClientProvider });
