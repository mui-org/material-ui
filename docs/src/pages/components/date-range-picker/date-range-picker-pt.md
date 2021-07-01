---
title: Componente React Seletor intervalo de data
components: DateRangePicker, DateRangePickerDay, DesktopDateRangePicker, MobileDateRangePicker, StaticDateRangePicker
githubLabel: 'component: DateRangePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de intervalo de data [<span role="img" title="Enterprise">⚡️</span>](https://material-ui.com/store/items/material-ui-pro/)

<p class="description">Seletores de data permitem ao usuário selecionar um intervalo de datas.</p>

> ⚠️ Pro component <br /><br /> The date range picker is intended for Material-UI X Pro, a commercial set of advanced components built on top of the community edition (MIT license). <br /><br /> Esta extensão paga incluirá mais componentes avançados (um data grid rico, seletor de intervalo de data, arrastar  & soltar na visualização em árvore, etc.). [Acesso antecipado](https://material-ui.com/store/items/material-ui-pro/) começa com um preço acessível.

Os seletores de intervalo de datas permitem que o usuário selecione um intervalo de datas.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// ou @material-ui/lab/dateAdapter/{dayjs,luxon,moment} ou qualquer adaptador válido de date-io
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

Note que você pode passar quase qualquer propriedade de [DatePicker](/api/date-picker/).

{{"demo": "pages/components/date-range-picker/BasicDateRangePicker.js"}}

## Modo estático

É possível renderizar qualquer seletor em linha. Isto permitirá construir contêineres customizados de popover/modal.

{{"demo": "pages/components/date-range-picker/StaticDateRangePickerDemo.js", "bg": true}}

## Responsividade

O componente de seletor de intervalo de data é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileDateRangePicker` component works best for touch devices and small screens.
- The `DesktopDateRangePicker` component works best for mouse devices and large screens.

By default, the `DateRangePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-range-picker/ResponsiveDateRangePicker.js"}}

## Propriedades de formulário

The date range picker component can be disabled or read-only.

{{"demo": "pages/components/date-range-picker/FormPropsDateRangePickers.js"}}

## Número diferente de meses

Observe que a propriedade `calendars` só funciona no modo desktop.

{{"demo": "pages/components/date-range-picker/CalendarsDateRangePicker.js"}}

## Desabilitando datas

Desabilitar datas se comporta da mesma forma que `DatePicker`.

{{"demo": "pages/components/date-range-picker/MinMaxDateRangePicker.js"}}

## Componente de entrada customizado

É possível customizar o componente de entrada renderizado com a propriedade `renderInput`. Para o `DateRangePicker` ele recebe **2** parâmetros– para o campo inicial e final, respectivamente. Se você precisar renderizar campos de entrada customizados, certifique-se de encaminhar `ref` e `inputProps` corretamente para os componentes de entrada.

{{"demo": "pages/components/date-range-picker/CustomDateRangeInputs.js"}}

## Renderização customizada do dia

Os dias exibidos são customizados com uma função na propriedade `renderDay`. You can take advantage of the internal [DateRangePickerDay](/api/date-range-picker-day/) component.

{{"demo": "pages/components/date-range-picker/CustomDateRangePickerDay.js"}}
