import * as React from 'react';
import { parseISO } from 'date-fns';
import { createClientRender, fireEvent, screen } from 'test/utils';
import { queryHelpers, Matcher, MatcherOptions } from '@testing-library/react/pure';
import { TransitionProps } from '@material-ui/core/transitions';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// TODO make possible to pass here any utils using cli
/**
 * Wrapper around `@date-io/date-fns` that resolves https://github.com/dmtrKovalenko/date-io/issues/479.
 * We're not using `adapter.date` in the implementation which means the implementation is safe.
 * But we do use it in tests where usage of ISO dates without timezone is problematic
 */
export class AdapterClassToUse extends AdapterDateFns {
  date(value?: any): Date {
    if (typeof value === 'string') {
      return parseISO(value);
    }
    return super.date(value);
  }
}
export const adapterToUse = new AdapterClassToUse();

export const FakeTransitionComponent = React.forwardRef<HTMLDivElement, TransitionProps>(
  function FakeTransitionComponent({ children }, ref) {
    // set tabIndex in case it is used as a child of <TrapFocus />
    return (
      <div ref={ref} tabIndex={-1}>
        {children}
      </div>
    );
  },
);

interface PickerRenderOptions {
  // object for date-fns, string for other adapters
  locale?: string | object;
}

export function wrapPickerMount(mount: (node: React.ReactNode) => import('enzyme').ReactWrapper) {
  return (node: React.ReactNode) =>
    mount(<LocalizationProvider dateAdapter={AdapterClassToUse}>{node}</LocalizationProvider>);
}

export function createPickerRender({
  locale,
  ...renderOptions
}: PickerRenderOptions & import('test/utils').RenderOptions = {}) {
  const clientRender = createClientRender(renderOptions);

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <LocalizationProvider locale={locale} dateAdapter={AdapterClassToUse}>
        {children}
      </LocalizationProvider>
    );
  }

  return (node: React.ReactElement) => clientRender(node, { wrapper: Wrapper });
}

export const queryByMuiTest = queryHelpers.queryByAttribute.bind(null, 'data-mui-test');
export const queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');

export function getAllByMuiTest(
  id: Matcher,
  container: HTMLElement = document.body,
  options?: MatcherOptions,
): Element[] {
  const els = queryAllByMuiTest(container, id, options);
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-mui-test="${id}"]`,
      container,
    );
  }
  return els;
}

export function getByMuiTest(...args: Parameters<typeof getAllByMuiTest>): Element {
  const result = getAllByMuiTest(...args);
  if (result.length > 0) {
    return result[0];
  }

  throw queryHelpers.getElementError(
    `Unable to find an element by: [data-mui-test="${args[0]}"]`,
    document.body,
  );
}

export function openMobilePicker() {
  fireEvent.click(screen.getByRole('textbox'));
}
