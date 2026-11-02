import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import TablePaginationDemo from './TablePaginationDemo';
import ClientProvider from './client';

export default createDemo(import.meta.url, TablePaginationDemo, { ClientProvider });
