import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import SkeletonChildren from './SkeletonChildren';
import ClientProvider from './client';

export default createDemo(import.meta.url, SkeletonChildren, { ClientProvider });
