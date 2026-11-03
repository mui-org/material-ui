import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CustomMarks from './CustomMarks';
import ClientProvider from './client';

export default createDemo(import.meta.url, CustomMarks, { ClientProvider });
