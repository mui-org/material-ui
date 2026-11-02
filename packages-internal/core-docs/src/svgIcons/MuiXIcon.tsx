import { RootSvg } from './RootSvg';
import type { RootSvgProps } from './RootSvg';

export function MuiXIcon(props: RootSvgProps) {
  return (
    <RootSvg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 7.748L4.15 14.415H1.585l3.849-6.667-2.566-4.444h2.566L8 7.748zm0 0l2.566 4.445h2.566l-2.566-4.445 3.849-6.666h-2.566L8 7.748z"
        fill="#265D97"
      />
    </RootSvg>
  );
}
