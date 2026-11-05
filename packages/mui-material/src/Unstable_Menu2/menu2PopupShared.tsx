'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import ownerDocument from '@mui/utils/ownerDocument';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import type { SxProps } from '@mui/system';
import { useRtl } from '@mui/system/RtlProvider';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
import type { Theme } from '../styles';
import type { GrowProps } from '../Grow';
import Grow from '../Grow';
import type { PaperProps } from '../Paper';
import type { ListProps } from '../List';
import { manager as modalManager } from '../Modal/useModal';
import type { SlotProps } from './menu2Utils';
import { Menu2SubmenuClosingState } from './Menu2SubmenuClosingContext';

function Menu2ScrollLock({
  locked,
  popupRef,
}: {
  locked: boolean;
  popupRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEnhancedEffect(() => {
    if (!locked) {
      return undefined;
    }

    // Body is the default Modal container, so a Modal on the page shares this lock.
    return modalManager.lockScroll(ownerDocument(popupRef.current).body);
  }, [locked, popupRef]);

  return null;
}

type ExternalSlotProps<Props> = Omit<Partial<Props>, 'className' | 'render' | 'style'> & {
  className?: string | undefined;
  render?: never | undefined;
  style?: React.CSSProperties | undefined;
} & Record<string, any>;

function setDefinedProp(props: Record<string, any>, key: string, value: unknown) {
  if (value !== undefined) {
    props[key] = value;
  }
}

function omitProps<Props extends Record<string, any> | undefined>(
  props: Props,
  keys: readonly string[],
): Props {
  if (props == null) {
    return props;
  }

  const result = { ...props };
  keys.forEach((key) => {
    delete result[key];
  });

  return result as Props;
}

function getSlotProps<ElementType extends React.ElementType, Props extends Record<string, any>>(
  Slot: ElementType,
  props: Props,
  hostOmittedProps: readonly string[],
) {
  return isHostComponent(Slot) ? omitProps(props, hostOmittedProps) : props;
}

const sxHostOmittedProps = ['sx'] as const;
const paperHostOmittedProps = [
  'classes',
  'component',
  'elevation',
  'square',
  'sx',
  'variant',
] as const;
const listHostOmittedProps = [
  'classes',
  'component',
  'dense',
  'disablePadding',
  'subheader',
  'sx',
] as const;

export interface Menu2PopupSharedSlots {
  /**
   * The transition applied to the popup element. Set to null to use CSS animations instead.
   * @default Grow
   */
  transition?: React.JSXElementConstructor<any> | null | undefined;
  /**
   * The component used for the portal element, which contains the menu and its backdrops.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component used to position the menu surface.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the backdrop beneath the menu.
   * A modal menu renders it to block outside clicks. Providing this slot or `slotProps.backdrop` also renders it.
   * Set to `null` to omit it. A modal menu then allows outside clicks and keeps the scroll lock.
   * The default backdrop is transparent.
   */
  backdrop?: React.ElementType | null | undefined;
  /**
   * The component used for the menu surface. The popup renders as this element.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

type WithSx = { sx?: SxProps<Theme> | undefined };

export interface Menu2PopupSharedSlotProps<OwnerState> {
  /**
   * Props for the transition component. Use onOpenChangeComplete for completion.
   * Base UI owns the open state and mounting lifecycle.
   */
  transition?:
    | SlotProps<
        Omit<
          Partial<GrowProps>,
          'children' | 'in' | 'appear' | 'mountOnEnter' | 'unmountOnExit' | 'onEntered' | 'onExited'
        >,
        OwnerState
      >
    | undefined;
  portal?:
    | SlotProps<ExternalSlotProps<React.ComponentPropsWithRef<'div'>> & WithSx, OwnerState>
    | undefined;
  positioner?:
    SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props> & WithSx, OwnerState> | undefined;
  backdrop?: SlotProps<ExternalSlotProps<BaseMenu.Backdrop.Props>, OwnerState> | undefined;
  root?: SlotProps<ExternalSlotProps<PaperProps>, OwnerState> | undefined;
  list?: SlotProps<ExternalSlotProps<ListProps>, OwnerState> | undefined;
}

type Menu2PositionerProps = BaseMenu.Positioner.Props;
type Menu2PortalProps = BaseMenu.Portal.Props;

export type Menu2PopupSide = NonNullable<Menu2PositionerProps['side']>;
export type Menu2PopupAlign = NonNullable<Menu2PositionerProps['align']>;

/**
 * These positioning and portal props use Base UI types.
 * Pick limits the public API to the listed props.
 * Material UI additions and different defaults are declared below.
 */
export interface Menu2PopupPublicProps
  extends
    Pick<
      Menu2PositionerProps,
      | 'anchor'
      | 'positionMethod'
      | 'sideOffset'
      | 'alignOffset'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'sticky'
      | 'disableAnchorTracking'
      | 'collisionAvoidance'
    >,
    Pick<Menu2PortalProps, 'container' | 'keepMounted'>,
    Pick<BaseMenu.Popup.Props, 'finalFocus'> {
  /**
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
   * @default 'auto'
   */
  transitionDuration?: GrowProps['timeout'] | undefined;
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the root element.
   */
  className?: string | undefined;
  /**
   * Inline styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: Menu2PopupSide | undefined;
  /**
   * How to align the popup relative to the specified side.
   * Defaults to `start` to match the classic Menu (Base UI defaults to `center`).
   * @default 'start'
   */
  align?: Menu2PopupAlign | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: number | undefined;
}

export interface Menu2PopupSharedProps<OwnerState>
  extends
    Omit<BaseMenu.Popup.Props, 'children' | 'className' | 'render' | 'style' | 'finalFocus'>,
    Menu2PopupPublicProps {
  classes?:
    Partial<Record<'root' | 'portal' | 'positioner' | 'backdrop' | 'list', string>> | undefined;
  ownerState: OwnerState;
  modal?: boolean | undefined;
  onClosingChange?: ((closing: boolean) => void) | undefined;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    root: React.ElementType;
    portal: React.ElementType;
    positioner: React.ElementType;
    list: React.ElementType;
    backdrop?: React.ElementType | undefined;
  };
  defaultPositionerProps?: Partial<BaseMenu.Positioner.Props> | undefined;
  sx?: SxProps<Theme> | undefined;
}

export const Menu2PopupBase = React.forwardRef(function Menu2PopupBase<OwnerState extends object>(
  props: Menu2PopupSharedProps<OwnerState>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isRtl = useRtl();
  const {
    children,
    className,
    classes,
    ownerState,
    modal = false,
    onClosingChange,
    slots,
    slotProps,
    defaultSlots,
    defaultPositionerProps,
    sx,
    container,
    keepMounted,
    anchor,
    positionMethod,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking,
    collisionAvoidance,
    finalFocus,
    elevation,
    transitionDuration = 'auto',
    style,
    ...other
  } = props;

  // Keep the Base parts for their context and behavior. The portal styles the
  // portal's shared stacking layer; the positioner controls placement inside it.
  const RootSlot = slots?.root ?? defaultSlots.root;
  const PortalSlot = slots?.portal ?? defaultSlots.portal;
  const PositionerSlot = slots?.positioner ?? defaultSlots.positioner;
  const TransitionSlot = slots?.transition === undefined ? Grow : slots.transition;
  const transitionProps = resolveComponentProps(slotProps?.transition, ownerState);
  const transitionTimeout =
    transitionDuration === 'auto' &&
    !(TransitionSlot as (React.ElementType & { muiSupportAuto?: boolean | undefined }) | null)
      ?.muiSupportAuto
      ? undefined
      : transitionDuration;
  // A modal menu renders the backdrop to block outside clicks. Slot configuration
  // also renders it; null overrides both.
  const BackdropSlot =
    slots?.backdrop === null
      ? null
      : (slots?.backdrop ?? (modal || slotProps?.backdrop ? defaultSlots.backdrop : undefined));
  const resolvedRootProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const resolvedPortalProps = resolveComponentProps(slotProps?.portal, ownerState);
  const resolvedPositionerProps = resolveComponentProps(slotProps?.positioner, ownerState);
  const resolvedBackdropProps = BackdropSlot
    ? resolveComponentProps(slotProps?.backdrop, ownerState)
    : undefined;
  // Base UI merges className, style, and ref into the element that `render`
  // gives a part, so those go through the part. `sx` and the Paper props go on
  // the element. All HTML attributes and handlers target the popup surface.
  // Handlers run before Base UI handles navigation keys and stops propagation.
  const {
    className: rootSlotClassName,
    ref: rootSlotRef,
    style: rootSlotStyle,
    sx: rootSlotSx,
    ...rootSlotOtherProps
  } = resolvedRootProps ?? {};
  const {
    className: portalSlotClassName,
    sx: portalSlotSx,
    ...portalSlotOtherProps
  } = resolvedPortalProps ?? {};
  const {
    className: positionerSlotClassName,
    sx: positionerSlotSx,
    ...positionerSlotOtherProps
  } = resolvedPositionerProps ?? {};
  const {
    sx: backdropSlotSx,
    style: backdropSlotStyle,
    ...backdropSlotOtherProps
  } = resolvedBackdropProps ?? {};
  const popupRef = React.useRef<HTMLDivElement>(null);
  const handleRootRef = useForkRef(ref, rootSlotRef, popupRef);
  const rootStyle =
    style === undefined && rootSlotStyle === undefined ? undefined : { ...style, ...rootSlotStyle };
  const positionerProps = {
    ...defaultPositionerProps,
  };

  setDefinedProp(positionerProps, 'anchor', anchor);
  setDefinedProp(positionerProps, 'positionMethod', positionMethod);
  setDefinedProp(positionerProps, 'side', side);
  setDefinedProp(positionerProps, 'sideOffset', sideOffset);
  setDefinedProp(positionerProps, 'align', align);
  setDefinedProp(positionerProps, 'alignOffset', alignOffset);
  setDefinedProp(positionerProps, 'collisionBoundary', collisionBoundary);
  setDefinedProp(positionerProps, 'collisionPadding', collisionPadding);
  setDefinedProp(positionerProps, 'sticky', sticky);
  setDefinedProp(positionerProps, 'disableAnchorTracking', disableAnchorTracking);
  setDefinedProp(positionerProps, 'collisionAvoidance', collisionAvoidance);

  const portalRender = (
    <PortalSlot
      {...getSlotProps(
        PortalSlot,
        appendOwnerState(PortalSlot, { sx: portalSlotSx }, ownerState),
        sxHostOmittedProps,
      )}
    />
  );
  const positionerRender = (
    <PositionerSlot
      {...getSlotProps(
        PositionerSlot,
        appendOwnerState(PositionerSlot, { sx: positionerSlotSx }, ownerState),
        sxHostOmittedProps,
      )}
    />
  );
  const rootProps = getSlotProps(
    RootSlot,
    appendOwnerState(RootSlot, { sx: rootSlotSx }, ownerState),
    paperHostOmittedProps,
  );
  const popupProps = getSlotProps(
    RootSlot,
    mergeProps({ elevation: elevation ?? 8 }, other, rootSlotOtherProps),
    paperHostOmittedProps,
  );
  const [ListSlot, mergedListProps] = useSlot('list', {
    elementType: defaultSlots.list,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    additionalProps: { component: 'div', disablePadding: false },
    className: classes?.list,
    shouldForwardComponentProp: true,
  });

  const listSlotProps = getSlotProps(ListSlot, mergedListProps, listHostOmittedProps);

  return (
    <BaseMenu.Portal
      {...portalSlotOtherProps}
      container={container}
      keepMounted={keepMounted}
      render={portalRender}
      className={clsx(classes?.portal, portalSlotClassName)}
    >
      {BackdropSlot ? (
        <BaseMenu.Backdrop
          // With marked elements on the page, Base UI ignores presses on unmarked layers.
          // The mark makes a press on the backdrop close the menu.
          data-base-ui-inert={modal ? '' : undefined}
          {...backdropSlotOtherProps}
          // A modal backdrop blocks outside clicks while the menu is open.
          style={
            modal
              ? (state) => ({ pointerEvents: state.open ? 'auto' : 'none', ...backdropSlotStyle })
              : backdropSlotStyle
          }
          render={
            <BackdropSlot
              {...getSlotProps(
                BackdropSlot,
                appendOwnerState(BackdropSlot, { sx: backdropSlotSx }, ownerState),
                sxHostOmittedProps,
              )}
            />
          }
          className={clsx(classes?.backdrop, backdropSlotOtherProps.className)}
        />
      ) : null}
      <BaseMenu.Positioner
        // Floating UI reads DOM direction separately from Base UI's context.
        dir={isRtl ? 'rtl' : 'ltr'}
        {...positionerProps}
        {...positionerSlotOtherProps}
        render={positionerRender}
        className={clsx(classes?.positioner, positionerSlotClassName)}
      >
        <BaseMenu.Popup
          finalFocus={finalFocus}
          {...popupProps}
          ref={handleRootRef}
          render={(renderProps, state) => {
            // Let Base UI apply its initial transition:none before Grow starts.
            // The opening popup must remain focusable while Grow is still exited.
            const mergedRootProps = mergeProps(renderProps, rootProps);
            // A supplied name takes precedence over Base UI's trigger label.
            // Keep an explicit labelledby when both naming attributes are set.
            mergedRootProps['aria-labelledby'] =
              popupProps['aria-labelledby'] ??
              (popupProps['aria-label'] !== undefined ? undefined : renderProps['aria-labelledby']);
            const root = <RootSlot {...mergedRootProps} />;
            const surface = TransitionSlot ? (
              <TransitionSlot
                timeout={transitionTimeout}
                {...transitionProps}
                appear={false}
                in={state.open && state.transitionStatus !== 'starting'}
                mountOnEnter={false}
                unmountOnExit={false}
                style={{
                  ...transitionProps?.style,
                  ...(state.open && { visibility: 'visible' }),
                }}
              >
                {root}
              </TransitionSlot>
            ) : (
              root
            );
            return onClosingChange ? (
              <Menu2SubmenuClosingState
                closing={!state.open && state.transitionStatus === 'ending'}
                onClosingChange={onClosingChange}
              >
                {surface}
              </Menu2SubmenuClosingState>
            ) : (
              <React.Fragment>
                {surface}
                <Menu2ScrollLock locked={modal && state.open} popupRef={popupRef} />
              </React.Fragment>
            );
          }}
          className={clsx(classes?.root, className, rootSlotClassName)}
          style={rootStyle}
        >
          <ListSlot {...listSlotProps}>{children}</ListSlot>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}) as <OwnerState extends object>(
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
