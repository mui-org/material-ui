import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import StyledComponents from './StyledComponents';
import ClientProvider from './client';

export default createDemo(import.meta.url, StyledComponents, { ClientProvider });
