import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    shouldInclude() {
      return false;
    },
  },
};

export default options;
