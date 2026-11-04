'use client';
import * as React from 'react';
import FormControlContext from './FormControlContext';
import type { FormControlState } from './FormControlContext';

type FormControlStateKey = keyof FormControlState;

type FormControlStateResult<Props, States extends readonly FormControlStateKey[]> = {
  [State in States[number]]: State extends keyof Props
    ? Props[State] | FormControlState[State]
    : FormControlState[State];
};

export default function useFormControl(): FormControlState | undefined {
  return React.useContext(FormControlContext);
}

export function useFormControlState<Props, States extends readonly FormControlStateKey[]>({
  props,
  states,
}: {
  props: Props;
  states: States;
}): [FormControlStateResult<Props, States>, FormControlState | undefined] {
  const muiFormControl = React.useContext(FormControlContext);
  const result = {} as Partial<Record<FormControlStateKey, unknown>>;

  states.forEach((state) => {
    const value = (props as Partial<Record<FormControlStateKey, unknown>>)[state];
    result[state] = value === undefined && muiFormControl ? muiFormControl[state] : value;
  });

  return [result as FormControlStateResult<Props, States>, muiFormControl];
}
