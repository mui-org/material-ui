import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';
import ErrorDecoder from './ErrorDecoder';

export default createDemo(import.meta.url, ErrorDecoder, { ClientProvider });
