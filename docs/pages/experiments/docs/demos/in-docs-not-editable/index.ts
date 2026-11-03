import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import DemoInDocsNotEditable from './DemoInDocsNotEditable';
import ClientProvider from './client';

export default createDemo(import.meta.url, DemoInDocsNotEditable, { ClientProvider });
