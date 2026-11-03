export interface UseBadgeParameters {
  /**
   * The content rendered within the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible?: boolean | undefined;
  /**
   * Max count to show.
   * @default 99
   */
  max?: number | undefined;
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero?: boolean | undefined;
}

export interface UseBadgeReturnValue {
  /**
   * Defines the content that's displayed inside the badge.
   */
  badgeContent: React.ReactNode;
  /**
   * If `true`, the component will not be visible.
   */
  invisible: boolean;
  /**
   * Maximum number to be displayed in the badge.
   */
  max: number;
  /**
   * Value to be displayed in the badge. If `badgeContent` is greater than `max`, it will return `max+`.
   */
  displayValue: React.ReactNode;
}
