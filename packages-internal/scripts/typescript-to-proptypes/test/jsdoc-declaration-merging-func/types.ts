export interface ComponentProps {
  /**
   * First declaration: fires on click.
   * @param {MouseEvent} event The event.
   */
  onClick?(event: MouseEvent): void;
  /**
   * Regular prop.
   */
  label: string;
}

// Declaration merging: second opening overrides via augmentation
export interface ComponentProps {
  /**
   * Second declaration: fires on click (augmented).
   * @param {MouseEvent | React.MouseEvent} event The event.
   */
  onClick?(event: MouseEvent | React.MouseEvent): void;
}
