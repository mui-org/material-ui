---
title: Componente React Seletor de data e hora
components: DateTimePicker,DesktopDateTimePicker,MobileDateTimePicker,StaticDateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Seletor de data e hora

<p class="description">Seletor de data & hora combinados.</p>

Este componente combina os seletores de data & hora. Ele permite que o usuário selecione data e hora com o mesmo controle.

Note que este componente é cobinação dos componentes [DatePicker](/components/date-picker/) e[TimePicker](/components/time-picker/), então qualquer uma das propriedades desses componentes pode ser passada para o DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requisitos

Este componente depende da biblioteca de gerenciamento de datas da sua escolha. Ele suporta [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) e qualquer outra biblioteca através da interface publica `dateAdapter`.

Por favor, instale qualquer uma destas bibliotecas e configure corretamente o mecanismo de data encapsulando na raiz dos componentes (ou o nível mais alto que você deseja que os seletores estejam disponíveis) com `LocalizationProvider`:

```jsx
// ou @material-ui/lab/Adapter{Dayjs,Luxon,Moment} ou qualquer adaptador válido de date-io
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Utilização Básica

Permite escolher a data e hora. Existem 4 etapas disponíveis (ano, data, hora e minuto), então as abas são necessárias para distinguir visualmente os passos de data/hora.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Responsividade

O componente `DateTimePicker` é projetado e otimizado para o dispositivo em que ele é executado.

- The `MobileDateTimePicker` component works best for touch devices and small screens.
- The `DesktopDateTimePicker` component works best for mouse devices and large screens.

By default, the `DateTimePicker` component renders the desktop version if the media query [`@media (pointer: fine)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) matches. Isto pode ser customizado com a propriedade `desktopModeMediaQuery`.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Propriedades de formulário

The date time picker component can be disabled or read-only.

{{"demo": "pages/components/date-time-picker/FormPropsDateTimePickers.js"}}

## Validação de data e hora

É possível restringir a seleção de data e hora de duas maneiras:

- por meio de `minDateTime`/`maxDateTime` é possível restringir a seleção de tempo para antes ou após um determinado momento no tempo
- usando `minTime`/`maxTime`, você pode desabilitar selecionar horas antes ou depois de um certo tempo a cada dia, respectivamente

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## Modo estático

It's possible to render any date & time picker inline. Isto permitirá construir contêineres customizados de popover/modal.

{{"demo": "pages/components/date-time-picker/StaticDateTimePickerDemo.js", "bg": true}}

## Customização

Aqui estão alguns exemplos de seletores de data & hora fortemente customizados:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
