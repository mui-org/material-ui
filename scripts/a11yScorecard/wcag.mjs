/**
 * Every WCAG 2.2 Level A and AA success criterion, in specification order.
 * The report data stores only the number; the name and level come from here.
 */
export const WCAG_CRITERIA = [
  { number: '1.1.1', name: 'Non-text Content', level: 'A' },
  { number: '1.2.1', name: 'Audio-only and Video-only (Prerecorded)', level: 'A' },
  { number: '1.2.2', name: 'Captions (Prerecorded)', level: 'A' },
  { number: '1.2.3', name: 'Audio Description or Media Alternative (Prerecorded)', level: 'A' },
  { number: '1.2.4', name: 'Captions (Live)', level: 'AA' },
  { number: '1.2.5', name: 'Audio Description (Prerecorded)', level: 'AA' },
  { number: '1.3.1', name: 'Info and Relationships', level: 'A' },
  { number: '1.3.2', name: 'Meaningful Sequence', level: 'A' },
  { number: '1.3.3', name: 'Sensory Characteristics', level: 'A' },
  { number: '1.3.4', name: 'Orientation', level: 'AA' },
  { number: '1.3.5', name: 'Identify Input Purpose', level: 'AA' },
  { number: '1.4.1', name: 'Use of Color', level: 'A' },
  { number: '1.4.2', name: 'Audio Control', level: 'A' },
  { number: '1.4.3', name: 'Contrast (Minimum)', level: 'AA' },
  { number: '1.4.4', name: 'Resize Text', level: 'AA' },
  { number: '1.4.5', name: 'Images of Text', level: 'AA' },
  { number: '1.4.10', name: 'Reflow', level: 'AA' },
  { number: '1.4.11', name: 'Non-text Contrast', level: 'AA' },
  { number: '1.4.12', name: 'Text Spacing', level: 'AA' },
  { number: '1.4.13', name: 'Content on Hover or Focus', level: 'AA' },
  { number: '2.1.1', name: 'Keyboard', level: 'A' },
  { number: '2.1.2', name: 'No Keyboard Trap', level: 'A' },
  { number: '2.1.4', name: 'Character Key Shortcuts', level: 'A' },
  { number: '2.2.1', name: 'Timing Adjustable', level: 'A' },
  { number: '2.2.2', name: 'Pause, Stop, Hide', level: 'A' },
  { number: '2.3.1', name: 'Three Flashes or Below Threshold', level: 'A' },
  { number: '2.4.1', name: 'Bypass Blocks', level: 'A' },
  { number: '2.4.2', name: 'Page Titled', level: 'A' },
  { number: '2.4.3', name: 'Focus Order', level: 'A' },
  { number: '2.4.4', name: 'Link Purpose (In Context)', level: 'A' },
  { number: '2.4.5', name: 'Multiple Ways', level: 'AA' },
  { number: '2.4.6', name: 'Headings and Labels', level: 'AA' },
  { number: '2.4.7', name: 'Focus Visible', level: 'AA' },
  { number: '2.4.11', name: 'Focus Not Obscured (Minimum)', level: 'AA' },
  { number: '2.5.1', name: 'Pointer Gestures', level: 'A' },
  { number: '2.5.2', name: 'Pointer Cancellation', level: 'A' },
  { number: '2.5.3', name: 'Label in Name', level: 'A' },
  { number: '2.5.4', name: 'Motion Actuation', level: 'A' },
  { number: '2.5.7', name: 'Dragging Movements', level: 'AA' },
  { number: '2.5.8', name: 'Target Size (Minimum)', level: 'AA' },
  { number: '3.1.1', name: 'Language of Page', level: 'A' },
  { number: '3.1.2', name: 'Language of Parts', level: 'AA' },
  { number: '3.2.1', name: 'On Focus', level: 'A' },
  { number: '3.2.2', name: 'On Input', level: 'A' },
  { number: '3.2.3', name: 'Consistent Navigation', level: 'AA' },
  { number: '3.2.4', name: 'Consistent Identification', level: 'AA' },
  { number: '3.2.6', name: 'Consistent Help', level: 'A' },
  { number: '3.3.1', name: 'Error Identification', level: 'A' },
  { number: '3.3.2', name: 'Labels or Instructions', level: 'A' },
  { number: '3.3.3', name: 'Error Suggestion', level: 'AA' },
  { number: '3.3.4', name: 'Error Prevention (Legal, Financial, Data)', level: 'AA' },
  { number: '3.3.7', name: 'Redundant Entry', level: 'A' },
  { number: '3.3.8', name: 'Accessible Authentication (Minimum)', level: 'AA' },
  { number: '4.1.2', name: 'Name, Role, Value', level: 'A' },
  { number: '4.1.3', name: 'Status Messages', level: 'AA' },
];

export const WCAG_BY_NUMBER = new Map(
  WCAG_CRITERIA.map((criterion) => [criterion.number, criterion]),
);

export const CONFORMANCE_SYMBOLS = {
  Supports: '✅',
  'Partially Supports': '⚠️',
  'Does Not Support': '❌',
};

export const RESPONSIBILITY_SYMBOLS = { Component: '●', Shared: '◐', Author: '○' };

/** Criteria are grouped by how they are tested, in this order. */
export const GROUP_HEADINGS = {
  Manual: '🔍 Manual',
  Hybrid: '🔁 Hybrid',
  Automated: '⚙️ Automated',
};

/** The axe-core tag for a criterion: `1.4.10` → `wcag1410`. */
export const wcagTag = (number) => `wcag${number.replaceAll('.', '')}`;
