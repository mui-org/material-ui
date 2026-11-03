import { expectType } from '@mui/types';
import AvatarGroup from '@mui/material/AvatarGroup';

<AvatarGroup component="ul" />;
<AvatarGroup variant="circular" />;
<AvatarGroup variant="rounded" />;
<AvatarGroup variant="square" />;

// @ts-expect-error: unknown is not a supported AvatarGroup variant.
<AvatarGroup variant="unknown" />;

<AvatarGroup
  renderSurplus={(surplus) => {
    expectType<number, number>(surplus);
    return <div>{surplus}</div>;
  }}
/>;

<AvatarGroup slotProps={{ surplus: { variant: 'rounded', className: 'x' } }} />;
<AvatarGroup slotProps={{ surplus: (ownerState) => ({ variant: ownerState.variant }) }} />;
// @ts-expect-error: The surplus Avatar slot rejects nonExistentProp.
<AvatarGroup slotProps={{ surplus: { nonExistentProp: true } }} />;
