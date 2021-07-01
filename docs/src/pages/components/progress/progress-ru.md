---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'component: CircularProgress'
materialDesign: https://material.io/components/progress-indicators
---

# Прогресс

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

[Индикаторы прогресса](https://material.io/design/components/progress-indicators.html) информируют пользователей о состоянии текущих процессов, таких как загрузка приложения, отправка формы или сохранение обновлений.

- **Determinate** circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees.
- **Недетерминированные** индикаторы отображают неопределенное время ожидания.

**Детерменированные** индикаторы показывают, сколько времени займет операция.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Circular

### Circular indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular color

{{"demo": "pages/components/progress/CircularColor.js"}}

### Circular determinate

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Interactive integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular with label

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## Linear

### Linear indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear color

{{"demo": "pages/components/progress/LinearColor.js"}}

### Linear determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear with label

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## Non-standard ranges

Компоненты прогресса принимают значение в диапазоне от 0 до 100. Это упрощает работу с программами для чтения с экрана ("скринридеры"), где это минимальные и максимальные значения по умолчанию. Однако иногда вы можете работать с данными, значения которых выходят за пределы этого диапазона. Вот так можно легко преобразовать значение из любого диапазона в шкалу от 0 до 100:

```jsx
// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Customized progress

Ниже находятся примеры кастомизации компонента. Вы можете узнать об этом больше [в документации по переопределению свойств](/customization/how-to-customize/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Delaying appearance

There are [3 important limits](https://www.nngroup.com/articles/response-times-3-important-limits/) to know around response time. The ripple effect of the `ButtonBase` component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Ограничения

### High CPU load

Under heavy load, you might lose the stroke dash animation or see random CircularProgress ring widths. You should run processor intensive operations in a web worker or by batch in order not to block the main rendering thread.

![heavy load](/static/images/progress/heavy-load.gif)

When it's not possible, you can leverage the `disableShrink` property to mitigate the issue. See [this issue](https://github.com/mui-org/material-ui/issues/10327).

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}

### High frequency updates

The `LinearProgress` uses a transition on the CSS transform property to provide a smooth update between different values. The default transition duration is 200ms. In the event a parent component updates the `value` prop too quickly, you will at least experience a 200ms delay between the re-render and the progress bar fully updated.

If you need to perform 30 re-renders per second or more, we recommend disabling the transition:

```css
.MuiLinearProgress-bar {
  transition: none;
}
```

### IE 11

С анимацией компонента circular progress на IE 11 возникают проблемы. Анимация пунктирным контуром не работает (соответсвует `disableShrink`) и круговая анимация идет рывками. Последняя проблема может быть решена:

```css
.MuiCircularProgress-indeterminate {
  animation: circular-rotate 1.4s linear infinite;
}

@keyframes circular-rotate {
  0% {
    transform: rotate(0deg);
    /* Fix IE11 wobbly */
    transform-origin: 50% 50%;
  }
  100% {
    transform: rotate(360deg);
  }
}
```
