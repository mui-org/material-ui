import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverrideProps } from '@material-ui/types';
import {
  ExtendModalUnstyledTypeMap,
  ExtendModalUnstyled,
} from '@material-ui/unstyled/ModalUnstyled';
import { Theme } from '../styles';
import { BackdropProps } from '../Backdrop';

export type ModalTypeMap<D extends React.ElementType = 'div', P = {}> = ExtendModalUnstyledTypeMap<{
  props: P & {
    /**
     * A backdrop component. This prop enables custom backdrop rendering.
     * @default styled(Backdrop, {
     *   name: 'MuiModal',
     *   slot: 'Backdrop',
     *   overridesResolver: (props, styles) => {
     *     return styles.backdrop;
     *   },
     * })({
     *   zIndex: -1,
     * })
     */
    BackdropComponent?: React.ElementType<BackdropProps>;
    /**
     * Props applied to the [`Backdrop`](/api/backdrop/) element.
     */
    BackdropProps?: Partial<BackdropProps>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

type ModalRootProps = NonNullable<ModalTypeMap['props']['componentsProps']>['root'];

export const ModalRoot: React.FC<ModalRootProps>;

export type ModalClassKey = keyof NonNullable<ModalTypeMap['props']['classes']>;

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * *   [Dialog](https://material-ui.com/api/dialog/)
 * *   [Drawer](https://material-ui.com/api/drawer/)
 * *   [Menu](https://material-ui.com/api/menu/)
 * *   [Popover](https://material-ui.com/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://material-ui.com/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 *
 * Demos:
 *
 * - [Modal](https://material-ui.com/components/modal/)
 *
 * API:
 *
 * - [Modal API](https://material-ui.com/api/modal/)
 */
declare const Modal: ExtendModalUnstyled<ModalTypeMap>;

export type ModalClasses = Record<ModalClassKey, string>;

export const modalClasses: ModalClasses;

export type ModalProps<
  D extends React.ElementType = ModalTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ModalTypeMap<D, P>, D>;

export default Modal;
