import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import MaterialUIComponents from './MaterialUIComponents';
import ClientProvider from './client';

export default createDemo(import.meta.url, MaterialUIComponents, { ClientProvider });
