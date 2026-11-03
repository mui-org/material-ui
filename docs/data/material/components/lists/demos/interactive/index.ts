import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import InteractiveList from './InteractiveList';
import ClientProvider from './client';

export default createDemo(import.meta.url, InteractiveList, { ClientProvider });
