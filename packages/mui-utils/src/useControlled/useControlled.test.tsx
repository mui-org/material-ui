import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer } from '@mui/internal-test-utils';
import useControlled from './useControlled';

type TestProps<T> = {
  value?: T;
  defaultValue?: T;
};

type TestComponentProps<T> = TestProps<T> & {
  children: (params: {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  }) => React.ReactNode;
};

type SetProps = <T>(props: TestProps<T>) => void;

function TestComponent<T>({ value: valueProp, defaultValue, children }: TestComponentProps<T>) {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TestComponent',
  });
  return children({ value, setValue });
}

describe('useControlled', () => {
  const { render } = createRenderer();

  it('works correctly when is not controlled', () => {
    let valueState = 0;
    let setValueState: React.Dispatch<React.SetStateAction<number | undefined>>;
    render(
      <TestComponent defaultValue={1}>
        {({ value, setValue }) => {
          valueState = value;
          setValueState = setValue;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);

    act(() => {
      setValueState(2);
    });

    expect(valueState).to.equal(2);
  });

  it('works correctly when is controlled', () => {
    let valueState;
    render(
      <TestComponent value={1}>
        {({ value }) => {
          valueState = value;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);
  });

  it('warns when switching from uncontrolled to controlled', () => {
    let setProps: SetProps;
    expect(() => {
      ({ setProps } = render(<TestComponent>{() => null}</TestComponent>));
    }).not.toErrorDev();

    expect(() => {
      setProps({ value: 'foobar' });
    }).toErrorDev(
      'MUI: A component is changing the uncontrolled value state of TestComponent to be controlled.',
    );
  });

  it('warns when switching from controlled to uncontrolled', () => {
    let setProps: SetProps;

    expect(() => {
      ({ setProps } = render(<TestComponent value="foobar">{() => null}</TestComponent>));
    }).not.toErrorDev();

    expect(() => {
      setProps({ value: undefined });
    }).toErrorDev(
      'MUI: A component is changing the controlled value state of TestComponent to be uncontrolled.',
    );
  });

  describe('warns when changing the defaultValue prop after initial rendering', () => {
    it('should detect changes', () => {
      let setProps: SetProps;

      expect(() => {
        ({ setProps } = render(<TestComponent>{() => null}</TestComponent>));
      }).not.toErrorDev();

      expect(() => {
        setProps({ defaultValue: 1 });
      }).toErrorDev(
        'MUI: A component is changing the default value state of an uncontrolled TestComponent after being initialized.',
      );
    });

    it('should not warn when controlled', () => {
      let setProps: SetProps;

      expect(() => {
        ({ setProps } = render(
          <TestComponent value={1} defaultValue={0}>
            {() => null}
          </TestComponent>,
        ));
      }).not.toErrorDev();

      expect(() => {
        setProps({ defaultValue: 1 });
      }).not.toErrorDev();
    });

    it('should not warn when NaN', () => {
      expect(() => {
        render(<TestComponent defaultValue={NaN}>{() => null}</TestComponent>);
      }).not.toErrorDev();
    });

    it('should not warn when an array', () => {
      function TestComponentArray() {
        useControlled({
          controlled: undefined,
          default: [],
          name: 'TestComponent',
        });
        return null;
      }

      expect(() => {
        render(<TestComponentArray />);
      }).not.toErrorDev();
    });
  });
});
