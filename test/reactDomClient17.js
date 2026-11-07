// React 17 has no `react-dom/client`. `vitest.shared.mts` aliases it to this file on React 17 only.
/* eslint-disable react/no-deprecated -- React 17 has only these root APIs. */
import * as ReactDOM from 'react-dom';

export function createRoot(container) {
  return {
    render(element) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}

export function hydrateRoot(container, element) {
  ReactDOM.hydrate(element, container);
  return createRoot(container);
}
