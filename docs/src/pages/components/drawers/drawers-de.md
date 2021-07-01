---
title: React Drawer component
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Seitliches Menü (Drawer)

<p class="description">Navigationsfächer bieten Zugriff auf Ziele in Ihrer App. Seitenblätter sind Flächen, die zusätzlichen Inhalt enthalten, der am linken oder rechten Rand des Bildschirms verankert ist.</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) (or "sidebars") provide access to destinations and app functionality, such as switching accounts. Sie können entweder permanent auf dem Bildschirm angezeigt oder durch ein Navigationsmenüsymbol gesteuert werden.

[Die Seitenblätter](https://material.io/design/components/sheets-side.html) sind Zusatzflächen, die hauptsächlich auf Tablets und Desktops verwendet werden.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Temporäre Navigationsleisten

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key. It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

Sie können die Leiste mit der `SwipeableDrawer` Komponente einklappbar machen.

Diese Komponente ist mit einem 2-kB-gzipped -Overhead ausgestattet. Einige mobile Endgeräte können den Fingern bei 60 FPS nicht folgen. Sie können die Eigenschaft `disableBackdropTransition` als Hilfe verwenden, um dies zu verhindern.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

The following properties are used in this documentation website for optimal usability of the component:

- iOS is hosted on high-end devices. Die Leistung wird gut genug sein. The backdrop transition can be enabled without dropping frames.
- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### Swipeable edge

You can configure the `SwipeableDrawer` to have a visible edge when closed.

If you are on a desktop, you can toggle the drawer with the "OPEN" button. If you are on mobile, you can open the demo in CodeSandbox ("edit" icon) and swipe.

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### Keep mounted

To ensure a temporary drawer is not unmounted, specify the `ModalProps` prop like:

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

More details in the [Modal performance section](/components/modal/#performance).

## Responsive Navigationsleiste

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Andauernde Navigationsleiste

Andauernde Navigationsleisten können geöffnet oder geschlossen werden. Die Leiste befindet sich auf der gleichen Höhe wie der Inhalt. Sie ist standardmäßig geschlossen und wird durch Auswahl des Menüsymbols geöffnet und bleibt geöffnet, bis es vom Benutzer geschlossen wird. Der Status der Leiste wird von Aktion zu Aktion und von Sitzung zu Sitzung gespeichert.

Wenn sich die Leiste außerhalb des Seitenrasters befindet und geöffnet wird, zwingt die Schublade andere Inhalte, ihre Größe zu ändern und sich an den kleineren Ansichtsfenster anzupassen.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini-Variante Navigationsleiste

Bei dieser Variante ändert die andauernde Navigationsleiste ihre Breite. Ihr Ruhezustand ist eine MiniLeiste auf derselben Höhe wie der Inhalt, die von der App-Leiste abgeschnitten wird. Wenn sie erweitert wird, wird es als standardmäßige andauernde Navigationsleiste angezeigt.

Die Mini-Variante wird für Anwendungsbereiche empfohlen, die neben Inhalten einen schnellen Auswahlzugriff benötigen.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Permanente Navigationsleiste

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. Sie können nicht geschlossen werden.

Apps, welche sich auf den Informationsverbrauch konzentrieren, verwenden eine Links-Rechts-Hierarchie.

### Navigation in voller Höhe

Apps, welche sich auf den Informationsverbrauch konzentrieren, verwenden eine Links-Rechts-Hierarchie.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Unter der App-Leiste geschnitten

Apps, welche sich auf Produktivität konzentrieren, verwenden ein ausgewogenes Verhältnis über den Bildschirm.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
