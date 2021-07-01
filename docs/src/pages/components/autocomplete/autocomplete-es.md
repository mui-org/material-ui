---
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'component: Autocomplete'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#combobox'
---

# Autocompletado

<p class="description">El autocompletado es una caja de texto normal mejorada por un panel de opciones sugeridas.</p>

El widget es útil para establecer el valor de un cuadro de texto de una sola línea en uno de los dos tipos de escenarios:

1. El valor para el cuadro de texto debe elegirse de un conjunto predefinido de valores permitidos, por ejemplo, un campo de ubicación debe contener un nombre de ubicación válido: [cuadro combinado](#combo-box).
2. El cuadro de texto puede contener cualquier valor arbitrario, pero es de gran ventaja sugerir posibles valores al usuario, por ejemplo, un campo de búsqueda puede sugerir búsquedas similares o anteriores para ahorrarle tiempo al usuario: [solo libre](#free-solo).

Esto pretende ser una versión mejorada de los paquetes "react-select" y "downshift".

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Combo box

El valor debe elegirse de un conjunto predefinido de valores permitidos.

{{"demo": "pages/components/autocomplete/ComboBox.js"}}

### Campo de pruebas

Por defecto, el componente acepta la siguiente estructura de opciones:

```ts
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.title,
});

<Autocomplete filterOptions={filterOptions} />
```

por ejemplo:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

### Campo de pruebas

Cada uno de los siguientes ejemplos demuestran una característica del componente Autocompletado.

{{"demo": "pages/components/autocomplete/Playground.js"}}

### Selección de País

Selecciona uno de los 248 países.

{{"demo": "pages/components/autocomplete/CountrySelect.js"}}

### Estados controlables

El componente tiene dos estados que pueden ser controlados:

1. el "valor" del estado con la combinación de props `value`/`onChange`. Este estado representa el valor seleccionado por el usuario, por ejemplo al pulsar <kbd class="key">Enter</kbd>.
2. el estado "valor de entrada" con la combinación de props `inputValue`/`onInputChange`. Este estado representa el valor mostrado en el campo de texto.

> ⚠️ Estos dos estados son aislados, deben ser controlados de forma independiente.

{{"demo": "pages/components/autocomplete/ControllableStates.js"}}

## Free solo

Setear `freeSolo` a true, para que el cuadro de texto pueda contener cualquier valor arbitrario.

### Campo de búsqueda

También puedes mostrar un diálogo cuando el usuario quiere añadir un nuevo valor.

{{"demo": "pages/components/autocomplete/FreeSolo.js"}}

### Creable

Si pretendes usar este modo para una experiencia similar a un [combo box](#combo-box) (una versión mejora de un selector de elementos) te recomendamos configurar:

- `selectOnFocus` que ayuda al usuario a borrar el valor seleccionado.
- `clearOnBlur` que ayuda a que el usuario introduzca un nuevo valor.
- `handleHomeEndKeys` para mover el foco dentro de la ventana emergente con las claves <kbd class="key">Home</kbd> y <kbd class="key">End</kbd>.
- Una última opción, por ejemplo `Agregar "SU BÚSQUEDA"`.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOption.js"}}

También puedes mostrar un diálogo cuando el usuario quiere añadir un nuevo valor.

{{"demo": "pages/components/autocomplete/FreeSoloCreateOptionDialog.js"}}

## Agrupado

Puedes agrupar las opciones con el accesorio `groupBy`. Si lo haces, asegúrate de que las opciones también están ordenadas con la misma dimensión con la que están agrupadas, de lo contrario se crearan cabeceras duplicadas.

{{"demo": "pages/components/autocomplete/Grouped.js"}}

## Deshabilitar opciones

{{"demo": "pages/components/autocomplete/DisabledOptions.js"}}

## `useAutocomplete`

For advanced customization use cases, we expose a headless `useAutocomplete()` hook. Acepta casi las mismas opciones que el componente Autocompletar menus las propiedades relacionadas al renderizado de JSX. El componente Autocompletar usa este hook internamente.

```jsx
importar useAutocomplete de '@material-ui/core/useAutocomplete';
```

- 📦 [4.5 kB comprimido](/size-snapshot).

{{"demo": "pages/components/autocomplete/UseAutocomplete.js", "defaultCodeOpen": false}}

### Hook personalizado

{{"demo": "pages/components/autocomplete/CustomizedHook.js"}}

También conocidos como etiquetas, el usuario puede introducir más de un valor.

## Peticiones asíncronas

The component supports two different asynchronous use-cases:

- [Load on open](#load-on-open): it waits for the component to be interacted with to load the options.
- [Search as you type](#search-as-you-type): a new request is made for each keystroke.

### Load on open

It displays a progress state as long as the network request is pending.

{{"demo": "pages/components/autocomplete/Asynchronous.js"}}

### Search as you type

If your logic is fetching new options on each keystroke and using the current value of the textbox to filter on the server, you may want to consider throttling requests.

Additionally, you will need to disable the built-in filtering of the `Autocomplete` component by overriding the `filterOptions` prop:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />
```

### Lugar de Google Maps

Una interfaz de usuario personalizado para el autocompletar de Google Maps Places.

{{"demo": "pages/components/autocomplete/GoogleMaps.js"}}

Para esta demostración, tenemos que cargar la API de [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/tutorial).

> ⚠️ Antes de empezar a usar la API de Google Maps JavaScript, debes registrarte y crear una cuenta de facturación.

## Valores múltiples

También conocidos como etiquetas, el usuario puede introducir más de un valor.

{{"demo": "pages/components/autocomplete/Tags.js"}}

### Opciones fijas

En caso de que necesites bloquear ciertas etiquetas de modo que no puedan ser removidas en la interfaz, se puede deshabilitar los chips.

{{"demo": "pages/components/autocomplete/FixedTags.js"}}

### Casillas de Verificación

{{"demo": "pages/components/autocomplete/CheckboxesTags.js"}}

### Limitar las etiquetas

Puedes utilizar la propiedad `limitTags` para limitar el número de opciones que aparecen cuando no se selecciona.

{{"demo": "pages/components/autocomplete/LimitTags.js"}}

## Tamaños

Fancy smaller inputs? Use the `size` prop.

{{"demo": "pages/components/autocomplete/Sizes.js"}}

## Personalización

### Input personalizado

El apoyo `renderInput` te permite personalizar la entrada renderizada. El primer argumento de este apoyo renderizado contiene apoyos que necesitas para avanzar. Ponga atención específica a las claves `red` y `inputProps`.

{{"demo": "pages/components/autocomplete/CustomInputAutocomplete.js"}}

### Selector de GitHub

Esta demo reproduce el selector de etiquetas de GitHub:

{{"demo": "pages/components/autocomplete/GitHubLabel.js"}}

Dirígete a la sección de [Hook personalizado](#customized-hook) para un ejemplo de personalización con el hook `useAutocomplete` en lugar del componente.

## Destacados

La siguiente demostración se basa en [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), una pequeña utilidad (1 kB) para resaltar texto en componentes de autosuggest y autocompletar.

{{"demo": "pages/components/autocomplete/Highlights.js"}}

## Filtro personalizado

El componente expone una factoría para crear un método de filtrado para proveer a la propiedad `filterOptions`. Puede usarse para cambiar el comportamiento de filtrado por defecto.

```js
import { createFilterOptions } from '@material-ui/core/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Argumentos

1. `config` (*Object* [optional]):

- `config.ignoreAccents` (*Boolean* [optional]): Por defecto a `true`. Elimina los acentos.
- `config.ignoreCase` (*Boolean* [optional]): Por defecto a `true`. En minúsculas todo.
- `config.limit` (*Number* [optional]): Por defecto a null. Limita el número de opciones sugeridas para ser mostrado. Por ejemplo, si `config.limit` es `100`, sólo las primeras `100` coincidencias se muestran. Esto puede ser útil si existe muchas coincidencias y la virtualización no estaba establecida.
- `config.matchFrom` (*'any' | 'start'* [optional]): Por defecto a `'any'`.
- `config.stringify` (*Func* [optional]): Controla cómo una opción se convierte en una cadena, de manera que se pueden combinar en contra de la entrada de texto del fragmento.
- `config.trim` (*Boolean* [optional]): Por defecto a `false`. Eliminar espacios en blanco.

#### Regresa

`filterOptions`: método de filtro devuelto puede ser provisto directamente a la propiedad `filterOptions` del componente `Autocompletar`, o el parámetro del mismo nombre para el hook.

En la siguiente demostración, las opciones que se necesitan para iniciar con la consulta prefijo:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"demo": "pages/components/autocomplete/Filter.js", "defaultCodeOpen": false}}

### Avanzado

Para mecanismos de filtrado más completos, como la coincidencia aproximada, se recomienda buscar en [match-sorter de](https://github.com/kentcdodds/match-sorter). Por ejemplo:

```jsx
import matchSorter from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualización

Buscar entre 10.000 opciones generadas al azar. La lista está virtualizada gracias a [react-window](https://github.com/bvaughn/react-window).

{{"demo": "pages/components/autocomplete/Virtualize.js"}}

## Events

If you would like to prevent the default key handler behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = false;
      // your handler code
    }
  }}
/>
```

## Limitaciones

### autocompletar/autorellenar

Browsers have heuristics to help the user fill in form inputs. However, this can harm the UX of the component.

By default, the component disables the input **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute. Google Chrome does not currently support this attribute setting ([Issue 587466](https://bugs.chromium.org/p/chromium/issues/detail?id=587466)). A possible workaround is to remove the `id` to have the component generate a random one.

In addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details). En el caso de que desees evitar el autorellenar, puedes intentar lo siguiente:

- Nombra la entrada sin filtrar ninguna información que el navegador pueda utilizar. p.e. `id="field1"` en vez de `id="country"`. Si dejas el id de vacío, el componente utiliza un identificador aleatorio.
- Set `autoComplete="new-password"` (some browsers will suggest a strong password for inputs with this attribute setting):

  ```jsx
  <TextField
    {...params}
    inputProps={{
      ...params.inputProps,
      autoComplete: 'new-password',
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more details.

### iOS VoiceOver

VoiceOver en iOS Safari no soporta el atributo `aria-owns` especialmente bien. Puedes solucionar el problema con la propiedad `disablePortal`.

### ListboxComponent

Si proporciona un apoyo personalizado `ListboxComponent`, usted necesita asegurarse de que el contedenedor de desplazamiento destinado tiene el atributo `role` esta configurado `listbox`. Esto asegura el comportamiento correcto del desplazamiento, por ejemplo cuando usas el teclado para navegar.

## Accesibilidad

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#combobox)

Animamos el uso de una etiqueta para el cuadro de texto. El componente implementa las prácticas de creación de WAI-ARIA.
