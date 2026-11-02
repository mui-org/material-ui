import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import KeepMountedModal from './KeepMountedModal';
import ClientProvider from './client';

export default createDemo(import.meta.url, KeepMountedModal, { ClientProvider });
