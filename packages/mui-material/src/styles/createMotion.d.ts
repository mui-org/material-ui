export type ReducedMotionMode = 'never' | 'system' | 'always';

export interface Motion {
  reducedMotion: ReducedMotionMode;
}

export interface MotionOptions {
  reducedMotion?: ReducedMotionMode | undefined;
}

export default function createMotion(inputMotion?: MotionOptions): Motion;
