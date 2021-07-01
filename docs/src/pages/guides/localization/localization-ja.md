# Localization

<p class="description">Localization (also referred to as "l10n") is the process of adapting a product or content to a specific locale or market.</p>

The default locale of Material-UI is English (United States). If you want to use other locales, follow the instructions below.

## Locale text

Use the theme to configure the locale text globally:

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

### 例

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Supported locales

| Locale                  | BCP 47 language tag | Import name |
|:----------------------- |:------------------- |:----------- |
| Arabic (Egypt)          | ar-EG               | `arEG`      |
| Armenian                | hy-AM               | `hyAM`      |
| Azerbaijani             | az-AZ               | `azAZ`      |
| Bangla                  | bn-BD               | `bnBD`      |
| Bulgarian               | bg-BG               | `bgBG`      |
| Catalan                 | ca-ES               | `caES`      |
| Chinese (Hong Kong)     | zh-HK               | `zhHK`      |
| Chinese (Simplified)    | zh-CN               | `zhCN`      |
| Chinese (Taiwan)        | zh-TW               | `zhTW`      |
| Czech                   | cs-CZ               | `csCZ`      |
| Dutch                   | nl-NL               | `nlNL`      |
| English (United States) | en-US               | `enUS`      |
| Estonian                | et-EE               | `etEE`      |
| Finnish                 | fi-FI               | `fiFI`      |
| French                  | fr-FR               | `frFR`      |
| German                  | de-DE               | `deDE`      |
| Greek                   | el-GR               | `elGR`      |
| Hebrew                  | he-IL               | `heIL`      |
| Hindi                   | hi-IN               | `hiIN`      |
| Hungarian               | hu-HU               | `huHU`      |
| Icelandic               | is-IS               | `isIS`      |
| Indonesian              | id-ID               | `idID`      |
| Italian                 | it-IT               | `itIT`      |
| Japanese                | ja-JP               | `jaJP`      |
| Kazakh                  | kz-KZ               | `kzKZ`      |
| Korean                  | ko-KR               | `koKR`      |
| Persian                 | fa-IR               | `faIR`      |
| Polish                  | pl-PL               | `plPL`      |
| Portuguese (Brazil)     | pt-BR               | `ptBR`      |
| Portuguese              | pt-PT               | `ptPT`      |
| Romanian                | ro-RO               | `roRO`      |
| Russian                 | ru-RU               | `ruRU`      |
| Slovak                  | sk-SK               | `skSK`      |
| Spanish                 | es-ES               | `esES`      |
| Swedish                 | sv-SE               | `svSE`      |
| Turkish                 | tr-TR               | `trTR`      |
| Thai                    | th-TH               | `thTH`      |
| Ukrainian               | uk-UA               | `ukUA`      |
| Vietnamese              | vi-VN               | `viVN`      |

<!-- #default-branch-switch -->

You can [find the source](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/locale/index.ts) in the GitHub repository.

To create your own translation, or to customise the English text, copy this file to your project, make any changes needed and import the locale from there.

Please do consider contributing new translations back to Material-UI by opening a pull request. However, Material-UI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/guides/ethnologue200), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## RTL Support

Right-to-left languages such as Arabic, Persian or Hebrew are supported. Follow [this guide](/guides/right-to-left/) to use them.
