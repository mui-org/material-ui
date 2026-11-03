import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    shouldInclude({ component, prop }) {
      if (component.name === 'Snackbar' && prop.name === 'id') {
        return true;
      }
    },
  },
};

export default options;
