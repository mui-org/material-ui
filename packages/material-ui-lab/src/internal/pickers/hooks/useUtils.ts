import * as React from 'react';
import MuiError from '@material-ui/utils/macros/MuiError.macro';
import {
  MuiPickersAdapterContext,
  MuiPickersAdapterContextValue,
} from '../../../LocalizationProvider';

// Required for babel https://github.com/vercel/next.js/issues/7882. Replace with `export type` in future
export type MuiPickersAdapter<TDate = unknown> =
  import('../../../LocalizationProvider').MuiPickersAdapter<TDate>;

function useLocalizationContext<T>() {
  const localization = React.useContext(MuiPickersAdapterContext);
  if (localization === null) {
    throw new MuiError(
      'Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.',
    );
  }

  return localization as MuiPickersAdapterContextValue<T>;
}

export function useUtils<T = unknown>() {
  return useLocalizationContext<T>().utils;
}

export function useDefaultDates<T>() {
  return useLocalizationContext<T>().defaultDates;
}

export function useNow<TDate = unknown>(): TDate {
  const utils = useUtils<TDate>();
  const now = React.useRef(utils.date());

  return now.current!;
}
