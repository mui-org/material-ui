# TypeScript

<p class="description">Sie können statische Typisierung zu JavaScript hinzufügen, um die Produktivität und die Codequalität dank TypeScript zu verbessern.</p>

Material-UI requires a minimum version of TypeScript 3.5.

Schauen Sie sich das [Create React App mit TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript) Beispiel an.

In order for types to work, you have to at least have the following options enabled in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

The strict mode options are the same that are required for every types package published in the `@types/` namespace. Verwendung einer weniger strengen `tsconfig.json` oder das Weglassen einiger Bibliotheken kann zu Fehlern führen. To get the best type experience with the types we recommend setting `"strict": true`.

## Verwendung von `withStyles`

Verwenden von `withStyles` in TypeScript kann es etwas kniffelig sein, aber es gibt einige Hilfsprogramme, um die Erfahrung so schmerzlos wie möglich zu gestalten.

### Verwenden von `CreateStyles`, um die Typerweiterung zu besiegen

Eine häufige Quelle der Verwirrung ist die [Erweiterung der Typen](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening) von TypeScript, was dazu führt, dass dieses Beispiel nicht wie erwartet funktioniert:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles);
//         ^^^^^^
//         Typen der Eigenschaft  'flexDirection' sind nicht kompatibel.
// Der Typ 'string' kann dem Typ '"-moz-initial" | "inherit" | "initial" |
// "revert" | "unset" | "column" | "column-reverse" | "row"...'
// nicht zugewiesen werden.
```

Das Problem ist, dass der Typ der `flexDirection` als `string` interpretiert wird, was zu ungenau ist. Um dies zu beheben, können Sie das Styles-Objekt direkt an `withStyles`: übergeben:

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

Wenn Sie jedoch versuchen, die Stile von dem Thema abhängig zu machen, macht Ihnen die Typenerweiterung wieder eine Strich durch die Rechnung:

```ts
withStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
}));
```

Dies liegt daran, dass TypeScript [die Rückgabetypen von Funktionsausdrücken ](https://github.com/Microsoft/TypeScript/issues/241) erweitert.

Because of this, using the `createStyles` helper function to construct your style rules object is recommended:

```ts
// Non-dependent styles
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// Theme-dependent styles
const styles = ({ palette, spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.unit,
    backgroundColor: palette.background.default,
    color: palette.primary.main,
  },
});
```

`createStyles` ist nur die Identitätsfunktion; es "tut" nichts zur Laufzeit, es hilft nur die Typen zur Kompilierzeit festzulegen.

### Media-Anfragen

`withStyles` erlaubt ein Styles-Objekt mit Top-Level-Media-Abfragen wie:

```ts
const styles = createStyles({
  root: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    root: {
      display: 'flex',
    },
  },
});
```

However to allow these styles to pass TypeScript, the definitions have to be unambiguous concerning names for CSS classes and actual CSS property names. Aus diesem Grund sollten Klassennamen, die den CSS-Eigenschaften entsprechen, vermieden werden.

```ts
// Fehler, da TypeScript denkte, dass `@media (min-width: 960px)` ein Klassen-
// name und `content` eine css Eigenschaft ist
const ambiguousStyles = createStyles({
  content: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    content: {
      display: 'flex',
    },
  },
});

// Dies funktioniert
const ambiguousStyles = createStyles({
  contentClass: {
    minHeight: '100vh',
  },
  '@media (min-width: 960px)': {
    contentClass: {
      display: 'flex',
    },
  },
});
```

### Erweitern Sie Ihre Eigenschaften mit `WithStyles`

Da, wenn eine Komponente mit `withStyles(styles)` dekoriert ist, eine spezielle `classes` Eigenschaft injiziert bekommt, möchten Sie die Eigenschaften entsprechend definieren:

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // Nicht style Eigenschaften
  foo: number;
  bar: boolean;
  // Injizierte Style Eigenschaften
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

Dies ist jedoch nicht sehr [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) weil Sie die Klassennamen (`'root'`, `'paper'`, `'button'`, ...) an zwei verschiedenen Stellen pflegen müssen. Wir stellen einen Typoperator `WithStyles` bereit, um damit zu helfen. So kannst du einfach schreiben:

```ts
import { createStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      /* ... */
    },
    paper: {
      /* ... */
    },
    button: {
      /* ... */
    },
  });

interface Props extends WithStyles<typeof styles> {
  foo: number;
  bar: boolean;
}
```

### Komponenten dekorieren

Anwenden von `withStyles(styles)` als Funktion funktioniert wie erwartet:

```tsx
const DecoratedSFC = withStyles(styles)(({ text, type, color, classes }: Props) => (
  <Typography variant={type} color={color} classes={classes}>
    {text}
  </Typography>
));

const DecoratedClass = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { text, type, color, classes } = this.props;
      return (
        <Typography variant={type} color={color} classes={classes}>
          {text}
        </Typography>
      );
    }
  },
);
```

Aufgrund einer [aktuellen Einschränkung der TypeScript-Dekorateure](https://github.com/Microsoft/TypeScript/issues/4881), kann `withStyles(styles)` leider nicht als Dekorator in TypeScript verwendet werden.

## Anpassung des `Theme`

Beim Hinzufügen benutzerdefinierter Eigenschaften zum `Theme` können Sie es weiterhin in stark typisierter Weise verwenden, indem Sie die [Modulerweiterung von TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) nutzen.

Im folgenden Beispiel wird eine `appDrawer` Eigenschaft hinzugefügt, welche in das von `material-ui` exportierte Theme eingefügt wird:

```ts
import { Breakpoint, Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
      breakpoint: Breakpoint;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width'];
      breakpoint?: Breakpoint;
    };
  }
}
```

Und eine benutzerdefinierte Theme Generierung mit zusätzlichen Standardoptionen:

**./styles/createMyTheme**:

```ts
import { createTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createMyTheme(options: ThemeOptions) {
  return createTheme({
    appDrawer: {
      width: 225,
      breakpoint: 'lg',
    },
    ...options,
  });
}
```

Dies könnte wie folgt verwendet werden:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Usage of `component` prop

Many Material-UI components allow you to replace their root node via a `component` prop, this will be detailed in the component's API documentation. For example, a Button's root node can be replaced with a React Router's Link, and any additional props that are passed to Button, such as `to`, will be spread to the Link component. For a code example concerning Button and react-router-dom checkout [these demos](/guides/routing/#component-prop).

To be able to use props of such a Material-UI component on their own, props should be used with type arguments. Otherwise, the `component` prop will not be present in the props of the Material-UI component.

The examples below use `TypographyProps` but the same will work for any component which has props defined with `OverrideProps`.

The following `CustomComponent` component has the same props as the `Typography` component.

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

Now the `CustomComponent` can be used with a `component` prop which should be set to `'a'`. In addition, the `CustomComponent` will have all props of a `<a>` HTML element. The other props of the `Typography` component will also be present in props of the `CustomComponent`.

It is possible to have generic `CustomComponent` which will accept any React component, custom and HTML elements.

```ts
function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

Now if the `GenericCustomComponent` will be used with a `component` prop provided, it should also have all props required by the provided component.

```ts
function ThirdPartyComponent({ prop1 } : { prop1: string }) {
  return <div />
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="some value" />;
function ThirdPartyComponent({ prop1 } : { prop1: string }) {
  return <div />
}
// ...
```

The `prop1` became required for the `GenericCustomComponent` as the `ThirdPartyComponent` has it as a requirement.

Nicht jede Komponente unterstützt vollständig jeden übergebenen Komponententyp. If you encounter a component that rejects its `component` props in TypeScript please open an issue. Es besteht ein ständiger Aufwand, um dies zu beheben, indem Komponentenstützen generisch gemacht werden.

## Handling `value` and event handlers

Many components concerned with user input offer a `value` prop or event handlers which include the current `value`. In most situations that `value` is only handled within React which allows it be of any type, such as objects or arrays.

However, that type cannot be verified at compile time in situations where it depends on the component's children e.g. for `Select` or `RadioGroup`. This means that the soundest option is to type it as `unknown` and let the developer decide how they want to narrow that type down. We do not offer the possibility to use a generic type in those cases for [the same reasons `event.target` is not generic in React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

The demos include typed variants that use type casting. It is an acceptable tradeoff because the types are all located in a single file and are very basic. You have to decide for yourself if the same tradeoff is acceptable for you. The library types are be strict by default and loose via opt-in.
