import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Dialog',
    propName: 'BackdropComponent',
    slotName: 'backdrop',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Dialog',
    propName: 'BackdropProps',
    slotName: 'backdrop',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Dialog',
    propName: 'TransitionComponent',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Dialog',
    propName: 'TransitionProps',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Dialog',
    propName: 'PaperProps',
    slotName: 'paper',
  });

  return root.toSource(printOptions);
}
