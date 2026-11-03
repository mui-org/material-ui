import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { CardHeaderProps, CardHeaderTypeMap } from '@mui/material/CardHeader';
import CardHeader from '@mui/material/CardHeader';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

type DefaultComponent = CardHeaderTypeMap['defaultComponent'];

interface ComponentProp {
  component?: React.ElementType;
}

<CardHeader component={CustomComponent} stringProp="s" numberProp={2} />;

function createElementBasePropMixedTest() {
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader);
  React.createElement<CardHeaderProps<DefaultComponent, ComponentProp>>(CardHeader, {
    component: 'div',
  });
  // @ts-expect-error required props are missing
  React.createElement<CardHeaderProps<typeof CustomComponent, ComponentProp>>(CardHeader, {
    component: CustomComponent,
  });
  React.createElement<CardHeaderProps<typeof CustomComponent, ComponentProp>>(CardHeader, {
    component: CustomComponent,
    stringProp: '',
    numberProp: 0,
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    disableTypography: true,
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    // @ts-expect-error CardHeader does not accept unknownProp
    unknownProp: 'shouldNotWork',
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    // @ts-expect-error disableTypography does not accept strings
    disableTypography: 'hello',
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    // @ts-expect-error disableTypography does not accept numbers
    disableTypography: 1,
  });
  React.createElement<CardHeaderProps<any, ComponentProp>>(CardHeader, {
    // @ts-expect-error `component` is not a valid element
    component: 'incorrectElement',
  });
}

function createElementTypographyTest() {
  React.createElement<CardHeaderProps>(CardHeader, {
    slotProps: {
      title: {
        align: 'center',
      },
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    slotProps: {
      title: {
        // @ts-expect-error: incorrectAlign is not a supported Typography alignment.
        align: 'incorrectAlign',
      },
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    slotProps: {
      title: {
        variant: 'body1',
      },
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    slotProps: {
      title: {
        // @ts-expect-error: Typography variant must be a variant name, not a number.
        variant: 123,
      },
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        component: 'div',
      },
    },
  });
  // ExpectError: This is expected to err; the type system should catch required props from "CustomComponent".
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        component: CustomComponent,
      },
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        component: CustomComponent,
        stringProp: '',
        numberProp: 0,
      },
    },
  });
  // ExpectError: This is expected to err; the type system should catch the props type mismatch
  // from "CustomComponent" props.
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        component: CustomComponent,
        stringProp: 0,
        numberProp: '',
      },
    },
  });
  // ExpectError: This is expected to err; the type system is welcoming unknown props.
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        unknownProp: 'shouldNotWork',
      },
    },
  });
  React.createElement<CardHeaderProps<DefaultComponent, {}, React.ElementType>>(CardHeader, {
    slotProps: {
      title: {
        // @ts-expect-error: incorrectComponent is not a valid intrinsic element.
        component: 'incorrectComponent',
      },
    },
  });
  React.createElement<CardHeaderProps>(CardHeader, {
    slotProps: { title: true },
  });
}

function componentPropTest() {
  <CardHeader component="div" />;
  <CardHeader component={CustomComponent} stringProp="string" numberProp={1} />;
  // @ts-expect-error: incorrectComponent is not a valid intrinsic element.
  <CardHeader component="incorrectComponent" />;
  // @ts-expect-error: CustomComponent requires both stringProp and numberProp.
  <CardHeader component={CustomComponent} />;
}

function mixedCardHeaderComponentAndTypographyTest() {
  <CardHeader component="div" slotProps={{ title: { component: 'a', href: 'href' } }} />;
  <CardHeader component="div" slotProps={{ subheader: { component: 'a', href: 'href' } }} />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    slotProps={{ title: { component: CustomComponent, stringProp: 'stringProp', numberProp: 2 } }}
  />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    slotProps={{
      title: { component: CustomComponent, stringProp: 'stringProp', numberProp: 2 },
      subheader: {
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: 2,
      },
    }}
  />;
  // @ts-expect-error: incorrectComponent is not a valid intrinsic element.
  <CardHeader component="incorrectComponent" />;
  // @ts-expect-error: CustomComponent requires both stringProp and numberProp.
  <CardHeader component={CustomComponent} />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    slotProps={{
      // @ts-expect-error: The custom title component requires numberProp.
      title: { component: CustomComponent, stringProp: 'stringProp' },
      subheader: {
        // @ts-expect-error Before tsgo, this error was merged with line 180 ignore
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: 2,
      },
    }}
  />;
  <CardHeader
    component={CustomComponent}
    stringProp="string"
    numberProp={1}
    slotProps={{
      // @ts-expect-error: The custom title component requires numberProp.
      title: { component: CustomComponent, stringProp: 'stringProp' },
      subheader: {
        // @ts-expect-error: The custom subheader component requires numberProp.
        component: CustomComponent,
        stringProp: 'stringProp',
      },
    }}
  />;
  <CardHeader
    component="incorrectComponent"
    stringProp="string"
    numberProp={1}
    slotProps={{
      // @ts-expect-error: The invalid root component prevents inferring the custom title component props.
      title: { component: CustomComponent, stringProp: 'stringProp', numberProp: 2 },
      subheader: {
        // @ts-expect-error: The invalid root component prevents inferring the custom subheader component props.
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: 2,
      },
    }}
  />;
}

function titleTypographyPropsTest() {
  // @ts-expect-error: incorrectComponent is not a valid title element.
  <CardHeader slotProps={{ title: { component: 'incorrectComponent' } }} />;
  <CardHeader slotProps={{ title: { component: 'a', href: 'href' } }} />;
  <CardHeader
    slotProps={{ title: { component: CustomComponent, stringProp: 'stringProp', numberProp: 2 } }}
  />;
  <CardHeader slotProps={{ title: { variant: 'h1' } }} />;
  <CardHeader slotProps={{ title: { align: 'left' } }} />;
  <CardHeader
    slotProps={{
      title: {
        color: 'primary',
        display: 'block',
        gutterBottom: true,
        noWrap: true,
        variantMapping: { h1: 'h1' },
      },
    }}
  />;
  <CardHeader
    slotProps={{
      title: {
        // @ts-expect-error: The custom title component requires a numeric numberProp.
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: '',
      },
    }}
  />;
  // @ts-expect-error: The custom title component requires stringProp.
  <CardHeader slotProps={{ title: { component: CustomComponent, numberProp: 2 } }} />;
  <CardHeader
    slotProps={{
      title: {
        component: 'a',
        // ExpectError: This is expected to err; the type system is welcoming unknown props.
        propThatDoesntExist: 'shouldNotWork',
      },
    }}
  />;
  // Regression test for https://github.com/mui/material-ui/issues/21583
  // which was probably fixed in https://github.com/mui/material-ui/pull/21552.
  <CardHeader
    title={<strong>Contemplative Reptile</strong>}
    slotProps={{ title: { component: 'h2' } }}
  />;
}

function subheaderTypographyPropsTest() {
  <CardHeader slotProps={{ subheader: { component: 'a', href: 'href' } }} />;
  <CardHeader
    slotProps={{
      subheader: {
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: 2,
      },
    }}
  />;
  <CardHeader slotProps={{ subheader: { variant: 'h1' } }} />;
  <CardHeader slotProps={{ subheader: { align: 'left' } }} />;
  <CardHeader
    slotProps={{
      subheader: {
        color: 'primary',
        display: 'block',
        gutterBottom: true,
        noWrap: true,
        variantMapping: { h1: 'h1' },
      },
    }}
  />;
  <CardHeader
    slotProps={{
      subheader: {
        component: 'a',
        // ExpectError: This is expected to err; the type system is welcoming unknown props.
        propThatDoesntExist: 'shouldNotWork',
      },
    }}
  />;
  <CardHeader
    slotProps={{
      subheader: {
        // @ts-expect-error: incorrectComponent is not a valid subheader element.
        component: 'incorrectComponent',
      },
    }}
  />;
  <CardHeader
    slotProps={{
      subheader: {
        // @ts-expect-error: The custom subheader component requires stringProp.
        component: CustomComponent,
        numberProp: 2,
      },
    }}
  />;
}

function mixedTypographyPropsTest() {
  <CardHeader
    slotProps={{
      title: { component: 'a', href: 'href' },
      subheader: { component: 'a', href: 'href' },
    }}
  />;
  <CardHeader
    slotProps={{
      title: { component: CustomComponent, stringProp: 'stringProp', numberProp: 2 },
      subheader: {
        component: CustomComponent,
        stringProp: 'stringProp',
        numberProp: 2,
      },
    }}
  />;
  <CardHeader
    slotProps={{
      // @ts-expect-error: incorrectComponent is not a valid title element.
      title: { component: 'incorrectComponent' },
      subheader: {
        // @ts-expect-error: incorrectComponent is not a valid subheader element.
        component: 'incorrectComponent',
      },
    }}
  />;
  <CardHeader
    slotProps={{
      title: {
        component: 'a',
        // ExpectError: This is expected to err; the type system is welcoming unknown props.
        propThatDoesntExist: 'shouldNotWork',
      },
      subheader: {
        component: 'a',
        // ExpectError: This is expected to err; the type system is welcoming unknown props.
        propThatDoesntExist: 'shouldNotWork',
      },
    }}
  />;
  <CardHeader
    slotProps={{
      title: {
        // @ts-expect-error: The custom title component requires stringProp.
        component: CustomComponent,
        numberProp: 2,
      },
      subheader: {
        // @ts-expect-error: The custom subheader component requires stringProp.
        component: CustomComponent,
        numberProp: 2,
      },
    }}
  />;
  <CardHeader
    slotProps={{
      title: {
        // @ts-expect-error: The custom title component requires stringProp.
        component: CustomComponent,
        numberProp: 2,
      },
      subheader: {
        // @ts-expect-error: The invalid title props prevent inferring the custom subheader component.
        component: CustomComponent,
        numberProp: 2,
        stringProp: 'yada',
      },
    }}
  />;
  <CardHeader
    slotProps={{
      title: {
        // @ts-expect-error: The invalid subheader props prevent inferring the custom title component.
        component: CustomComponent,
        numberProp: 2,
        stringProp: 'yada',
      },
      subheader: {
        // @ts-expect-error: The custom subheader component requires stringProp.
        component: CustomComponent,
        numberProp: 2,
      },
    }}
  />;
}

<CardHeader
  slotProps={{
    root: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
    action: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
    avatar: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
    content: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
    title: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
    subheader: {
      component: 'div',
      className: 'flex',
      'data-testid': 'hello',
    },
  }}
/>;
const CustomSlot = styled('div')({});
<CardHeader
  slots={{
    action: CustomSlot,
    avatar: CustomSlot,
    content: CustomSlot,
    root: CustomSlot,
    subheader: CustomSlot,
    title: CustomSlot,
  }}
/>;
