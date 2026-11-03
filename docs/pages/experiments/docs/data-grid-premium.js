import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import jsonPageContent from './data-grid-premium.json';
import descriptions from './data-grid-premium-translation.json';

export default function Page() {
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}
