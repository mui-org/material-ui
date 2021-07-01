import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createClientRender,
  ErrorBoundary,
  fireEvent,
  screen,
  describeConformanceV5,
} from 'test/utils';
import Portal from '@material-ui/core/Portal';
import TreeView, { treeViewClasses as classes } from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

describe('<TreeView />', () => {
  const render = createClientRender();

  describeConformanceV5(<TreeView />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    refInstanceof: window.HTMLUListElement,
    muiName: 'MuiTreeView',
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  describe('warnings', () => {
    it('should warn when switching from controlled to uncontrolled of the expanded prop', () => {
      const { setProps } = render(
        <TreeView expanded={[]}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      expect(() => {
        setProps({ expanded: undefined });
      }).toErrorDev(
        'Material-UI: A component is changing the controlled expanded state of TreeView to be uncontrolled.',
      );
    });

    it('should warn when switching from controlled to uncontrolled of the selected prop', () => {
      const { setProps } = render(
        <TreeView selected={[]}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      expect(() => {
        setProps({ selected: undefined });
      }).toErrorDev(
        'Material-UI: A component is changing the controlled selected state of TreeView to be uncontrolled.',
      );
    });

    it('should not crash when shift clicking a clean tree', () => {
      render(
        <TreeView multiSelect>
          <TreeItem nodeId="one" label="one" />
          <TreeItem nodeId="two" label="two" />
        </TreeView>,
      );

      fireEvent.click(screen.getByText('one'), { shiftKey: true });
    });

    it('should not crash when selecting multiple items in a deeply nested tree', () => {
      render(
        <TreeView multiSelect defaultExpanded={['1', '1.1', '2']}>
          <TreeItem nodeId="1" label="Item 1">
            <TreeItem nodeId="1.1" label="Item 1.1">
              <TreeItem nodeId="1.1.1" data-testid="item-1.1.1" label="Item 1.1.1" />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="2" data-testid="item-2" label="Item 2" />
        </TreeView>,
      );
      fireEvent.click(screen.getByText('Item 1.1.1'));
      fireEvent.click(screen.getByText('Item 2'), { shiftKey: true });

      expect(screen.getByTestId('item-1.1.1')).to.have.attribute('aria-selected', 'true');
      expect(screen.getByTestId('item-2')).to.have.attribute('aria-selected', 'true');
    });

    it('should not crash on keydown on an empty tree', () => {
      render(<TreeView />);

      act(() => {
        screen.getByRole('tree').focus();
      });

      fireEvent.keyDown(screen.getByRole('tree'), { key: ' ' });
    });

    it('should not crash when unmounting with duplicate ids', () => {
      const CustomTreeItem = () => {
        return <TreeItem nodeId="iojerogj" />;
      };
      function App() {
        const [isVisible, hideTreeView] = React.useReducer(() => false, true);

        return (
          <React.Fragment>
            <button onClick={hideTreeView} type="button">
              Toggle
            </button>
            {isVisible && (
              <TreeView>
                <TreeItem nodeId="a" label="b">
                  <CustomTreeItem nodeId="a" />
                </TreeItem>
              </TreeView>
            )}
          </React.Fragment>
        );
      }
      const errorRef = React.createRef();
      render(
        <ErrorBoundary ref={errorRef}>
          <App />
        </ErrorBoundary>,
      );

      expect(() => {
        screen.getByRole('button').click();
      }).not.toErrorDev();
    });
  });

  it('should call onKeyDown when a key is pressed', () => {
    const handleKeyDown = spy();

    const { getByRole } = render(
      <TreeView onKeyDown={handleKeyDown}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );
    act(() => {
      getByRole('tree').focus();
    });

    fireEvent.keyDown(getByRole('tree'), { key: 'Enter' });
    fireEvent.keyDown(getByRole('tree'), { key: 'A' });
    fireEvent.keyDown(getByRole('tree'), { key: ']' });

    expect(handleKeyDown.callCount).to.equal(3);
  });

  it('should call onFocus when tree is focused', () => {
    const handleFocus = spy();
    const { getByRole } = render(
      <TreeView onFocus={handleFocus}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );

    act(() => {
      getByRole('tree').focus();
    });

    expect(handleFocus.callCount).to.equal(1);
  });

  it('should call onBlur when tree is blurred', () => {
    const handleBlur = spy();
    const { getByRole } = render(
      <TreeView onBlur={handleBlur}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );

    act(() => {
      getByRole('tree').focus();
      getByRole('tree').blur();
    });

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should be able to be controlled with the expanded prop', () => {
    function MyComponent() {
      const [expandedState, setExpandedState] = React.useState([]);
      const handleNodeToggle = (event, nodes) => {
        setExpandedState(nodes);
      };
      return (
        <TreeView expanded={expandedState} onNodeToggle={handleNodeToggle}>
          <TreeItem nodeId="1" label="one" data-testid="one">
            <TreeItem nodeId="2" label="two" />
          </TreeItem>
        </TreeView>
      );
    }

    const { getByRole, getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');

    fireEvent.click(getByText('one'));
    act(() => {
      getByRole('tree').focus();
    });

    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');

    fireEvent.click(getByText('one'));

    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');

    fireEvent.keyDown(getByRole('tree'), { key: '*' });

    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
  });

  it('should be able to be controlled with the selected prop and singleSelect', () => {
    function MyComponent() {
      const [selectedState, setSelectedState] = React.useState(null);
      const handleNodeSelect = (event, nodes) => {
        setSelectedState(nodes);
      };
      return (
        <TreeView selected={selectedState} onNodeSelect={handleNodeSelect}>
          <TreeItem nodeId="1" label="one" data-testid="one" />
          <TreeItem nodeId="2" label="two" data-testid="two" />
        </TreeView>
      );
    }

    const { getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).not.to.have.attribute('aria-selected');
    expect(getByTestId('two')).not.to.have.attribute('aria-selected');

    fireEvent.click(getByText('one'));

    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).not.to.have.attribute('aria-selected');

    fireEvent.click(getByText('two'));

    expect(getByTestId('one')).not.to.have.attribute('aria-selected');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'true');
  });

  it('should be able to be controlled with the selected prop and multiSelect', () => {
    function MyComponent() {
      const [selectedState, setSelectedState] = React.useState([]);
      const handleNodeSelect = (event, nodes) => {
        setSelectedState(nodes);
      };
      return (
        <TreeView selected={selectedState} onNodeSelect={handleNodeSelect} multiSelect>
          <TreeItem nodeId="1" label="one" data-testid="one" />
          <TreeItem nodeId="2" label="two" data-testid="two" />
        </TreeView>
      );
    }

    const { getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).to.have.attribute('aria-selected', 'false');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'false');

    fireEvent.click(getByText('one'));

    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'false');

    fireEvent.click(getByText('two'), { ctrlKey: true });

    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'true');
  });

  it('should not error when component state changes', () => {
    function MyComponent() {
      const [, setState] = React.useState(1);

      return (
        <TreeView
          onFocus={() => {
            setState(Math.random);
          }}
          id="tree"
        >
          <TreeItem nodeId="one" label="one" data-testid="one">
            <TreeItem nodeId="two" label="two" data-testid="two" />
          </TreeItem>
        </TreeView>
      );
    }

    const { getByRole, getByText, getByTestId } = render(<MyComponent />);

    fireEvent.click(getByText('one'));
    // Clicks would normally focus tree
    act(() => {
      getByRole('tree').focus();
    });

    expect(getByTestId('one')).toHaveVirtualFocus();

    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowDown' });

    expect(getByTestId('two')).toHaveVirtualFocus();

    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowUp' });

    expect(getByTestId('one')).toHaveVirtualFocus();

    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowDown' });

    expect(getByTestId('two')).toHaveVirtualFocus();
  });

  it('should support conditional rendered tree items', () => {
    function TestComponent() {
      const [hide, setState] = React.useState(false);

      return (
        <React.Fragment>
          <button type="button" onClick={() => setState(true)}>
            Hide
          </button>
          <TreeView>{!hide && <TreeItem nodeId="test" label="test" />}</TreeView>
        </React.Fragment>
      );
    }

    const { getByText, queryByText } = render(<TestComponent />);

    expect(getByText('test')).not.to.equal(null);
    fireEvent.click(getByText('Hide'));
    expect(queryByText('test')).to.equal(null);
  });

  it('should work in a portal', () => {
    const { getByRole, getByTestId } = render(
      <Portal>
        <TreeView id="tree">
          <TreeItem nodeId="one" label="one" data-testid="one" />
          <TreeItem nodeId="two" label="two" data-testid="two" />
          <TreeItem nodeId="three" label="three" data-testid="three" />
          <TreeItem nodeId="four" label="four" data-testid="four" />
        </TreeView>
      </Portal>,
    );

    act(() => {
      getByRole('tree').focus();
    });
    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowDown' });

    expect(getByTestId('two')).toHaveVirtualFocus();

    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowDown' });

    expect(getByTestId('three')).toHaveVirtualFocus();

    fireEvent.keyDown(getByRole('tree'), { key: 'ArrowDown' });

    expect(getByTestId('four')).toHaveVirtualFocus();
  });

  describe('onNodeFocus', () => {
    it('should be called when node is focused', () => {
      const focusSpy = spy();
      const { getByRole } = render(
        <TreeView onNodeFocus={focusSpy}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      // First node receives focus when tree focused
      act(() => {
        getByRole('tree').focus();
      });

      expect(focusSpy.callCount).to.equal(1);
      expect(focusSpy.args[0][1]).to.equal('1');
    });
  });

  describe('onNodeToggle', () => {
    it('should be called when a parent node label is clicked', () => {
      const handleNodeToggle = spy();

      const { getByText } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });

    it('should be called when a parent node icon is clicked', () => {
      const handleNodeToggle = spy();

      const { getByTestId } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem icon={<div data-testid="icon" />} nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByTestId('icon'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      const { getByRole } = render(<TreeView />);

      expect(getByRole('tree')).not.to.equal(null);
    });

    it('(TreeView) should have the attribute `aria-multiselectable=false if using single select`', () => {
      const { getByRole } = render(<TreeView />);

      expect(getByRole('tree')).to.have.attribute('aria-multiselectable', 'false');
    });

    it('(TreeView) should have the attribute `aria-multiselectable=true if using multi select`', () => {
      const { getByRole } = render(<TreeView multiSelect />);

      expect(getByRole('tree')).to.have.attribute('aria-multiselectable', 'true');
    });
  });
});
