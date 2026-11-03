import { RootSvg } from './RootSvg';
import type { RootSvgProps } from './RootSvg';

export function SvgMaterialDesignIcon(props: RootSvgProps) {
  return (
    <RootSvg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#737373" />
      <path fill="#BDBDBD" d="M4 4h16v16H4z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20l8-16H4l8 16z" fill="#fff" />
    </RootSvg>
  );
}
