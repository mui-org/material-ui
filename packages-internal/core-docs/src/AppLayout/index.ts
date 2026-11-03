// Ensure branding theme augmentations (applyDarkStyles, primaryDark, ColorRange, etc.)
// are applied when this package is type-checked from an external tsconfig (e.g. docs/).
import type {} from '../branding/brandingTheme';

// layout
export { AppContainer } from './layout/AppContainer';
export { AppLayoutHead } from './layout/AppLayoutHead';
export { AppFrame, DeferredAppSearch, HEIGHT } from './layout/AppFrame';
export { AppLayoutDocs } from './layout/AppLayoutDocs';
export { type NotificationMessage } from './layout/Notifications';

// navigation
export { MuiProductSelector } from './navigation/MuiProductSelector';

// components
export { ComponentShowcaseCard } from './components/ComponentShowcaseCard';
export { Frame } from './components/Frame';
export { Highlighter } from './components/Highlighter';
export { Group, Item } from './components/Item';
export { LogoWithCopyMenu } from './components/LogoWithCopyMenu';
export { MaterialVsCustomToggle } from './components/MaterialVsCustomToggle';
export { More } from './components/More';
export { AppearingInfoBox, MoreInfoBox } from './components/MoreInfoBox';
export { NpmCopyButton } from './components/NpmCopyButton';
export { AppHeaderBanner } from './components/AppHeaderBanner';

// icons
export { standardNavIcons } from './icons/navIcons';
