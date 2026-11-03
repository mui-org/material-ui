// jsdom has no `AnimationEvent`, and jsdom 29+ exposes `WebkitAnimation` on
// `CSSStyleDeclaration`. React reads both to pick an event name, so it listens for
// `webkitAnimationStart` and plain `animationstart` never reaches `onAnimationStart`.
if (typeof globalThis.AnimationEvent === 'undefined') {
  class AnimationEventPolyfill extends Event implements AnimationEvent {
    declare animationName: string;

    declare elapsedTime: number;

    declare pseudoElement: string;

    constructor(type: string, options: AnimationEventInit = {}) {
      super(type, options);
      this.animationName = options.animationName ?? '';
      this.elapsedTime = options.elapsedTime ?? 0;
      this.pseudoElement = options.pseudoElement ?? '';
    }
  }

  globalThis.AnimationEvent = AnimationEventPolyfill;
}
