import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import MasonryWithVariableHeightItems from './MasonryWithVariableHeightItems';
import ClientProvider from './client';

export default createDemo(import.meta.url, MasonryWithVariableHeightItems, { ClientProvider });
