import * as React from 'react';
import { expectType } from '@mui/types';
import type { Menu as BaseMenu } from '@base-ui/react/menu';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';
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
  getMenu2CheckboxItemUtilityClass,
  getMenu2CheckboxItemIndicatorUtilityClass,
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
  // @ts-expect-error The default indicator is private. Use the item's indicator slot.
  Menu2CheckboxItemIndicator,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import type { Menu2GroupOwnerState } from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import type { Menu2RadioGroupOwnerState } from '@mui/material/Unstable_Menu2RadioGroup';
import type {
  Menu2RadioItemIndicatorClassKey,
  Menu2RadioItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2RadioItem';
import Menu2RadioItem, {
  getMenu2RadioItemUtilityClass,
  getMenu2RadioItemIndicatorUtilityClass,
  menu2RadioItemClasses,
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
getMenu2CheckboxItemUtilityClass('indicatorIcon');
getMenu2RadioItemUtilityClass('indicatorIcon');
expectType<string, typeof menu2CheckboxItemClasses.indicatorIcon>(
  menu2CheckboxItemClasses.indicatorIcon,
);
expectType<string, typeof menu2RadioItemClasses.indicatorIcon>(menu2RadioItemClasses.indicatorIcon);

interface CustomIndicatorIconProps extends SvgIconProps {
  ownerState: { checked: boolean; disabled: boolean; highlighted: boolean };
}
const CustomIndicatorIcon = React.forwardRef<SVGSVGElement, CustomIndicatorIconProps>(
  function CustomIndicatorIcon({ ownerState, ...props }, ref) {
    return <SvgIcon {...props} ref={ref} data-checked={ownerState.checked} />;
  },
);

const indicatorHtmlProps: React.HTMLAttributes<HTMLSpanElement> = { title: 'Indicator' };
<Menu2CheckboxItem slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: indicatorHtmlProps }} />;
<Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2RadioItem value="one" slotProps={{ indicator: { 'data-testid': 'indicator' } }} />;
<Menu2CheckboxItem slots={{ indicatorIcon: CustomIndicatorIcon }} />;
<Menu2RadioItem value="one" slots={{ indicatorIcon: CustomIndicatorIcon }} />;
<Menu2CheckboxItem slots={{ indicatorIcon: () => null }} />;
<Menu2RadioItem value="one" slots={{ indicatorIcon: () => null }} />;
<Menu2CheckboxItem
  slotProps={{
    indicatorIcon: {
      fontSize: 'large',
      titleAccess: 'Status',
      viewBox: '0 0 20 20',
      'data-testid': 'icon',
    },
  }}
/>;
<Menu2RadioItem
  value="one"
  slotProps={{ indicatorIcon: { fontSize: 'medium', title: 'Status', 'data-testid': 'icon' } }}
/>;
// @ts-expect-error Use the indicatorIcon slot instead of icon.
<Menu2CheckboxItem icon={<span />} />;
// @ts-expect-error Use the indicatorIcon slot instead of checkedIcon.
<Menu2CheckboxItem checkedIcon={<span />} />;
// @ts-expect-error Use the indicatorIcon slot instead of icon.
<Menu2RadioItem value="one" icon={<span />} />;
// @ts-expect-error Use the indicatorIcon slot instead of checkedIcon.
<Menu2RadioItem value="one" checkedIcon={<span />} />;
// @ts-expect-error Slots require component types, not elements.
<Menu2CheckboxItem slots={{ indicatorIcon: <span /> }} />;
// @ts-expect-error Slots require component types, not elements.
<Menu2RadioItem value="one" slots={{ indicatorIcon: <span /> }} />;
// @ts-expect-error The default radio icon supports small and medium sizes.
<Menu2RadioItem value="one" slotProps={{ indicatorIcon: { fontSize: 'large' } }} />;

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
            render={(props, state) => {
              expectType<boolean, typeof state.highlighted>(state.highlighted);
              expectType<boolean, typeof state.disabled>(state.disabled);
              expectType<boolean, typeof state.dense>(state.dense);
              expectType<boolean, typeof state.disableGutters>(state.disableGutters);
              expectType<boolean, typeof state.divider>(state.divider);
              // @ts-expect-error Visual selection is not part of the item state.
              state.selected;
              return <div {...props} data-active={state.highlighted} />;
            }}
          >
            Menu2Item
          </Menu2Item>
          <Menu2LinkItem
            href="/profile"
            render={(props, state) => {
              expectType<boolean, typeof state.highlighted>(state.highlighted);
              expectType<boolean, typeof state.disabled>(state.disabled);
              expectType<boolean, typeof state.dense>(state.dense);
              expectType<boolean, typeof state.disableGutters>(state.disableGutters);
              expectType<boolean, typeof state.divider>(state.divider);
              // @ts-expect-error Visual selection is not part of the link item state.
              state.selected;
              return <a {...props} data-active={state.highlighted} />;
            }}
          >
            Profile
          </Menu2LinkItem>
          <Menu2CheckboxItem
            defaultChecked
            render={(props, state) => {
              expectType<boolean, typeof state.checked>(state.checked);
              expectType<boolean, typeof state.highlighted>(state.highlighted);
              expectType<boolean, typeof state.disabled>(state.disabled);
              expectType<boolean, typeof state.dense>(state.dense);
              expectType<boolean, typeof state.disableGutters>(state.disableGutters);
              expectType<boolean, typeof state.divider>(state.divider);
              // @ts-expect-error Checkbox items use checked, not selected.
              state.selected;
              return <div {...props} data-active={state.checked} />;
            }}
            slotProps={{
              indicatorIcon: (ownerState) => {
                expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
                return {
                  fontSize: 'small',
                  sx: { opacity: ownerState.checked ? 1 : 0.6 },
                  'data-highlighted': ownerState.highlighted,
                  ref: (node) => expectType<SVGSVGElement | null, typeof node>(node),
                };
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
              render={(props, state) => {
                expectType<boolean, typeof state.checked>(state.checked);
                expectType<boolean, typeof state.highlighted>(state.highlighted);
                expectType<boolean, typeof state.disabled>(state.disabled);
                expectType<boolean, typeof state.dense>(state.dense);
                expectType<boolean, typeof state.disableGutters>(state.disableGutters);
                expectType<boolean, typeof state.divider>(state.divider);
                // @ts-expect-error Radio items use checked, not selected.
                state.selected;
                return <div {...props} data-active={state.checked} />;
              }}
              slotProps={{
                indicatorIcon: (ownerState) => {
                  expectType<boolean, typeof ownerState.checked>(ownerState.checked);
                  expectType<boolean, typeof ownerState.highlighted>(ownerState.highlighted);
                  expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
                  return {
                    fontSize: 'medium',
                    sx: { opacity: ownerState.checked ? 1 : 0.6 },
                    'data-highlighted': ownerState.highlighted,
                    ref: (node) => expectType<HTMLSpanElement | null, typeof node>(node),
                  };
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
    expectType<React.ChangeEvent<HTMLElement>, typeof event>(event);
  }}
/>;
<Menu2RadioItem
  value="one"
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLElement>, typeof event>(event);
  }}
/>;
<Menu2RadioGroup
  onChange={(event) => {
    expectType<React.ChangeEvent<HTMLElement>, typeof event>(event);
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
        slots: { indicatorIcon: CustomIndicatorIcon },
        slotProps: {
          indicator: { keepMounted: false, sx: { color: 'primary.main' } },
          indicatorIcon: { fontSize: 'small', 'data-testid': 'icon' },
        },
      },
      styleOverrides: { indicator: { minWidth: 40 }, indicatorIcon: { opacity: 0.8 } },
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        slots: { indicatorIcon: CustomIndicatorIcon },
        slotProps: {
          indicator: { keepMounted: false, sx: { color: 'primary.main' } },
          indicatorIcon: { fontSize: 'small', 'data-testid': 'icon' },
        },
      },
      styleOverrides: { indicator: { minWidth: 40 }, indicatorIcon: { opacity: 0.8 } },
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

<Menu2Popup slotProps={{ list: { dense: true } }} />;
<Menu2Popup slotProps={{ list: () => ({ dense: false }) }} />;
<Menu2SubmenuPopup slotProps={{ list: { disablePadding: true, sx: { py: 1 } } }} />;
<Menu2SubmenuPopup
  slotProps={{ list: (ownerState) => ({ disablePadding: true, 'data-side': ownerState.side }) }}
/>;
interface CustomSubmenuListProps {
  customValue: string;
}
const customSubmenuListProps: CustomSubmenuListProps = {
  customValue: 'custom',
};
<Menu2SubmenuPopup slotProps={{ list: customSubmenuListProps }} />;
<Menu2SubmenuPopup slotProps={{ list: () => customSubmenuListProps }} />;
// @ts-expect-error Submenu list density is inherited from the parent menu.
<Menu2SubmenuPopup slotProps={{ list: { dense: true } }} />;
// @ts-expect-error Submenu list density cannot be changed through callback slot props.
<Menu2SubmenuPopup slotProps={{ list: () => ({ dense: false }) }} />;
createTheme({
  components: {
    MuiMenu2SubmenuPopup: {
      // @ts-expect-error Submenu list density cannot be changed through theme defaults.
      defaultProps: { slotProps: { list: { dense: true } } },
    },
  },
});

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
  render={(props, state) => {
    expectType<boolean, typeof state.open>(state.open);
    expectType<boolean, typeof state.highlighted>(state.highlighted);
    expectType<boolean, typeof state.disabled>(state.disabled);
    expectType<boolean, typeof state.dense>(state.dense);
    expectType<boolean, typeof state.disableGutters>(state.disableGutters);
    expectType<boolean, typeof state.divider>(state.divider);
    // @ts-expect-error Exit timing is internal to the submenu.
    state.closing;
    // @ts-expect-error Exit tint handling is internal to the submenu.
    state.retainClosingTint;
    // @ts-expect-error Visual selection is not part of the submenu trigger state.
    state.selected;
    return <div {...props} data-open={state.open} />;
  }}
  slotProps={{
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

// Item and group roots use render; labels and separators still support component.
<Menu2>
  <Menu2Trigger render={<button type="button">Open</button>} />
  <Menu2Popup>
    <Menu2Item ref={(node) => expectType<HTMLElement | null, typeof node>(node)}>Item</Menu2Item>
    <Menu2Item render={<li ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)} />}>
      List item
    </Menu2Item>
    <Menu2Item render={<a href="/anchor" aria-label="Anchor attributes" />}>
      Anchor attributes
    </Menu2Item>
    <Menu2LinkItem
      href="/profile"
      ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
    >
      Link
    </Menu2LinkItem>
    <Menu2CheckboxItem
      ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
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
        render={<li ref={(node) => expectType<HTMLLIElement | null, typeof node>(node)} />}
        ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
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
    {/* @ts-expect-error Put element-specific attributes on the render element. */}
    <Menu2Item href="/anchor">Item</Menu2Item>
  </Menu2Popup>
</Menu2>;

<Menu2Item render={undefined}>Default item</Menu2Item>;
<Menu2Item
  nativeButton
  render={(props, state) => {
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color satisfies string | undefined;
    // @ts-expect-error Highlighted is a boolean.
    expectType<string, typeof state.highlighted>(state.highlighted);
    return <Button {...props} />;
  }}
>
  Button item
</Menu2Item>;

interface CustomItemRootProps extends React.HTMLAttributes<HTMLDivElement> {
  trackingId: string;
}
const CustomItemRoot = React.forwardRef<HTMLDivElement, CustomItemRootProps>(
  function CustomItemRoot({ trackingId, ...props }, ref) {
    return <div {...props} ref={ref} data-tracking-id={trackingId} />;
  },
);
<Menu2Item render={<CustomItemRoot trackingId="item" ref={React.createRef<HTMLDivElement>()} />}>
  Custom item
</Menu2Item>;
<Menu2Item render={(props) => <CustomItemRoot {...props} trackingId="item" />} />;

// @ts-expect-error Use render to select the item root.
<Menu2Item component="li" />;
// @ts-expect-error Use render instead of the root slot.
<Menu2Item slots={{ root: 'li' }} />;
// @ts-expect-error Put root props on the item or its render element.
<Menu2Item slotProps={{ root: { title: 'Item' } }} />;
// @ts-expect-error Custom props belong to the render element.
<Menu2Item trackingId="item" render={<CustomItemRoot trackingId="item" />} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2Item render="li" />;
// @ts-expect-error Omit render to use the default element.
<Menu2Item render={null} />;

<Menu2LinkItem render={undefined} href="/profile" target="_blank" rel="noopener" />;
<Menu2LinkItem
  render={
    <a
      href="/profile"
      aria-label="Profile"
      ref={(node) => expectType<HTMLAnchorElement | null, typeof node>(node)}
      onClick={(event) => {
        expectType<EventTarget & HTMLAnchorElement, typeof event.currentTarget>(
          event.currentTarget,
        );
      }}
    />
  }
>
  Profile
</Menu2LinkItem>;
<Menu2LinkItem
  href="/profile"
  onClick={(event) => {
    expectType<EventTarget & HTMLAnchorElement, typeof event.currentTarget>(event.currentTarget);
  }}
  render={(props, state) => {
    expectType<string | undefined, typeof props.href>(props.href);
    expectType<React.HTMLAttributeAnchorTarget | undefined, typeof props.target>(props.target);
    expectType<boolean, typeof state.highlighted>(state.highlighted);
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <Link {...props} underline={state.highlighted ? 'always' : 'none'} />;
  }}
>
  Profile
</Menu2LinkItem>;

interface RouterLinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {
  to: string;
}
const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function RouterLink(
  { to, ...props },
  ref,
) {
  return (
    <a {...props} href={to} ref={ref}>
      {props.children}
    </a>
  );
});
<Menu2LinkItem render={<RouterLink to="/profile" ref={React.createRef<HTMLAnchorElement>()} />} />;
<Menu2LinkItem render={(props) => <RouterLink {...props} to="/profile" />} />;
// @ts-expect-error Router props belong to the render element.
<Menu2LinkItem to="/profile" render={<RouterLink to="/profile" />} />;
// @ts-expect-error The router link requires its own destination.
<Menu2LinkItem render={<RouterLink />} />;
// @ts-expect-error Use render to select the link item root.
<Menu2LinkItem component="a" />;
// @ts-expect-error Use render instead of the root slot.
<Menu2LinkItem slots={{ root: 'a' }} />;
// @ts-expect-error Put root props on the link item or its render element.
<Menu2LinkItem slotProps={{ root: { title: 'Profile' } }} />;
// @ts-expect-error Link items do not support disabled.
<Menu2LinkItem disabled />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2LinkItem render="a" />;
// @ts-expect-error Omit render to use the default anchor.
<Menu2LinkItem render={null} />;

<Menu2CheckboxItem render={undefined}>Default checkbox item</Menu2CheckboxItem>;
<Menu2CheckboxItem
  render={<button type="button" aria-label="Checkbox" ref={React.createRef<HTMLButtonElement>()} />}
>
  Button checkbox item
</Menu2CheckboxItem>;
<Menu2CheckboxItem
  nativeButton
  render={(props, state) => {
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <Button {...props} variant={state.checked ? 'contained' : 'text'} />;
  }}
  slots={{ indicator: 'span', indicatorIcon: CustomIndicatorIcon }}
>
  Checkbox item
</Menu2CheckboxItem>;
<Menu2CheckboxItem
  render={<CustomItemRoot trackingId="checkbox" ref={React.createRef<HTMLDivElement>()} />}
/>;
<Menu2CheckboxItem render={(props) => <CustomItemRoot {...props} trackingId="checkbox" />} />;
// @ts-expect-error Custom props belong to the render element.
<Menu2CheckboxItem trackingId="checkbox" />;
// @ts-expect-error The custom root requires its own props.
<Menu2CheckboxItem render={<CustomItemRoot />} />;
// @ts-expect-error Use render to select the checkbox item root.
<Menu2CheckboxItem component="li" />;
// @ts-expect-error The root is not an internal slot.
<Menu2CheckboxItem slots={{ root: 'li' }} />;
// @ts-expect-error Put root props on the checkbox item or its render element.
<Menu2CheckboxItem slotProps={{ root: { title: 'Checkbox' } }} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2CheckboxItem render="li" />;
// @ts-expect-error Omit render to use the default element.
<Menu2CheckboxItem render={null} />;

<Menu2RadioItem
  value="one"
  render={undefined}
  ref={(node) => {
    expectType<HTMLElement | null, typeof node>(node);
  }}
>
  Default radio item
</Menu2RadioItem>;
<Menu2RadioItem
  value="one"
  render={<button type="button" aria-label="Radio" ref={React.createRef<HTMLButtonElement>()} />}
>
  Button radio item
</Menu2RadioItem>;
<Menu2RadioItem
  value="one"
  nativeButton
  render={(props, state) => {
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <Button {...props} variant={state.checked ? 'contained' : 'text'} />;
  }}
  slots={{ indicator: 'span', indicatorIcon: CustomIndicatorIcon }}
>
  Radio item
</Menu2RadioItem>;
<Menu2RadioItem
  value="one"
  render={<CustomItemRoot trackingId="radio" ref={React.createRef<HTMLDivElement>()} />}
/>;
<Menu2RadioItem value="one" render={(props) => <CustomItemRoot {...props} trackingId="radio" />} />;
// @ts-expect-error Custom props belong to the render element.
<Menu2RadioItem value="one" trackingId="radio" />;
// @ts-expect-error The custom root requires its own props.
<Menu2RadioItem value="one" render={<CustomItemRoot />} />;
// @ts-expect-error Use render to select the radio item root.
<Menu2RadioItem value="one" component="li" />;
// @ts-expect-error The root is not an internal slot.
<Menu2RadioItem value="one" slots={{ root: 'li' }} />;
// @ts-expect-error Put root props on the radio item or its render element.
<Menu2RadioItem value="one" slotProps={{ root: { title: 'Radio' } }} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2RadioItem value="one" render="li" />;
// @ts-expect-error Omit render to use the default element.
<Menu2RadioItem value="one" render={null} />;

<Menu2SubmenuTrigger render={undefined}>Default submenu trigger</Menu2SubmenuTrigger>;
<Menu2SubmenuTrigger
  render={
    <button type="button" aria-label="More actions" ref={React.createRef<HTMLButtonElement>()} />
  }
/>;
<Menu2SubmenuTrigger
  nativeButton
  render={(props, state) => {
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <Button {...props} variant={state.open ? 'contained' : 'text'} />;
  }}
  slots={{ indicator: 'span' }}
>
  More actions
</Menu2SubmenuTrigger>;
<Menu2SubmenuTrigger
  render={<CustomItemRoot trackingId="submenu" ref={React.createRef<HTMLDivElement>()} />}
/>;
<Menu2SubmenuTrigger render={(props) => <CustomItemRoot {...props} trackingId="submenu" />} />;
// @ts-expect-error Custom props belong to the render element.
<Menu2SubmenuTrigger trackingId="submenu" />;
// @ts-expect-error The custom root requires its own props.
<Menu2SubmenuTrigger render={<CustomItemRoot />} />;
// @ts-expect-error Use render to select the submenu trigger root.
<Menu2SubmenuTrigger component="li" />;
// @ts-expect-error The root is not an internal slot.
<Menu2SubmenuTrigger slots={{ root: 'li' }} />;
// @ts-expect-error Put root props on the trigger or its render element.
<Menu2SubmenuTrigger slotProps={{ root: { title: 'More actions' } }} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2SubmenuTrigger render="li" />;
// @ts-expect-error Omit render to use the default element.
<Menu2SubmenuTrigger render={null} />;

createTheme({
  components: {
    MuiMenu2SubmenuTrigger: {
      defaultProps: {
        render: (props, state) => {
          expectType<boolean, typeof state.open>(state.open);
          return <div {...props} data-open={state.open} />;
        },
        slotProps: { indicator: { children: 'More', sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { marginLeft: 12 } },
    },
  },
});

<Menu2Group
  render={undefined}
  ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
  onChange={(event) => expectType<React.ChangeEvent<HTMLElement>, typeof event>(event)}
/>;
<Menu2Group
  render={<ul ref={(node) => expectType<HTMLUListElement | null, typeof node>(node)} />}
/>;
<Menu2Group
  render={(props, state) => {
    expectType<Menu2GroupOwnerState, typeof state>(state);
    // @ts-expect-error Group render state has no fields.
    state.disabled;
    // @ts-expect-error Groups do not expose item state.
    state.highlighted;
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <CustomItemRoot {...props} trackingId="group" />;
  }}
>
  <Menu2GroupLabel>Projects</Menu2GroupLabel>
  <Menu2Item>Open</Menu2Item>
</Menu2Group>;
<Menu2Group
  render={<CustomItemRoot trackingId="group" ref={React.createRef<HTMLDivElement>()} />}
/>;
// @ts-expect-error Custom props belong to the render element.
<Menu2Group trackingId="group" />;
// @ts-expect-error The custom root requires its own props.
<Menu2Group render={<CustomItemRoot />} />;
// @ts-expect-error Use render to select the group root.
<Menu2Group component="ul" />;
// @ts-expect-error Group has no internal slots.
<Menu2Group slots={{ root: 'ul' }} />;
// @ts-expect-error Put root props on the group or its render element.
<Menu2Group slotProps={{ root: { title: 'Projects' } }} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2Group render="ul" />;
// @ts-expect-error Omit render to use the default element.
<Menu2Group render={null} />;

<Menu2RadioGroup
  render={undefined}
  ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
/>;
<Menu2RadioGroup
  render={<ul ref={(node) => expectType<HTMLUListElement | null, typeof node>(node)} />}
/>;
<Menu2RadioGroup
  disabled
  defaultValue="list"
  render={(props, state) => {
    expectType<Menu2RadioGroupOwnerState, typeof state>(state);
    expectType<boolean, typeof state.disabled>(state.disabled);
    // @ts-expect-error Radio group render state does not expose its value.
    state.value;
    // @ts-expect-error Radio group render state does not expose item state.
    state.checked;
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color;
    return <CustomItemRoot {...props} trackingId="radio-group" data-disabled={state.disabled} />;
  }}
>
  <Menu2RadioItem value="list">List</Menu2RadioItem>
</Menu2RadioGroup>;
<Menu2RadioGroup
  render={<CustomItemRoot trackingId="radio-group" ref={React.createRef<HTMLDivElement>()} />}
/>;
// @ts-expect-error Custom props belong to the render element.
<Menu2RadioGroup trackingId="radio-group" />;
// @ts-expect-error The custom root requires its own props.
<Menu2RadioGroup render={<CustomItemRoot />} />;
// @ts-expect-error Use render to select the radio group root.
<Menu2RadioGroup component="ul" />;
// @ts-expect-error RadioGroup has no internal slots.
<Menu2RadioGroup slots={{ root: 'ul' }} />;
// @ts-expect-error Put root props on the group or its render element.
<Menu2RadioGroup slotProps={{ root: { title: 'Layout' } }} />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2RadioGroup render="ul" />;
// @ts-expect-error Omit render to use the default element.
<Menu2RadioGroup render={null} />;

createTheme({
  components: {
    MuiMenu2Group: {
      defaultProps: {
        render: (props, state) => {
          expectType<Menu2GroupOwnerState, typeof state>(state);
          return <div {...props} />;
        },
      },
    },
    MuiMenu2RadioGroup: {
      defaultProps: {
        render: (props, state) => {
          expectType<boolean, typeof state.disabled>(state.disabled);
          return <div {...props} data-disabled={state.disabled} />;
        },
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
          return { opacity: ownerState.disabled ? 0.6 : 1 };
        },
      },
    },
  },
});
