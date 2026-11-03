export interface ComponentProps {
  /**
   * Original description of the callback.
   * @param {MouseEvent} event The event source.
   */
  onItemClick?(event: MouseEvent): void;
  /**
   * A normal prop.
   */
  name: string;
}

// Module augmentation / declaration merging
export interface ComponentProps {
  /**
   * Augmented description of the callback.
   * @param {MouseEvent | React.MouseEvent} event The event source (augmented).
   */
  onItemClick?(event: MouseEvent | React.MouseEvent): void;
}
