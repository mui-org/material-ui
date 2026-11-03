import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import EmotionCSS from './EmotionCSS';
import ClientProvider from './client';

export default createDemo(import.meta.url, EmotionCSS, { ClientProvider });
