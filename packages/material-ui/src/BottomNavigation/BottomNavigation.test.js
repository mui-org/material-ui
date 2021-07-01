import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, createClientRender, fireEvent } from 'test/utils';
import BottomNavigation, {
  bottomNavigationClasses as classes,
} from '@material-ui/core/BottomNavigation';
import BottomNavigationAction, {
  bottomNavigationActionClasses as actionClasses,
} from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

describe('<BottomNavigation />', () => {
  const render = createClientRender();

  const icon = <Icon>restore</Icon>;
  const getBottomNavigation = (container) => container.firstChild;

  describeConformanceV5(
    <BottomNavigation>
      <BottomNavigationAction label="One" />
    </BottomNavigation>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiBottomNavigation',
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      skip: ['componentsProp', 'themeVariants'],
    }),
  );

  it('renders with a null child', () => {
    const { container } = render(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction label="One" />
        {null}
        <BottomNavigationAction label="Three" />
      </BottomNavigation>,
    );
    expect(getBottomNavigation(container).childNodes.length).to.equal(2);
  });

  it('should pass selected prop to children', () => {
    const { container } = render(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    expect(getBottomNavigation(container).childNodes[0]).not.to.have.class(actionClasses.selected);
    expect(getBottomNavigation(container).childNodes[1]).to.have.class(actionClasses.selected);
  });

  it('should overwrite parent showLabel prop adding class iconOnly', () => {
    const { getByTestId } = render(
      <BottomNavigation showLabels>
        <BottomNavigationAction icon={icon} data-testid="withLabel" />
        <BottomNavigationAction icon={icon} showLabel={false} data-testid="withoutLabel" />
      </BottomNavigation>,
    );
    expect(getByTestId('withLabel')).not.to.have.class(actionClasses.iconOnly);
    expect(getByTestId('withoutLabel')).to.have.class(actionClasses.iconOnly);
  });

  it('should forward the click', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value={0} onChange={handleChange}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(1);
  });

  it('should use custom action values', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value={'first'} onChange={handleChange}>
        <BottomNavigationAction value="first" icon={icon} />
        <BottomNavigationAction value="second" icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.args[0][1]).to.equal('second', 'should have been called with value second');
  });

  it('should handle also empty action value', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value="val" onChange={handleChange}>
        <BottomNavigationAction value="" icon={icon} />
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction value={null} icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[0]);
    expect(handleChange.args[0][1], '');
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.args[1][1], 1);
    fireEvent.click(getBottomNavigation(container).childNodes[2]);
    expect(handleChange.args[2][1], '');
  });
});
