---
title: React Accordion Komponente
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion (Akkordeon)

<p class="description">Erweiterungspanels (Tafeln) enthalten Erstellungsabläufe und ermöglichen die einfache Bearbeitung eines Elements.</p>

[Ein Erweiterungspanel](https://material.io/archive/guidelines/components/expansion-panels.html) ist ein leichter container, der entweder alleinstehend verwendet werden kann oder mit einer größeren Oberfläche verbunden ist, beispielsweise einer Karte.

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **Hinweis:** Diese Komponente ist zwar nicht mehr in den [Material-Design-Richtlinien](https://material.io/) dokumentiert, wird aber weiterhin von Material-UI unterstützt. Es war früher als  "Erweiterungspanel" bekannt.

## Einfaches Erweiterungspanel

{{"demo": "pages/components/accordion/BasicAccordion.js", "bg": true}}

## Kontrolliertes Akkordeon

Erweitern Sie das Standardbedienfeldverhalten, um ein Akkordeon mit der Komponente `Accordion` zu erstellen.

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## Individuelles Erweiterungspanel

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/how-to-customize/).

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## Performance

Der Inhalt von Accordions wird standardmäßig bereitgestellt, auch wenn das Panel nicht erweitert wird. Bei diesem Standardverhalten werden serverseitiges Rendering und SEO berücksichtigt. If you render expensive component trees inside your panels or simply render many panels it might be a good idea to change this default behavior by enabling the `unmountOnExit` in `TransitionProps`:

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

Wie bei jeder Leistungsoptimierung ist dies keine Silberkugel. Stellen Sie sicher, dass Sie zuerst Engpässe erkennen und anschließend diese Optimierungsstrategien ausprobieren.

## Barrierefreiheit

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

Für eine optimale Erreichbarkeit empfehlen wir die Einstellung `id` und `aria-controls` in der `AccordionSummary`. Das `Accordion` leitet die notwendigen `aria-labelledby` und `id` für den Inhaltsbereich des Panels ab.
