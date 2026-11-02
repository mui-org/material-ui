import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

function CustomComponent() {
  return null;
}

<DefaultPropsProvider
  value={{
    MuiSelect: {
      IconComponent: CustomComponent,
    },
  }}
/>;

<DefaultPropsProvider
  value={{
    // @ts-expect-error: Random is not a registered component in the default props map.
    Random: {},
  }}
/>;
