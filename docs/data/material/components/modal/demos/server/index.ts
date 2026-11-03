import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ServerModal from './ServerModal';
import ClientProvider from './client';

export default createDemo(import.meta.url, ServerModal, { ClientProvider });
