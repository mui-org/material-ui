import deepmerge from '@mui/utils/deepmerge';

const options = {
  clone: false,
};

function merge(acc: object, item: object): object {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, options);
}

export default merge;
