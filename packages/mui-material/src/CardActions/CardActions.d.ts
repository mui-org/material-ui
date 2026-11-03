import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { CardActionsClasses } from './cardActionsClasses';

export interface CardActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardActionsClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
}

/**
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActions API](https://next.mui.com/material-ui/api/card-actions/)
 */
export default function CardActions(props: CardActionsProps): React.JSX.Element;
