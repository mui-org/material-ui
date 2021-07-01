# Häufige Fragen

<p class="description">Festgefahren bei einem bestimmten Problem? Check some of these common gotchas first in the FAQ.</p>

If you still can't find what you're looking for, you can refer to our [support page](/getting-started/support/).

## Material-UI ist großartig. Wie kann ich das Projekt unterstützen?

Es gibt viele Möglichkeiten, die Material-UI zu unterstützen:

- **Verbreiten Sie Material-Ui**. Evangelize Material-UI by [linking to material-ui.com](https://material-ui.com/) on your website, every backlink matters. Follow us on [Twitter](https://twitter.com/MaterialUI), like and retweet the important news. Or just talk about us with your friends.
- **Give us feedback**. Tell us what we're doing well or where we can improve. Please upvote (👍) the issues that you are the most interested in seeing solved.
- **Help new users**. You can answer questions on [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui).
- **Make changes happen**.
  - Edit the documentation. Every page has an "EDIT THIS PAGE" link in the top right.
  - Report bugs or missing features by [creating an issue](https://github.com/mui-org/material-ui/issues/new).
  - Review and comment on existing [pull requests](https://github.com/mui-org/material-ui/pulls) and [issues](https://github.com/mui-org/material-ui/issues).
  - Help [translate](https://translate.material-ui.com) the documentation.
  - [Improve our documentation](https://github.com/mui-org/material-ui/tree/master/docs), fix bugs, or add features by [submitting a pull request](https://github.com/mui-org/material-ui/pulls).
- **Support us financially on [OpenCollective](https://opencollective.com/material-ui)**. If you use Material-UI in a commercial project and would like to support its continued development by becoming a Sponsor, or in a side or hobby project and would like to become a Backer, you can do so through OpenCollective. All funds donated are managed transparently, and Sponsors receive recognition in the README and on the Material-UI home page.

## Warum werden meine Komponenten in Produktions-Builds nicht richtig gerendert?

Sie sollten jedoch nicht eine `createGenerateClassName()` Funktion zwischen verschiedenen Anfragen teilen: Sie müssen für jede Anforderung einen neuen Klassennamengenerator bereitstellen.

To correct this issue, all components on the page need to be initialized such that there is only ever **one class name generator** among them.

In einer Reihe von Szenarien könnten Sie versehentlich zwei Klassennamengeneratoren verwenden:

- Sie **bündeln**versehentlich zwei Versionen von Material-UI. Möglicherweise hat eine Abhängigkeit die Material-UI nicht korrekt als Peer-Abhängigkeit.
- You are using `StylesProvider` for a **subset** of your React tree.
- Sie verwenden einen Bundler und der Code wird so aufgeteilt, dass mehrere Klassennamengenerator-Instanzen erstellt werden.

> Wenn Sie Webpack mit dem [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) verwenden, versuchen Sie, den [`RuntimeChunk` Einstellung unter `Optimierungen`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) zu konfigurieren.

Overall, it's simple to recover from this problem by wrapping each Material-UI application with [`StylesProvider`](/styles/api/#stylesprovider) components at the top of their component trees **and using a single class name generator shared among them**.

## Warum bewegen sich die fest positionierten Elemente, wenn ein Modal geöffnet wird?

Scrolling is blocked as soon as a modal is opened. This prevents interacting with the background when the modal should be the only interactive content. However, removing the scrollbar can make your **fixed positioned elements** move. In dieser Situation können Sie einen globalen `.mui-fixed` Klassennamen anwenden, damit Material-UI mit diesen Elementen umgehen kann.

## Wie kann ich den Ripple-Effekt global deaktivieren?

Der Ripple-Effekt kommt ausschließlich von der `BaseButton` Komponente. Sie können den Ripple-Effekt global deaktivieren, indem Sie in Ihrem Theme folgendes angeben:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
  },
});
```

## Wie kann ich Übergänge global deaktivieren?

Material-UI uses the same theme helper for creating all its transitions. Therefore you can disable all transitions by overriding the helper in your theme:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});
```

It can be useful to disable transitions during visual testing or to improve performance on low-end devices.

You can go one step further by disabling all transitions and animations effects:

```js
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
});
```

Notice that the usage of `CssBaseline` is required for the above approach to work. If you choose not to use it, you can still disable transitions and animations by including these CSS rules:

```css
*, *::before, *::after {
  transition: 'none !important';
  animation: 'none !important';
}
```

## Muss ich JSS verwenden, um meine App zu stylen?

No, it's not required. But this dependency comes built in, so carries no additional bundle size overhead.

Perhaps, however, you're adding some Material-UI components to an app that already uses another styling solution, or are already familiar with a different API, and don't want to learn a new one? In diesem Fall gehen Sie zum [Zusammenführen von Style Libraries](/guides/interoperability/) Abschnitt in dem wir zeigen, wie einfach es ist, Material-UI-Komponenten mit alternativen Stilbibliotheken umzustrukturieren.

## When should I use inline-style vs. CSS?

Verwenden Sie als Faustregel Inline-Style nur für dynamische Stileigenschaften. Die CSS-Alternative bietet weitere Vorteile, z.B.:

- Auto-Präfixe
- Besseres debuggen
- Medien-Anfragen
- Keyframes

## Wie verwende ich den react-router?

We detail the [integration with third-party routing libraries](/guides/routing/) like react-router, Gatsby or Next.js in our guide.

## Wie kann ich auf das DOM-Element zugreifen?

Alle Material-UI-Komponenten, die etwas im DOM darstellen sollen, leiten ihre an die zugrunde liegende DOM-Komponente weiter. Dies bedeutet, dass Sie die DOM-Elemente, indem Sie den ref lesen, der an die Komponenten der Material-UI angehängt ist:

```jsx
// oder eine Ref-Setter-Funktion
const ref = React.createRef ();
// Rendern
<0 />;
// Verwendung
const Element = ref.current;
```

If you're not sure if the Material-UI component in question forwards its ref you can check the API documentation under "Props" e.g. the [Button API](/api/button/#props) includes

> Der ref wird an das Wurzelelement weitergeleitet.

was anzeigt, dass Sie mit einem ref auf das DOM-Element zugreifen können.

## Ich habe mehrere Instanzen von Stilen auf der Seite

Wenn in der Konsole eine Warnmeldung wie die folgende angezeigt wird, haben Sie wahrscheinlich mehrere Instanzen von `@material-ui/styles` auf der Seite initialisiert.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names, specificity issues, and make your application bigger without a good reason.

### Mögliche Gründe

Dafür gibt es mehrere häufige Gründe:

- Sie haben eine andere `@material-ui/styles` Bibliothek irgendwo in Ihren Abhängigkeiten.
- One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file.
- Wenn Sie mehrere Anwendungen auf einer Seite ausführen, sollten Sie ein @material-ui/styles-Modul für alle verwenden.

### Dupliziertes Modul in node_modules

Sie können die `npm ls @material-ui/styles`, `yarn list @material-ui/styles` oder `find -L ./node_modules | grep /@material-ui/styles/package.json` Befehle in Ihrem Anwendungsordner ausführen. If you think that the issue may be in the duplication of the @material-ui/styles module somewhere in your dependencies, there are several ways to check this.

Wenn keiner dieser Befehle die Duplizierung identifiziert, analysieren Sie Ihr Bundle auf mehrere Instanzen von @material-ui/styles. Sie können einfach Ihre Bundle-Quelle überprüfen oder ein Tool wie [source-map-explorer verwenden](https://github.com/danvk/source-map-explorer) oder [Webpack-Bundle-Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

Wenn Sie festgestellt haben, dass Duplizierung das Problem ist, können sie mehrere Dinge ausprobieren, um dies zu lösen:

Wenn Sie npm verwenden, können Sie versuchen, `npm dedupe` auszuführen. Dieser Befehl durchsucht die lokalen Abhängigkeiten und versucht, die Struktur zu vereinfachen, indem allgemeine Abhängigkeiten weiter nach oben verschoben werden.

Wenn Sie das Webpack verwenden, können Sie die Art und Weise ändern, in der das @material-ui/styles Modul [aufgelöst wird](https://webpack.js.org/configuration/resolve/#resolve-modules). Sie können die Standardreihenfolge überschreiben, in der Webpack nach Abhängigkeiten sucht, und die Priorität Ihrer "node_modules" in Ihrer Anwendung gegenüber der Standardreihenfolge für die Auflösung von Knotenmodulen erhöhen:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Verwendung mit Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Versuchen Sie, die Bootstrap-Option mit dem Flag --hoist auszuführen.

```sh
lerna bootstrap --hoist
```

Alternativ können Sie @material-ui/styles aus Ihrer package.json-Datei entfernen und manuell in Ihre package.json-Datei an der obersten Ebene einfügen.

Beispiel für eine package.json-Datei in einem Lerna-Stammverzeichnis

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Mehrere Anwendungen auf einer Seite ausführen

Sie haben mehrere Anwendungen, die `@material-ui/styles` verwenden, und auf derselben Seite ausgeführt werden (z. Wenn Sie Webpack verwenden, können Sie das [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) verwenden. So erstellen Sie einen expliziten [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), das das Modul @ material-ui/styles enthält:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## Meine App wird auf dem Server nicht richtig dargestellt

Wenn dies nicht funktioniert, handelt es sich in 99% der Fälle um ein Konfigurationsproblem. A missing property, a wrong call order, or a missing component – server-side rendering is strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup.

The best way to find out what's wrong is to compare your project to an **already working setup**. Check out the [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS funktioniert nur beim ersten Laden, dann fehlt es

Das CSS wird nur beim ersten Laden der Seite generiert. Auf dem Server fehlt dann das CSS bei aufeinanderfolgende Anfragen.

#### Zu ergreifende Maßnahmen

The styling solution relies on a cache, the *sheets manager*, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). Sie müssen **eine neue `sheets`Instanze für jede Anfrage** erstellen.

beispiel für fix:

```diff
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Eine Sheet Instanz erstellen.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Eine Sheet Instanz erstellen.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Eine Sheet Instanz erstellen.

  // Rendern des Komponenten als String.
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(

  - // Eine Sheet Instanz erstellen.
```

### React Klassenname Hydratation Nichtübereinstimmung

> Warning: Prop className did not match.

Es gibt eine Nichtübereinstimmung der Klassennamen zwischen Client und Server. Es könnte für die erste Anfrage funktionieren. Ein anderes Symptom ist, dass sich das Styling zwischen dem Laden der ersten Seite und dem Herunterladen der Clientskripte ändert.

#### Zu ergreifende Maßnahmen

Der Klassennamenwert basiert auf dem Konzept des [Klassennamensgenerators](/styles/advanced/#class-names). Der Klassennamenwert basiert auf dem Konzept des [Klassennamensgenerators](/styles/advanced/#class-names). Dieser Generator muss sich auf dem Server und auf dem Client identisch verhalten. Zum Beispiel:

- Sie müssen für jede Anforderung einen neuen Klassennamengenerator bereitstellen. Sie sollten jedoch nicht eine `createGenerateClassName()` Funktion zwischen verschiedenen Anfragen teilen:

  beispiel für fix:

  ```diff
  - // Erstellen Sie einen neuen Klassennamengenerator.
  -const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Erstellt einen neuen Klassennamengenerator.
  -const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Erstellt einen neuen Klassennamengenerator.

    // Rendern des Komponenten als String.
    const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(
  const html = ReactDOMServer.renderToString(

  - // Eine Sheet Instanz erstellen.
  ```

- Sie müssen sicherstellen, dass auf Ihrem Client und Server die **exakt dieselbe Version** von Material-UI ausführen. Es kann vorkommen, dass eine Nichtübereinstimmung von selbst kleinerer Versionen zu Stilproblemen führen kann. Um die Versionsnummern zu überprüfen, führen Sie `npm list@material-ui/core` in der Umgebung aus, in der Sie Ihre Anwendung erstellen, und in Ihrer Implementierungsumgebung.

  Sie können die gleiche Version in verschiedenen Umgebungen festlegen, indem Sie in den Abhängigkeiten Ihrer package.json eine bestimmte MUI-Version angeben.

  _beispiel für fix (package.json):_

  ```diff
    "dependencies": {
    ...

-
  "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
    },
  ```

- Sie müssen sicherstellen, dass Server und Client denselben `process.env.NODE_ENV verwenden` Wert haben.

## Warum unterscheiden sich die Farben, die ich sehe, von denen, die ich hier sehe?

Die Dokumentationssite verwendet ein benutzerdefiniertes Theme. Daher unterscheidet sich die Farbpalette vom Standarddesign der Material-UI. Siehe [diese Seite](/customization/theming/), um Informationen zum Anpassen von Motiven zu erhalten.

## Warum erfordert Komponente X einen DOM-Knoten in einer Eigenschaft anstelle eines Ref-Objekts?

Komponenten wie das [Portal](/api/portal/#props) oder [Popper](/api/popper/#props) erfordern jeweils einen DOM-Knoten in der `container` oder `anchorEl` Eigenschaft. Es erscheint zweckmäßig, in diesen Eigenschaften einfach ein ref-Objekt zu übergeben und Material-UI auf den aktuellen Wert zugreifen zu lassen. Dies funktioniert in einem einfachen Szenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

wo `Portal` die Kinder nur dann in den Container einhängen würde, wenn `container.current` verfügbar ist. Hier ist eine naive Implementierung von Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

Mit diesem einfaches heuristischen `Portal` wird es nach dem Einhängen möglicherweise erneut gerendert, da die Refs vor der Ausführung von Effekten auf dem neuesten Stand sind. Nur weil ein Ref aktuell ist, bedeutet das nicht, dass er auf eine definierte Instanz verweist. Wenn der ref an eine ref-Weiterleitungskomponente angehängt ist, ist nicht klar, wann der DOM-Knoten verfügbar ist. This is especially apparent for React.lazy components in Suspense. Die obige Implementierung könnte auch keine Änderung im DOM-Knoten berücksichtigen. In the example above, the `Portal` would run an effect once, but might not re-render because `ref.current` is still `null`.

Aus diesem Grund benötigen wir eine Eigenschaft mit dem eigentlichen DOM-Knoten, damit React ermitteln kann, wann das `Portal` neu gerendert werden soll:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(
    (instance) => setContainer(instance),
    [setContainer],
  );

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```

## What's the clsx dependency for?

[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing `className` strings conditionally, out of an object with keys being the class strings, and values being booleans.

Instead of writing:

```jsx
// let disabled = false, selected = true;

return (
  <div
    className={`MuiButton-root ${disabled ? 'Mui-disabled' : ''} ${
      selected ? 'Mui-selected' : ''
    }`}
  />
);
```

you can do:

```jsx
import clsx from 'clsx';

return (
  <div
    className={clsx('MuiButton-root', {
      'Mui-disabled': disabled,
      'Mui-selected': selected,
    })}
  />
);
```
