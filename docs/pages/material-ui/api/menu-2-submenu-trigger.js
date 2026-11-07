import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import descriptions from 'docs/translations/api-docs/menu-2-submenu-trigger/menu-2-submenu-trigger.json';
import jsonPageContent from './menu-2-submenu-trigger.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
