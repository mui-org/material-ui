import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'TablePagination',
    propName: 'SelectProps',
    slotName: 'select',
  });

  return root.toSource(printOptions);
}
