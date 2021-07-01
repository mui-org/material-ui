---
title: React Stepper Komponente
components: MobileStepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Stepper
githubLabel: 'component: Stepper'
materialDesign: https://material.io/archive/guidelines/components/steppers.html
---

# Stepper

<p class="description">Steppers convey progress through numbered steps. It provides a wizard-like workflow.</p>

[Stepper](https://material.io/archive/guidelines/components/steppers.html) zeigen den Fortschritt durch eine Folge logischer und nummerierter Schritte an. Sie können auch zur Navigation verwendet werden. Steppers können eine vorübergehende Rückmeldung anzeigen, nachdem ein Schritt gespeichert wurde.

- **Arten von Schritten**: Bearbeitbar, Nicht editierbar, Mobil, Optional
- **Types of Steppers**: Horizontal, Vertical, Linear, Non-linear

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Note:** Steppers are no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support them.

## Horizontal Stepper

Horizontal steppers are ideal when the contents of one step depend on an earlier step.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js", "bg": true}}

### Linear

A linear stepper allows the user to complete the steps in sequence.

Der `Stepper` kann gesteuert werden, indem der aktuelle Schrittindex (auf Null basierend) als `activeStep` Eigenschaft übergeben wird. Die `Stepper` Ausrichtung wird mithilfe der Eigenschaft `orientation` gesetzt.

Dieses Beispiel zeigt auch die Verwendung eines optionalen Schritt durch setzten der `optional` Eigenschaft auf der zweiten `Step` Komponente. Beachten Sie, dass Sie selbst entscheiden müssen, wann ein optionaler Schritt übersprungen wird. Wenn Sie dies für einen bestimmten Schritt festgelegt haben, müssen Sie `complete={false}` setzten, um anzuzeigen, dass der Index des aktiven Schritts den optionalen Schritt überschritten hat, jedoch nicht wirklich abgeschlossen ist.

{{"demo": "pages/components/steppers/HorizontalLinearStepper.js"}}

### Nicht linear

Mit nichtlinearen Steppern können Benutzer an jedem Punkt einen mehrstufigen Fluss einsteigen.

Dieses Beispiel ähnelt dem regulären horizontalen Stepper, mit der Ausnahme, dass Schritte nicht mehr automatisch auf `disabled={true}` basierend auf der Eigenschaft `activeStep` gesetzt werden.

The use of the `StepButton` here demonstrates clickable step labels, as well as setting the `completed` flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).

{{"demo": "pages/components/steppers/HorizontalNonLinearStepper.js"}}

### Anpasster Stepper

Labels can be placed below the step icon by setting the `alternativeLabel` prop on the `Stepper` component.

{{"demo": "pages/components/steppers/HorizontalLinearAlternativeLabelStepper.js"}}

### Nicht linear

{{"demo": "pages/components/steppers/HorizontalStepperWithError.js"}}

### Non-linear - Alternative Label

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/steppers/CustomizedSteppers.js"}}

## Vertikaler Stepper

Vertical steppers are designed for narrow screen sizes. They are ideal for mobile. All the features of the horizontal stepper can be implemented.

{{"demo": "pages/components/steppers/VerticalLinearStepper.js"}}

### Perfomance

The content of a step is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to keep the step mounted with:

```jsx
<StepContent TransitionProps={{ unmountOnExit: false }} />
```

## Mobile Stepper

Diese Komponente implementiert einen kompakten Stepper, der für ein mobiles Gerät geeignet ist. It has more limited functionality than the vertical stepper. Siehe [Mobile steps](https://material.io/archive/guidelines/components/steppers.html#steppers-types-of-steps) zur Inspiration.

The mobile stepper supports three variants to display progress through the available steps: text, dots, and progress.

### Text

Verwenden Sie Punkte, wenn die Anzahl der Schritte nicht groß ist.

{{"demo": "pages/components/steppers/TextMobileStepper.js", "bg": true}}

### Text mit Karussel-Effekt:

Verwenden Sie eine Fortschrittsleiste, wenn viele Schritte vorhanden sind oder wenn Schritte eingefügt werden müssen (basierend auf den Antworten auf frühere Schritte).

{{"demo": "pages/components/steppers/SwipeableTextMobileStepper.js", "bg": true}}

### Dots

Use dots when the number of steps is small.

{{"demo": "pages/components/steppers/DotsMobileStepper.js", "bg": true}}

### Fortschritt (Progress)

Verwenden Sie eine Fortschrittsleiste, wenn viele Schritte vorhanden sind oder wenn Schritte eingefügt werden müssen (basierend auf den Antworten auf frühere Schritte).

{{"demo": "pages/components/steppers/ProgressMobileStepper.js", "bg": true}}
