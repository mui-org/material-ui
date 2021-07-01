---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'component: CircularProgress'
materialDesign: https://material.io/components/progress-indicators
---

# Progreso

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

Los [indicadores de progreso](https://material.io/design/components/progress-indicators.html) informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones.

- Los indicadores circulares **determinados** llenan la trayectoria invisible circular con color, a medida que el indicador se mueve desde los 0 a los 360 grados.
- Los indicadores **indeterminados** visualizan un tiempo de espera no determinado.

Los indicadores **determinados** muestran cuánto durará una operación.

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

## Lineal

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

## Rangos no estándar

Los componentes de progreso aceptan un valor en el rango 0 - 100. Esto simplifica las cosas para los usuarios lectores de la pantalla, donde estos son los valores mínimos / máximos por defecto. Sin embargo, algunas veces puedes estar trabajando con fuentes de datos donde los valores están fuera de este rango. Aquí mostramos como puede transformar fácilmente un valor en cualquier rango a una escala de 0 - 100:

```jsx
// MIN = valor mínimo esperado
// MAX = valor máximo esperado
// Función para normalizar los valores (MIN / MAX podrían estar integrados)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// Componente ejemplo que utiliza la función `normalise` en el punto de dibujo.
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

Here are some examples of customizing the component. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/how-to-customize/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Demorando la aparición

Hay [3 límites importantes](https://www.nngroup.com/articles/response-times-3-important-limits/) que conocer acerca del tiempo de respuesta. El efecto dominó del componente `ButtonBase` garantiza que el usuario sienta que el sistema está reaccionando instantáneamente. Normalmente, no se necesita una retroalimentación especial durante retrasos entre 0.1 y 1.0 segundo. Después de 1.0 segundo, puede desplegar un cargador para mantener el flujo de pensamiento del usuario sin interrupciones.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Limitaciones

### High CPU load

Bajo cargas pesadas, puede perder la animación del trazo o ver anchos de anillos aleatorios de CircularProgress. Debería ejecutar operaciones de procesamiento intensivas en un trabajador web o por lotes para no bloquear el hilo de dibujo (render).

![carga pesada](/static/images/progress/heavy-load.gif)

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

The circular progress component animation on IE 11 is degraded. The stroke dash animation is not working (equivalent to `disableShrink`) and the circular animation wobbles. You can solve the latter with:

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
