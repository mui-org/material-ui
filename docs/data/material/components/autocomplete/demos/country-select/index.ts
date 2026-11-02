import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import CountrySelect from './CountrySelect';
import ClientProvider from './client';

export default createDemo(import.meta.url, CountrySelect, { ClientProvider });
