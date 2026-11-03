import isEventHandler from '@mui/utils/isEventHandler';
import type { EventHandlers } from '../types';

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 */
function extractEventHandlers(object: Record<string, any> | undefined): EventHandlers {
  if (object === undefined) {
    return {};
  }

  const result: EventHandlers = {};

  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (isEventHandler(key, object[key])) {
      result[key] = object[key];
    }
  }

  return result;
}

export default extractEventHandlers;
