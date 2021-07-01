import './utils/init';
import './utils/setupKarma';

const integrationContext = require.context(
  '../packages/material-ui/test/integration',
  true,
  /\.test\.(js|ts|tsx)$/,
);
integrationContext.keys().forEach(integrationContext);

const coreUnitContext = require.context(
  '../packages/material-ui/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
coreUnitContext.keys().forEach(coreUnitContext);

const labUnitContext = require.context(
  '../packages/material-ui-lab/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
labUnitContext.keys().forEach(labUnitContext);

const styledEngineContext = require.context(
  '../packages/material-ui-styled-engine/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
styledEngineContext.keys().forEach(styledEngineContext);

const styledEngineSCContext = require.context(
  '../packages/material-ui-styled-engine-sc/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
styledEngineSCContext.keys().forEach(styledEngineSCContext);

const systemContext = require.context(
  '../packages/material-ui-system/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
systemContext.keys().forEach(systemContext);

const unstyledContext = require.context(
  '../packages/material-ui-unstyled/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
unstyledContext.keys().forEach(unstyledContext);

const utilsContext = require.context(
  '../packages/material-ui-utils/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
utilsContext.keys().forEach(utilsContext);
