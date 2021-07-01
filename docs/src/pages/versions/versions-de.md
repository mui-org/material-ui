# Material-UI-Versionen

<p class="description">Sie können jederzeit zu dieser Seite zurückkehren und die Version der Dokumente, die Sie gerade lesen, wechseln.</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Neueste Versionen

Hier finden Sie die neuesten unveröffentlichten Dokumentationen und Codes. Sie können damit feststellen, welche Änderungen bevorstehen, und den Mitwirkenden der Material-UI besseres Feedback geben.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Versionierungsstrategie

Stabilität stellt sicher, dass wiederverwendbare Komponenten und Bibliotheken, Lernprogramme, Tools und erlernte Methoden nicht unerwartet veraltet werden. Stabilität ist wichtig für das Gedeihen des Ökosystems um Material-UI.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Die Versionsnummer wird basierend auf dem in der Version enthaltenen Änderungsstand erhöht. Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Die Versionsnummern der Material-UI bestehen aus drei Teilen: `Hauptversion.Nebenversion.Patch`.

- **Hauptversionen** enthalten wichtige neue Funktionen, während des Updates wird jedoch eine minimale Entwicklerunterstützung erwartet. Bei der Aktualisierung auf eine neue Hauptversion müssen Sie möglicherweise Aktualisierungsskripts ausführen, Code umgestalten, zusätzliche Tests ausführen und neue APIs erlernen.
- ** Nebenversionen ** enthalten wichtige neue Funktionen. Während des Updates wird keine Entwicklerunterstützung erwartet.
- ** Patch-Versionen ** sind geringes Risiko, enthalten Fehlerbehebungen und kleine neue Funktionen. Während des Updates wird keine Entwicklerunterstützung erwartet.

## Release-Frequenz

Ein regelmäßiger Release-Zeitplan hilft Ihnen, Ihre Updates mit der Weiterentwicklung von Material-UI zu planen und zu koordinieren.

Im Allgemeinen können Sie den folgenden Release-Zyklus erwarten:

- Ein Veröffentlichung einer **Hauptversion ** alle 12 Monate.
- 1-3 Veröffentlichungen von ** Nebenversionen** für jede Hauptversion.
- Ein ** Patch ** Veröffentlichung jede Woche (jederzeit für dringende Bugfixes).

## Release Zeitplan

| Datum             | Version     | Status         |
|:----------------- |:----------- |:-------------- |
| Mai 2018          | V1.0.0      | Veröffentlicht |
| September 2018    | v3.0.0      | Veröffentlicht |
| Mai 2019          | v4.0.0      | Veröffentlicht |
| 01. Juli 2021     | v5.0.beta.0 | In Bearbeitung |
| 1. September 2021 | v5.0.0      | ⏳              |

You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## Support-Richtlinie

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Verfallspraktiken

Manchmal sind **"breaking changes"** wie das Entfernen der Unterstützung für ausgewählte APIs und Features erforderlich.

Um diese Übergänge so einfach wie möglich zu machen:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.
