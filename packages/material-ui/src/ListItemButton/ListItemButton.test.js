import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import ListItemButton, { listItemButtonClasses as classes } from '@material-ui/core/ListItemButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import ListContext from '../List/ListContext';

describe('<ListItemButton />', () => {
  const render = createClientRender();

  describeConformanceV5(<ListItemButton />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'a',
    muiName: 'MuiListItemButton',
    testVariantProps: { dense: true },
    skip: ['componentsProp'],
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItemButton />);
    expect(getByRole('button')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItemButton selected />);
    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItemButton disableGutters />);
    expect(getByRole('button')).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItemButton>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItemButton>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('prop: focusVisibleClassName', () => {
    it('should merge the class names', () => {
      const { getByRole } = render(
        <ListItemButton focusVisibleClassName="focusVisibleClassName" />,
      );
      const button = getByRole('button');

      act(() => {
        fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });
});
