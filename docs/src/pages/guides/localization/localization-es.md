# Localización

<p class="description">La localización (también llamada "l10n") es el proceso de adaptación de un producto o contenido a un local o mercado específico.</p>

La localización predeterminada de Material-UI es Inglés (Estados Unidos). Si quieres usar otros locales, sigue las instrucciones que se indican a continuación.

## Texto local

Utilice el tema para configurar el texto regional globalmente:

```jsx
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```

### Ejemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Locales soportados

| Local                   | Etiqueta de idioma BCP 47 | Nombre del import |
|:----------------------- |:------------------------- |:----------------- |
| Arabic (Egypt)          | ar-EG                     | `arEG`            |
| Armenio                 | hy-AM                     | `hyAM`            |
| Azerbaiyano             | az-AZ                     | `azAZ`            |
| Bangla                  | bn-BD                     | `bnBD`            |
| Búlgaro                 | bg-BG                     | `bgBG`            |
| Catalán                 | ca-ES                     | `caES`            |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`            |
| Chino (simplificado)    | zh-CN                     | `zhCN`            |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`            |
| Checo                   | cs-CZ                     | `csCZ`            |
| Holandés                | nl-NL                     | `nlNL`            |
| Inglés (Estados Unidos) | en-US                     | `enUS`            |
| Estonio                 | et-EE                     | `etEE`            |
| Finlandés               | fi-FI                     | `fiFI`            |
| Francés                 | fr-FR                     | `frFR`            |
| Alemán                  | de-DE                     | `deDE`            |
| Greek                   | el-GR                     | `elGR`            |
| Hebreo                  | he-IL                     | `heIL`            |
| Hindú                   | hi-IN                     | `hiIN`            |
| Húngaro                 | hu-HU                     | `huHU`            |
| Islandés                | is-IS                     | `isIS`            |
| Indonesio               | id-ID                     | `idID`            |
| Italiano                | it-IT                     | `itIT`            |
| Japonés                 | ja-JP                     | `jaJP`            |
| Kazakh                  | kz-KZ                     | `kzKZ`            |
| Coreano                 | ko-KR                     | `koKR`            |
| Persa                   | fa-IR                     | `faIR`            |
| Polaco                  | pl-PL                     | `plPL`            |
| Portugués (Brasil)      | pt-BR                     | `ptBR`            |
| Portugués               | pt-PT                     | `ptPT`            |
| Rumano                  | ro-RO                     | `roRO`            |
| Ruso                    | ru-RU                     | `ruRU`            |
| Eslovaco                | sk-SK                     | `skSK`            |
| Español                 | es-ES                     | `esES`            |
| Sueco                   | sv-SE                     | `svSE`            |
| Turco                   | tr-TR                     | `trTR`            |
| Thai                    | th-TH                     | `thTH`            |
| Ucraniano               | uk-UA                     | `ukUA`            |
| Vietnamita              | vi-VN                     | `viVN`            |

<!-- #default-branch-switch -->

Puedes [encontrar la fuente](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/locale/index.ts) en el repositorio de GitHub.

To create your own translation, or to customise the English text, copy this file to your project, make any changes needed and import the locale from there.

Por favor considere contribuir con nuevas traducciones a Material-UI abriendo un pull request. However, Material-UI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## Soporte RTL

Right-to-left languages such as Arabic, Persian or Hebrew are supported. Sigue [esta guía](/guides/right-to-left/) para usarlas.
