const EMPTY_MOTION = {};

export default function createMotion(inputMotion = EMPTY_MOTION) {
  return {
    reducedMotion: 'never',
    ...inputMotion,
  };
}
