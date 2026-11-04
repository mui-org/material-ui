import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Popper from '../Popper/BasePopper';
import { styled } from '../styles';
import type { SlotProps } from './types';
import useSlot from './useSlot';

describe('useSlot', () => {
  const { render } = createRenderer();

  let defaultAnchorElm: HTMLDivElement | null = null;
  beforeAll(() => {
    defaultAnchorElm = document.createElement('div');
    document.body.appendChild(defaultAnchorElm);
  });
  afterAll(() => {
    if (defaultAnchorElm !== null) {
      document.body.removeChild(defaultAnchorElm);
      defaultAnchorElm = null;
    }
  });

  describe('single slot', () => {
    const ItemRoot = styled('button')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      { component?: React.ElementType; href?: string }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      return <SlotRoot {...rootProps} />;
    });

    it('should render correct tag', () => {
      render(<Item />);
      expect(screen.getByRole('button')).toBeVisible();
    });

    it('should change leaf component and spread props', () => {
      render(<Item component="a" href="/" />);
      expect(screen.getByRole('link')).toBeVisible();
    });
  });

  describe('multiple slots', () => {
    const ItemRoot = styled('button')({});
    const ItemDecorator = styled('span')({});
    const Item = React.forwardRef<
      HTMLButtonElement,
      {
        className?: string;
        component?: React.ElementType;
        href?: string;
        slots?: { root?: React.ElementType; decorator?: React.ElementType };
        slotProps?: {
          root?: SlotProps<'button', Record<string, any>, {}>;
          decorator?: SlotProps<'span', { size?: 'sm' | 'md' } & Record<string, any>, {}>;
        };
      }
    >((props, ref) => {
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotDecorator, decoratorProps] = useSlot('decorator', {
        className: 'decorator',
        elementType: ItemDecorator,
        externalForwardedProps: props,
        ownerState: {},
      });
      return (
        <SlotRoot {...rootProps}>
          <SlotDecorator {...decoratorProps} />
        </SlotRoot>
      );
    });

    it('should render both tags', () => {
      render(<Item />);
      expect(screen.getByRole('button')).toBeVisible();
      expect(screen.getByRole('button').firstChild).to.have.tagName('span');
    });

    it('should have classes', () => {
      render(<Item />);
      expect(screen.getByRole('button')).to.have.class('root');
      expect(screen.getByRole('button').firstChild).to.have.class('decorator');
    });

    it('should append classes', () => {
      render(<Item className="foo-bar" slotProps={{ decorator: { className: 'foo-bar' } }} />);

      expect(screen.getByRole('button')).to.have.class('root');
      expect(screen.getByRole('button')).to.have.class('foo-bar');
      expect(screen.getByRole('button').firstChild).to.have.class('decorator');
      expect(screen.getByRole('button').firstChild).to.have.class('foo-bar');
    });

    it('slotProps has higher priority', () => {
      render(<Item data-item="foo" slotProps={{ root: { 'data-item': 'bar' } }} />);

      expect(screen.getByRole('button')).to.have.attribute('data-item', 'bar');
    });

    it('can change root leaf component with `component` prop', () => {
      render(<Item component="a" href="/" />);
      expect(screen.getByRole('link')).toBeVisible();
    });

    it('use slotProps `component` over `component` prop', () => {
      render(<Item component="div" slotProps={{ root: { component: 'a', href: '/' } }} />);

      expect(screen.getByRole('link')).toBeVisible();
    });

    it('can change decorator leaf component', () => {
      render(<Item slotProps={{ decorator: { component: 'div' } }} />);
      expect(screen.getByRole('button').firstChild).to.have.tagName('div');
    });
  });

  /**
   * Simulate `Tooltip`, ...etc
   */
  describe('unstyled popper as the root slot', () => {
    const ItemRoot = styled('div')({});
    function Item(props: {
      component?: React.ElementType;
      slots?: {
        root?: React.ElementType;
      };
      slotProps?: {
        root?: SlotProps<'div', Record<string, any>, {}>;
      };
    }) {
      const ref = React.useRef(null);
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: Popper,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          open: true, // !!force the popper to always visible for testing
          anchorEl: () => defaultAnchorElm!,
        },
        internalForwardedProps: {
          slots: { root: ItemRoot },
        },
      });
      return <SlotRoot {...rootProps} />;
    }

    it('should render popper with styled-component', () => {
      render(<Item />);
      expect(screen.getByRole('tooltip')).toBeVisible();
      expect(screen.getByRole('tooltip')).to.have.tagName('div');
    });

    it('the root slot should be replaceable', () => {
      const Listbox = React.forwardRef<HTMLUListElement, { component?: React.ElementType }>(
        function Listbox({ component }, ref) {
          return <ul ref={ref} data-component={component} />;
        },
      );

      render(<Item slots={{ root: Listbox }} />);
      expect(screen.getByRole('list')).toBeVisible();
      expect(screen.getByRole('list')).not.to.have.attribute('class');
      // to test that the `component` prop should not forward to the custom slot.
      expect(screen.getByRole('list')).not.to.have.attribute('data-component');
    });

    it('the root component can be changed', () => {
      render(<Item slotProps={{ root: { component: 'aside' } }} />);
      expect(screen.getByRole('tooltip')).to.have.tagName('aside');
    });
  });

  /**
   * Simulate `Autocomplete`, `Select`, ...etc
   */
  describe('multiple slots with unstyled popper', () => {
    const ItemRoot = styled('button')({});
    const ItemListbox = styled('ul')({
      margin: 'initial', // prevent Popper error.
    });
    const ItemOption = styled('div')({});

    function Item(props: {
      component?: React.ElementType;
      slots?: {
        root?: React.ElementType;
        listbox?: React.ElementType;
        option?: React.ElementType;
      };
      slotProps?: {
        root?: SlotProps<'button', Record<string, any>, {}>;
        listbox?: SlotProps<'ul', Record<string, any>, {}>;
        option?: SlotProps<'div', Record<string, any>, {}>;
      };
    }) {
      const ref = React.useRef(null);
      const [SlotRoot, rootProps] = useSlot('root', {
        ref,
        className: 'root',
        elementType: ItemRoot,
        externalForwardedProps: props,
        ownerState: {},
      });
      const [SlotListbox, listboxProps] = useSlot('listbox', {
        className: 'listbox',
        elementType: Popper as unknown as 'ul',
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          open: true, // !!force the popper to always visible for testing
          role: 'menu',
          anchorEl: () => defaultAnchorElm!,
        },
        internalForwardedProps: {
          slots: { root: ItemListbox },
        },
      });
      const [SlotOption, optionProps] = useSlot('option', {
        className: 'option',
        elementType: ItemOption,
        externalForwardedProps: props,
        ownerState: {},
        additionalProps: {
          role: 'menuitem',
        },
      });
      return (
        <React.Fragment>
          <SlotRoot {...rootProps} />
          <SlotListbox {...listboxProps}>
            <SlotOption as="li" {...optionProps} />
          </SlotListbox>
        </React.Fragment>
      );
    }

    it('should render popper with styled-component', () => {
      render(<Item />);
      expect(screen.getByRole('menu')).toBeVisible();
      expect(screen.getByRole('menu')).to.have.tagName('ul');
      expect(screen.getByRole('menu')).to.have.class('listbox');
      expect(screen.getByRole('menuitem')).to.have.tagName('li');
    });

    it('the listbox slot should be replaceable', () => {
      function Listbox({ component }: { component?: React.ElementType }) {
        return <ul data-component={component} />;
      }

      render(<Item slots={{ listbox: Listbox }} />);
      expect(screen.getByRole('list')).toBeVisible();
      expect(screen.getByRole('list')).not.to.have.attribute('class');
      // to test that the `component` prop should not forward to the custom slot.
      expect(screen.getByRole('list')).not.to.have.attribute('data-component');
    });

    it('the listbox leaf component can be changed', () => {
      render(<Item slotProps={{ listbox: { component: 'div' } }} />);
      expect(screen.getByRole('menu')).to.have.tagName('div');
    });

    it('the option leaf component can be changed', () => {
      render(<Item slotProps={{ option: { component: 'div' } }} />);
      expect(screen.getByRole('menuitem')).to.have.tagName('div');
    });
  });
});
