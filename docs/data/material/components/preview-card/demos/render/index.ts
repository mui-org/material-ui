import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import RenderPreviewCard from './RenderPreviewCard';
import ClientProvider from './client';

export default createDemo(import.meta.url, RenderPreviewCard, { ClientProvider });
