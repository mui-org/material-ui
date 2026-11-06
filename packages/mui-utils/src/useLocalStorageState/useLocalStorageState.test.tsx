import { describe, it, expect, afterEach } from 'vitest';
import * as React from 'react';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import useLocalStorageState from './useLocalStorageState';

const STORAGE_KEY = 'mui-use-local-storage-state-test';

type SetValue = React.Dispatch<React.SetStateAction<string | null>>;

function TestComponent(props: {
  storageKey: string | null;
  initialValue?: string | null;
  testId?: string;
  setValueRef?: React.RefObject<SetValue | null>;
}) {
  const { storageKey, initialValue, testId = 'value', setValueRef } = props;
  const [value, setValue] = useLocalStorageState(storageKey, initialValue);

  if (setValueRef) {
    setValueRef.current = setValue;
  }

  return <div data-testid={testId}>{String(value)}</div>;
}

describe('useLocalStorageState', () => {
  const { render } = createRenderer();

  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
  });

  it('returns the initial value when the key is not stored', () => {
    render(<TestComponent storageKey={STORAGE_KEY} initialValue="initial" />);

    expect(screen.getByTestId('value')).to.have.text('initial');
  });

  it('returns the stored value', () => {
    window.localStorage.setItem(STORAGE_KEY, 'stored');

    render(<TestComponent storageKey={STORAGE_KEY} initialValue="initial" />);

    expect(screen.getByTestId('value')).to.have.text('stored');
  });

  it('stores new values and shares them with hooks that use the same key', () => {
    const setValueRef = React.createRef<SetValue>();
    render(
      <React.Fragment>
        <TestComponent storageKey={STORAGE_KEY} initialValue="initial" setValueRef={setValueRef} />
        <TestComponent storageKey={STORAGE_KEY} initialValue="initial" testId="other-value" />
      </React.Fragment>,
    );

    act(() => {
      setValueRef.current!((previousValue) => `${previousValue}-next`);
    });

    expect(window.localStorage.getItem(STORAGE_KEY)).to.equal('initial-next');
    expect(screen.getByTestId('value')).to.have.text('initial-next');
    expect(screen.getByTestId('other-value')).to.have.text('initial-next');

    act(() => {
      setValueRef.current!(null);
    });

    expect(window.localStorage.getItem(STORAGE_KEY)).to.equal(null);
    expect(screen.getByTestId('value')).to.have.text('initial');
  });

  it('updates when another tab changes the stored value', () => {
    render(<TestComponent storageKey={STORAGE_KEY} initialValue="initial" />);

    act(() => {
      window.localStorage.setItem(STORAGE_KEY, 'from-other-tab');
      window.dispatchEvent(
        new StorageEvent('storage', { key: STORAGE_KEY, storageArea: window.localStorage }),
      );
    });

    expect(screen.getByTestId('value')).to.have.text('from-other-tab');
  });

  it('keeps the value in React state when the key is null', () => {
    const setValueRef = React.createRef<SetValue>();
    render(<TestComponent storageKey={null} initialValue="initial" setValueRef={setValueRef} />);

    act(() => {
      setValueRef.current!('local');
    });

    expect(screen.getByTestId('value')).to.have.text('local');
    expect(window.localStorage.getItem(STORAGE_KEY)).to.equal(null);
  });
});
