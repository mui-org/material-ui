---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'component: CircularProgress'
materialDesign: https://material.io/components/progress-indicators
---

# Fortschritt (Progress)

<p class="description">Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.</p>

[Fortschrittsanzeigen](https://material.io/design/components/progress-indicators.html) informieren Benutzer über den Status laufender Prozesse, z. B. Laden einer App, Senden eines Formulars oder Speichern von Updates.

- **Bestimmte** zirkuläre Fortschritte füllen die unsichtbare, kreisförmige Spur mit Farbe, wenn sich der Indikator von 0 bis 360 Grad bewegt.
- **Unbestimmt** Indikatoren visualisieren eine nicht angegebene Wartezeit.

**Bestimmte** Indikatoren zeigen an, wie lange eine Operation dauert.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Kreisförmig

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

## Nicht-standardmäßige Bereiche

Die Fortschrittskomponenten akzeptieren einen Wert im Bereich von 0 - 100. Dies vereinfacht die Benutzer von Bildschirmleseprogrammen, wenn dies die voreingestellten Min / Max-Werte sind. Manchmal arbeiten Sie jedoch mit einer Datenquelle, bei der die Werte außerhalb dieses Bereichs liegen. So können Sie einen Wert in einem beliebigen Bereich auf eine Skala von 0 - 100 leicht umwandeln:

```jsx
// MIN = Minimaler erwarteter Wert
// MAX = Maximaler erwarteter Wert
// Funktion zur Normalisierung der Werte (MIN / MAX kann integriert werden)
const normalize = Wert => (Wert - MIN) * 100 / (MAX - MIN.));

// Beispielkomponente, die an der Stelle des Renderns die Funktion "normalise" verwendet.
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

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## Erscheinung verzögern

Es gibt [3 wichtige Grenzwerte](https://www.nngroup.com/articles/response-times-3-important-limits/), um die Reaktionszeit zu kennen. Der Ripple Effekt der `ButtonBase` Komponente stellt sicher, dass der Benutzer das Gefühl hat, dass das System sofort reagiert. Normalerweise ist keine spezielle Rückmeldung bei Verzögerungen von mehr als 0,1 Sekunden und weniger als 1,0 Sekunden erforderlich. Nach 1,0 Sekund können Sie einen Fortschritt anzeigen, um den Gedankenfluss des Benutzers nicht zu unterbrechen.

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## Einschränkungen

### High CPU load

Bei starker Belastung verlieren Sie möglicherweise die Strich-Animation oder sehen zufällige CircularProgress-Ringbreiten. Sie sollten prozessorintensive Vorgänge in einem Web-Worker oder in Batches ausführen, um den Haupt-Rendering-Thread nicht zu blockieren.

![schwere Last](/static/images/progress/heavy-load.gif)

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
