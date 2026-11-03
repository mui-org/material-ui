import * as React from 'react';
import { ListItemText } from '@mui/material';

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

function typographyPropsTest() {
  // @ts-expect-error: incorrectComponent is not a valid primary element.
  <ListItemText slotProps={{ primary: { component: 'incorrectComponent' } }} />;
  <ListItemText slotProps={{ primary: { component: 'a', href: 'href' } }} />;
  <ListItemText
    slotProps={{
      primary: {
        component: 'a',
        // @ts-expect-error: Anchor elements do not support htmlFor.
        htmlFor: 'nonexistent-attribute',
      },
    }}
  />;
  <ListItemText
    slotProps={{ primary: { component: CustomComponent, prop1: 'prop1', prop2: 2 } }}
  />;
  // @ts-expect-error: The custom primary component requires prop1.
  <ListItemText slotProps={{ primary: { component: CustomComponent, prop2: 2 } }} />;
  <ListItemText slotProps={{ primary: { variant: 'h1' } }} />;
  <ListItemText slotProps={{ primary: { align: 'left' } }} />;
  <ListItemText
    slotProps={{
      primary: {
        color: 'primary',
        sx: { display: 'block' },
        gutterBottom: true,
        noWrap: true,
        variantMapping: { h1: 'h1' },
      },
    }}
  />;
}

function secondaryTypographyPropsTest() {
  // @ts-expect-error: incorrectComponent is not a valid secondary element.
  <ListItemText slotProps={{ secondary: { component: 'incorrectComponent' } }} />;
  <ListItemText slotProps={{ secondary: { component: 'a', href: 'href' } }} />;
  <ListItemText
    slotProps={{
      secondary: {
        component: 'a',
        // @ts-expect-error: Anchor elements do not support htmlFor.
        htmlFor: 'nonexistent-attribute',
      },
    }}
  />;
  <ListItemText
    slotProps={{ secondary: { component: CustomComponent, prop1: 'prop1', prop2: 2 } }}
  />;
  // @ts-expect-error: The custom secondary component requires prop1.
  <ListItemText slotProps={{ secondary: { component: CustomComponent, prop2: 2 } }} />;
  <ListItemText slotProps={{ secondary: { variant: 'h1' } }} />;
  <ListItemText slotProps={{ secondary: { align: 'left' } }} />;
  <ListItemText
    slotProps={{
      secondary: {
        color: 'primary',
        sx: { display: 'block' },
        gutterBottom: true,
        noWrap: true,
        variantMapping: { h1: 'h1' },
      },
    }}
  />;
}

function mixedTypographyPropsTest() {
  <ListItemText
    slotProps={{
      // @ts-expect-error: incorrectComponent is not a valid primary element.
      primary: { component: 'incorrectComponent' },
      // @ts-expect-error: incorrectComponent is not a valid secondary element.
      secondary: { component: 'incorrectComponent' },
    }}
  />;
  <ListItemText
    slotProps={{
      primary: { component: 'a', href: 'href' },
      secondary: { component: 'a', href: 'href' },
    }}
  />;
  <ListItemText
    slotProps={{
      primary: {
        component: 'a',
        // @ts-expect-error: Anchor elements do not support htmlFor.
        htmlFor: 'nonexistent-attribute',
      },
      secondary: {
        component: 'a',
        // @ts-expect-error: Anchor elements do not support htmlFor.
        htmlFor: 'nonexistent-attribute',
      },
    }}
  />;
  <ListItemText
    slotProps={{
      primary: { component: CustomComponent, prop1: 'prop1', prop2: 2 },
      secondary: { component: CustomComponent, prop1: 'prop1', prop2: 2 },
    }}
  />;
  <ListItemText
    slotProps={{
      // @ts-expect-error: The custom primary component requires prop1.
      primary: { component: CustomComponent, prop2: 2 },
      // @ts-expect-error: The custom secondary component requires prop1.
      secondary: { component: CustomComponent, prop2: 2 },
    }}
  />;
}
