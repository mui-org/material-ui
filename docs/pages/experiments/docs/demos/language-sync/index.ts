import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';
import LanguageSync from './LanguageSync';

export default createDemo(import.meta.url, LanguageSync, { ClientProvider });
