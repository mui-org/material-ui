---
title: Componente React para Data e Hora
components: TextField
githubLabel: 'component: DatePicker'
materialDesign: https://material.io/components/date-pickers
waiAria: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
packageName: '@material-ui/lab'
---

# Seletores Data / Hora

<p class="description">Seletores de data e seletores de hora fornecem uma maneira simples de selecionar um único valor de um conjunto pré-determinado.</p>

- Em dispositivos móveis, seletores são melhores aplicados quando mostrados em diálogos de confirmação.
- Para exibição em linha, como em um formulário, considere usar controles compactos, como botões suspensos segmentados.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Componentes React

{{"demo": "pages/components/pickers/MaterialUIPickers.js"}}

## Seletores nativos

⚠️ O suporte dos navegadores aos controles de entrada nativos [não é perfeito](https://caniuse.com/#feat=input-datetime).

### Seletor de data

Um exemplo de seletor de data nativo com `type="date"`.

{{"demo": "pages/components/pickers/DatePickers.js"}}

### Seletores Data & Hora

Um exemplo de seletor de data & hora nativo com `type="datetime-local"`.

{{"demo": "pages/components/pickers/DateAndTimePickers.js"}}

### Seletor de hora

Um exemplo de seletor de hora nativo com `type="time"`.

{{"demo": "pages/components/pickers/TimePickers.js"}}
