'use client';
import * as React from 'react';
import type { SvgIconProps } from '../SvgIcon';
import CheckBoxIcon from './svg-icons/CheckBox';
import CheckBoxOutlineBlankIcon from './svg-icons/CheckBoxOutlineBlank';

interface Menu2CheckboxItemIconProps extends SvgIconProps {
  checked?: boolean | undefined;
}

/**
 * @ignore - internal component.
 */
const Menu2CheckboxItemIcon = React.forwardRef<SVGSVGElement, Menu2CheckboxItemIconProps>(
  function Menu2CheckboxItemIcon({ checked = false, ...props }, ref) {
    const Icon = checked ? CheckBoxIcon : CheckBoxOutlineBlankIcon;
    return <Icon {...props} ref={ref} />;
  },
);

export default Menu2CheckboxItemIcon;
