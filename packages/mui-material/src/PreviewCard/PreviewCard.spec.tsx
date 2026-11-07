import PreviewCard, { createPreviewCardHandle } from '@mui/material/PreviewCard';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import PreviewCardPopup, {
  previewCardPopupClasses,
  PreviewCardPopupDataAttributes,
} from '@mui/material/PreviewCardPopup';
import {
  PreviewCard as RootPreviewCard,
  PreviewCardPopup as RootPreviewCardPopup,
  PreviewCardTrigger as RootPreviewCardTrigger,
  createTheme,
} from '@mui/material';
import Button from '@mui/material/Button';

<PreviewCard>
  <PreviewCardTrigger render={<a href="#">Link</a>} />
  <PreviewCardPopup>Content</PreviewCardPopup>
</PreviewCard>;

<RootPreviewCard
  defaultOpen
  onOpenChange={(open, eventDetails) => {
    const isOpen: boolean = open;
    const reason: string = eventDetails.reason;
    return [isOpen, reason];
  }}
>
  <RootPreviewCardTrigger render={<Button>Open</Button>} />
  <RootPreviewCardPopup>Content</RootPreviewCardPopup>
</RootPreviewCard>;

// @ts-expect-error render is required
<PreviewCardTrigger />;

// @ts-expect-error triggers accept only their picked props
<PreviewCardTrigger render={<a href="#">Link</a>} className="link" />;

<PreviewCardTrigger render={<a href="#">Link</a>} delay={100} closeDelay={100} id="trigger" />;

const handle = createPreviewCardHandle<{ title: string }>();
<PreviewCardTrigger handle={handle} payload={{ title: 'A' }} render={<a href="#">Link</a>} />;
<PreviewCard handle={handle}>
  {({ payload }) => <PreviewCardPopup>{payload?.title}</PreviewCardPopup>}
</PreviewCard>;

// @ts-expect-error component is not supported
<PreviewCardPopup component="section">Content</PreviewCardPopup>;

// @ts-expect-error component is not supported in slotProps
<PreviewCardPopup slotProps={{ root: { component: 'section' } }}>Content</PreviewCardPopup>;

// @ts-expect-error Base UI positioner props that were not picked are rejected
<PreviewCardPopup sticky>Content</PreviewCardPopup>;

<PreviewCardPopup id="popup" onClick={() => {}} aria-label="Preview">
  Content
</PreviewCardPopup>;

<PreviewCardPopup
  side="top"
  align="start"
  sideOffset={4}
  alignOffset={2}
  collisionPadding={8}
  keepMounted
  elevation={2}
  transitionDuration={200}
  render={(props, state) => <section {...props} data-side-state={state.side} />}
  slots={{ transition: null }}
  slotProps={{
    root: (ownerState) => ({ className: ownerState.open ? 'open' : 'closed' }),
    positioner: { className: 'positioner' },
    portal: { className: 'portal' },
  }}
>
  Content
</PreviewCardPopup>;

createTheme({
  components: {
    MuiPreviewCard: { defaultProps: { defaultOpen: false } },
    MuiPreviewCardTrigger: { defaultProps: { delay: 300 } },
    MuiPreviewCardPopup: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: {
          [`&.${previewCardPopupClasses.open}`]: { boxShadow: 'none' },
          [`&[${PreviewCardPopupDataAttributes.side}="top"]`]: { marginBottom: 4 },
        },
        portal: { zIndex: 1 },
        positioner: {},
      },
      variants: [{ props: { elevation: 2 }, style: { borderRadius: 0 } }],
    },
  },
});

createTheme({
  components: {
    MuiPreviewCardTrigger: {
      // @ts-expect-error the trigger has no styles
      styleOverrides: { root: {} },
    },
  },
});
