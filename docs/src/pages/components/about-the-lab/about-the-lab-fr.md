# A propos du lab

<p class="description">Ce package contient des composants en incubation (en développement) qui ne sont pas encore prêts à être ajoutés au package principal.</p>

La principale différence entre le laboratoire et le noyau est la façon dont les composants sont versionnés. Avoir un paquet laboratoire séparer nous permets de pouvoir effectuer des changements ou d'intégrer de nouvelles fonctionnalités tandis que le noyau suit une [politique plus lente](https://material-ui.com/versions/#release-frequency).

Lorsque les développeur utilise et test les composant en signalant les éventuels problèmes, les contributeurs en apprennent plus sur se que le composant pourrait manquer, fonctionnalité manquante, problème d'accessibilité, bugs, API design, etc. Plus un composant est âgé, plus il est utilisé, moins il y aura de chances de trouver de nouveaux problèmes et par conséquent de devoir subir d'important changement.

Pour qu'un composant soit prêt à être déplacer dans le noyau, les critères suivant doivent être remplis:

- Il doit être **utilisé**. L'équipe de Material-UI utilise les données de Google Analytics et d'autres données, pour évaluer l'utilisation de chaque composant. Un composant du laboratoire avec très peu d'utilisation, veux soit dire qu'il n'est pas entièrement opérationnel, ou qu'il ni a pas suffisamment de demande.
- Il doit correspondre à la **qualité de code** des composants du noyau. Sa ne doit pas être parfait pour faire par du noyau, mais le composant doit être suffisamment fiable pour que les développeur puisse en dépendre.
  - Chaque composant a besoin de **définitions de type**. Il n'est pas nécessaire qu'un composant du laboratoire soit typés mais pour être déplacer dans le noyau il devra l'être.
  - Nécessite une bonne **couverture de tests**. Certains composant du laboratoire n'ont actuellement aucun tests.
- Peut-on l'utiliser comme **effet de levier** pour encourager les utilisateurs à passer à la dernière version majeure ? Moins la communauté est divisé mieux s'est.
- Il doit y avoir une faible probabilité de **changement majeur** dans un futur proche/moyen. Par exemple, si il y a besoin d'intégrer de nouvelle fonctionnalité induisant d'important changement, alors il serait préférable de retarder son déplacement vers le noyau.

## Installation

Installez le package dans votre répertoire de projet avec:

```sh
// Avec npm
npm install @material-ui/lab@next

// Avec yarn
yarn add @material-ui/lab@next
```

Le laboratoire dépend des composants du package principal. Si vous n'utilisez pas encore Material-UI dans votre projet, vous pouvez l'installer avec:

```sh
// Avec npm
npm install @material-ui/core@next

// Avec yarn
yarn add @material-ui/core@next
```

## TypeScript

De manière à pouvoir [ outrepasser le CSS ](/customization/theme-components/#global-style-overrides) et [ à personnaliser les propriétés par défaut ](/customization/theme-components/#default-props) avec le thème, les utilisateurs de TypeScript devront importer les types suivant. En interne, il utilise [le module d'augmentation](/guides/typescript/#customization-of-theme) pour étendre la structure du thème par défaut avec l'extension de composant disponible dans le laboratoire.

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
 }) ;
```
