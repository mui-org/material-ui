import * as React from 'react';
import { click, mouseDown, mouseUp } from './fireDiscreteEvent';
import { act, fireEvent } from './createClientRender';

export function touch(target: Element): void {
  fireEvent.touchStart(target);
  fireEvent.touchEnd(target);
}

export function mousePress(target: Element): void {
  if (typeof (React as any).unstable_act === 'function') {
    (React as any).unstable_act(() => {
      mouseDown(target);
      mouseUp(target);
      click(target);
    });
  } else {
    mouseDown(target);
    mouseUp(target);
    click(target);
    act(() => {});
  }
}
