import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  describeConformanceV5,
  act,
  createClientRender,
  fireEvent,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from 'test/utils';
import Avatar from '@material-ui/core/Avatar';
import Chip, { chipClasses as classes } from '@material-ui/core/Chip';
import CheckBox from '../internal/svg-icons/CheckBox';

describe('<Chip />', () => {
  const render = createClientRender();

  describeConformanceV5(<Chip />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiChip',
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testVariantProps: { variant: 'outlined' },
    testStatOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));

  describe('text only', () => {
    it('is not in tab order', () => {
      const { container } = render(<Chip label="My text Chip" />);

      expect(container.querySelectorAll('[tabindex]')).to.have.length(0);
    });

    it('should renders certain classes and contains a label', () => {
      const { container } = render(<Chip label="My text Chip" />);

      const chip = container.querySelector(`.${classes.root}`);
      const label = container.querySelector(`.${classes.label}`);

      expect(label).to.have.tagName('span');
      expect(label).to.have.text('My text Chip');

      expect(chip).to.have.class(classes.root);
      expect(chip).not.to.have.class(classes.colorPrimary);
      expect(chip).not.to.have.class(classes.colorSecondary);
      expect(chip).not.to.have.class(classes.clickable);
      expect(chip).not.to.have.class(classes.clickableColorPrimary);
      expect(chip).not.to.have.class(classes.clickableColorSecondary);
      expect(chip).not.to.have.class(classes.deletable);
      expect(chip).not.to.have.class(classes.deletableColorPrimary);
      expect(chip).not.to.have.class(classes.deletableColorSecondary);
    });

    it('should render with the root and the primary class', () => {
      const { container } = render(<Chip color="primary" />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
    });

    it('should render with the root and the secondary class', () => {
      const { container } = render(<Chip color="secondary" />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorSecondary);
    });
  });

  describe('clickable chip', () => {
    it('renders as a button in taborder with the label as the accessible name', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} />);

      const button = getByRole('button');
      expect(button).to.have.property('tabIndex', 0);
      expect(button).toHaveAccessibleName('My Chip');
    });

    it('should render link with the button base', () => {
      const { container } = render(<Chip component="a" clickable label="My text Chip" />);

      expect(container.firstChild).to.have.class('MuiButtonBase-root');
      expect(container.firstChild).to.have.tagName('a');
    });

    it('should apply user value of tabIndex', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} tabIndex={5} />);

      expect(getByRole('button')).to.have.property('tabIndex', 5);
    });

    it('should render with the root and clickable class', () => {
      const { container } = render(<Chip label="My Chip" onClick={() => {}} />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.clickable);
    });

    it('should render with the root and clickable primary class', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} color="primary" />);

      const button = getByRole('button');
      expect(button).to.have.class(classes.root);
      expect(button).to.have.class(classes.colorPrimary);
      expect(button).to.have.class(classes.clickable);
      expect(button).to.have.class(classes.clickableColorPrimary);
    });

    it('should render with the root and outlined clickable primary class', () => {
      const { container } = render(
        <Chip color="primary" label="My Chip" onClick={() => {}} variant="outlined" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.clickable);
      expect(chip).to.have.class(classes.clickableColorPrimary);
      expect(chip).to.have.class(classes.outlined);
      expect(chip).to.have.class(classes.outlinedPrimary);
    });

    it('should render with the root and clickable secondary class', () => {
      const { getByRole } = render(
        <Chip color="secondary" label="My Chip" onClick={() => {}} variant="outlined" />,
      );

      const button = getByRole('button');
      expect(button).to.have.class(classes.root);
      expect(button).to.have.class(classes.colorSecondary);
      expect(button).to.have.class(classes.clickable);
      expect(button).to.have.class(classes.clickableColorSecondary);
    });
  });

  describe('deletable Avatar chip', () => {
    it('should render a button in tab order with the avatar', () => {
      const { container, getByRole } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
        />,
      );

      expect(getByRole('button')).to.have.property('tabIndex', 0);
      expect(container.querySelector('#avatar')).not.to.equal(null);
    });

    it('should apply user value of tabIndex', () => {
      const { container, getByRole } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          tabIndex={5}
        />,
      );

      expect(getByRole('button')).to.have.property('tabIndex', 5);
      const elementsInTabOrder = Array.from(container.querySelectorAll('[tabIndex]')).filter(
        (element) => element.tabIndex >= 0,
      );
      expect(elementsInTabOrder).to.have.length(1);
    });

    it('fires onDelete when clicking the delete icon', () => {
      const handleDelete = spy();
      const { getByTestId } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={handleDelete}
          deleteIcon={<div data-testid="delete-icon" />}
        />,
      );
      const deleteIcon = getByTestId('delete-icon');

      fireEvent.click(deleteIcon);

      expect(handleDelete.callCount).to.equal(1);
    });

    it('should stop propagation when clicking the delete icon', () => {
      const handleClick = spy();
      const { getByTestId } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onClick={handleClick}
          onDelete={() => {}}
          deleteIcon={<div data-testid="delete-icon" />}
        />,
      );
      const deleteIcon = getByTestId('delete-icon');

      fireEvent.click(deleteIcon);

      expect(handleClick.callCount).to.equal(0);
    });

    it('should render with the root, deletable classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.deletable);
    });

    it('should render with the root, deletable and avatar primary classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar className="my-Avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          color="primary"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
      expect(chip).to.have.class(classes.deletableColorPrimary);
      const avatar = container.querySelector(`.${classes.avatar}`);
      expect(avatar).to.have.class(classes.avatarColorPrimary);
    });

    it('should render with the root, deletable and avatar secondary classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar>MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          color="secondary"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorSecondary);
      expect(chip).to.have.class(classes.deletable);
      expect(chip).to.have.class(classes.deletableColorSecondary);
      const avatar = container.querySelector(`.${classes.avatar}`);
      expect(avatar).to.have.class(classes.avatarColorSecondary);
    });
  });

  describe('prop: deleteIcon', () => {
    it('should render a default icon with the root, deletable, deleteIcon and deleteIconOutlinedColorSecondary classes', () => {
      const { getByRole, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} />,
      );

      const icon = getByTestId('CancelIcon');
      expect(getByRole('button')).to.contain(icon);
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render a default icon with the root, deletable and deleteIcon classes', () => {
      const { getByRole, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} />,
      );

      const icon = getByTestId('CancelIcon');
      expect(getByRole('button')).to.contain(icon);
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render default icon with the root, deletable and deleteIcon primary class', () => {
      const { container, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="primary" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
      expect(chip).to.have.class(classes.deletableColorPrimary);
      const icon = getByTestId('CancelIcon');
      expect(icon).to.have.class(classes.deleteIcon);
      expect(icon).to.have.class(classes.deleteIconColorPrimary);
    });

    it('should render a default icon with the root, deletable, deleteIcon secondary class', () => {
      const { container, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="secondary" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorSecondary);
      expect(chip).to.have.class(classes.deletable);
      expect(chip).to.have.class(classes.deletableColorSecondary);
      const icon = getByTestId('CancelIcon');
      expect(icon).to.have.class(classes.deleteIcon);
      expect(icon).to.have.class(classes.deleteIconColorSecondary);
    });

    it('accepts a custom icon', () => {
      const handleDelete = spy();
      const { getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={handleDelete} deleteIcon={<CheckBox />} />,
      );

      fireEvent.click(getByTestId('CheckBoxIcon'));

      expect(handleDelete.callCount).to.equal(1);
    });
  });

  describe('reacts to keyboard chip', () => {
    it('should call onKeyDown when a key is pressed', () => {
      const handleKeydown = stub().callsFake((event) => event.key);
      const { getByRole } = render(<Chip onClick={() => {}} onKeyDown={handleKeydown} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyDown(chip, { key: 'p' });

      expect(handleKeydown.callCount).to.equal(1);
      expect(handleKeydown.firstCall.returnValue).to.equal('p');
    });

    it('should unfocus when a esc key is pressed', () => {
      const handleBlur = spy();
      const handleKeydown = spy();
      const { getByRole } = render(
        <Chip onBlur={handleBlur} onClick={() => {}} onKeyDown={handleKeydown} />,
      );
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyUp(chip, { key: 'Escape' });

      expect(handleBlur.callCount).to.equal(1);
      expect(chip).not.toHaveFocus();
    });

    it('should call onClick when `space` is released ', () => {
      const handleClick = spy();
      const { getByRole } = render(<Chip onClick={handleClick} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyUp(chip, { key: ' ' });

      expect(handleClick.callCount).to.equal(1);
    });

    it('should call onClick when `enter` is pressed ', () => {
      const handleClick = spy();
      const { getByRole } = render(<Chip onClick={handleClick} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyDown(chip, { key: 'Enter' });

      expect(handleClick.callCount).to.equal(1);
    });

    describe('prop: onDelete', () => {
      ['Backspace', 'Delete'].forEach((key) => {
        it(`should call onDelete '${key}' is released`, () => {
          const handleDelete = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Chip onClick={() => {}} onKeyDown={handleKeyDown} onDelete={handleDelete} />,
          );
          const chip = getAllByRole('button')[0];
          act(() => {
            chip.focus();
          });

          fireEvent.keyDown(chip, { key });

          // defaultPrevented?
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          expect(handleDelete.callCount).to.equal(0);

          fireEvent.keyUp(chip, { key });

          expect(handleDelete.callCount).to.equal(1);
        });
      });

      it('should not prevent default on input', () => {
        const handleKeyDown = spy();
        const { container } = render(<Chip label={<input />} onKeyDown={handleKeyDown} />);
        const input = container.querySelector('input');
        input.focus();
        fireEvent.keyDown(input, { key: 'Backspace' });

        expect(handleKeyDown.callCount).to.equal(1);
        expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });

    describe('with children that generate events', () => {
      ['Backspace', 'Delete'].forEach((key) => {
        it(`should not call onDelete for child keyup event when '${key}' is released`, () => {
          const handleDelete = spy();
          const handleKeyUp = spy();
          render(
            <Chip
              onDelete={handleDelete}
              label={<input autoFocus className="child-input" onKeyUp={handleKeyUp} />}
            />,
          );

          fireEvent.keyUp(document.querySelector('input'), { key });

          expect(handleKeyUp.callCount).to.equal(1);
          expect(handleDelete.callCount).to.equal(0);
        });
      });

      it(`should not call onClick for child keyup event when 'Space' is released`, () => {
        const handleClick = spy();
        const handleKeyUp = spy();
        render(
          <Chip
            onClick={handleClick}
            label={<input autoFocus className="child-input" onKeyUp={handleKeyUp} />}
          />,
        );

        fireEvent.keyUp(document.querySelector('input'), { key: ' ' });
        expect(handleKeyUp.callCount).to.equal(1);
        expect(handleClick.callCount).to.equal(0);
      });

      it(`should not call onClick for child keydown event when 'Enter' is pressed`, () => {
        const handleClick = spy();
        const handleKeyDown = spy();
        render(
          <Chip
            onClick={handleClick}
            label={<input autoFocus className="child-input" onKeyDown={handleKeyDown} />}
          />,
        );

        fireEvent.keyDown(document.querySelector('input'), { key: 'Enter' });
        expect(handleKeyDown.callCount).to.equal(1);
        expect(handleClick.callCount).to.equal(0);
      });

      it('should not call onClick for child event when `space` is released', () => {
        const handleClick = spy();
        const handleKeyUp = spy();
        render(
          <Chip
            onClick={handleClick}
            label={<input autoFocus className="child-input" onKeyUp={handleKeyUp} />}
          />,
        );

        fireEvent.keyUp(document.querySelector('input'), { key: ' ' });

        expect(handleClick.callCount).to.equal(0);
        expect(handleKeyUp.callCount).to.equal(1);
      });

      it('should not call onClick for child event when `enter` is pressed', () => {
        const handleClick = spy();
        const handleKeyDown = spy();
        render(
          <Chip
            onClick={handleClick}
            label={<input autoFocus className="child-input" onKeyDown={handleKeyDown} />}
          />,
        );

        fireEvent.keyDown(document.querySelector('input'), { key: 'Enter' });

        expect(handleClick.callCount).to.equal(0);
        expect(handleKeyDown.callCount).to.equal(1);
      });
    });
  });

  describe('prop: icon', () => {
    it('should render the icon', () => {
      const { getByTestId } = render(<Chip icon={<span data-testid="test-icon" />} />);

      expect(getByTestId('test-icon')).to.have.class(classes.icon);
    });
  });

  describe('prop: size', () => {
    it('should render with the sizeSmall class', () => {
      const { container } = render(<Chip size="small" />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.sizeSmall);
    });

    it('should render the label with the labelSmall class', () => {
      const { container } = render(<Chip size="small" label="small chip" />);

      const label = container.querySelector(`.${classes.label}`);
      expect(label).to.have.class(classes.labelSmall);
    });

    it('should render an avatar with the avatarSmall class', () => {
      const { container } = render(
        <Chip size="small" avatar={<Avatar className="my-Avatar">MB</Avatar>} />,
      );

      const avatar = container.querySelector('.my-Avatar');
      expect(avatar).to.have.class(classes.avatar);
      expect(avatar).to.have.class(classes.avatarSmall);
    });

    it('should render an icon with the icon and iconSmall classes', () => {
      const { container } = render(<Chip size="small" icon={<span id="test-icon" />} />);

      const icon = container.querySelector('#test-icon');
      expect(icon).to.have.class(classes.icon);
      expect(icon).to.have.class(classes.iconSmall);
    });

    it('should render the delete icon with the deleteIcon and deleteIconSmall classes', () => {
      const { getByTestId } = render(<Chip size="small" onDelete={() => {}} />);

      const icon = getByTestId('CancelIcon');
      expect(icon).to.have.class(classes.deleteIcon);
      expect(icon).to.have.class(classes.deleteIconSmall);
    });
  });

  describe('event: focus', () => {
    it('has a focus-visible polyfill', () => {
      const { container } = render(<Chip label="Test Chip" onClick={() => {}} />);
      const chip = container.querySelector(`.${classes.root}`);
      simulatePointerDevice();

      expect(chip).not.to.have.class(classes.focusVisible);

      chip.focus();

      if (programmaticFocusTriggersFocusVisible()) {
        expect(chip).to.have.class(classes.focusVisible);
      } else {
        expect(chip).not.to.have.class(classes.focusVisible);
      }

      focusVisible(chip);

      expect(chip).to.have.class(classes.focusVisible);
    });

    it('should reset the focused state', () => {
      const { container, setProps } = render(<Chip label="Test Chip" onClick={() => {}} />);
      const chip = container.querySelector(`.${classes.root}`);

      simulatePointerDevice();
      focusVisible(chip);

      expect(chip).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(chip).not.to.have.class(classes.focusVisible);
    });
  });
});
