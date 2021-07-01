# Localização

<p class="description">Localização (também referida como "l10n") é o processo de adaptação de um produto ou conteúdo a um idioma ou mercado específico (localidade).</p>

A localidade padrão do Material-UI é em inglês (Estados Unidos). Se você quiser usar outras localidades, siga as instruções abaixo.

## Texto da localidade

Use o tema para configurar os textos da localização globalmente:

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

### Exemplo

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### Localidades suportadas

| Localidade              | Etiqueta do idioma BCP 47 | Nome da importação |
|:----------------------- |:------------------------- |:------------------ |
| Árabe (Egito)           | ar-EG                     | `arEG`             |
| Armênio                 | hy-AM                     | `hyAM`             |
| Azerbaijano             | az-AZ                     | `azAZ`             |
| Bangla                  | bn-BD                     | `bnBD`             |
| Búlgaro                 | bg-BG                     | `bgBG`             |
| Catalão                 | ca-ES                     | `caES`             |
| Chinese (Hong Kong)     | zh-HK                     | `zhHK`             |
| Chinês (Simplificado)   | zh-CN                     | `zhCN`             |
| Chinese (Taiwan)        | zh-TW                     | `zhTW`             |
| Tcheco                  | cs-CZ                     | `csCZ`             |
| Holandês                | nl-NL                     | `nlNL`             |
| Inglês (Estados Unidos) | en-US                     | `enUS`             |
| Estoniano               | et-EE                     | `etEE`             |
| Finlandês               | fi-FI                     | `fiFI`             |
| Francês                 | fr-FR                     | `frFR`             |
| Alemão                  | de-DE                     | `deDE`             |
| Hebraico                | el-GR                     | `elGR`             |
| Hebraico                | he-IL                     | `heIL`             |
| Hindi                   | hi-IN                     | `hiIN`             |
| Húngaro                 | hu-HU                     | `huHU`             |
| Islandês                | is-IS                     | `isIS`             |
| Indonésio               | id-ID                     | `idID`             |
| Italiano                | it-IT                     | `itIT`             |
| Japonês                 | ja-JP                     | `jaJP`             |
| Cazaque                 | kz-KZ                     | `kzKZ`             |
| Coreano                 | ko-KR                     | `koKR`             |
| Persa                   | fa-IR                     | `faIR`             |
| Polonês                 | pl-PL                     | `plPL`             |
| Português (Brasil)      | pt-BR                     | `ptBR`             |
| Português (Europeu)     | pt-PT                     | `ptPT`             |
| Romeno                  | ro-RO                     | `roRO`             |
| Russo                   | ru-RU                     | `ruRU`             |
| Eslovaco                | sk-SK                     | `skSK`             |
| Espanhol                | es-ES                     | `esES`             |
| Sueco                   | sv-SE                     | `svSE`             |
| Turco                   | tr-TR                     | `trTR`             |
| Vietnamita              | th-TH                     | `thTH`             |
| Ucraniano               | uk-UA                     | `ukUA`             |
| Vietnamita              | vi-VN                     | `viVN`             |

<!-- #default-branch-switch -->

Você pode [encontrar o fonte](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/locale/index.ts) no repositório do GitHub.

Para criar sua própria tradução, ou para personalizar o texto em Inglês. copie este arquivo para o seu projeto, faça as alterações necessárias e importe a localidade de lá.

Por favor, considere contribuir com novas traduções de volta para o Material-UI abrindo uma pull request. No entanto, Material-UI visa suportar [100 mais comuns](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [localidades](https://www.ethnologue.com/guides/ethnologue200), nós podemos não aceitar contribuições para localidades que não são frequentemente usadas, por exemplo `gl-ES` que tem "apenas" 2.5 milhões de falantes nativos.

## Suporte RTL

Idiomas direita-para-esquerda como árabe, persa ou hebraico são suportados. Siga [este guia](/guides/right-to-left/) para usá-los.
