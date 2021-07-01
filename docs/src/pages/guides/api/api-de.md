# API-Design-Ansatz

<p class="description">Wir haben viel über die Verwendung von Material-UI gelernt, und durch das Umschreiben von Version 1 konnten wir die Komponenten-API vollständig überdenken.</p>

> Das API-Design ist schwierig, weil man es einfach erscheinen lassen kann, aber es ist tatsächlich täuschend komplex ist, oder man macht die API einfach, aber die Umsetzung komplex.

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

Wie Sebastian Markbage [sagt](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html): Keine Abstraktion ist falschen Abstraktionen überlegen. Wir bieten Komponenten auf niedriger Ebene an, um die Kompositionsfähigkeiten zu maximieren.

## Komposition

Möglicherweise haben Sie bei der Erstellung von Komponenten Inkonsistenzen in der API festgestellt. Um für mehr Transparenz zu sorgen, haben wir beim Entwurf der API die folgenden Regeln verwendet:

1. Verwenden der `children` Eigenschaft ist der idiomatische Weg, um mit React zu komponieren.
2. Manchmal benötigen wir nur eine eingeschränkte Zusammensetzung von Kidnern, zum Beispiel, wenn wir keine Permutationen für untergeordnete Elemente zulassen müssen. In diesem Fall macht die Angabe expliziter Eigenschaften die Implementierung einfacher und performanter. Zum Beispiel nimmt ein `Tab` ein `icon` und `label` als Eigenschaft an.
3. Die API-Konsistenz ist wichtig.

## Regeln

Abgesehen von den oben genannten Kompensationsregeln setzen wir die folgenden Regeln durch:

### Verteilt

Props supplied to a component which are not explicitly documented are spread to the root element; for instance, the `className` prop is applied to the root.

Angenommen, Sie möchten die Wellen im `Menüelement` deaktivieren. Sie können das Ausbreitungsverhalten nutzen:

```jsx
<MenuItem disableRipple />
```

Die Eigenschaft `disableRipple` wird folgendermaßen weitergegeben: [`MenuItem`](/api/menu-item/) > [`ListItem`](/api/list-item/) > [`ButtonBase`](/api/button-base/).

### Native Eigenschaften

Wir vermeiden, die vom DOM unterstützten nativen Eigenschaften wie [`className`](/customization/components/#overriding-styles-with-class-names) zu dokumentieren.

### CSS-Klassen

All components accept a [`classes`](/customization/how-to-customize/#overriding-styles-with-classes) prop to customize the styles. The classes design answers two constraints: to make the classes structure as simple as possible, while sufficient to implement the Material Design guidelines.

- Die auf das Wurzelelement angewendete Klasse wird immer als `root` bezeichnet.
- Alle Standardstile sind in einer einzigen Klasse zusammengefasst.
- Die auf Nicht-Root-Elemente angewendeten Klassen wird der Name des Elements vorangestellt, z. B. `paperWidthXs` in der Dialogkomponente.
- Die von einer booleschen Eigenschaft angewendeten Varianten sind **nicht** vorangestellt, zB die `rounded` Klasse wird durch die `rounded` Eigenschaft angewendet.
- Die von einer Enumeneigenschaft angewendeten Varianten **sind** vorangestellt, z. B. die `colorPrimary` Klasse wird von der Farbe `color= "primary"` Eigenschaft angewendet.
- Eine Variante hat **eine Spezifitätsebene**. Die `color` und `variant` Eigenscahft werden als Variant betrachtet. Je geringer die Stilspezifität ist, desto einfacher ist es, sie zu überschreiben.
- Wir erhöhen die Spezifität für einen Variantenmodifikator. Wir erhöhen die Spezifität für einen Variantenmodifikator. Es ermöglicht viel mehr Kontrolle auf Kosten von mehr Boilerplate. Hoffentlich ist es auch intuitiver.

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### Verschachtelte Komponenten

Verschachtelte Komponenten in einer Komponente haben:

- their own flattened properties when these are key to the top level component abstraction, for instance an `id` prop for the `Input` component.
- ihre eigenen `xxxProps` Eigenschaft, falls Benutzer möglicherweise die Unterkomponenten der internen Render-Methode anpassen müssen, z. B. die `inputProps` und `InputProps` Eigenschaften für Komponenten, die `Input` intern verwenden.
- ihre eigene `xxxComponent` Eigenschaft zum Durchführen der Komponenteninjektion.
- Siehe auch [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements). Dies hilft bei der Beantwortung der Frage ["Wie kann ich auf das DOM-Element zugreifen?"](/getting-started/faq/#how-can-i-access-the-dom-element)

### Benennung der Eigenschaften

Der Name einer booleschen Eigenschaft sollte basierend auf dem **Standardwert** ausgewählt werden. Zum Beispiel ist das `disabled` Attribut für ein Eingabeelement, sofern angegeben, standardmäßig auf `true` gesetzt. Diese Wahl erlaubt die Kurzschreibweise:

```diff
-<Input enabled={false} />
+<Input disabled />
```

### Kontrollierte Komponenten

Der überwiegende Teil der kontrollierten Komponente wird über die `value` und `onChange` Eigenschaften gesteuert, jedoch werden die `open` / `onClose` / `onOpen` Kombination wird für den Anzeigezustand verwendet. In the cases where there are more events, we put the noun first, and then the verb, for example: `onPageChange`, `onRowsChange`.

### boolean vs. enum

Es gibt zwei Möglichkeiten, die API für die Variationen einer Komponente zu entwerfen: mit einem * Booleschen Wert*; oder mit einer *Aufzählung (enum)*. Nehmen wir zum Beispiel einen Button, die verschiedene Typen hat. Jede Option hat ihre Vor- und Nachteile:

- Option 1 *boolean*:

  ```tsx
  type Props = {
    contained: boolean;
    fab: boolean;
    };
  ```

  This API enables the shorthand notation: `<Button>`, `<Button contained />`, `<Button fab />`.

- Option 2 *enum*:

  ```tsx
  type Props = {
      variant: 'text' | 'contained' | 'fab';
    }
  ```

  Diese API ist ausführlicher: `<Button>`, `<Button variant="contained">`, `<Button variant="fab">`.

  However, it prevents an invalid combination from being used, bounds the number of props exposed, and can easily support new values in the future.

Die Komponenten der Material-UI verwenden eine Kombination der beiden Ansätze gemäß den folgenden Regeln:

- A *boolean* is used when **2** possible values are required.
- An *enum* is used when **> 2** possible values are required, or if there is the possibility that additional possible values may be required in the future.

Going back to the previous button example; since it requires 3 possible values, we use an *enum*.

### Ref

Das `ref` Element wird an das Wurzelelement weitergeleitet. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element which the component renders. If you pass a different component via the `component` prop, the ref will be attached to that component instead.

## Glossar

- **host component**: ein DOM-Knotentype im Kontext von `react-dom`, z.B. ein `'div'`. Siehe auch [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: in DOM-Knoten im Kontext von `react-dom` z.B. eine Instanz von `window.HTMLDivElement`.
- **outermost**: Die erste Komponente, wenn der Komponentenbaum von oben nach unten gelesen wird, dh die Breitensuche.
- ** Wurzelkomponente**: Die äußerste Komponente, die eine Hostkomponente darstellt.
- ** Wurzelelement**: Das äußerste Element, das eine Hostkomponente darstellt.
