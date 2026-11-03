import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import NativeCssColors from './NativeCssColors';
import ClientProvider from './client';

export default createDemo(import.meta.url, NativeCssColors, { ClientProvider });
