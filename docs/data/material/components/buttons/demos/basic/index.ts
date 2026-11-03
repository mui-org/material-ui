import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';

import BasicButtons from './BasicButtons';

export default createDemo(import.meta.url, BasicButtons, {
  ClientProvider,
});
