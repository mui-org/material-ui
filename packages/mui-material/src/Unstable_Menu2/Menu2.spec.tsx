import * as React from 'react';
import { expectType } from '@mui/types';
import type { Menu as BaseMenu } from '@base-ui/react/menu';
import type { Menu2Props } from '@mui/material/Unstable_Menu2';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import type {
  Menu2PopupClassKey,
  Menu2PopupClasses,
  Menu2PopupProps,
} from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup, {
  getMenu2PopupUtilityClass,
  menu2PopupClasses,
} from '@mui/material/Unstable_Menu2Popup';
import type {
  Menu2SubmenuPopupClassKey,
  Menu2SubmenuPopupClasses,
} from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuPopup, {
  getMenu2SubmenuPopupUtilityClass,
  menu2SubmenuPopupClasses,
} from '@mui/material/Unstable_Menu2SubmenuPopup';
import type {
  Menu2CheckboxItemIndicatorClassKey,
  Menu2CheckboxItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItem, {
  getMenu2CheckboxItemIndicatorUtilityClass,
  menu2CheckboxItemIndicatorClasses,
  // @ts-expect-error The default indicator is private. Use the item's indicator slot.
  Menu2CheckboxItemIndicator,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import type {
  Menu2RadioItemIndicatorClassKey,
  Menu2RadioItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItem, {
  getMenu2RadioItemIndicatorUtilityClass,
  menu2RadioItemIndicatorClasses,
  // @ts-expect-error The default indicator is private. Use the item's indicator slot.
  Menu2RadioItemIndicator,
} from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme } from '@mui/material/styles';
// @ts-expect-error Menu2 is intentionally not exported from the root barrel for this POC.
import { Menu2 as RootBarrelMenu2 } from '@mui/material';

expectType<Menu2PopupClasses, typeof menu2PopupClasses>(menu2PopupClasses);
expectType<Menu2SubmenuPopupClasses, typeof menu2SubmenuPopupClasses>(menu2SubmenuPopupClasses);
const menuClassKey: Menu2PopupClassKey = 'backdrop';
const submenuClassKey: Menu2SubmenuPopupClassKey = 'root';
getMenu2PopupUtilityClass(menuClassKey);
getMenu2SubmenuPopupUtilityClass(submenuClassKey);

expectType<Menu2CheckboxItemIndicatorClasses, typeof menu2CheckboxItemIndicatorClasses>(
  menu2CheckboxItemIndicatorClasses,
);
expectType<Menu2RadioItemIndicatorClasses, typeof menu2RadioItemIndicatorClasses>(
  menu2RadioItemIndicatorClasses,
);
const checkboxIndicatorClassKey: Menu2CheckboxItemIndicatorClassKey = 'checked';
const radioIndicatorClassKey: Menu2RadioItemIndicatorClassKey = 'checked';
getMenu2CheckboxItemIndicatorUtilityClass(checkboxIndicatorClassKey);
getMenu2RadioItemIndicatorUtilityClass(radioIndicatorClassKey);

const indicatorHtmlProps: React.HTMLAttributes<HTMLSpanElement> = { title: 'Indicator' };
<Menu2CheckboxItem slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2CheckboxItem icon={<span />} checkedIcon={<span />} />;
<Menu2RadioItem value="one" icon={<span />} checkedIcon={<span />} />;
<Menu2CheckboxItem icon={null} checkedIcon={false} />;
<Menu2RadioItem value="one" icon={null} checkedIcon={false} />;
// @ts-expect-error Icons must be React nodes, not component types.
<Menu2CheckboxItem icon={() => <span />} />;
// @ts-expect-error Icons must be React nodes, not component types.
<Menu2RadioItem value="one" checkedIcon={() => <span />} />;

createTheme({
  components: {
    // @ts-expect-error Indicator defaults and styles belong to MuiMenu2CheckboxItem.
    MuiMenu2CheckboxItemIndicator: {},
  },
});
createTheme({
  components: {
    // @ts-expect-error Indicator defaults and styles belong to MuiMenu2RadioItem.
    MuiMenu2RadioItemIndicator: {},
  },
});

<Menu2CheckboxItem
  slotProps={{
    indicator: {
      // @ts-expect-error The indicator slot has no nested root slot API.
      slots: { root: 'span' },
    },
  }}
/>;
<Menu2RadioItem
  value="one"
  slotProps={{
    indicator: {
      // @ts-expect-error The indicator slot has no nested root slot API.
      slotProps: { root: { className: 'indicator' } },
    },
  }}
/>;

function Menu2Composition() {
  return (
    <Menu2
      modal={false}
      defaultOpen
      onOpenChange={(open, eventDetails) => {
        expectType<boolean, typeof open>(open);
        eventDetails.cancel();
        eventDetails.preventUnmountOnClose();
      }}
    >
      <Menu2Trigger
        openOnHover
        delay={100}
        closeDelay={0}
        {...{ nativeButton: true, className: 'trigger' }}
        render={<button type="button">Options</button>}
      />
      <Menu2Popup
        anchor={null}
        side="bottom"
        align="start"
        sideOffset={4}
        collisionPadding={8}
        keepMounted
        finalFocus
        slots={{ portal: 'div', positioner: 'div', root: 'div', list: 'div' }}
        slotProps={{
          portal: (ownerState) => {
            expectType<Menu2PopupProps['side'], typeof ownerState.side>(ownerState.side);
            // @ts-expect-error Open state belongs to Menu2, not to Popup props.
            ownerState.open;
            // @ts-expect-error Modal behavior belongs to Menu2, not to Popup props.
            ownerState.modal;
            // @ts-expect-error Keyboard looping belongs to Menu2, not to Popup props.
            ownerState.loopFocus;
            return {};
          },
          positioner: (ownerState) => {
            expectType<Menu2PopupProps['align'], typeof ownerState.align>(ownerState.align);
            return { side: 'bottom', align: 'start', ref: React.createRef<HTMLDivElement>() };
          },
          root: { elevation: 4 },
          list: { 'data-testid': 'list' },
        }}
      >
        <Menu2Group>
          <Menu2GroupLabel>Menu2Group</Menu2GroupLabel>
          <Menu2Item
            dense
            nativeButton={false}
            slotProps={{
              root: (ownerState) => {
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                // @ts-expect-error Visual selection is not part of the item state.
                expectType<boolean, typeof ownerState.selected>(ownerState.selected);
                return {};
              },
            }}
          >
            Menu2Item
          </Menu2Item>
          <Menu2LinkItem
            href="/profile"
            slotProps={{
              root: (ownerState) => {
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                // @ts-expect-error Visual selection is not part of the link item state.
                expectType<boolean, typeof ownerState.selected>(ownerState.selected);
                return {};
              },
            }}
          >
            Profile
          </Menu2LinkItem>
          <Menu2CheckboxItem
            defaultChecked
            slotProps={{
              root: (ownerState) => {
                expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                // @ts-expect-error Checkbox items use checked, not selected.
                expectType<boolean, typeof ownerState.selected>(ownerState.selected);
                return {};
              },
              indicator: (ownerState) => {
                expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                return {
                  component: 'i',
                  keepMounted: false,
                  sx: { color: 'primary.main' },
                  ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
                };
              },
            }}
            nativeButton={false}
            onCheckedChange={(checked, eventDetails) => {
              expectType<boolean, typeof checked>(checked);
              expectType<BaseMenu.CheckboxItem.ChangeEventDetails, typeof eventDetails>(
                eventDetails,
              );
              eventDetails.cancel();
            }}
          >
            Checkbox
          </Menu2CheckboxItem>
          <Menu2RadioGroup
            defaultValue="one"
            onValueChange={(value, eventDetails) => {
              expectType<any, typeof value>(value);
              expectType<BaseMenu.RadioGroup.ChangeEventDetails, typeof eventDetails>(eventDetails);
              eventDetails.cancel();
            }}
          >
            <Menu2RadioItem
              value="one"
              nativeButton={false}
              slotProps={{
                root: (ownerState) => {
                  expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                  expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                  // @ts-expect-error Radio items use checked, not selected.
                  expectType<boolean, typeof ownerState.selected>(ownerState.selected);
                  return {};
                },
                indicator: (ownerState) => {
                  expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                  expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
                  expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                  return {
                    component: 'i',
                    keepMounted: false,
                    sx: { color: 'primary.main' },
                    ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
                  };
                },
              }}
            >
              One
            </Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Separator />
          <Menu2Submenu
            closeParentOnEsc
            onOpenChange={(open, eventDetails) => {
              expectType<boolean, typeof open>(open);
              eventDetails.cancel();
            }}
          >
            <Menu2SubmenuTrigger openOnHover nativeButton={false}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup
              slotProps={{
                portal: (ownerState) => {
                  expectType<Menu2PopupProps['side'], typeof ownerState.side>(ownerState.side);
                  // @ts-expect-error Open state belongs to Menu2Submenu, not Popup props.
                  ownerState.open;
                  // @ts-expect-error Disabled state belongs to the explicit submenu trigger.
                  expectType<boolean | undefined, typeof ownerState.disabled>(ownerState.disabled);
                  return {};
                },
              }}
              sideOffset={2}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Group>
      </Menu2Popup>
    </Menu2>
  );
}

function ControlledMenu2Items() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('one');

  return (
    <Menu2>
      <Menu2Popup>
        <Menu2CheckboxItem checked={checked} onCheckedChange={setChecked} />
        <Menu2RadioGroup value={value} onValueChange={setValue}>
          <Menu2RadioItem value="one">One</Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2Popup>
    </Menu2>
  );
}

<Menu2CheckboxItem
  // @ts-expect-error Use onCheckedChange(checked, eventDetails) for selection changes.
  onChange={(_event: Event, _checked: boolean, _eventDetails: unknown) => {}}
/>;
<Menu2RadioGroup
  // @ts-expect-error Use onValueChange(value, eventDetails) for selection changes.
  onChange={(_event: Event, _value: string, _eventDetails: unknown) => {}}
/>;

// The root still accepts a DOM change handler.
<Menu2CheckboxItem
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  }}
/>;
<Menu2RadioGroup
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  }}
/>;

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: { modal: false },
    },
    MuiMenu2Popup: {
      defaultProps: {
        slots: { backdrop: null },
        align: 'start',
      },
      styleOverrides: {
        root: {},
        portal: {},
        positioner: {},
        backdrop: {},
        list: {},
      },
      variants: [
        {
          props: { align: 'start' },
          style: {},
        },
      ],
    },
    MuiMenu2Submenu: {
      defaultProps: {
        defaultOpen: false,
      },
    },
    MuiMenu2SubmenuPopup: {
      variants: [{ props: { align: 'start' }, style: {} }],
      styleOverrides: {
        root: {},
        portal: {},
        positioner: {},
        list: {},
      },
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: { openOnHover: false, dense: true, disableRipple: true },
      styleOverrides: {
        root: { [`&.${menu2SubmenuTriggerClasses.highlighted}`]: { color: 'red' } },
      },
      variants: [{ props: { divider: true }, style: {} }],
    },
    MuiMenu2Item: {
      defaultProps: {
        dense: true,
      },
      styleOverrides: {
        root: { [`&.${menu2ItemClasses.highlighted}`]: { color: 'red' } },
      },
      variants: [
        {
          props: { divider: true },
          style: {},
        },
      ],
    },

    MuiMenu2CheckboxItem: {
      defaultProps: {
        slotProps: { indicator: { keepMounted: false, sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { minWidth: 40 } },
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        slotProps: { indicator: { keepMounted: false, sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { minWidth: 40 } },
      variants: [
        {
          props: { value: 'small' },
          style: {},
        },
      ],
    },
    MuiMenu2LinkItem: {
      variants: [
        {
          props: { href: '/profile' },
          style: {},
        },
      ],
    },
  },
});

// @ts-expect-error Owner state is internal to the popup.
<Menu2Popup ownerState={{ open: true }} />;
// @ts-expect-error Owner state is internal to the popup.
<Menu2SubmenuPopup ownerState={{ open: true }} />;

// @ts-expect-error Disabled state belongs to the submenu trigger.
<Menu2Submenu disabled />;
<Menu2SubmenuTrigger disabled />;

// Live state is available to theme customization, not as controlled item props.
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2Item highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2LinkItem highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2CheckboxItem highlighted />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2RadioItem value="one" highlighted />;
// @ts-expect-error Radio checked state is controlled by its group.
<Menu2RadioItem value="one" checked />;
// @ts-expect-error Highlighted state is controlled by Base UI.
<Menu2SubmenuTrigger highlighted />;
// @ts-expect-error The submenu, not its trigger, controls the open state.
<Menu2SubmenuTrigger open />;
<Menu2CheckboxItem
  checked
  onCheckedChange={(checked) => expectType<boolean, typeof checked>(checked)}
/>;

<Menu2>
  <Menu2Popup
    slots={{ backdrop: null }}
    slotProps={{ backdrop: { sx: { opacity: 0.5 } } }}
  ></Menu2Popup>
</Menu2>;
// @ts-expect-error Configure the visual backdrop with its slot.
<Menu2Popup backdrop />;
// @ts-expect-error Submenu popups have no backdrop.
<Menu2SubmenuPopup backdrop />;
// @ts-expect-error Submenu popups have no backdrop slot.
<Menu2SubmenuPopup slots={{ backdrop: 'div' }} />;
// @ts-expect-error Submenu popups have no backdrop slot.
<Menu2SubmenuPopup slotProps={{ backdrop: {} }} />;

<Menu2SubmenuTrigger slots={{ indicator: null }}>More</Menu2SubmenuTrigger>;
<Menu2Submenu>
  <Menu2SubmenuTrigger slots={{ indicator: null }}>More</Menu2SubmenuTrigger>
  <Menu2SubmenuPopup>
    <Menu2Item>Nested</Menu2Item>
  </Menu2SubmenuPopup>
</Menu2Submenu>;

// @ts-expect-error Popup positioning uses Base UI side/align names.
<Menu2Popup anchorOrigin={{ vertical: 'top', horizontal: 'left' }} />;
// @ts-expect-error closeParentOnEsc belongs to submenu roots.
<Menu2 closeParentOnEsc />;
// @ts-expect-error Arrow positioning is not part of this popup API.
<Menu2Popup arrowPadding={8} />;
// @ts-expect-error Arrow positioning is not part of this popup API.
<Menu2SubmenuPopup arrowPadding={8} />;

<Menu2Submenu>
  <Menu2SubmenuPopup></Menu2SubmenuPopup>
</Menu2Submenu>;

<Menu2SubmenuTrigger
  slotProps={{
    root: (state) => {
      expectType<boolean, typeof state.open>(state.open);
      // @ts-expect-error Exit timing is internal to the submenu.
      expectType<boolean, typeof state.closing>(state.closing);
      // @ts-expect-error Exit tint handling is internal to the submenu.
      expectType<boolean, typeof state.retainClosingTint>(state.retainClosingTint);
      expectType<boolean, typeof state.highlighted>(state.highlighted);
      // @ts-expect-error Visual selection is not part of the submenu trigger state.
      expectType<boolean, typeof state.selected>(state.selected);
      return { 'data-open': state.open };
    },
    indicator: (state) => {
      expectType<boolean, typeof state.open>(state.open);
      // @ts-expect-error Exit timing is internal to the submenu.
      expectType<boolean, typeof state.closing>(state.closing);
      // @ts-expect-error Exit tint handling is internal to the submenu.
      expectType<boolean, typeof state.retainClosingTint>(state.retainClosingTint);
      expectType<boolean, typeof state.highlighted>(state.highlighted);
      return {
        children: <span>Custom</span>,
        ref: React.createRef<HTMLSpanElement>(),
        sx: { color: 'primary.main' },
      };
    },
  }}
/>;

<Menu2SubmenuTrigger
  // @ts-expect-error Submenu triggers never close the parent on activation.
  closeOnClick
/>;

// Menu2 uses checkbox and radio items to represent a checked value.
// @ts-expect-error Menu2Item has no visual selected state.
<Menu2Item selected />;
// @ts-expect-error Menu2LinkItem has no visual selected state.
<Menu2LinkItem selected />;
// @ts-expect-error Menu2CheckboxItem uses checked, not selected.
<Menu2CheckboxItem selected />;
// @ts-expect-error Menu2RadioItem uses checked, not selected.
<Menu2RadioItem value="one" selected />;
// @ts-expect-error Menu2SubmenuTrigger has no visual selected state.
<Menu2SubmenuTrigger selected />;

// @ts-expect-error Menu2Item has no selected class.
<Menu2Item classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2LinkItem has no selected class.
<Menu2LinkItem classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2CheckboxItem has no selected class.
<Menu2CheckboxItem classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2RadioItem has no selected class.
<Menu2RadioItem value="one" classes={{ selected: 'selected' }} />;
// @ts-expect-error Menu2SubmenuTrigger has no selected class.
<Menu2SubmenuTrigger classes={{ selected: 'selected' }} />;

// @ts-expect-error Exit timing has no public class.
<Menu2SubmenuTrigger classes={{ closing: 'closing' }} />;

createTheme({
  components: {
    MuiMenu2SubmenuTrigger: {
      styleOverrides: {
        // @ts-expect-error Exit timing has no public style override.
        closing: { backgroundColor: 'red' },
      },
    },
  },
});

<Menu2>
  <Menu2Popup
    transitionDuration={{ enter: 200, exit: 150 }}
    slots={{ transition: null }}
  ></Menu2Popup>
</Menu2>;

<Menu2Submenu>
  <Menu2SubmenuPopup
    transitionDuration="auto"
    slotProps={{ transition: { easing: 'linear' } }}
  ></Menu2SubmenuPopup>
</Menu2Submenu>;

<Menu2>
  <Menu2Popup
    slotProps={{
      transition: {
        // @ts-expect-error Base UI owns completion; use onOpenChangeComplete.
        onExited: () => {},
      },
    }}
  ></Menu2Popup>
</Menu2>;

<Menu2>
  <Menu2Popup
    slotProps={{
      transition: {
        // @ts-expect-error Base UI owns the popup mounting lifecycle.
        unmountOnExit: true,
      },
    }}
  ></Menu2Popup>
</Menu2>;

// @ts-expect-error Use slots.root to replace the popup surface.
<Menu2Popup render={<button aria-label="Options" type="button" />} />;

<Menu2>
  <Menu2Popup
    slotProps={{
      portal: {
        // @ts-expect-error Base UI render prop is intentionally not supported.
        render: <div />,
      },
    }}
  ></Menu2Popup>
</Menu2>;

<Menu2 open>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup
    ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)}
    slotProps={{
      portal: (ownerState) => {
        expectType<Menu2PopupProps['align'], typeof ownerState.align>(ownerState.align);
        return {};
      },
    }}
  >
    <Menu2Item>Profile</Menu2Item>
  </Menu2Popup>
</Menu2>;

const controlledMenuProps: Menu2Props = {
  open: true,
  onOpenChange: (open, eventDetails) => {
    expectType<boolean, typeof open>(open);
    expectType<BaseMenu.Root.ChangeEventDetails, typeof eventDetails>(eventDetails);
  },
};
const controlledPopupProps: Menu2PopupProps = {
  anchor: React.createRef<HTMLButtonElement>(),
  finalFocus: React.createRef<HTMLButtonElement>(),
  children: <Menu2Item>Profile</Menu2Item>,
};
<Menu2 {...controlledMenuProps}>
  <Menu2Popup {...controlledPopupProps} />
</Menu2>;

// Renderless roots only accept behavior props and children.
// @ts-expect-error Use an explicit Menu2Trigger child.
<Menu2 trigger={<button type="button">Open</button>} />;
// @ts-expect-error Renderless roots have no DOM ref.
<Menu2 ref={React.createRef<HTMLDivElement>()} />;
// @ts-expect-error Surface styles belong to Menu2Popup.
<Menu2 sx={{ padding: 1 }} />;
// @ts-expect-error Surface classes belong to Menu2Popup.
<Menu2 classes={{ root: 'surface' }} />;
// @ts-expect-error Internal slots belong to Menu2Popup.
<Menu2 slots={{ root: 'div' }} />;
// @ts-expect-error Internal slot props belong to Menu2Popup.
<Menu2 slotProps={{ root: { title: 'Menu' } }} />;
// @ts-expect-error HTML attributes belong to Menu2Popup.
<Menu2 id="menu" />;
// @ts-expect-error Positioning belongs to Menu2Popup.
<Menu2 anchor={React.createRef<HTMLButtonElement>()} />;
// @ts-expect-error Focus return belongs to Menu2Popup.
<Menu2 finalFocus />;
// @ts-expect-error Hover opening belongs to Menu2Trigger.
<Menu2 openOnHover />;
// @ts-expect-error Use an explicit Menu2SubmenuTrigger child.
<Menu2Submenu trigger={<Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>} />;
// @ts-expect-error Renderless roots have no DOM ref.
<Menu2Submenu ref={React.createRef<HTMLDivElement>()} />;
// @ts-expect-error Surface styles belong to Menu2SubmenuPopup.
<Menu2Submenu sx={{ padding: 1 }} />;
// @ts-expect-error Surface classes belong to Menu2SubmenuPopup.
<Menu2Submenu classes={{ root: 'surface' }} />;
// @ts-expect-error Internal slots belong to Menu2SubmenuPopup.
<Menu2Submenu slots={{ root: 'div' }} />;
// @ts-expect-error Internal slot props belong to Menu2SubmenuPopup.
<Menu2Submenu slotProps={{ root: { title: 'Menu' } }} />;
// @ts-expect-error Open state belongs to the root.
<Menu2Popup open />;
// @ts-expect-error Modal behavior belongs to the root.
<Menu2Popup modal />;
// @ts-expect-error Open state belongs to the root.
<Menu2SubmenuPopup open />;
// @ts-expect-error The surface slot is named root, not paper.
<Menu2Popup slots={{ paper: 'div' }} />;
// @ts-expect-error The surface slot is named root, not paper.
<Menu2SubmenuPopup slotProps={{ paper: { title: 'Menu' } }} />;

// @ts-expect-error Detached triggers are not part of the Menu2 API.
<Menu2 handle={{}} />;
// @ts-expect-error Detached trigger IDs are not part of the Menu2 API.
<Menu2 triggerId="profile" />;
// @ts-expect-error Detached trigger IDs are not part of the Menu2 API.
<Menu2 defaultTriggerId="profile" />;
// @ts-expect-error Menu2 children are nodes, not a payload callback.
<Menu2>{() => <Menu2Item>Profile</Menu2Item>}</Menu2>;

// One element per prop: TypeScript reports one excess prop per element.
// @ts-expect-error Menu orientation is not part of this popup API.
<Menu2Popup orientation="horizontal" />;

<Menu2>
  <Menu2Trigger {...{ openOnHover: true }} render={<button type="button">Open</button>} />
  <Menu2Popup>
    <Menu2Item>Item</Menu2Item>
  </Menu2Popup>
</Menu2>;

// @ts-expect-error Button props belong to the render element.
<Menu2Trigger variant="outlined" render={<button type="button">Open</button>} />;

<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  {/* @ts-expect-error The surface slot is named root. */}
  <Menu2Popup slots={{ popup: 'div' }}>
    <Menu2Item>Item</Menu2Item>
  </Menu2Popup>
</Menu2>;

<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup slotProps={{ portal: { className: 'portal' } }}>
    <Menu2Item>Item</Menu2Item>
  </Menu2Popup>
</Menu2>;

<Menu2>
  <Menu2Popup
    slots={{ positioner: 'div' }}
    slotProps={{
      portal: { ref: React.createRef<HTMLDivElement>(), sx: { zIndex: 1600 } },
      positioner: { side: 'bottom', sideOffset: 8, sx: { outline: '1px solid' } },
    }}
  ></Menu2Popup>
</Menu2>;

<Menu2Submenu>
  <Menu2SubmenuPopup
    slotProps={{ positioner: { align: 'start', ref: React.createRef<HTMLDivElement>() } }}
  ></Menu2SubmenuPopup>
</Menu2Submenu>;

<Menu2>
  <Menu2Popup
    slotProps={{
      positioner: {
        // @ts-expect-error Base UI render prop is intentionally not supported.
        render: <div />,
      },
    }}
  ></Menu2Popup>
</Menu2>;

<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup>
    <Menu2Submenu>
      <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
      {/* @ts-expect-error Menu orientation is not part of this popup API. */}
      <Menu2SubmenuPopup orientation="horizontal">
        <Menu2Item>Item</Menu2Item>
      </Menu2SubmenuPopup>
    </Menu2Submenu>
  </Menu2Popup>
</Menu2>;

// The ref and the HTML attributes follow the `component` prop, the same as the
// classic parts.
<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup>
    <Menu2Item ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)}>Item</Menu2Item>
    <Menu2Item component="li" ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)}>
      List item
    </Menu2Item>
    <Menu2Item component="a" href="/anchor">
      Anchor attributes
    </Menu2Item>
    <Menu2LinkItem
      href="/profile"
      ref={(node) => expectType<HTMLAnchorElement | null, typeof node>(node)}
    >
      Link
    </Menu2LinkItem>
    <Menu2CheckboxItem
      slotProps={{
        indicator: {
          ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
        },
      }}
    >
      Checkbox
    </Menu2CheckboxItem>
    <Menu2Separator ref={(node) => expectType<HTMLDivElement | null, typeof node>(node)} />
    <Menu2Submenu>
      <Menu2SubmenuTrigger
        component="li"
        ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)}
      >
        More
      </Menu2SubmenuTrigger>
      <Menu2SubmenuPopup>
        <Menu2Item>Nested</Menu2Item>
      </Menu2SubmenuPopup>
    </Menu2Submenu>
  </Menu2Popup>
</Menu2>;

<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup>
    {/* @ts-expect-error `href` is an anchor attribute, and the default root is a div. */}
    <Menu2Item href="/anchor">Item</Menu2Item>
  </Menu2Popup>
</Menu2>;
