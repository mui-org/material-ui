import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    shouldInclude() {
      return true;
    },
  },
};

export default options;
