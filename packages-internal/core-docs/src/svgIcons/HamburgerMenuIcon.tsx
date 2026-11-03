import { RootSvg } from './RootSvg';
import type { RootSvgProps } from './RootSvg';

export function HamburgerMenuIcon(props: RootSvgProps) {
  return (
    <RootSvg width={18} height={18} viewBox="0 0 16 16" fill="none" {...props}>
      <rect x={1} y={5} width={14} height={1.5} rx={1} fill="#007FFF" />
      <rect x={1} y={9} width={14} height={1.5} rx={1} fill="#007FFF" />
    </RootSvg>
  );
}
