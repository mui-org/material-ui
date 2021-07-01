import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { SheetsRegistry } from 'jss';
import { createClientRender, screen } from 'test/utils';
import { createGenerateClassName } from '@material-ui/styles';
import styled from './styled';
import StylesProvider from '../StylesProvider';

describe('styled', () => {
  // StrictModeViolation: uses makeStyles
  const render = createClientRender({ strict: false });
  let StyledButton;

  before(() => {
    StyledButton = styled('button')({
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    });
  });

  it('should work as expected', () => {
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    render(
      <StylesProvider sheetsRegistry={sheetsRegistry} generateClassName={generateClassName}>
        <StyledButton>Styled Components</StyledButton>
      </StylesProvider>,
    );

    expect(sheetsRegistry.registry.length).to.equal(1);
    expect(sheetsRegistry.registry[0].classes).to.deep.equal({ root: 'button-root-1' });
  });

  describe('prop: clone', () => {
    let view;

    beforeEach(() => {
      view = render(
        <StyledButton clone data-test="styled">
          <div>Styled Components</div>
        </StyledButton>,
      );
    });

    it('should be able to pass props to cloned element', () => {
      expect(view.container.firstChild).to.have.attribute('data-test', 'styled');
    });

    it('should be able to clone the child element', () => {
      expect(view.container.firstChild).to.have.tagName('DIV');
      view.setProps({
        clone: false,
      });
      expect(view.container.firstChild).to.have.tagName('BUTTON');
    });
  });

  it('should filter some props', () => {
    const style = (props) => ({
      background: props.color,
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    });
    style.filterProps = ['color'];
    style.propTypes = {};
    const StyledDiv = styled('div')(style);
    render(
      <StyledDiv data-testid="styled" data-color="blue">
        Styled Components
      </StyledDiv>,
    );
    expect(screen.getByTestId('styled')).to.have.attribute('data-color', 'blue');
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if it cant detect the secondary action properly', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          StyledButton.propTypes,
          { clone: true, component: 'div' },
          'prop',
          'StyledButton',
        );
      }).toErrorDev('You can not use the clone and component prop at the same time');
    });
  });

  it('should accept a child function', () => {
    render(<StyledButton>{(props) => <div {...props}>Styled Components</div>}</StyledButton>);
  });
});
