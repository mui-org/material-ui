# TypeScript

<p class="description">Você pode adicionar tipagem estática para o JavaScript para melhorar a produtividade do desenvolvimento e a qualidade do código graças ao TypeScript.</p>

Material-UI requires a minimum version of TypeScript 3.5.

Dê uma olhada no exemplo [Create React App com TypeScript](https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-typescript).

Para que os tipos funcionem, você tem que pelo menos ter as seguintes opções habilitadas no seu `tsconfig.json`:

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

As opções do modo strict são as mesmas que são necessárias para todos os tipos de pacote publicados no namespace `@types/`. Usando uma `tsconfig.json` menos rigorosa ou omitindo algumas das bibliotecas podem causar erros. Para obter a melhor experiência com os tipos, recomendamos configurar `"strict": true`.

## Uso de `withStyles`

Utilizando `withStyles` no TypeScript pode ser um pouco complicado, mas há alguns utilitários que tornam a experiência menos dolorosa.

### Utilizando `createStyles` para evitar a ampliação de tipo (type widening)

Uma fonte frequente de confusão é a ampliação de tipos ([type widening](https://mariusschulz.com/blog/typescript-2-1-literal-type-widening)) do TypeScript, que faz com que este exemplo não funcione como o esperado:

```ts
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
};

withStyles(styles);
//         ^^^^^^
//         Os tipos de propriedade 'flexDirection' são incompatíveis.
//           Tipo 'string' não pode ser atribuído para o tipo '"-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row"...'.
```

O problema é que o tipo da propriedade `flexDirection` é convertido como `string`, no qual é o tipo mais conveniente. Para corrigir isto, você pode passar o objeto de estilos diretamente para `withStyles`:

```ts
withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});
```

No entanto, a ampliação de tipos continuará a causar dores de cabeça se você tentar fazer com que os estilos dependam do tema:

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

Isso ocorre pois o TypeScript [amplia o retorno de tipos de expressões de função](https://github.com/Microsoft/TypeScript/issues/241).

Por causa disso, é recomendado usar a função utilitária `createStyles` para construir seu objeto de regras de estilo:

```ts
// Estilos sem dependência
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

// Estilos com dependência do tema
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

`createStyles` é apenas a identidade da função; ela não "faz nada" em tempo de execução, apenas auxilia a inferência de tipos em tempo de compilação.

### Consultas de mídia

`withStyles` permite utilizar um objeto de estilos de nível superior com consultas de mídia assim:

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

No entanto, para permitir que estes estilos passem pelo TypeScript, as definições não devem ser ambíguas em relação aos nomes de classes CSS e nomes de propriedades CSS. Devido a isso, evite utilizar nomes de classes iguais a propriedades do CSS.

```ts
// erro porque TypeScript acha que `@media (min-width: 960px)` é o nome da classe
// e `content` é a propriedade css
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

// funciona corretamente
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

### Aumentando suas propriedades utilizando `WithStyles`

Desde que um componente seja decorado com `withStyles(styles)`, ele recebe uma propriedade injetada `classes`, você pode querer definir estas propriedades de acordo com:

```ts
const styles = (theme: Theme) => createStyles({
  root: { /* ... */ },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface Props {
  // non-style props
  foo: number;
  bar: boolean;
  // injected style props
  classes: {
    root: string;
    paper: string;
    button: string;
  };
}
```

No entanto isto não é muito elegante de acordo com o princípio de software [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), porque requer que você mantenha os nomes das classes (`'root'`, `'paper'`, `'button'`, ...) em dois locais diferentes. Nós fornecemos um operador de tipo `WithStyles` para ajudar com isso, assim você pode apenas escrever:

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

### Decorando componentes

Aplicando `withStyles(styles)` como uma função, nos dá o resultado como o esperado:

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

Infelizmente devido a uma [limitação atual dos decoradores do TypeScript](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles(styles)` não pode ser usado como decorador no TypeScript.

## Customização de tema

Ao adicionar propriedades customizadas ao `Theme`, você pode continuar a utilizá-lo de uma maneira fortemente tipada, explorando o conceito de extensão de módulos do TypeScript ([TypeScript's module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)).

O exemplo a seguir adiciona uma propriedade `appDrawer` que é mesclada na que foi exportada pelo `material-ui`:

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

E uma fábrica customizada de temas com opções padrão adicionais:

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

Isso poderia ser usado da seguinte maneira:

```ts
import createMyTheme from './styles/createMyTheme';

const theme = createMyTheme({ appDrawer: { breakpoint: 'md' }});
```

## Uso da propriedade `component`

Muitos componentes do Material-UI permitem que você substitua seu nó raiz através de uma propriedade `component`, isto será detalhado na documentação da API do componente. Por exemplo, o nó raiz de um Button pode ser substituído por um Link do React Router, e quaisquer propriedades adicionais que são passados para o Button, como `to`, serão propagadas para o componente Link. Para um exemplo de código relativo ao Button e o react-router-dom veja [estas demonstrações](/guides/routing/#component-prop).

Para poder usar propriedades de determinado componente Material-UI no seu componente próprio, as propriedades devem ser usadas com argumentos de tipo. Caso contrário, a propriedade `component` não estará presente nas propriedades do componente Material-UI.

Os exemplos abaixo usam `TypographyProps` mas o mesmo funcionará para qualquer componente que tenha propriedades definidas com `OverrideProps`.

O componente `CustomComponent` a seguir tem as mesmas propriedades que o componente `Typography`.

```ts
function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
  /* ... */
}
```

Agora o `CustomComponent` pode ser usado com uma propriedade `component` que deve ser definida para `'a'`. Além disso, o `CustomComponent` terá todas as propriedades de um elemento HTML `<a>`. As outras propriedades do componente `Typography` também estarão presentes nas propriedades do `CustomComponent`.

É possível ter um componente genérico `CustomComponent` que aceitará qualquer componente React, customizado e elementos HTML.

```ts
function GenericCustomComponent<C extends React. ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}
```

Agora se o `GenericCustomComponent` ser usado com uma propriedade `component`, ele também deve ter todas as propriedades exigidas pelo componente fornecido.

```ts
function ThirdPartyComponent({ prop1 } : { prop1: string }) {
  return <div />
}
// ...
<GenericCustomComponent component={ThirdPartyComponent} prop1="algum valor" />;
```

A `prop1` tornou-se necessária para o `GenericCustomComponent` como o `ThirdPartyComponent` tem ela como um requisito.

Nem todos os componentes suportam totalmente qualquer tipo de componente que você passe. Se você encontrar um componente que rejeita sua propriedade `component` no TypeScript por favor abra uma issue. Há um esforço contínuo para corrigir isso fazendo com que a propriedade component seja genérica.

## Manipulando `value` e manipuladores de eventos

Muitos componentes preocupados com a entrada do usuário oferecem uma propriedade `value` ou manipuladores de eventos que incluem o valor atual em `value`. Na maioria das situações, `value` só é manipulado dentro do React, o que permite que seja de qualquer tipo, como objetos ou matrizes.

No entanto, esse tipo não pode ser verificado em tempo de compilação em situações em que depende de nós filhos do componente, por exemplo, para `Select` ou `RadioGroup`. Isso significa que a opção mais segura é tipando como `unknown` e deixar que o desenvolvedor decida como deseja restringir esse tipo. Não oferecemos a possibilidade de usar um tipo genérico nesses casos, devido [as mesmas razões que `event.target` não é genérico no React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682).

As demonstrações incluem variantes tipadas que usam conversão de tipo. É uma troca aceitável porque os tipos estão todos localizados em um único arquivo e são muito básicos. Você tem que decidir por si mesmo se a mesma troca é aceitável para você. A biblioteca de tipos são strict por padrão e loose por meio de opt-in.
