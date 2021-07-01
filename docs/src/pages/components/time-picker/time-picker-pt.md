---
title: Componente React Seletor de hora
components: DesktopTimePicker, MobileTimePicker, StaticTimePicker, TimePicker, ClockPicker
githubLabel: 'component: TimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/time-pickers
---

# Seletor de hora

<p class="description">Seletores de horário permitem que o usuário selecione um horário.</p>

Seletores de hora permitem que o usuário selecione um horário simples (no formato de horas:minutos). O horário selecionado é indicado pelo círculo preenchido no final do ponteiro do relógio.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{DayJS,Luxon,Moment} ou qualquer adaptador válido de date-io
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

{{"demo": "pages/components/time-picker/BasicTimePicker.js"}}

## Modo estático

It's possible to render any time picker inline. Isto permitirá construir contêineres customizados de popover/modal.

{{"demo": "pages/components/time-picker/StaticTimePickerDemo.js", "bg": true}}

## Responsividade

O componente seletor de hora é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileTimePicker` component works best for touch devices and small screens.
- The `DesktopTimePicker` component works best for mouse devices and large screens.

By default, the `TimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/time-picker/ResponsiveTimePickers.js"}}

## Propriedades de formulário

The time picker component can be disabled or read-only.

{{"demo": "pages/components/time-picker/FormPropsTimePickers.js"}}

## Localização

Use `LocalizationProvider` para alterar a date-engine de localização que é usada para renderizar o seletor de hora. O seletor de hora ajustará automaticamente à configuração de horário da localidade, ou seja, ao formato 12 horas ou 24 horas. Isso pode ser controlado com a propriedade `ampm`.

{{"demo": "pages/components/time-picker/LocalizedTimePicker.js"}}

## Validação de hora

{{"demo": "pages/components/time-picker/TimeValidationTimePicker.js"}}

## Paisagem

{{"demo": "pages/components/time-picker/StaticTimePickerLandscape.js", "bg": true}}

## Subcomponentes

Some lower-level sub-components (`ClockPicker`) are also exported. Estes são renderizados sem estar encapsulado ou  lógica exterior (campo com mascara, valores de data e validação, etc.).

{{"demo": "pages/components/time-picker/SubComponentsTimePickers.js"}}

## Segundos

O campo de segundos pode ser usado para seleção de um ponto de tempo exato.

{{"demo": "pages/components/time-picker/SecondsTimePicker.js"}}
