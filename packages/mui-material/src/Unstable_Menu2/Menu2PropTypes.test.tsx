import PropTypes from 'prop-types';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { reactMajor } from '@mui/internal-test-utils';
import Menu2 from './Menu2';
import Menu2Popup from '../Unstable_Menu2Popup';
import Menu2SubmenuPopup from '../Unstable_Menu2SubmenuPopup';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';
import Menu2Trigger from '../Unstable_Menu2Trigger';

const popupProps = [
  'align',
  'alignOffset',
  'anchor',
  'classes',
  'className',
  'collisionAvoidance',
  'collisionBoundary',
  'collisionPadding',
  'container',
  'disableAnchorTracking',
  'elevation',
  'finalFocus',
  'keepMounted',
  'positionMethod',
  'side',
  'sideOffset',
  'sticky',
  'style',
  'sx',
  'transitionDuration',
];

describe('Menu2Trigger render prop validation', () => {
  function checkProps(props: Record<string, unknown>) {
    PropTypes.resetWarningCache();
    PropTypes.checkPropTypes(Menu2Trigger.propTypes, props, 'prop', 'Menu2Trigger');
  }

  // React 19 does not validate prop types, and prop-types only recognizes older elements.
  it.skipIf(reactMajor >= 19)('accepts a render element without children', () => {
    expect(() => checkProps({ render: <button type="button">Actions</button> })).not.toErrorDev();
  });

  it('accepts a render callback without children', () => {
    expect(() =>
      checkProps({ render: (props: React.ComponentProps<'button'>) => <button {...props} /> }),
    ).not.toErrorDev();
  });

  it('accepts children as content for the render element', () => {
    expect(() =>
      checkProps({
        render: (props: React.ComponentProps<'button'>) => <button {...props} />,
        children: 'Actions',
      }),
    ).not.toErrorDev();
  });

  it('requires render even when children are supplied', () => {
    expect(() => checkProps({ children: 'Actions' })).toErrorDev(
      'The prop `render` is marked as required in `Menu2Trigger`',
    );
  });

  it('rejects a null render prop', () => {
    expect(() => checkProps({ render: null })).toErrorDev(
      'The prop `render` is marked as required in `Menu2Trigger`',
    );
  });

  it('rejects a string render prop', () => {
    expect(() => checkProps({ render: 'button' })).toErrorDev(
      'Invalid prop `render` supplied to `Menu2Trigger`',
    );
  });
});

describe('Menu2 selection callback prop validation', () => {
  [
    { Component: Menu2CheckboxItem, name: 'Menu2CheckboxItem', prop: 'onCheckedChange' },
    { Component: Menu2RadioGroup, name: 'Menu2RadioGroup', prop: 'onValueChange' },
  ].forEach(({ Component, name, prop }) => {
    it(`validates ${name}.${prop}`, () => {
      expect(Component.propTypes).to.have.property(prop);
      expect(Component.propTypes).not.to.have.property('onChange');

      PropTypes.resetWarningCache();
      expect(() =>
        PropTypes.checkPropTypes(Component.propTypes, { [prop]: () => {} }, 'prop', name),
      ).not.toErrorDev();
      expect(() =>
        PropTypes.checkPropTypes(Component.propTypes, { [prop]: 42 }, 'prop', name),
      ).toErrorDev(`Invalid prop \`${prop}\` of type \`number\` supplied to \`${name}\``);
    });
  });
});

describe('Menu2 public popup prop validation', () => {
  [
    { Component: Menu2, name: 'Menu2' },
    { Component: Menu2Submenu, name: 'Menu2Submenu' },
  ].forEach(({ Component, name }) => {
    it(`accepts valid ${name} behavior props`, () => {
      PropTypes.resetWarningCache();
      expect(() =>
        PropTypes.checkPropTypes(
          Component.propTypes,
          {
            open: true,
            defaultOpen: false,
            loopFocus: false,
            highlightItemOnHover: false,
            onOpenChange: () => {},
            onOpenChangeComplete: () => {},
            children: 'Menu content',
            ...(name === 'Menu2' ? { modal: false, disabled: false } : { closeParentOnEsc: true }),
          },
          'prop',
          name,
        ),
      ).not.toErrorDev();
    });

    it(`rejects unknown props on renderless ${name}`, () => {
      ['id', 'className', 'sx', 'anchor', 'slots', 'trigger', 'handle'].forEach((prop) => {
        PropTypes.resetWarningCache();
        expect(() =>
          PropTypes.checkPropTypes(Component.propTypes, { [prop]: 'unsupported' }, 'prop', name),
        ).toErrorDev(`The following props are not supported: \`${prop}\`. Please remove them.`);
      });
    });
  });

  it('does not declare detached-trigger props', () => {
    ['handle', 'triggerId', 'defaultTriggerId'].forEach((prop) => {
      expect(Menu2.propTypes).not.to.have.property(prop);
    });
    ['handle', 'payload'].forEach((prop) => {
      expect(Menu2Trigger.propTypes).not.to.have.property(prop);
    });
  });

  it('keeps popup and trigger validators off the renderless roots', () => {
    [Menu2, Menu2Submenu].forEach((Component) => {
      [...popupProps, 'trigger', 'slots', 'slotProps'].forEach((prop) => {
        expect(Component.propTypes).not.to.have.property(prop);
      });
    });
  });

  [
    { Component: Menu2Popup, name: 'Menu2Popup' },
    { Component: Menu2SubmenuPopup, name: 'Menu2SubmenuPopup' },
  ].forEach(({ Component, name }) => {
    function checkProps(props: Record<string, unknown>) {
      PropTypes.resetWarningCache();
      // Check directly because React 19 does not validate propTypes on render.
      PropTypes.checkPropTypes(Component.propTypes, props, 'prop', name);
    }

    describe(`${name}`, () => {
      it('declares the popup validators on the public component', () => {
        expect(Component.propTypes).to.include.all.keys(popupProps);
        expect(Component.propTypes).not.to.have.property('arrowPadding');
        expect(Component.propTypes).not.to.have.property('backdrop');
      });

      if (Component === Menu2Popup) {
        it('accepts a null backdrop slot', () => {
          expect(() => checkProps({ slots: { backdrop: null } })).not.toErrorDev();
        });
      }

      it('validates the current slot and slot-prop names', () => {
        const slots = ['root', 'portal', 'positioner', 'list', 'transition'];
        if (Component === Menu2Popup) {
          slots.push('backdrop');
        }
        slots.forEach((slot) => {
          expect(() => checkProps({ slots: { [slot]: 42 } })).toErrorDev(`supplied to \`${name}\``);
          expect(() => checkProps({ slotProps: { [slot]: 42 } })).toErrorDev(
            `supplied to \`${name}\``,
          );
          expect(() => checkProps({ slotProps: { [slot]: {} } })).not.toErrorDev();
          expect(() => checkProps({ slotProps: { [slot]: () => ({}) } })).not.toErrorDev();
        });
      });

      it('does not retain validators for removed slot names', () => {
        // shape ignores unknown keys. Old validators would reject these values.
        const removedSlots = { popup: 42, paper: 42, trigger: 42 };
        expect(() => checkProps({ slots: removedSlots, slotProps: removedSlots })).not.toErrorDev();
      });

      it('accepts the public alignment, elevation, and transition duration values', () => {
        expect(() =>
          checkProps({ align: 'end', elevation: 8, transitionDuration: 'auto' }),
        ).not.toErrorDev();
        expect(() => checkProps({ transitionDuration: 200 })).not.toErrorDev();
        expect(() =>
          checkProps({ transitionDuration: { enter: 200, exit: 100 } }),
        ).not.toErrorDev();
      });

      it('reports invalid popup values with the public component name', () => {
        expect(() => checkProps({ align: 'middle' })).toErrorDev(
          `Invalid prop \`align\` of value \`middle\` supplied to \`${name}\``,
        );
        expect(() => checkProps({ elevation: 'high' })).toErrorDev(
          `Invalid prop \`elevation\` of type \`string\` supplied to \`${name}\``,
        );
        expect(() => checkProps({ transitionDuration: 'fast' })).toErrorDev(
          `Invalid prop \`transitionDuration\` supplied to \`${name}\``,
        );
      });

      it('accepts DOM elements, refs, callbacks, and virtual anchors', () => {
        const element = document.createElement('button');
        const virtualAnchor = { getBoundingClientRect: () => element.getBoundingClientRect() };
        [
          element,
          { current: element },
          () => element,
          virtualAnchor,
          () => virtualAnchor,
          null,
          undefined,
        ].forEach((anchor) => {
          expect(() => checkProps({ anchor })).not.toErrorDev();
        });
      });

      it('accepts DOM elements, arrays, and rectangles as collision boundaries', () => {
        const element = document.createElement('div');
        [
          'clipping-ancestors',
          element,
          [element, document.createElement('div')],
          { x: 0, y: 0, width: 300, height: 200 },
          null,
          undefined,
        ].forEach((collisionBoundary) => {
          expect(() => checkProps({ collisionBoundary })).not.toErrorDev();
        });
      });

      it('accepts DOM and shadow-root containers and refs', () => {
        const element = document.createElement('div');
        const shadowRoot = element.attachShadow({ mode: 'open' });
        [
          element,
          shadowRoot,
          { current: element },
          { current: shadowRoot },
          { current: null },
          null,
          undefined,
        ].forEach((container) => {
          expect(() => checkProps({ container })).not.toErrorDev();
        });
      });

      it('accepts final-focus flags, DOM refs, and callbacks', () => {
        const element = document.createElement('button');
        [
          true,
          false,
          { current: element },
          { current: null },
          () => element,
          () => false,
          null,
          undefined,
        ].forEach((finalFocus) => {
          expect(() => checkProps({ finalFocus })).not.toErrorDev();
        });
      });

      it('rejects invalid primitives for the DOM and positioning props', () => {
        ['anchor', 'collisionBoundary', 'container', 'finalFocus'].forEach((prop) => {
          [42, 'invalid'].forEach((value) => {
            expect(() => checkProps({ [prop]: value })).toErrorDev(
              `Invalid prop \`${prop}\` supplied to \`${name}\``,
            );
          });
        });
      });
    });
  });
});
