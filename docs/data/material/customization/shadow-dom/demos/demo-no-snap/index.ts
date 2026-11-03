import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ShadowDOMDemoNoSnap from './ShadowDOMDemoNoSnap';
import ClientProvider from './client';

export default createDemo(import.meta.url, ShadowDOMDemoNoSnap, { ClientProvider });
