---
title: React Icon Component
components: Icones, SvgIcon
githubLabel: 'components: SvgIcon'
materialDesign: https://material.io/design/iconography/system-icons.html
---

# Icônes

<p class="description">Conseils et suggestions pour l'utilisation des icônes avec Material-UI.</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Icônes de Material

For each SVG icon, we export the respective React component from the @material-ui/icons package. Material Design has standardized over 1,100 official icons, each in five different "themes" (see below). You can [search the full list of these icons](/components/material-icons/).

### Installation

Installez le package dans votre répertoire de projet avec:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

Ces composants utilisent le composant Material-UI `SvgIcon` pour afficher le chemin SVG pour chaque icône, et ont donc une dépendance sur `@materialui/core`.

Si vous n'utilisez pas déjà Material-UI dans votre projet, vous pouvez l'ajouter avec:

```sh
// Avec npm
npm install @material-ui/core@next

// Avec yarn
yarn add @material-ui/core@next
```

### Utilisation

Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

La plus sûre pour la taille des packages est l'option 1, mais certains développeurs préfèrent l'option 2. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach.

Chaque icône de Material a également un "thème" : Configuré (par défaut), `Outlined`, `Rounded`, `Two-tone`, et `Sharp`. Pour importer le composant d'icône avec un autre thème que celui par défaut, ajoutez le nom du thème au nom de l'icône. For example `@material-ui/icons/Delete` icon with:

- Filled theme (default) is exported as `@material-ui/icons/Delete`,
- Outlined theme is exported as `@material-ui/icons/DeleteOutlined`,
- Rounded theme is exported as `@material-ui/icons/DeleteRounded`,
- Twotone theme is exported as `@material-ui/icons/DeleteTwoTone`,
- Sharp theme is exported as `@material-ui/icons/DeleteSharp`.

> Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

### Test

Pour tester les fins, chaque icône importée de `@material-ui/icons` a un attribut `data-testid` avec le nom de l'icône. Par exemple:

```jsx
import DeleteIcon from '@material-ui/icons/Delete';
```

a l'attribut suivant une fois monté :

```html
<svg data-testid="DeleteIcon"></svg>
```

## SvgIcon

Si vous avez besoin d'une icône SVG personnalisée (non disponible dans les [icônes Material](/components/material-icons/)), vous pouvez utiliser le wrapper `SvgIcon`. This component extends the native `<svg>` element:

- It comes with built-in accessibility.
- Les éléments de type SVG doivent être mis à l'échelle pour une affichage de 24x24px afin que l'icône puisse être utilisée telle quelle, ou inclus en tant qu'enfant pour d'autres composants Material-UI qui utilisent des icônes. (This can be customized with the `viewBox` attribute).
- By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the `color` prop.

```jsx
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
```

### Couleur

{{"demo": "pages/components/icons/SvgIconsColor.js"}}

### Size

{{"demo": "pages/components/icons/SvgIconsSize.js"}}

### Component prop

You can use the `SvgIcon` wrapper even if your icons are saved in the `.svg` format. [svgr](https://github.com/smooth-code/svgr) has loaders to import SVG files and use them as React components. For example, with webpack:

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// ---
import StarIcon from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

It's also possible to use it with "url-loader" or "file-loader". C'est l'approche utilisée pour une application créée par React App.

```jsx
// webpack.config.js
{
  test: /\.svg$/,
  use: ['@svgr/webpack', 'url-loader'],
}

// ---
import { ReactComponent as StarIcon } from './star.svg';

<SvgIcon component={StarIcon} viewBox="0 0 600 476.6" />
```

### createSvgIcon

La fonction `createSvgIcon` est utilisé pour créer les [icônes Material](#material-icons). Il peut être utilisé pour envelopper le chemin SVG avec un composant `SvgIcon`.

```jsx
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);
```

{{"demo": "pages/components/icons/CreateSvgIcon.js"}}

### Font Awesome

Si vous trouvez qu'il y a des problèmes de mise en page lors de l'utilisation de `FontAwesomeIcon` de `@fortawesome/react-fontawesome`, vous pouvez essayer de passer les données SVG Font Awesome directement à `SvgIcon`.

Ci-dessous est une comparaison du composant `FontAwesomeIcon` et d'un composant `SvgIcon` encapsulé.

{{"demo": "pages/components/icons/FontAwesomeSvgIconDemo.js"}}

La propriété  `fullWidth` de `FontAwesomeicon` peut également être utilisée pour approximer les bonnes dimensions, mais elle n'est pas parfaite.

### Autres bibliothèques

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. Pour l'icône souhaitée, copiez le chemin (`path`) de SVG qu'ils fournissent, et l'utiliser comme fils du composant `SvgIcon` ou avec la fonction `createSvgIcon()`.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

Le composant `Icon` affichera une icône à partir de toute police d’icône prenant en charge les ligatures. Le composant `Icon` affichera une icône à partir de toute police d’icône prenant en charge les ligatures. Pour utiliser une icône, enveloppez simplement le nom de l'icône (ligature de police) avec le composant `Icon` , par exemple:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

Par défaut, une icône héritera de la couleur de texte actuelle. Vous pouvez éventuellement définir la couleur de l'icône à l'aide de l'une des propriétés de couleur du thème: `primary`, `secondary`, `action`, `error` & `disabled`.

### Icônes de police Material

`Icon` définira par défaut le nom de la classe de base pour la police des icônes de Material grace à la propriété `variant`. Tout ce que vous avez à faire est de charger la police, par exemple, via Google Web Fonts :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

{{"demo": "pages/components/icons/Icons.js"}}

### Police personnalisée

Pour les autres polices, vous pouvez personnaliser le nom de la classe de base en utilisant la propriété `baseClassName`. Par exemple, vous pouvez afficher des icônes two-tone avec Material Design:

```jsx
import Icon from '@material-ui/core/Icon';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone"
  // Importer les Icônes de two-tones                           ^^^^^^^^
/>;
```

{{"demo": "pages/components/icons/TwoToneIcons.js"}}

#### Nom global de la classe de base

La modification de la propriété `baseClassName` pour chaque utilisation du composant est répétitive. Vous pouvez changer la propriété par défaut via le thème

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-two-tone',
      },
    },
  },
});
```

Ensuite, vous pouvez utiliser la police de tow-tone directement :

```jsx
<Icon>add_circle</Icon>
```

### Font Awesome

La police [Font Awesome](https://fontawesome.com/icons) peut être utilisée avec la composante `Icon` comme suit :

{{"demo": "pages/components/icons/FontAwesomeIcon.js"}}

Notez que les icônes Font Awesome n'ont pas été conçues comme les icônes Material Design (comparer les deux démos précédentes). Les icônes de fa (Font Awesome) sont recadrées pour utiliser tout l'espace disponible. Vous pouvez ajuster pour cela avec une substitution globale :

```js
const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 3,
          fontSize: '1.125rem',
        },
      },
    },
  },
});
```

{{"demo": "pages/components/icons/FontAwesomeIconSize.js"}}

## Font vs SVG. Which approach to use?

Les deux approches fonctionnent bien, cependant il y a des différences subtiles, en particulier en termes de performance et de qualité d'affichage. Dans la mesure du possible, SVG est préféré car il permet le fractionnement de code, supporte plus d'icônes, et rend plus rapidement et mieux.

Pour plus de détails, jetez un œil à [pourquoi GitHub a migré des icônes de police vers les icônes SVG](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Accessibilité

Les icônes peuvent transmettre toutes sortes d'informations significatives, il est donc important de assurer qu'elles soient accessibles dans le cas échéant. Il y a deux cas d'utilisation que vous deviez considérer :

- **Icônes décoratives** qui ne sont utilisées que pour le renforcement visuel ou de marque. S'ils étaient supprimés de la page, les utilisateurs comprendraient toujours et pourraient utiliser votre page.
- **Les Icônes sémantiques** sont celles que vous utilisez pour transmettre du sens, plutôt que de simples décorations. Ceci inclut les icônes sans texte à côté d'elles qui sont utilisées comme contrôles interactifs — boutons, éléments de formulaire, toggles, etc.

### Icônes décoratives

Si vos icônes sont purement décoratives, vous avez déjà fini ! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Icônes sémantiques

#### Icônes sémantiques type SVG

Vous devez inclure la propriété `titleAccess` avec une valeur significative. L'attribut `role="img"` et l'élément `<title>` sont ajoutés pour que vos icônes soient correctement accessibles.

Dans le cas d'éléments interactifs ciblables, par exemple lorsqu'il est utilisé avec un bouton d'icône, vous pouvez utiliser la propriété `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

#### Icônes de polices sémantiques

Vous devez fournir une alternative de texte qui n'est visible que pour les technologies d'assistance.

```jsx
import Icon from '@material-ui/core/Icon';
import { visuallyHidden } from '@material-ui/utils';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles({ visuallyHidden })();

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Créez un utilisateur</Typography>
```

#### Référence

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
