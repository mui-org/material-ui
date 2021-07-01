# Migration depuis @material-ui-pickers

<p class="description">@material-ui/pickers a été déplacé vers le @material-ui/lab.</p>

> **⚠️ Les composants du sélecteur de date ont été réécrit**. Dans la plupart des endroits, la logique a été réécrite à partir de zéro, donc il n'est pas possible de maintenir la liste complète des changements. Voici un aperçu des concepts les plus importants qui ont été changés. Si vous voulez mettre à jour, la façon la plus simple pourrait être de passer par chaque utilisation du sélecteur dans votre codebase, et les réécrire un à la fois. N'oubliez pas d'exécuter vos tests après chaque!

Ce guide est un aperçu des concepts de base qui ont été changés des sélecteurs v3.2.10.

## Installation

You simply need to install the `@material-ui/lab` package if it's not already installed. ⚠️ Make sure you have installed the latest version, `"@material-ui/lab": ^5.0.0-alpha.30"` or above.

## Importations

La version `keyboard` des sélecteurs n'est plus publiée. Toutes les versions des sélecteurs de téléphones mobiles et de bureau implémentent l'entrée du clavier pour l'accessibilité.

```diff
-import { KeyboardDatePicker } from '@material-ui/pickers';
+import DatePicker from '@material-ui/lab/DatePicker';

-<KeyboardDatePicker />
+<DatePicker />
```

De plus, au lieu de fournir une prop `variante` , ceux-ci ont été déplacés vers des importations différentes, ce qui signifie que votre paquet n'inclura pas `Dialog` si vous n'utilisez que le sélecteur de bureau.

- `<DesktopDatePicker />` – Uniquement la vue bureau.
- `<MobileDatePicker />` – Seulement la vue mobile.
- `<DatePicker />` – Vue mobile ou bureau selon la préférence du pointeur **utilisateur**.
- `<StaticDatePicker />` – La vue du sélecteur elle-même, sans entrée ou aucun autre emballage.

```diff
-import { DatePicker } from '@material-ui/pickers';
+import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

-<DatePicker variant="inline" />
+<DesktopDatePicker />
```

La même convention s'applique à `TimePicker` – `<DesktopTimePicker>` et `<MobileTimePicker />`.

## MuiPickersUtilsProvider

Le `MuiPickersUtilsProvider` a été supprimé pour  `LocalizationProvider`. De plus, les sélecteurs ne vous demandent pas d'installer les adaptateurs date-io manuellement. Tout est inclus avec le  `lab`.

❌ Avant:

```js
import AdapterDateFns from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
```

✅ Après :

```jsx
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      ...
    </LocalizationProvider>
  )
);
```

## Render input

Nous avons introduit une nouvelle propriété **requise** `renderInput`. Cela simplifie l'utilisation de composants de saisie de champ de texte non Material-UI.

```jsx
<DatePicker renderInput={(props) => <TextField {...props} />} />
<TimePicker renderInput={(props) => <TextField {...props} />} />
```

Auparavant, les propriétés étaient réparties sur le composant `<TextField />`. À partir de maintenant, vous devrez utiliser la nouvelle propriété `renderInput` pour fournir ceci:

```diff
<DatePicker
- label="Date"
- helperText="Something"
+ renderInput={props => <TextField label="Date" helperText="Something" /> }
/>
```

## Gestion des états

La logique de gestion de l'état/des valeurs pour les sélecteurs a été réécrite à partir de zéro. Les sélecteurs appelleront maintenant la prop `onChange` lorsque chaque vue du sélecteur de date se terminera. Le gestionnaire `onError` est également complètement différent. Triple-vérifiez vos sélecteurs avec l'intégration de formulaires, car les problèmes d'intégration de formulaire peuvent être subtiles.

## Aucun mask requis

Le mask n'est plus requis. En outre, si le mask fourni n'est pas valide, les sélecteurs ignoreront simplement le mask et autoriseront une entrée arbitraire.

```jsx
<DatePicker
  mask="mm"
  value={new Date()}
  onChange={console.log}
  renderInput={(props) => (
    <TextField {...props} helperText="invalid mask" />
  )}
/>

<DatePicker
  value={new Date()}
  onChange={console.log}
  renderInput={(props) => (
    <TextField {...props} helperText="valid mask" />
  )}
/>
```

## Et bien plus encore !

- ```diff <DatePicker
  - format="DD-MMM-YYYY"
  + inputFormat="DD-MMM-YYYY" ```

Il y a beaucoup de changements, soyez prudent, assurez-vous que vos tests et votre build réussissent. Si vous avez une utilisation avancée du sélecteur de date, il sera probablement plus simple de le réécrire.

Veuillez ouvrir une pull request pour améliorer le guide si vous remarquez une opportunité de le faire.
