import { afterEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import useLocalStorageState from './useLocalStorageState';

// Exercise the fallback in the regular test run, including when React 18+ is installed.
vi.mock('react', async (importOriginal) => ({
  ...(await importOriginal<typeof React>()),
  useSyncExternalStore: undefined,
}));

const STORAGE_KEY = 'mui-use-local-storage-state-react-17-test';
const OTHER_STORAGE_KEY = `${STORAGE_KEY}-other`;

describe('useLocalStorageState React 17 fallback', () => {
  const { render, renderToString } = createRenderer();

  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(OTHER_STORAGE_KEY);
  });

  it('uses the new key snapshot for functional updates in effects', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'first');
    window.localStorage.setItem(OTHER_STORAGE_KEY, 'second');

    function TestComponent() {
      const [key, setKey] = React.useState(STORAGE_KEY);
      const [value, setValue] = useLocalStorageState(key);
      const previousKey = React.useRef(key);

      React.useEffect(() => {
        if (previousKey.current !== key) {
          previousKey.current = key;
          setValue((previousValue) => `${previousValue}-updated`);
        }
      }, [key, setValue]);

      return <button onClick={() => setKey(OTHER_STORAGE_KEY)}>{value}</button>;
    }

    const { user } = render(<TestComponent />);

    await user.click(screen.getByRole('button'));

    expect(window.localStorage.getItem(STORAGE_KEY)).to.equal('first');
    expect(window.localStorage.getItem(OTHER_STORAGE_KEY)).to.equal('second-updated');
    expect(screen.getByRole('button')).to.have.text('second-updated');
  });

  it('reads storage on rerender and keeps subsequent subscription updates working', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'initial');

    function TestComponent() {
      const [, forceRender] = React.useReducer((value) => value + 1, 0);
      const [value, setValue] = useLocalStorageState(STORAGE_KEY);

      return (
        <React.Fragment>
          <div data-testid="value">{value}</div>
          <button
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, 'external');
              forceRender();
            }}
          >
            Update externally
          </button>
          <button onClick={() => setValue('initial')}>Reset</button>
        </React.Fragment>
      );
    }

    const { user } = render(<TestComponent />);

    await user.click(screen.getByRole('button', { name: 'Update externally' }));
    expect(screen.getByTestId('value')).to.have.text('external');

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByTestId('value')).to.have.text('initial');
  });

  it('hydrates the server snapshot before reading storage', () => {
    window.localStorage.setItem(STORAGE_KEY, 'stored');

    function TestComponent() {
      const [value] = useLocalStorageState(STORAGE_KEY);
      return <div data-testid="value">{String(value)}</div>;
    }

    const { container, hydrate } = renderToString(<TestComponent />);
    const serverElement = container.querySelector('[data-testid="value"]');
    expect(serverElement).to.have.text('null');

    hydrate();

    expect(screen.getByTestId('value')).to.equal(serverElement);
    expect(screen.getByTestId('value')).to.have.text('stored');
  });
});
