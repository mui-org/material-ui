import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import LatestVersions from './LatestVersions';
import ClientProvider from './client';

export default createDemo(import.meta.url, LatestVersions, { ClientProvider });
