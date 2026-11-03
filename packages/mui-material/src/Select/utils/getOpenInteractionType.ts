export default function getOpenInteractionType(
  event: MouseEvent | KeyboardEvent | TouchEvent | PointerEvent | null,
): 'keyboard' | 'pointer' | null {
  if (!event) {
    return null;
  }

  if (event.type === 'mousedown' || event.type === 'pointerdown' || event.type === 'touchstart') {
    return 'pointer';
  }

  if (event.type === 'keydown' || (event.type === 'click' && event.detail === 0)) {
    return 'keyboard';
  }

  return null;
}
