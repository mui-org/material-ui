# Localization

<p class="description">Localization (also referred to as "l10n") is the process of adapting a product or content to a specific locale or market.</p>

The default locale of Material UI is English (United States). If you want to use other locales, follow the instructions below.

## Locale text

Use the theme to configure the locale text globally:

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';

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

### Example

{{"component": "file://./demos/locales/index.ts"}}

:::warning
The [Data Grid and Data Grid Pro](/x/react-data-grid/) components have their own [localization](/x/react-data-grid/localization/).
:::

### Supported locales

| Locale                  | BCP 47 language tag | Import name |
| :---------------------- | :------------------ | :---------- |
| Amharic                 | am-ET               | `amET`      |
| Arabic (Egypt)          | ar-EG               | `arEG`      |
| Arabic (Saudi Arabia)   | ar-SA               | `arSA`      |
| Arabic (Sudan)          | ar-SD               | `arSD`      |
| Armenian                | hy-AM               | `hyAM`      |
| Azerbaijani             | az-AZ               | `azAZ`      |
| Bangla                  | bn-BD               | `bnBD`      |
| Bulgarian               | bg-BG               | `bgBG`      |
| Catalan                 | ca-ES               | `caES`      |
| Chinese (Hong Kong)     | zh-HK               | `zhHK`      |
| Chinese (Simplified)    | zh-CN               | `zhCN`      |
| Chinese (Taiwan)        | zh-TW               | `zhTW`      |
| Croatian                | hr-HR               | `hrHR`      |
| Czech                   | cs-CZ               | `csCZ`      |
| Danish                  | da-DK               | `daDK`      |
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
| Khmer                   | km-KH               | `kmKH`      |
| Kazakh                  | kk-KZ               | `kkKZ`      |
| Korean                  | ko-KR               | `koKR`      |
| Kurdish (Central)       | ku-CKB              | `kuCKB`     |
| Macedonian              | mk-MK               | `mkMK`      |
| Myanmar                 | my-MY               | `myMY`      |
| Malay                   | ms-MS               | `msMS`      |
| Nepali                  | ne-NP               | `neNP`      |
| Norwegian (bokmål)      | nb-NO               | `nbNO`      |
| Norwegian (nynorsk)     | nn-NO               | `nnNO`      |
| Pashto (Afghanistan)    | ps-AF               | `psAF`      |
| Persian                 | fa-IR               | `faIR`      |
| Polish                  | pl-PL               | `plPL`      |
| Portuguese              | pt-PT               | `ptPT`      |
| Portuguese (Brazil)     | pt-BR               | `ptBR`      |
| Romanian                | ro-RO               | `roRO`      |
| Russian                 | ru-RU               | `ruRU`      |
| Serbian                 | sr-RS               | `srRS`      |
| Sinhalese               | si-LK               | `siLK`      |
| Slovak                  | sk-SK               | `skSK`      |
| Spanish                 | es-ES               | `esES`      |
| Swedish                 | sv-SE               | `svSE`      |
| Thai                    | th-TH               | `thTH`      |
| Turkish                 | tr-TR               | `trTR`      |
| Tagalog                 | tl-TL               | `tlTL`      |
| Ukrainian               | uk-UA               | `ukUA`      |
| Urdu (Pakistan)         | ur-PK               | `urPK`      |
| Vietnamese              | vi-VN               | `viVN`      |

<!-- #target-branch-reference -->

You can [find the source](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/locale/index.ts) in the GitHub repository.

To create your own translation, or to customize the English text, copy this file to your project, make any changes needed and import the locale from there.

Please do consider contributing new translations back to Material UI by opening a pull request.
However, Material UI aims to support the [100 most common](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [locales](https://www.ethnologue.com/insights/ethnologue200/), we might not accept contributions for locales that are not frequently used, for instance `gl-ES` that has "only" 2.5 million native speakers.

## RTL Support

Right-to-left languages such as Arabic, Persian, Hebrew, Kurdish, and others are supported.
Follow [this guide](/material-ui/customization/right-to-left/) to use them.
