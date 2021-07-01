---
title: Componente React Seletor de data
components: CalendarPicker, CalendarPickerSkeleton, DatePicker, DesktopDatePicker, MobileDatePicker, MonthPicker, PickersDay, StaticDatePicker, YearPicker
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de data

<p class="description">Seletores de data permitem que o usuário selecione uma data.</p>

Seletores de data permitem que o usuário selecione uma data. Seletores de data permitem que o usuário selecione uma data.

- Diálogos em dispositivos móveis
- Menu suspenso com campo de texto em desktop

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

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Modo estático

It's possible to render any date picker without the modal/popover and text field. Isso pode ser útil na construção de containers customizados de popover/modal.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Responsividade

O componente seletor de data é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileDatePicker` component works best for touch devices and small screens.
- The `DesktopDatePicker` component works best for mouse devices and large screens.

By default, the `DatePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Propriedades de formulário

The date picker component can be disabled or read-only.

{{"demo": "pages/components/date-picker/FormPropsDatePickers.js"}}

## Localização

Use `LocalizationProvider` para alterar a date-engine de localização que é usada para renderizar o seletor de data. Aqui esta um exemplo de alteração da localidade com o adaptador `date-fns`:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Jalali calendar system

Install `date-fns-jalali` and use `@date-io/date-fns-jalali` adapter to support [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar).

{{"demo": "pages/components/date-picker/JalaliDatePicker.js"}}

## Exemplos de exibições

É possível combinar `year`, `month`, e `date` para seleção na exibição. As exibições aparecerão na ordem em que estão incluídas no array `views`.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## Orientação paisagem

For ease of use, the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. Você pode forçar um leiaute específico usando a propriedade `orientation`.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Subcomponentes

Some lower-level sub-components (`CalendarPicker`, `MonthPicker`, and `YearPicker`) are also exported. Estes são renderizados sem estar encapsulado ou  lógica exterior (campo com mascara, valores de data e validação, etc.).

{{"demo": "pages/components/date-picker/SubComponentsPickers.js"}}

## Componente de entrada customizado

You can customize the rendering of the input with the `renderInput` prop. Certifique-se de encaminhar `ref` e `inputProps` corretamente para o componente de entrada customizado.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Renderização customizada do dia

Os dias exibidos são customizados com uma função na propriedade `renderDay`. You can take advantage of the [PickersDay](/api/pickers-day/) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Dados dinâmicos

Às vezes, pode ser necessário exibir informação adicional diretamente no calendário. Aqui está um exemplo de pré-busca e exibição de dados do servidor usando as propriedades `onMonthChange`, `loading`, e `renderDay`.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
