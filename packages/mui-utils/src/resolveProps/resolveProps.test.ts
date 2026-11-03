import { describe, it, expect } from 'vitest';
import resolveProps from './resolveProps';

describe('resolveProps', () => {
  it('use default props if no props', () => {
    expect(resolveProps({ foo: 'foo' }, {})).to.deep.equal({
      foo: 'foo',
    });
  });

  it('use props if defined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar' })).to.deep.equal({
      foo: 'bar',
    });
  });

  it('merge extra props', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar', bar: 'bar' })).to.deep.equal({
      foo: 'bar',
      bar: 'bar',
    });
  });

  it('use default props if prop value is undefined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: undefined })).to.deep.equal({
      foo: 'foo',
    });
  });

  it('use props if default value is undefined', () => {
    expect(resolveProps({ foo: undefined }, { foo: 'bar' })).to.deep.equal({
      foo: 'bar',
    });
  });

  it('null is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: null })).to.deep.equal({
      foo: null,
    });
  });

  it('"" is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: '' })).to.deep.equal({
      foo: '',
    });
  });

  it('merge components and componentsProps props', () => {
    expect(
      resolveProps(
        { components: { Input: 'Input' }, componentsProps: { input: { className: 'input' } } },
        {
          components: { Root: 'Root' },
          componentsProps: { root: { className: 'root' }, input: { style: { color: 'red' } } },
        },
      ),
    ).to.deep.equal({
      components: { Root: 'Root', Input: 'Input' },
      componentsProps: {
        root: { className: 'root' },
        input: { className: 'input', style: { color: 'red' } },
      },
    });
  });

  it('merge slots and slotProps props', () => {
    expect(
      resolveProps(
        { slots: { input: 'input' }, slotProps: { input: { className: 'input' } } },
        {
          slots: { root: 'root' },
          slotProps: { root: { className: 'root' }, input: { style: { color: 'red' } } },
        },
      ),
    ).to.deep.equal({
      slots: { root: 'root', input: 'input' },
      slotProps: {
        root: { className: 'root' },
        input: { className: 'input', style: { color: 'red' } },
      },
    });
  });

  describe('function slotProps', () => {
    it('merge function slot props from default props with object slot props from props', () => {
      const result = resolveProps(
        {
          slotProps: {
            list: (ownerState: { anchorId: string }) => ({
              'aria-labelledby': ownerState.anchorId,
              role: 'menu',
            }),
          },
        },
        { slotProps: { list: { className: 'my-menu-list', role: 'listbox' } } },
      );

      const list = (result.slotProps as Record<string, any>).list;
      expect(list).to.be.a('function');
      expect(list({ anchorId: 'dashboard' })).to.deep.equal({
        'aria-labelledby': 'dashboard',
        role: 'listbox',
        className: 'my-menu-list',
      });
    });

    it('merge object slot props from default props with function slot props from props', () => {
      const result = resolveProps(
        { slotProps: { list: { 'aria-labelledby': 'dashboard', role: 'menu' } } },
        {
          slotProps: {
            list: (ownerState: { dense: boolean }) => ({
              className: ownerState.dense ? 'dense' : 'regular',
              role: 'listbox',
            }),
          },
        },
      );

      const list = (result.slotProps as Record<string, any>).list;
      expect(list).to.be.a('function');
      expect(list({ dense: true })).to.deep.equal({
        'aria-labelledby': 'dashboard',
        role: 'listbox',
        className: 'dense',
      });
    });

    it('merge function slot props from both default props and props', () => {
      const result = resolveProps(
        {
          slotProps: {
            list: (ownerState: { anchorId: string }) => ({
              'aria-labelledby': ownerState.anchorId,
              role: 'menu',
            }),
          },
        },
        {
          slotProps: {
            list: (ownerState: { anchorId: string }) => ({ className: ownerState.anchorId }),
          },
        },
      );

      const list = (result.slotProps as Record<string, any>).list;
      expect(list).to.be.a('function');
      expect(list({ anchorId: 'dashboard' })).to.deep.equal({
        'aria-labelledby': 'dashboard',
        role: 'menu',
        className: 'dashboard',
      });
    });

    it('keep function slot props from default props when the slot is missing from props', () => {
      const result = resolveProps(
        {
          slotProps: {
            list: (ownerState: { anchorId: string }) => ({
              'aria-labelledby': ownerState.anchorId,
            }),
          },
        },
        { slotProps: { paper: { className: 'my-paper' } } },
      );

      const slotProps = result.slotProps as Record<string, any>;
      expect(slotProps.paper).to.deep.equal({ className: 'my-paper' });
      expect(slotProps.list).to.be.a('function');
      expect(slotProps.list({ anchorId: 'dashboard' })).to.deep.equal({
        'aria-labelledby': 'dashboard',
      });
    });

    it('keep function slot props with className and style when the slot is missing from props', () => {
      const result = resolveProps(
        {
          slotProps: {
            list: () => ({
              className: 'default-list',
              style: { color: 'red' },
            }),
          },
        },
        { slotProps: { paper: { className: 'my-paper' } } },
        true,
      );

      const slotProps = result.slotProps as Record<string, any>;
      expect(slotProps.paper).to.deep.equal({ className: 'my-paper' });
      expect(slotProps.list).to.be.a('function');
      expect(slotProps.list({})).to.deep.equal({
        className: 'default-list',
        style: { color: 'red' },
      });
    });

    it('keep object slot props with className and style when the slot is missing from props', () => {
      const result = resolveProps(
        {
          slotProps: {
            list: {
              className: 'default-list',
              style: { color: 'red' },
            },
          },
        },
        { slotProps: { paper: { className: 'my-paper' } } },
        true,
      );

      expect(result.slotProps).to.deep.equal({
        paper: { className: 'my-paper' },
        list: {
          className: 'default-list',
          style: { color: 'red' },
        },
      });
    });
  });

  it('should not merge props that are not intended', () => {
    expect(
      resolveProps(
        { notTheSlotProps: { style: { color: 'red' } } },
        { notTheSlotProps: { className: 'input' } },
      ),
    ).to.deep.equal({
      notTheSlotProps: { className: 'input' },
    });
  });

  describe('param: mergeClassNameAndStyle', () => {
    it('merge className and style props', () => {
      expect(
        resolveProps(
          { className: 'input1', style: { color: 'red' } },
          { className: 'input2', style: { backgroundColor: 'blue' } },
          true,
        ),
      ).to.deep.equal({
        className: 'input1 input2',
        style: { color: 'red', backgroundColor: 'blue' },
      });
    });

    it('merge className props', () => {
      expect(resolveProps({ className: 'input1' }, { className: 'input2' }, true)).to.deep.equal({
        className: 'input1 input2',
      });

      expect(resolveProps({ className: 'input1' }, {}, true)).to.deep.equal({
        className: 'input1',
      });

      expect(resolveProps({}, { className: 'input2' }, true)).to.deep.equal({
        className: 'input2',
      });
    });

    it('should apply default className when props.className is an empty string', () => {
      expect(resolveProps({ className: 'default-class' }, { className: '' }, true)).to.deep.equal({
        className: 'default-class',
      });
    });

    it('should keep empty string className when there is no default', () => {
      expect(resolveProps({}, { className: '' }, true)).to.deep.equal({
        className: '',
      });
    });

    it('merge style props', () => {
      expect(
        resolveProps({ style: { color: 'red' } }, { style: { backgroundColor: 'blue' } }, true),
      ).to.deep.equal({
        style: { color: 'red', backgroundColor: 'blue' },
      });

      expect(resolveProps({ style: { color: 'red' } }, {}, true)).to.deep.equal({
        style: { color: 'red' },
      });

      expect(resolveProps({}, { style: { backgroundColor: 'blue' } }, true)).to.deep.equal({
        style: { backgroundColor: 'blue' },
      });
    });
  });
});
