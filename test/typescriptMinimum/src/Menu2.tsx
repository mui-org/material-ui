import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { createTheme } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';

<Menu2Popup slotProps={{ list: { dense: true } }} />;
<Menu2Popup slotProps={{ list: () => ({ dense: false }) }} />;
<Menu2SubmenuPopup slotProps={{ list: { disablePadding: true, sx: { py: 1 } } }} />;
<Menu2SubmenuPopup
  slotProps={{ list: (ownerState) => ({ disablePadding: true, 'data-side': ownerState.side }) }}
/>;
// @ts-expect-error Submenu list density is inherited from the parent menu.
<Menu2SubmenuPopup slotProps={{ list: { dense: true } }} />;
// @ts-expect-error Submenu list density cannot be changed through callback slot props.
<Menu2SubmenuPopup slotProps={{ list: () => ({ dense: false }) }} />;

export default function Menu2Consumer() {
  return (
    <Menu2
      modal={false}
      onOpenChange={(open, eventDetails) => {
        open satisfies boolean;
        // @ts-expect-error The open state is a boolean.
        open satisfies string;
        eventDetails.cancel();
      }}
    >
      <Menu2Trigger render={<Button>Project actions</Button>} />
      <Menu2Popup
        ref={(node) => {
          node satisfies HTMLDivElement | null;
          // @ts-expect-error The popup ref points to the menu surface.
          node satisfies HTMLButtonElement | null;
        }}
        sx={{ minWidth: 200 }}
        onKeyDown={(event) => {
          event.currentTarget satisfies HTMLDivElement;
        }}
      >
        <Menu2Group>
          <Menu2GroupLabel>Projects</Menu2GroupLabel>
          <Menu2Item>Open project</Menu2Item>
          <Menu2LinkItem href="/projects" ref={React.createRef<HTMLElement>()}>
            All projects
          </Menu2LinkItem>
          <Menu2CheckboxItem
            defaultChecked
            nativeButton
            render={(props, state) => {
              state.checked satisfies boolean;
              state.highlighted satisfies boolean;
              state.disabled satisfies boolean;
              state.dense satisfies boolean;
              state.disableGutters satisfies boolean;
              state.divider satisfies boolean;
              // @ts-expect-error Render props omit the legacy HTML color attribute.
              'color' satisfies keyof typeof props;
              // @ts-expect-error Checkbox items use checked, not selected.
              state.selected satisfies boolean;
              return <Button {...props} variant={state.checked ? 'contained' : 'text'} />;
            }}
            slotProps={{
              indicatorIcon: (state) => {
                state.checked satisfies boolean;
                state.highlighted satisfies boolean;
                state.disabled satisfies boolean;
                return {
                  fontSize: 'small',
                  sx: { opacity: state.checked ? 1 : 0.6 },
                  'data-testid': 'checkbox-icon',
                  ref: (node) => {
                    node satisfies SVGSVGElement | null;
                  },
                };
              },
              indicator: (state) => {
                state.checked satisfies boolean;
                state.highlighted satisfies boolean;
                state.disabled satisfies boolean;
                return { component: 'i', keepMounted: true, sx: { color: 'primary.main' } };
              },
            }}
            onCheckedChange={(checked, eventDetails) => {
              checked satisfies boolean;
              eventDetails.cancel();
            }}
          >
            Show archived
          </Menu2CheckboxItem>
          <Menu2Separator />
          <Menu2Submenu>
            <Menu2SubmenuTrigger
              render={(props, state) => {
                state.open satisfies boolean;
                state.highlighted satisfies boolean;
                state.disabled satisfies boolean;
                state.dense satisfies boolean;
                state.disableGutters satisfies boolean;
                state.divider satisfies boolean;
                // @ts-expect-error Exit timing is internal to the submenu.
                'closing' satisfies keyof typeof state;
                // @ts-expect-error Exit tint handling is internal to the submenu.
                'retainClosingTint' satisfies keyof typeof state;
                return <div {...props} data-open={state.open} />;
              }}
              slotProps={{
                indicator: (state) => {
                  state.open satisfies boolean;
                  state.highlighted satisfies boolean;
                  state.disabled satisfies boolean;
                  return {
                    children: <span>More</span>,
                    sx: { color: 'primary.main' },
                    ref: (node) => {
                      node satisfies HTMLSpanElement | null;
                    },
                  };
                },
              }}
            >
              View
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2RadioGroup defaultValue="list">
                <Menu2RadioItem
                  value="list"
                  nativeButton
                  render={(props, state) => {
                    state.checked satisfies boolean;
                    state.highlighted satisfies boolean;
                    state.disabled satisfies boolean;
                    state.dense satisfies boolean;
                    state.disableGutters satisfies boolean;
                    state.divider satisfies boolean;
                    // @ts-expect-error Render props omit the legacy HTML color attribute.
                    'color' satisfies keyof typeof props;
                    // @ts-expect-error Radio items use checked, not selected.
                    state.selected satisfies boolean;
                    return <Button {...props} variant={state.checked ? 'contained' : 'text'} />;
                  }}
                  slotProps={{
                    indicatorIcon: (state) => {
                      state.checked satisfies boolean;
                      state.highlighted satisfies boolean;
                      state.disabled satisfies boolean;
                      return {
                        fontSize: 'medium',
                        sx: { opacity: state.checked ? 1 : 0.6 },
                        'data-testid': 'radio-icon',
                        ref: (node) => {
                          node satisfies HTMLSpanElement | null;
                        },
                      };
                    },
                    indicator: (state) => {
                      state.checked satisfies boolean;
                      state.highlighted satisfies boolean;
                      state.disabled satisfies boolean;
                      return { component: 'i', keepMounted: true, sx: { color: 'primary.main' } };
                    },
                  }}
                >
                  List
                </Menu2RadioItem>
                <Menu2RadioItem value="grid">Grid</Menu2RadioItem>
              </Menu2RadioGroup>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Group>
      </Menu2Popup>
    </Menu2>
  );
}

<Menu2Trigger
  ref={(node) => {
    node satisfies HTMLElement | null;
    // @ts-expect-error The trigger ref does not point to an SVG element.
    node satisfies SVGElement | null;
  }}
  render={<Button>Project actions</Button>}
/>;

<Menu2Trigger
  render={(props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    // @ts-expect-error The open state is a boolean.
    state.open satisfies string;
    return (
      <button type="button" {...props}>
        {state.open ? 'Close' : 'Open'}
      </button>
    );
  }}
/>;

<Menu2Trigger
  render={(props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    // @ts-expect-error The callback props do not include the legacy HTML color attribute.
    props.color satisfies string | undefined;
    return <Button {...props}>{state.open ? 'Close' : 'Open'}</Button>;
  }}
/>;

<Menu2Trigger
  render={(props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    return <IconButton {...props} aria-label={state.open ? 'Close menu' : 'Open menu'} />;
  }}
/>;

const CustomButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function CustomButton(props, ref) {
    return <Button {...props} ref={ref} />;
  },
);

<Menu2Trigger render={(props) => <CustomButton {...props}>Project actions</CustomButton>} />;

<Menu2Item
  ref={(node) => {
    node satisfies HTMLElement | null;
    // @ts-expect-error The item ref does not point to an SVG element.
    node satisfies SVGElement | null;
  }}
>
  Default item
</Menu2Item>;
<Menu2Item render={undefined}>Default item</Menu2Item>;
<Menu2Item render={<li ref={React.createRef<HTMLLIElement>()} />}>List item</Menu2Item>;
<Menu2Item nativeButton render={<CustomButton ref={React.createRef<HTMLButtonElement>()} />} />;
<Menu2Item
  nativeButton
  render={(props, state) => {
    state.highlighted satisfies boolean;
    state.disabled satisfies boolean;
    state.dense satisfies boolean;
    state.disableGutters satisfies boolean;
    state.divider satisfies boolean;
    // @ts-expect-error Highlighted is a boolean.
    state.highlighted satisfies string;
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color satisfies string | undefined;
    return <Button {...props} />;
  }}
>
  Button item
</Menu2Item>;
<Menu2Item nativeButton render={(props) => <CustomButton {...props} />} />;
// @ts-expect-error Use render to select the item root.
<Menu2Item component="li" />;
// @ts-expect-error Use render instead of the root slot.
<Menu2Item slots={{ root: 'li' }} />;
// @ts-expect-error Put root props on the item or its render element.
<Menu2Item slotProps={{ root: { title: 'Item' } }} />;
// @ts-expect-error Put element-specific attributes on the render element.
<Menu2Item href="/profile" />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2Item render="li" />;
// @ts-expect-error Omit render to use the default element.
<Menu2Item render={null} />;

<Menu2LinkItem
  href="/projects"
  target="_blank"
  rel="noopener"
  render={undefined}
  onClick={(event) => {
    event.currentTarget satisfies HTMLAnchorElement;
  }}
  ref={(node) => {
    node satisfies HTMLElement | null;
    // @ts-expect-error The root ref does not promise a specific HTML element.
    node satisfies HTMLAnchorElement | null;
  }}
/>;
<Menu2LinkItem
  render={<a href="/projects" aria-label="Projects" ref={React.createRef<HTMLAnchorElement>()} />}
/>;
<Menu2LinkItem
  href="/projects"
  render={(props, state) => {
    props.href satisfies string | undefined;
    props.target satisfies React.HTMLAttributeAnchorTarget | undefined;
    state.highlighted satisfies boolean;
    state.disabled satisfies boolean;
    state.dense satisfies boolean;
    state.disableGutters satisfies boolean;
    state.divider satisfies boolean;
    // @ts-expect-error Highlighted is a boolean.
    state.highlighted satisfies string;
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    props.color satisfies string | undefined;
    return <Link {...props} underline={state.highlighted ? 'always' : 'none'} />;
  }}
>
  Projects
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
<Menu2LinkItem render={<RouterLink to="/projects" ref={React.createRef<HTMLAnchorElement>()} />} />;
<Menu2LinkItem render={(props) => <RouterLink {...props} to="/projects" />} />;
// @ts-expect-error Router props belong to the render element.
<Menu2LinkItem to="/projects" render={<RouterLink to="/projects" />} />;
// @ts-expect-error The router link requires its own destination.
<Menu2LinkItem render={<RouterLink />} />;
// @ts-expect-error Use render to select the link item root.
<Menu2LinkItem component="a" />;
// @ts-expect-error Use render instead of the root slot.
<Menu2LinkItem slots={{ root: 'a' }} />;
// @ts-expect-error Put root props on the link item or its render element.
<Menu2LinkItem slotProps={{ root: { title: 'Projects' } }} />;
// @ts-expect-error Link items do not support disabled.
<Menu2LinkItem disabled />;
// @ts-expect-error The render prop requires an element or a callback.
<Menu2LinkItem render="a" />;
// @ts-expect-error Omit render to use the default anchor.
<Menu2LinkItem render={null} />;

interface CustomItemRootProps extends React.HTMLAttributes<HTMLDivElement> {
  trackingId: string;
}
const CustomItemRoot = React.forwardRef<HTMLDivElement, CustomItemRootProps>(
  function CustomItemRoot({ trackingId, ...props }, ref) {
    return <div {...props} ref={ref} data-tracking-id={trackingId} />;
  },
);

interface CustomIndicatorIconProps extends SvgIconProps {
  ownerState: { checked: boolean; disabled: boolean; highlighted: boolean };
}
const CustomIndicatorIcon = React.forwardRef<SVGSVGElement, CustomIndicatorIconProps>(
  function CustomIndicatorIcon({ ownerState, ...props }, ref) {
    return <SvgIcon {...props} ref={ref} data-checked={ownerState.checked} />;
  },
);

createTheme({
  components: {
    MuiMenu2CheckboxItem: {
      defaultProps: {
        slots: { indicatorIcon: CustomIndicatorIcon },
        slotProps: { indicatorIcon: { fontSize: 'small', 'data-testid': 'checkbox-icon' } },
      },
      styleOverrides: { indicatorIcon: { opacity: 0.8 } },
    },
    MuiMenu2RadioItem: {
      defaultProps: {
        slots: { indicatorIcon: CustomIndicatorIcon },
        slotProps: { indicatorIcon: { fontSize: 'small', 'data-testid': 'radio-icon' } },
      },
      styleOverrides: { indicatorIcon: { opacity: 0.8 } },
    },
    MuiMenu2SubmenuTrigger: {
      defaultProps: {
        render: (props, state) => {
          state.open satisfies boolean;
          return <div {...props} data-open={state.open} />;
        },
        slotProps: { indicator: { children: 'More', sx: { color: 'primary.main' } } },
      },
      styleOverrides: { indicator: { marginLeft: 12 } },
    },
  },
});

<Menu2CheckboxItem
  render={undefined}
  ref={(node) => {
    node satisfies HTMLElement | null;
  }}
  slots={{ indicator: 'span', indicatorIcon: CustomIndicatorIcon }}
/>;
<Menu2CheckboxItem
  render={<button type="button" aria-label="Checkbox" ref={React.createRef<HTMLButtonElement>()} />}
/>;
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
// @ts-expect-error Use the indicatorIcon slot instead of icon.
<Menu2CheckboxItem icon={<span />} />;
// @ts-expect-error Use the indicatorIcon slot instead of checkedIcon.
<Menu2CheckboxItem checkedIcon={<span />} />;
// @ts-expect-error Slots require component types, not elements.
<Menu2CheckboxItem slots={{ indicatorIcon: <span /> }} />;
<Menu2CheckboxItem
  slotProps={{ indicatorIcon: { fontSize: 'large', viewBox: '0 0 20 20', titleAccess: 'Status' } }}
/>;

<Menu2RadioItem
  value="one"
  render={undefined}
  ref={(node) => {
    node satisfies HTMLElement | null;
  }}
  slots={{ indicator: 'span', indicatorIcon: CustomIndicatorIcon }}
/>;
<Menu2RadioItem
  value="one"
  render={<button type="button" aria-label="Radio" ref={React.createRef<HTMLButtonElement>()} />}
/>;
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
// @ts-expect-error Use the indicatorIcon slot instead of icon.
<Menu2RadioItem value="one" icon={<span />} />;
// @ts-expect-error Use the indicatorIcon slot instead of checkedIcon.
<Menu2RadioItem value="one" checkedIcon={<span />} />;
// @ts-expect-error Slots require component types, not elements.
<Menu2RadioItem value="one" slots={{ indicatorIcon: <span /> }} />;
// @ts-expect-error The default radio icon supports small and medium sizes.
<Menu2RadioItem value="one" slotProps={{ indicatorIcon: { fontSize: 'large' } }} />;
<Menu2RadioItem
  value="one"
  slotProps={{ indicatorIcon: { fontSize: 'medium', title: 'Status' } }}
/>;

<Menu2SubmenuTrigger
  render={undefined}
  ref={(node) => {
    node satisfies HTMLElement | null;
    // @ts-expect-error The root ref does not promise a specific HTML element.
    node satisfies HTMLButtonElement | null;
  }}
  slots={{ indicator: null }}
/>;
<Menu2SubmenuTrigger
  render={
    <button type="button" aria-label="More actions" ref={React.createRef<HTMLButtonElement>()} />
  }
/>;
<Menu2SubmenuTrigger
  nativeButton
  render={(props, state) => {
    // @ts-expect-error Render props omit the legacy HTML color attribute.
    'color' satisfies keyof typeof props;
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

<Menu2Trigger render={<Button />}>Project actions</Menu2Trigger>;

// @ts-expect-error Set color on the render element.
<Menu2Trigger color="primary" render={<Button>Project actions</Button>} />;

// @ts-expect-error Use render to select the trigger component.
<Menu2Trigger component="button" render={<Button>Project actions</Button>} />;

// @ts-expect-error A trigger requires a render prop.
<Menu2Trigger>Project actions</Menu2Trigger>;

// @ts-expect-error A trigger element must be supplied through render.
<Menu2Trigger>
  <Button>Project actions</Button>
</Menu2Trigger>;

// @ts-expect-error The render prop cannot be undefined.
<Menu2Trigger render={undefined} />;

// @ts-expect-error The render prop cannot be null.
<Menu2Trigger render={null} />;

// @ts-expect-error The render prop requires an element or a callback.
<Menu2Trigger render="button" />;

// @ts-expect-error Detached triggers are not part of the Menu2 API.
<Menu2 handle={{}} />;

// @ts-expect-error The renderless root has no DOM ref.
<Menu2 ref={React.createRef<HTMLDivElement>()} />;

// @ts-expect-error Apply styles to Menu2Popup, not the renderless root.
<Menu2 sx={{ minWidth: 200 }} />;

// @ts-expect-error Use Menu2Trigger as a child.
<Menu2 trigger={<Button>Project actions</Button>} />;

// @ts-expect-error Trigger payloads are not part of the Menu2 API.
<Menu2Trigger payload={{ id: 1 }} render={<Button>Project actions</Button>} />;

// @ts-expect-error Menu2 children are nodes, not a payload callback.
<Menu2>{() => <Menu2Item>Open project</Menu2Item>}</Menu2>;
