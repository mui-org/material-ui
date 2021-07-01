# Переходы

<p class="description">Ключ темы, позволяющий настроить длительность и плавность переходов, используемых в компонентах material-ui, предлагающий утилиту для создания пользовательских переходов.</p>

## API

### `theme.transitions.create(props, options) => transition`

#### Аргументы

1. `props` (_string_ | _string[]_): Defaults to `['all']`. Содержит свойство или список CSS свойств, для которых должен быть задан переход.
2. `options` (_object_ [optional]):

- `options.duration` (_string_ | _number_ [optional]): Defaults to `theme.transitions.duration.standard`. Содержит длительность перехода
- `options.easing` (_string_ [optional]): По умолчанию `theme.transitions.easing.easeInOut`. Содержит плавность перехода
- `options.delay` (_string_ | _number_ [optional]): Defaults to `0`. Содержит отсрочку начала перехода

#### Возвращает

`transition`: Значение CSS перехода, объединяющее CSS свойства,, для которых должен быть выполнен переход, с определенной длительностью, плавностью и отсрочкой.

Используйте помощник <code>theme.transitions.create()</code> для создания последовательных переходов элементов интерфейса</p>

```js
theme.transitions.create(['background-color', 'transform']);
```

#### Пример

{{"demo": "pages/customization/transitions/TransitionHover.js", "defaultCodeOpen": false}}

### `theme.transitions.getAutoHeightDuration(height) => duration`

#### Аргументы

1. `height` (_number_): The height of the component.

#### Возвращает

`duration`: Длительность, высчитанная на основании высоты

## Durations

Вы можете изменить одно или несколько предопределенных значений duration или же добавить свое собственное (для использования в помощнике  `create()`) В примере ниже показаны все значения по умолчанию, но все что вам нужно это указать значения для ключей, которые вы хотите добавить или изменить.

```js
const theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
});
```

## Плавность

Вы можете изменить одно или несколько предопределенных значений плавности, либо же добавить свои собственные, указав значение пользовательской CSS функции <code>длительностей перехода</code> .

```js
const theme = createTheme({
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Объекты появляются на полной скорости из-за пределов экрана и постепенно замедляются при приближении к локации.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Объекты покидают экран на полной скорости без всякого замедления у края экрана.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // Резкий переход используется для объектов, которые могут появиться на экране в любое время
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});
```

## Ссылки

Посетите страницу [Transitions](/components/transitions/) чтобы изучить компоненты перехода, используемые в Material-ui
