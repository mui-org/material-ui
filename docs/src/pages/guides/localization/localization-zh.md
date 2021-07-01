# Localization 本地化

<p class="description">本地化（也称为“i10n”），是将一个产品或者一些内容适应到特定的地区或市场的过程。</p>

Material-UI 的默认语言环境是 English（United States）。 如果您想使用其他语言环境，您可以遵循以下的说明。

## 本地化的文本

使用 theme 来全局地配置语言环境文本：

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

### 示例

{{"demo": "pages/guides/localization/Locales.js", "defaultCodeOpen": false}}

### 支持的地区

| 地区                  | BCP 47 语言标签 | 导入名称        |
|:------------------- |:----------- |:----------- |
| 阿拉伯语（埃及）            | ar-EG       | `arEG`      |
| 亚美尼亚语               | hy-AM       | `hyAM`      |
| 阿塞拜疆语               | az-AZ       | `azAZ`      |
| Bangla              | bn-BD       | `bnBD`      |
| 保加利亚语               | bg-BG       | `bgBG`      |
| 加泰罗尼亚语              | ca-ES       | `caES`      |
| Chinese (Hong Kong) | zh-HK       | `zhHK`      |
| 简体中文                | zh-CN       | `zhCN`      |
| Chinese (Taiwan)    | zh-TW       | `zhTW`      |
| 捷克语                 | cs-CZ       | `csCZ`      |
| 荷兰语                 | nl-NL       | `nlNL`      |
| 英语（美式）              | en-US       | `enUS`      |
| 爱沙尼亚语               | et-EE       | `etEE`      |
| 芬兰语                 | fi-FI       | `fiFI`      |
| 法语                  | fr-FR       | `frFR`      |
| 德语                  | de-DE       | `deDE`      |
| 匈牙利语                | el-GR       | `` `elGR `` |
| 希伯来语                | he-IL       | `heIL`      |
| 印地语                 | hi-IN       | `hiIN`      |
| 匈牙利语                | hu-HU       | `huHU`      |
| 冰岛语                 | is-IS       | `isIS`      |
| 印度尼西亚语              | id-ID       | `idID`      |
| 意大利语                | it-IT       | `itIT`      |
| 日语                  | ja-JP       | `jaJP`      |
| 哈萨克语                | kz-KZ       | `kzKZ`      |
| 韩语/朝鲜语              | ko-KR       | `koKR`      |
| 波斯语                 | fa-IR       | `faIR`      |
| 波兰语                 | pl-PL       | `plPL`      |
| 葡萄牙语（巴西）            | pt-BR       | `ptBR`      |
| 葡萄牙语                | pt-PT       | `ptPT`      |
| 罗马尼亚语               | ro-RO       | `roRO`      |
| 俄罗斯语                | ru-RU       | `ruRU`      |
| 斯洛伐克语               | sk-SK       | `skSK`      |
| 西班牙语                | es-ES       | `esES`      |
| 瑞典语                 | sv-SE       | `svSE`      |
| 土耳其语                | tr-TR       | `trTR`      |
| 越南语                 | th-TH       | `thTH`      |
| 乌克兰语                | uk-UA       | `ukUA`      |
| 越南语                 | vi-VN       | `viVN`      |

<!-- #default-branch-switch -->

您可以在GitHub库中找到[源文件](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/locale/index.ts)。

要创建自己的翻译，或自定义英文文本，请将此文件复制到您的项目中，进行所需的任何更改并从那里导入语言环境。

请考虑创建一个拉取请求（pull request）来为 Material-UI 贡献新的译文。 然而，Material-UI 的目标是支持 [100个最常见的](https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers) [本地化语言](https://www.ethnologue.com/guides/ethnologue200)，我们可能不接受不常用的本地化语言的贡献，例如 `gl-ES`，它“只有”250万母语使用者。

## RTL 支持

支持从右到左的语言，如阿拉伯语（Arabic）、波斯语（Persian ）或希伯来语（Hebrew ）。 请遵循 [本指南](/guides/right-to-left/) 来使用这些语言。
