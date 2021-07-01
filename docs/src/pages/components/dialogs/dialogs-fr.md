---
title: Composent React Dialog
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: Dialog'
materialDesign: https://material.io/components/dialogs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Dialog

<p class="description">Les boîtes de dialogue informent les utilisateurs sur une tâche et peuvent contenir des informations critiques, nécessiter des décisions ou impliquer plusieurs tâches.</p>

Un [Dialog](https://material.io/design/components/dialogs.html) est un type de fenêtre [modale](/components/modal/) qui apparaît devant le contenu de l'application pour fournir des informations critiques ou demander une décision. Les boîtes de dialogue désactivent toutes les fonctionnalités des applications lorsqu'elles apparaissent et restent à l'écran jusqu'à confirmation, exclusion ou action requise.

Les dialogues sont délibérément interruptifs, ils doivent donc être utilisés avec parcimonie.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Dialogues simples

Des bites de dialogues simples peuvent fournir des détails supplémentaires ou des actions sur un élément de liste. Par exemple, ils peuvent afficher des avatars, icônes, sous titre clarifié, ou des actions orthogonales (comme l'ajout d'un compte).

Mécanique tactile:

- Choisir une option valide immédiatement l'option et ferme le menu
- Toucher en dehors de la boîte de dialogue ou appuyer sur Retour annule l'action et ferme la boîte de dialogue

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## Alertes

Les alertes sont des interruptions urgentes, nécessitant un acquittement, qui informent l'utilisateur de la situation.

La plupart des alertes n'ont pas besoin de titres. Ils résument une décision en une ou deux phrase par:

- Poser une question (par exemple "Supprimer cette conversation?")
- Faire une déclaration relative aux boutons d'action

N'utiliser les alertes de la barre de titre que pour les situations à haut risque, telles que la potentielle perte de connectivité. Les utilisateurs doivent être capables de comprendre les choix basés uniquement sur le titre et le texte du bouton.

Si un titre est requis:

- Utilisez une question ou une déclaration claire avec une explication dans la zone de contenu, telle que "Effacer le stockage USB?".
- Évitez l'utilisation de Dialog pour des questions telles que « Avertissement ! » ou "Êtes-vous sûr ?"

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## Les transitions

Vous pouvez également permuter la transition. L’exemple suivant utilise `Slide`.

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## Dialogues de formulaire

Les boîtes de dialogue de formulaire permettent aux utilisateurs de remplir des champs de formulaire dans une boîte de dialogue. Par exemple, si votre site invite les abonnés potentiels à saisir leur adresse e-mail, ils peuvent renseigner le champ e-mail et appuyer sur "Envoyer".

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Dialogues personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/how-to-customize/).

La boîte de dialogue a un bouton de fermeture ajouté pour faciliter l'utilisation.

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Dialogues plein écran

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## Tailles en option

Vous pouvez définir une largeur maximale dans la boîte de dialogue à l’aide de la valeur `maxWidth`, associée à la valeur `fullWidth`. Lorsque la propriété `fullWidth` est définie à `true`, le Dialog s'adapte en fonction de la valeur `maxWidth`.

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## Responsive plein écran

Vous pouvez créer une boîte de dialogue en plein écran en utilisant [`useMediaQuery`](/components/use-media-query/#usemediaquery).

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog fullScreen={fullScreen} />
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## Dialogues de confirmation

Les dialogues de confirmation demandent aux utilisateurs de confirmer explicitement leur choix avant la validation d'une option. Par exemple dans le cas suivant, les utilisateurs peuvent écouter plusieurs sonneries, mais au final, ils peuvent seulement sélectionner une seule option en appuyant sur 'OK'.

Appuyer sur “Annuler” dans un Dialog de confirmation, cela va annuler l'action, annuler les modifications et fermer le Dialog.

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Dialogue glissable

Vous pouvez créer une boîte de dialogue déplaçable à l’aide de [react-draggable](https://github.com/mzabriskie/react-draggable). Pour ce faire, vous pouvez passer le composant importé `Draggable` en tant que proprieté `PaperComponent` du composant `Dialog`. Cela rend la totalité de la boîte de dialogue déplaçable.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## Défiler de longues contenu

Lorsque les Dialogs deviennent trop longues pour la fenêtre ou l'écran d'utilisateur, ils peuvent être défilés.

- `scroll=paper` le contenu de la boîte de dialogue défile dans l'élément de papier.
- `scroll=body` le contenu de la boîte de dialogue défile dans l'élément body.

Essayez la démo ci-dessous pour voir ce que nous voulons dire:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## Performances

Suivez la section de performance du [ Modal](/components/modal/#performance).

## Limites

Suivez la [Section des limitations modales](/components/modal/#limitations).

## Accessibilité

Suivez la [section d'accessibilité de la Modal](/components/modal/#accessibility).
