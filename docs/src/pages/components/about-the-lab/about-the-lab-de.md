# Über das Labor

<p class="description">Dieses Paket enthält die Inkubator-Komponenten, die noch nicht bereit sind, in den Kern aufgenommen zu werden.</p>

Der Hauptunterschied zwischen dem Labor und dem Kern besteht darin, wie die Komponenten versioniert werden. Ein separates Labor-Paket erlaubt es uns, wenn es notwendig ist, nicht rückwärtskompatible Änderungen zu veröffentlichen, ohne die [langsamere Veröffentlichungsfrequenz](https://material-ui.com/versions/#release-frequency) des Kernpakets einzuschränken.

Während Entwickler die Komponenten verwenden, testen und Probleme melden, erfahren die Betreuer (Maintainer) mehr über Mängel der Komponenten: fehlende Features, Barrierefreiheit, Fehler, API-Design usw. Je älter und mehr verwendet eine Komponente ist, desto weniger wahrscheinlich ist es, dass neue Probleme gefunden werden und in der Folge, große Änderungen eingeführt werden müssen.

Damit eine Komponente zum Kern (Core) übergehen kann, werden folgende Kriterien berücksichtigt:

- Folgendes sollte **verwendet werden**. The Material-UI team uses Google Analytics in the documentation (among other metrics) to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet, or that there is low demand for it.
- Sie muss der **Codequalität** der Kernkomponenten entsprechen. It doesn't have to be perfect to be part of the core, but the component should be reliable enough that developers can depend on it.
  - Jede Komponente benötigt **Typdefinitionen**. Es ist derzeit nicht erforderlich, dass eine Test-Kompontente angegeben wird, aber sie muss angegeben werden, um in den Kern (Core) zu wechseln.
  - Erfordert eine gute **Testabdeckung**. Einige der Test-Komponenten haben derzeit keine umfassenden Tests.
- Kann es ein **ausschlaggebender Punkt** sein, um Benutzer zu einem Upgrade auf die neueste Hauptversion zu bewegen? Je weniger zersplittert die Gemeinschaft ist, desto besser.
- Es muss eine geringe Wahrscheinlichkeit für eine **einschneidende Änderung** in der kurzen/mittleren Zukunft bestehen. Zum Beispiel, wenn es eine neue Funktion benötigt, die wahrscheinlich eine einschneidende Änderung erfordert, ist es vielleicht besser, seine Aufnahme in den Kern zu verschieben.

## Installation

Installieren Sie das Paket innerhalb des Projektordners mit:

```sh
// mit npm
npm install @material-ui/lab

// mit yarn
yarn add @material-ui/lab
```

Das Labor hat eine Peer-Abhängigkeit von den Kernkomponenten. Wenn Sie in Ihrem Projekt noch keine Material-UI verwenden, können Sie es mit folgendem installieren:

```sh
// mit npm
npm install @material-ui/core

// mit yarn
yarn add @material-ui/core
```

## TypeScript

In order to benefit from the [CSS overrides](/customization/theme-components/#global-style-overrides) and [default prop customization](/customization/theme-components/#default-props) with the theme, TypeScript users need to import the following types. Internally, it uses [module augmentation](/guides/typescript/#customization-of-theme) to extend the default theme structure with the extension components available in the lab.

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
