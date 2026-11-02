import * as React from 'react';

const useResizeHandle = (
  target: React.RefObject<HTMLDivElement | null>,
  options?: {
    minWidth?: string;
    maxWidth?: string;
    onDragging?: (
      target: React.RefObject<HTMLDivElement>['current'],
      length: number,
      dragOffset: number,
    ) => void;
  },
) => {
  const { minWidth = '0px', maxWidth = '100%', onDragging } = options || {};
  const [dragging, setDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
    return Boolean((event as TouchEvent).touches && (event as TouchEvent).touches.length);
  };
  const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
    return Boolean((event as MouseEvent).clientX || (event as MouseEvent).clientX === 0);
  };
  const getClientX = React.useCallback((event: MouseEvent | TouchEvent) => {
    let clientX;
    if (isMouseEvent(event)) {
      clientX = event.clientX;
    }
    if (isTouchEvent(event)) {
      clientX = event.touches[0].clientX;
    }
    return clientX as number;
  }, []);
  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX = getClientX(event.nativeEvent);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDragging(true);
    setDragOffset(rect.width - (clientX - rect.x));
  };
  React.useEffect(() => {
    function resizeObject(event: MouseEvent | TouchEvent) {
      if (event.cancelable) {
        event.preventDefault();
      }
      const clientX = getClientX(event);

      if (target.current && dragging && clientX) {
        const objectRect = target.current.getBoundingClientRect();
        const newWidth = clientX - objectRect.left;
        if (onDragging) {
          onDragging(target.current, newWidth, dragOffset);
        } else {
          target.current.style.width = `clamp(${minWidth}, ${Math.floor(
            newWidth + dragOffset,
          )}px, ${maxWidth})`;
        }
      }
    }
    function stopResize() {
      setDragging(false);
    }

    if (dragging) {
      document.addEventListener('mousemove', resizeObject, { passive: false });
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resizeObject, { passive: false });
      document.addEventListener('touchend', stopResize);
      return () => {
        document.removeEventListener('mousemove', resizeObject);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchmove', resizeObject);
        document.removeEventListener('touchend', stopResize);
      };
    }
    return () => {};
  }, [dragOffset, dragging, getClientX, maxWidth, minWidth, onDragging, target]);
  return {
    dragging,
    getDragHandlers: () => ({
      onTouchStart: handleStart,
      onMouseDown: handleStart,
    }),
  };
};

export default useResizeHandle;
