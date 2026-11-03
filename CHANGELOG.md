# [Versions](https://mui.com/material-ui/getting-started/versions/)

## 10.0.0-alpha.0

<!-- generated comparing v9.4.0..master -->

_Oct 9, 2026_

A big thanks to the 30 contributors who made this release possible. Here are some highlights ✨:

- ⚙️ Support [values other than raw options](https://next.mui.com/material-ui/react-autocomplete/#object-options-with-primitive-values) for Autocomplete via the `getOptionValue` prop.
- ♿️ Extend the theme's [focus indicator](https://next.mui.com/material-ui/customization/focus-visible/) to `InputBase` and text fields with `disableUnderline` via `theme.focusVisible`.

### `@mui/material@10.0.0-alpha.0`

#### Breaking Changes

- [autocomplete] Change the default popup Paper elevation from 1 to 8 (#49110) @namansancheti

#### Changes

- Add missing override interfaces for `slotProps` (#49343) @sai6855
- Export private focus-visible utilities (#49139) @siriwatknp
- Fix `onClose` types for Menu, Snackbar, and SwipeableDrawer (#49340) @Janpot
- Fix slot handling in Autocomplete chips, TextField `inputLabel`, and NativeSelect `input` (#49336) @Janpot
- Fix theme `defaultProps` and missing exports (#49332) @Janpot
- Remove unnecessary `Omit` types (#49328) @sai6855
- [autocomplete] Lazily derive the initial input value (#49057) @OskarEichler
- [autocomplete] Prevent crash when changing `groupBy` (#49150) @silviuaavram
- [autocomplete] Stop filtering once the result limit is reached (#49295) @valkiara
- [autocomplete] Support values other than raw options (#49078) @silviuaavram
- [avatargroup] Improve TypeScript performance when using `slotProps` (#49213) @sai6855
- [bottomnavigationaction] Document the `selected` prop (#49190) @siriwatknp
- [breadcrumbs] Build separators in one pass (#49058) @OskarEichler
- [button] Fix loading-position style leaking to non-loading buttons (#49182) @siriwatknp
- [button] Simplify `ExtendButton` type (#49364) @sai6855
- [buttonbase] Fix LazyRipple retaining event objects when ripples are disabled (#49000) @dizhurnikita
- [checkbox] Set the native indeterminate state on the input (#49053) @lazerg
- [dialogcontent] Render the `theme.focusVisible` ring on the scrollable content (#49311) @siriwatknp
- [inputbase] Fix `slotProps.input` event handlers and ref being ignored (#49333) @Janpot
- [link] Remove unwanted `Omit` type (#49331) @sai6855
- [link] Revert to `color-mix` when underline color is not accepted (#49077) @silviuaavram
- [modal] Prevent `aria-hidden` from being applied to non-portal modals (#49026) @ZeeshanTamboli
- [select] Fix flaky opening mouseup timing (#49024) @michelengelen
- [skeleton] Fix the background fallback with CSS theme variables (#49322) @aarongarciah
- [slider] Fix `disableSwap` when a neighboring thumb is at 0 (#49234) @kwy404
- [snackbar][speeddial] Remove unnecessary `Omit` in props definitions (#49214) @sai6855
- [speeddial] Fix horizontal persistent tooltip placement (#49073) @Cunninger
- [speeddial] Support action slot object refs (#49056) @OskarEichler
- [table] Improve accessibility for the pagination buttons (#49112) @silviuaavram
- [tablepaginationactions] Align common types with other components (#49347) @sai6855
- [tabs] Derive mounted state from the indicator style instead of setting it in an effect (#49324) @ZeeshanTamboli
- [tabs] Fix selected tab not scrolling into view when scroll buttons appear in auto mode (#48489) @starboyvarun
- [tabs] Respect `scroll-padding` when scrolling the selected tab into view (#49039) @crispinc-omnea
- [textfield] Add theme CSS variable for autofill `box-shadow` (#47472) @ludij
- [theme] Fix `theme.alpha()` for raw colors with CSS variables (#49273) @siriwatknp
- [theme] Fix theming outliers in Paper, BreadcrumbCollapsed, TablePagination, and Tooltip (#49335) @Janpot
- [theme] Keep CSS variable fallbacks in `theme.alpha()` (#49297) @aarongarciah
- [theme] Render the `theme.focusVisible` ring on inputs (#49152) @siriwatknp

### `@mui/icons-material@10.0.0-alpha.0`

- Center the WarningRounded icon within its `viewBox` (#49043) @itd-mb

### `@mui/system@10.0.0-alpha.0`

- Remove duplicated `filterProps` mapping in `getThemeValue` (#48640) @sai6855
- Resolve InitColorSchemeScript `%s` placeholder at build time (#49113) @Janpot
- Serialize InitColorSchemeScript configuration values (#49091) @Janpot

### `@mui/utils@10.0.0-alpha.0`

- Document the deprecated `slotState` parameter and add `resolveComponentProps` tests (#49137) @usamabhatti1998
- Improve `mergeSlotProps` performance (#48002) @mj12albert

### `@mui/types@10.0.0-alpha.0`

- Remove invalid `number` type from supported `OverridableStringUnion` type arguments (#49278) @sai6855

### `@mui/lab@10.0.0-alpha.0`

- [masonry] Fix styles with CSS theme variables (#49294) @aarongarciah
- [timelineitem] Keep the spacer selector at one class of specificity (#49028) @Janpot

### `@mui/codemod@10.0.0-alpha.0`

- Upgrade required Node.js version in the `engines` field (#49070) @ZeeshanTamboli
- [formcontrollabel] Stop migrating `ActionsComponent` and remove `inputRef` (#49334) @Janpot

### `@mui/material-nextjs@10.0.0-alpha.0`

- Escape the `</style>` tag in server-rendered style output (#49183) @Janpot

### Docs

- Add the accessibility conformance report page (#48926) @michelengelen
- Add the v10 migration guide (#49349) @silviuaavram
- Allow reopening cookie preferences from a URL hash (#49124) @brijeshb42
- Clarify how to restore icon `data-testid` attributes in the v7 migration guide (#49109) @alexfauquette
- Fix @mui/lab version in v7.3.6 changelog (#49145) @mateuseap
- Fix Next.js font optimization docs to preserve typography letter-spacing (#48488) @starboyvarun
- Fix the dead Popper.js documentation links (#49081) @lazerg
- Fix the LLM generated docs paths (#49076) @silviuaavram
- Improve accessibility for checkbox lists (#49111) @silviuaavram
- Warn about untrusted values in the `sx` prop (#49199) @Janpot
- [autocomplete] Add removal and navigation ARIA descriptions to Chip examples (#49086) @silviuaavram
- [backdrop] Move Backdrop to Utils and clarify it is a low-level utility (#49072) @webernir
- [drawer] Add accessible names to close buttons (#49161) @sai6855
- [material-icons] Add `frame` synonym for the Portrait icon (#49201) @Janpot
- [material-icons] Improve icon search performance (#44450) @oliviertassinari
- [numberfield] Document the `format` prop for units and currency (#49160) @Denimworld12
- [snackbar] Demonstrate Escape handling inside a dialog (#49306) @minwookshin
- [system] Avoid `any` when spreading the `sx` prop (#49083) @LeusMaximus

### Core

- [ci] Add Claude PR review via mui-public reusable workflow (#49037) @Janpot
- [ci] Add the Claude CI flake-fix caller (#49197) @Janpot
- [code-infra] Add the release skill (#48938) @brijeshb42
- [code-infra] Backport #target-branch-reference to docs `package.json` (#49372) @silviuaavram
- [code-infra] Backport #target-branch-references to master (#49194) @silviuaavram
- [code-infra] Bump @types/node to 22 and group it with Node.js in Renovate (#49189) @Janpot
- [code-infra] Compare the nightly React runs with the stable Argos build (#49123) @LukasTy
- [code-infra] Consume shared commands from code-infra orb (#49082) @brijeshb42
- [code-infra] Convert @mui/lab to TypeScript (#49140) @Janpot
- [code-infra] Convert @mui/material internal svg-icons to TypeScript (#49143) @Janpot
- [code-infra] Convert remaining @mui/system .js+.d.ts pairs to TypeScript (part 2) (#48699) @Janpot
- [code-infra] Enable pnpm `autoDedupe` (#49242) @Janpot
- [code-infra] Fix Autocomplete JSDoc links after a stale merge (#49315) @silviuaavram
- [code-infra] Fix `package.json` metadata (#49243) @Janpot
- [code-infra] Include cherry-picks in the changelog (#49375) @brijeshb42
- [code-infra] Mark the Argos reference branch for release branch cuts (#49317) @Janpot
- [code-infra] Migrate to Babel 8 (#49162) @brijeshb42
- [code-infra] Pin the only-allow version in the preinstall hook (#49114) @Janpot
- [code-infra] Prune stale `minimumReleaseAgeExclude` entries (#49178) @Janpot
- [code-infra] Remove the legacy mark-duplicate workflow (#49363) @brijeshb42
- [code-infra] Run TypeScript 7 alongside the TS6 JS API (#49075) @brijeshb42
- [code-infra] Ship documentation Markdown inside the @mui/material package (#48722) @Janpot
- [code-infra] Show progress and rate limit retry time in `release:changelog` (#49376) @Janpot
- [code-infra] Update deprecated options in the Vitest test configuration (#49193) @ZeeshanTamboli
- [code-infra] Widen @babel/runtime range and stop emitting empty class fields (#49241) @brijeshb42
- [core] Remove the leftover canary release script (#49163) @Janpot
- [core] Replace @mui/internal-waterfall with es-toolkit (#49155) @Janpot
- [docs-infra] Derive accessibility report data from defaults and tests (#49271) @JCQuintas
- [docs-infra] Generate the accessibility Known gaps table (#49265) @michelengelen
- [docs-infra] Harden the OG image edge function (#49116) @Janpot
- [docs-infra] Keep generated LLM docs on filtered runs (#49290) @Janpot
- [docs-infra] Make core-docs agnostic of styled-components (#49138) @Janpot
- [docs-infra] Migrate deploy-succeeded to event-triggered function (#49158) @brijeshb42
- [docs-infra] Pin StackBlitz demo vite to v7 and plugin-react to v5 (#49151) @Janpot
- [docs-infra] Rate-limit the documentation feedback endpoint (#49115) @Janpot
- [docs-infra] Retire the docs service worker (#49188) @Janpot
- [docs-infra] Use JSON as the source of truth for the accessibility reports (#49270) @michelengelen
- [docs-infra] Validate docs feedback content before posting to Slack (#49088) @Janpot
- [internal] Prepare master for the alpha release (#49284) @silviuaavram
- [material] Convert colors to TypeScript (#49180) @Janpot
- [material] Convert utils and six barrels to TypeScript (#49185) @Janpot
- [test] Add a palette contrast contract for the accessibility reports (#49049) @michelengelen
- [test] Add a visual regression fixture for the DocSearch modal (#49002) @LukasTy
- [test] Automate WCAG 2.4.7 Focus Visible checks (#48945) @michelengelen
- [test] Fix flaky DocSearch modal screenshots (#49122) @LukasTy
- [test] Fix Vitest imports (#49184) @silviuaavram
- [test] Load the regression fonts from npm instead of Google Fonts (#49310) @Janpot
- [test] Make regression screenshot rasterization deterministic (#49208) @Janpot
- [test] Roll the component reports up into a library scorecard (#48925) @michelengelen
- [test] Run module augmentation tests against built declarations (#49142) @LukasTy
- [test][accordion] Add axe tests and WCAG conformance reports (#48924) @michelengelen
- [test][avatar] Add axe tests and WCAG conformance report (#48917) @michelengelen
- [test][avatar] Move the accessibility fixture to the fixture tree (#49087) @michelengelen
- [test][button] Add axe test coverage and WCAG conformance report (#48916) @michelengelen
- [test][checkbox] Add axe tests and WCAG conformance report (#48918) @michelengelen
- [test][docs-infra] Reduce timing dependencies in the cookie consent test (#49154) @LukasTy
- [test][linearprogress] Add axe tests and WCAG conformance report (#48922) @michelengelen
- [test][pagination] Add tests for zero boundary and sibling counts (#49118) @Janpot
- [test][radio] Add axe tests and WCAG conformance reports (#48920) @michelengelen
- [test][switch] Add axe tests and WCAG conformance report (#48919) @michelengelen
- [test][textfield] Add axe tests and WCAG conformance report (#48923) @michelengelen
- [test][togglebutton] Add axe tests and WCAG conformance reports (#48921) @michelengelen

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @brijeshb42, @crispinc-omnea, @Cunninger, @Denimworld12, @dizhurnikita, @itd-mb, @Janpot, @JCQuintas, @kwy404, @lazerg, @LeusMaximus, @ludij, @LukasTy, @mateuseap, @michelengelen, @minwookshin, @mj12albert, @namansancheti, @oliviertassinari, @OskarEichler, @sai6855, @silviuaavram, @siriwatknp, @starboyvarun, @usamabhatti1998, @valkiara, @webernir, @ZeeshanTamboli

## 9.4.0

<!-- generated comparing v9.3.1..master -->

_Aug 27, 2026_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- ♿️ Opt in to a consistent [keyboard focus ring](https://mui.com/material-ui/customization/focus-visible/) across components with the new `theme.focusVisible`.
- ♿️ The [Tooltip](https://mui.com/material-ui/react-tooltip/) now supports disabled button triggers without an extra wrapper element.

### `@mui/material@9.4.0`

- [theme] Add `theme.focusVisible` opt-in keyboard focus ring (#48743) @siriwatknp
- [buttongroup] Prevent sticky hover border on touch devices (#48993) @petr-kratochvil
- [l10n] Complete Traditional Chinese localization (#48946) @nrps9909
- [menulist] Preserve custom list padding when adjusting for the scrollbar (#48707) @creazyfrog
- [pagination] Manage focus whenever first / last / next / previous buttons become disabled (#48877) @silviuaavram
- [tooltip] Improve support for disabled button triggers (#48622) @mayank99

### `@mui/utils@9.4.0`

- Fix resolveProps to correctly merge slotProps defined as functions (#48955) @mnajdova
- Replace deprecated `clip` CSS property with `clip-path` (#48966) @ZeeshanTamboli

### `@mui/styled-engine-sc@9.4.0`

- Fix types for components extended with styled (#45988) @megos

### Docs

- Bump @docsearch/react to ^4.7.0 (#48886) @LukasTy
- Fix broken links reported by Ahrefs (#48949) @brijeshb42
- Manage focus on Open in Chat button click (#48942) @silviuaavram
- Move focus to the main content with the skip link (#48944) @lazerg
- Use relative link for LICENSE in README (#49040) @loulanyue
- [autocomplete] Remove the "aria-owns" reference (#48958) @silviuaavram
- [table] Fix wrong number of rows reported to screen readers (#47653) @seomsoo
- [table] Reference DataGrid link in the row header section (#48988) @silviuaavram
- [table] Use and document the row header cells (#48965) @silviuaavram
- [tabs] Make tab panel focusable and show keep mounted examples (#48939) @silviuaavram
- [templates] Remove focusable links from hidden carousel slides (#49003) @gonzoblasco

### Core

- [code-infra] Fix team sync review requests (#48914) @brijeshb42
- [code-infra] Import the test globals from vitest (#49033) @JCQuintas
- [code-infra] Point the support validator link at frontend-public (#49041) @Janpot
- [code-infra] Update CircleCI orb (#49030) @Janpot
- [code-infra] Use ESM current directory syntax for Vitest config (#49032) @ZeeshanTamboli
- [core] Use @typescript/typescript6 for the docs tooling (#49025) @Janpot
- [core-docs] Remove the `globalSelector` stylis middleware (#49029) @Janpot
- [test] Add an `assertions` mode to the axe regression harness (#48915) @michelengelen
- [test] Automate the CSS-dependent WCAG criteria (#48936) @michelengelen
- [test] Fail the regression run when a webfont does not load (#48948) @LukasTy
- [test] Fix typo 'overriden' -> 'overridden' in Alert test comment (#48987) @FirmaSpring
- [test] Replace webfontloader with the CSS Font Loading API (#48995) @LukasTy
- [test] Skip the CrudDashboard VRT on React 18 (#49027) @Janpot
- [test] Use the shared loadFonts from @mui/internal-test-utils (#49007) @LukasTy
- [test] Use the Vitest global expect instead of importing chai (#48996) @JCQuintas
- [test][tooltip] Keep the disabled trigger away from the real pointer (#48947) @LukasTy

All contributors of this release in alphabetical order: @brijeshb42, @creazyfrog, @FirmaSpring, @gonzoblasco, @Janpot, @JCQuintas, @lazerg, @loulanyue, @LukasTy, @mayank99, @megos, @michelengelen, @mnajdova, @nrps9909, @petr-kratochvil, @seomsoo, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.3.1

<!-- generated comparing v9.3.0..master -->

_Aug 6, 2026_

A big thanks to the 4 contributors who made this release possible.

### `@mui/material@9.3.1`

- [transitions] Prevent exit transitions from getting stuck (#48881) @ZeeshanTamboli

### `@mui/codemod@9.3.1`

- Include transforms in published package (#48934) @brijeshb42

### Core

- [blog] Clarify early bird renewal discount scope (#48906) @DanailH
- [test][pagination] Add more unit tests (#48927) @silviuaavram

All contributors of this release in alphabetical order: @brijeshb42, @DanailH, @silviuaavram, @ZeeshanTamboli

## 9.3.0

<!-- generated comparing v9.2.0..master -->

_Aug 4, 2026_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- ♿️ Keyboard navigation in the [Toggle Button Group](https://mui.com/material-ui/react-toggle-button/) now follows the roving tabindex pattern.
- ♿️ The [Autocomplete](https://mui.com/material-ui/react-autocomplete/) announces its loading and no options messages through a new `status` slot.

### `@mui/material@9.3.0`

- [autocomplete] Wrap the no results and loading messages in an aria live region (#48690) @silviuaavram
- [buttongroup] Respect global disableRipple / disableFocusRipple in grouped buttons (#48762) @siriwatknp
- [checkbox][radio] Respect global disableRipple from MuiButtonBase defaultProps (#48795) @siriwatknp
- [formcontrollabel] Add missing `labelPlacementEnd` class (#48843) @siriwatknp
- [listitembutton] Fix typos in component code (#48868) @ZeeshanTamboli
- [menuitem] Add `aria-checked` for checkbox and radio menu items (#48651) @siriwatknp
- [modal] Replace custom findIndexOf with findIndex (#48827) @ZeeshanTamboli
- [modal][dialog] Fix scrollbar compensation in Shadow DOM (#48826) @ZeeshanTamboli
- [select] Fix endAdornment overlapping the open indicator (#48723) @siriwatknp
- [tablepagination] Add focus style to default InputBase used in Select (#48871) @silviuaavram
- [togglebuttongroup] Add roving tabindex keyboard navigation (#48849) @silviuaavram

### `@mui/system@9.3.0`

- Prevent prototype pollution in cssVarsParser (#48822) @Janpot

### `@mui/codemod@9.3.0`

- Don't leak state between files in v5.0.0/path-imports (#48797) @manbearwiz
- Remove use of eval() (#48701) @oliviertassinari
- Transform all style exports in `v5.0.0/path-imports` codemod (#48800) @manbearwiz

### Docs

- Clarify `container` prop inheritance for Shadow DOM (#48670) @Juan-C-Ceballos
- Clarify third-party script risk in CSP unsafe-inline note (#48787) @Janpot
- Document `box-sx-prop` codemod (#48888) @SR0725
- Document Grid direction column removal in v9 upgrade guide (#48880) @kalayciburak
- Fix color contrast in GitHub labels example (#48844) @silviuaavram
- Fix per-page canonical URL and stale SEO link (#48789) @brijeshb42
- Fix redirect loop on the Design Kits page (#48869) @Janpot
- Fix typo 'overriden' -> 'overridden' in CHANGELOG (#48785) @ZhouYinLong-lab
- Improve TransferList examples (#48845) @silviuaavram
- Link a new theme generator tool (#48847) @mansourcodes
- Remove broken learning resource links (#48598) @morning-verlu
- Update the 9.2.0 changelog (#48763) @silviuaavram
- [autocomplete] Clarify how to render custom start and end adornments (#48883) @DebadityaHait
- [drawer] Clarify clipped AppBar spacing (#48887) @rushijagani-dev
- [menu] Fix stale `selected` prop reference in Selected menu section (#48879) @LukasTy
- [skeleton] Document preserving typography sizing with custom border radius (#48596) @meaqua9420

### Core

- [blog] Fix caret annotation broken by Prettier wrapping (#48884) @bernardobelchior
- [code-infra] Automate team sync on about page (#48794) @brijeshb42
- [code-infra] Bump @mui/internal-code-infra to 0.0.4-canary.101 (#48878) @Janpot
- [code-infra] Fix Dependabot alerts (#48756) @Janpot
- [code-infra] Fix team sync PR creation (#48911) @brijeshb42
- [code-infra] Pin node version in publish CI (#48799) @brijeshb42
- [core-docs] Tighten service worker host check (#48581) @Janpot
- [docs-infra] Change branch name to the allowed one (#48910) @brijeshb42

All contributors of this release in alphabetical order: @bernardobelchior, @brijeshb42, @DebadityaHait, @Janpot, @Juan-C-Ceballos, @kalayciburak, @LukasTy, @manbearwiz, @mansourcodes, @meaqua9420, @morning-verlu, @oliviertassinari, @rushijagani-dev, @silviuaavram, @siriwatknp, @SR0725, @ZeeshanTamboli, @ZhouYinLong-lab

## 9.2.0

<!-- generated comparing v9.1.2..master -->

_Jul 3, 2026_

A big thanks to the 9 contributors who made this release possible.

- ⚙️ Add support for [`data-*` attributes on `slotProps`](https://mui.com/material-ui/guides/typescript/#allowing-data-attributes-on-slotprops).

### `@mui/material@9.2.0`

- [l10n] Add missing MuiPagination localization to zh-CN locale (#48741) @greymoth-jp
- [select] Guard display ref during mouse down (#48744) @michelengelen

### `@mui/utils@9.2.0`

- [utils] Add opt-in `DataAttributesOverrides` augmentation for slot props (#48554) @LukasTy

### Docs

- [docs] Improve Icon Dialog responsiveness on small screens (#48639) @Prakash1185
- [docs] Fix invalid UTF-8 in skill references (#48739) @mturac

### Core

- [code-infra] Resolve Renovate dashboard warnings (#48700) @Sushantplive
- [code-infra] Validate npm publishing through dry run (#48691) @brijeshb42
- [code-infra] Run prettier after renovate update (#48754) @Janpot
- [code-infra] Fix 'A11y results committed?' check on react-pinned nightly jobs (#48740) @Janpot
- [core] Remove leftover Joy UI references (#48719) @siriwatknp
- [code-infra] Bump react-router to 7.15.1 (#48725) @Janpot
- [docs-infra] Drive docs analytics IDs via ANALYTICS_ENV (#48694) @Janpot
- [docs-infra] Pre-render API page descriptions (#48693) @brijeshb42
- [code-infra][icons-material] Build lib/package.json with code-infra --no-expand (#48689) @Janpot
- [code-infra] Fix react@18/next nightly workflow (#48635) @Janpot

All contributors of this release in alphabetical order: @brijeshb42, @greymoth-jp, @Janpot, @LukasTy, @michelengelen, @mturac, @Prakash1185, @siriwatknp, @Sushantplive

## 9.1.2

<!-- generated comparing v9.1.1..master -->

_Jun 23, 2026_

A big thanks to the 5 contributors who made this release possible.

### `@mui/material@9.1.2`

- [autocomplete] Don't submit forms when committing `freeSolo` value with Enter key (#48679) @mj12albert
- [transitions] Fix RTG import in ESM (#48645) @mj12albert

### `@mui/system@9.1.2`

- [InitColorSchemeScript] Fix script tag warning in Next.js 16 dev mode (#48671) @siriwatknp

### Docs

- Fix typos in release instructions (#48687) @brijeshb42
- Update @mui/x-\* packages to latest (#48661) @Janpot

### Core

- [code-infra] Convert leaf @mui/system .js+.d.ts pairs to TypeScript (part 1) (#48578) @Janpot
- [code-infra] Bump to latest code-infra packages (#48672) @brijeshb42
- [code-infra] Resolve remaining minimatch advisory (#48662) @Janpot
- [code-infra] Bump nx to resolve minimatch advisory (#48658) @Janpot
- [core] Drop @babel/\* pnpm overrides (#48710) @Janpot
- [docs-infra] Revert "Pin StackBlitz demo vite to v7 and plugin-react to v5" (#48709) @Janpot
- [docs-infra] Fix code-block copy button broken on direct page load (#48653) @brijeshb42
- [test] Stabilize Data Grid demo data in Argos screenshots (#48654) @LukasTy

All contributors of this release in alphabetical order: @brijeshb42, @Janpot, @LukasTy, @mj12albert, @siriwatknp

## 9.1.1

<!-- generated comparing v9.1.0..master -->

_Jun 11, 2026_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@9.1.1`

- [Autocomplete] Update fullWidth prop documentation (#48626) @vipin8797
- [ButtonBase] Fix focus ripple lingering after blur (#48650) @siriwatknp
- [InitColorSchemeScript] Server-render in tests for React 19.3 (#48604) @Janpot
- [Transition] Mount child in same commit when opening from unmounted (#48649) @siriwatknp

### `@mui/styled-engine@9.1.1`

- [styled-engine] Prevent enableCssLayer styles from being overridden by unlayered styles (#48603) @Janpot

### Docs

- Send SOURCE to Brevo on newsletter subscribe (#48633) @aemartos
- fix TypeScript heading capitalization (#48619) @ifer47
- Remove outdated security section (#48628) @oliviertassinari
- [legal] Update EULA links on website (#48642) @rluzists1

### Core

- Update dependencies to resolve Dependabot security alerts (#48641) @Janpot
- [core-docs] Pin StackBlitz demo vite to v7 and plugin-react to v5 (#48643) @Janpot
- [code-infra] Port codebase to use tsgo (#48616) @brijeshb42
- [docs-infra] Fix immutable cache headers for /\_next/static assets (#48655) @brijeshb42
- [docs-infra] Run link checker during docs build instead of as separate CI step (#48634) @Janpot
- [docs-infra] Support turbopack for docs (#48569) @brijeshb42
- [test] Cover docs landing-page composites with Argos (#48589) @LukasTy

All contributors of this release in alphabetical order: @aemartos, @brijeshb42, @ifer47, @Janpot, @LukasTy, @oliviertassinari, @rluzists1, @siriwatknp, @vipin8797

## 9.1.0

<!-- generated comparing v9.0.1..master -->

_Jun 8, 2026_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- ⚙️ Support for the [prefers-reduced-motion](https://mui.com/material-ui/transitions/#reduced-motion) setting.
- ♿️ Improved support for Windows High Contrast mode with the [enhanceHighContrast](https://mui.com/material-ui/customization/palette/#windows-high-contrast-mode) theme wrapper.

### `@mui/material@9.1.0`

- [autocomplete] Enable clearing highlight when mouse leaves popup (#48354) @mj12albert
- [autocomplete] Fix `freeSolo` controlled values cleared by initial `null` (#48611) @mj12albert
- [autocomplete] Fix item removal when it receives focus from VoiceOver before using Backspace (#48572) @silviuaavram
- [autocomplete] Fix `resetHighlightOnMouseLeave` JSdoc (#48536) @mj12albert
- [autocomplete] Guard against null inputRef during unmount (#48617) @noam3127
- [badge] Add `aria-hidden` to badge content and polish docs demos (#48471) @mj12albert
- [badge] Use inline CSS variables for anchorOrigin/overlap positioning (#48549) @siriwatknp
- [button] Fix customized flex gap styles (#48542) @mj12albert
- [dialog] Fix unwanted `DialogPaper` focus ring (#48535) @mj12albert
- [focus trap] Fix incorrect tab order when `tabIndex >= 1` (#48546) @mj12albert
- [progress] Show runtime errors only once (#48591) @silviuaavram
- [select] Allow spacebar to select elements (#48615) @silviuaavram
- [select] Support typeahead when closed (#48563) @mj12albert
- [step button] Choose higher contrast ripple color for dark mode focus (#48612) @silviuaavram
- [stepper] Include StepConnector inside Step element (#48492) @silviuaavram
- [stepper] Proper support for vertical alternativeLabel (#48485) @silviuaavram
- [tabs] Fix React 18 roving tabindex and dedupe invalid-value warning (#48605) @Janpot
- [theme] Add HighContrast theme enhancer (#48319) @silviuaavram
- [timeline item] Fix extra ::before spacing when TimelineOppositeContent is present (#46663) @tyalau
- [tooltip] Prevent stuck-open tooltip when child becomes disabled (#48606) @Janpot
- [transitions] Custom `Transition` component (#48325) @mj12albert
- [transitions] Support `prefers-reduced-motion` (#48357) @mj12albert

### `@mui/utils@9.1.0`

- [utils] Prevent prototype pollution in fastDeepAssign (#48580) @Janpot

### Docs

- [docs] Add function `slotProps` documentation (#48574) @mj12albert
- [docs] Clarify styled-components version compatibility (#48533) @nightt5879
- [docs] Fix broken URLs (#48520) @oliviertassinari
- [docs] Fix invalid JSON in Zed MCP setup example (#48490) @pavan-sh
- [docs] Mention release version for enhanceHighContrast (#48609) @silviuaavram
- [docs] Remove outdated MUI X v8 notification (#48600) @cherniavskii
- [docs] Remove redundant enhanceHighContrast information (#48632) @silviuaavram
- [docs-infra] Decrease loaded bundle size on docs (#48584) @brijeshb42
- [docs-infra] Drop multi-locale plumbing from API pages (#48370) @brijeshb42
- [docs-infra] Fix Cookie banner heading (#48529) @oliviertassinari
- [docs-infra] Infinitely cache all static assets (#48627) @brijeshb42
- [docs-infra] Remove outdated noSEOadvantage entries (#48527) @oliviertassinari
- [docs-infra] Restore build-only invariant throws via `NEXT_RUNTIME` guard (#48475) @Janpot
- [docs-infra] Test HTML validation in broken links checker (#48088) @Janpot
- [docs][icons] Fix Font Awesome Chip demo in dark mode (#48576) @siriwatknp
- [docs][icons] Remove redundant font awesome demo (#48493) @ZeeshanTamboli
- [docs][modal] Add nested modal guidance (#46507) @JakeSaterlay
- [docs][stepper] Fix focus management in examples (#48494) @silviuaavram

### Core

- Eslint markdown (#48371) @Janpot
- [agents] Fix some docs links (#48561) @silviuaavram
- [blog] Copy editing improvement on v9 announcement blog posts (#48543) @joserodolfofreitas
- [code-infra] Cleanup unused jss packages (#48590) @brijeshb42
- [code-infra] Collapse canary workflows into nightly and nightly-cron (#48556) @Janpot
- [code-infra] Convert @mui/private-theming to TypeScript (#48565) @Janpot
- [code-infra] Convert @mui/styled-engine to TypeScript (#48544) @Janpot
- [code-infra] Convert @mui/styled-engine-sc to TypeScript (#48577) @Janpot
- [code-infra] Fix duplicate resource_class in test_regressions CI job (#48601) @LukasTy
- [code-infra] Make @mui/internal-docs-utils compatible with TypeScript 6 (#48594) @Janpot
- [code-infra] Migrate CircleCI jobs to Gen2 resource classes (#48593) @LukasTy
- [code-infra] Parallelize visual regression screenshots (#48557) @Janpot
- [code-infra] Run nightly-cron on v7.x (#48579) @Janpot
- [core] Fix typescript@next typecheck (#48587) @Janpot
- [pnpm] Add security settings to pnpm-workspace.yaml (#48582) @Janpot
- [styled-engine-sc] Fix compatibility with Vite and Vitest (#48558) @mj12albert
- [test] Add axe-core tests for mui-material (#48341) @siriwatknp
- [test] Configure Tailwind CSS in the visual-regression app (#48575) @Janpot

All contributors of this release in alphabetical order: @brijeshb42, @cherniavskii, @JakeSaterlay, @Janpot, @joserodolfofreitas, @LukasTy, @mj12albert, @nightt5879, @noam3127, @oliviertassinari, @pavan-sh, @silviuaavram, @siriwatknp, @tyalau, @ZeeshanTamboli

## 9.0.1

<!-- generated comparing v9.0.0..master -->

_May 6, 2026_

A big thanks to the 25 contributors who made this release possible.

### `@mui/material@9.0.1`

- [accessibility] HighContrast mode on Avatar, Badge, Slider and Switch (#48320) @silviuaavram
- [autocomplete] Fix highlight sync and scroll preservation (#48322) @mj12albert
- [autocomplete] Fix input value and clear (#48263) @mj12albert
- [autocomplete] Fix iOS group scrollbar overflow (#48400) @oliviertassinari
- [autocomplete] Fix popper rendering issues (#48327) @mj12albert
- [autocomplete] Improve highlight tracking and selection state (#48219) @mj12albert
- [button] Fix `startIcon` alignment (#48332) @mj12albert
- [button][button base] Document `type` attribute (#48146) @mj12albert
- [button][fab][menu item][list item button] Remove duplicated className entries (#48213) @silviuaavram
- [checkbox] Set `aria-checked=mixed` when indeterminate (#48147) @mj12albert
- [circularprogress][linearprogress] Improve accessibility (#48172) @silviuaavram
- [dialog][drawer][focus trap] Fix initial focus target (#48280) @mj12albert
- [drawer] Fix swipe close flicker (#48372) @mj12albert
- [drawer] Fix transition jump (#48308) @mj12albert
- [focus trap] Remove IE 11-specific focus safety check from FocusTrap cleanup (#48368) @ZeeshanTamboli
- [form controls] Add internal `useFormControlState` hook (#48344) @mj12albert
- [icon button] Remove unused color palette mapping in styles (#48353) @sai6855
- [icons] Revert to using wildcard export paths (#48381) @brijeshb42
- [input] Fix layout shift with display: flex (#43839) @oliviertassinari
- [input] Prevent `notched` prop leaking into DOM (#48281) @mj12albert
- [input base] Place aria-label on the input element (#48283) @silviuaavram
- [inputs] Fix autofocus in SSR environment (#48290) @mj12albert
- [List] Fix sticky subheader overlapping iOS scrollbar (#48375) @sandeshdamkondwar
- [popper] Persist positioning styles when popperOptions changes reference (#48121) @mj12albert
- [select] Stop using combobox element for labeling (#48251) @silviuaavram
- [select] Support single-pointer-cycle selection and pointer cancellation (#48328) @mj12albert
- [switch] Fix incorrect `role` with `slotProps.input` (#48469) @mj12albert
- [tabs] Fix scrollable tabs blocking pointer events (#48166) @mj12albert
- [textfield] Fix autofill styles always in dark mode when CSS variables is used (#48244) @ZeeshanTamboli
- [tooltip] Simplify RTL styles using CSS logical properties (#48351) @sai6855
- [tooltip] Close Tooltip when its child becomes disabled (#44507) @chudesno
- [typography] Fix `h4` variant when using `responsiveFontSizes()` (#48314) @mj12albert
- [useMediaQuery] Fix crash in Firefox extension (#45196) @Mr-Quin

### `@mui/system@9.0.1`

- [system] Fix theme mutation when using responsive typography shorthand in sx (#48266) @tomups

### `@mui/codemod@9.0.1`

- [codemod] Add --jsx option to `v9.0.0/system-props` codemod (#48315) @siriwatknp
- [codemod] Add packageName support to the v9 system props codemod (#48253) @franco-dias

### `@mui/utils@9.0.1`

- [utils] Add shadow dom utils (#48256) @mj12albert
- [utils] Fix `resolveProps` receiving empty string className (#48289) @SAY-5
- [utils] Remove unnecessary `excludeKeys` from `extractEventHandlers` (#48481) @ZeeshanTamboli

### Docs

- [docs][autocomplete] Add demo with Tanstack Query `useInfiniteQuery` (#48356) @mj12albert
- [docs] Add agent skills for styling, theming, Next.js, and Tailwind CSS integrations (#48187) @mapache-salvaje
- [docs] Cleanup `@mui/base` (#48278) @mj12albert
- [docs] Fix create-playground script (#48380) @imazizbohra
- [docs] Fix date range calendar demo after MUI X v9 update (#48262) @LukasTy
- [docs] Fix icon search modal (#48255) @mj12albert
- [docs] Fix Material UI and MUI system "Upgrade to v9" docs (#48245) @ZeeshanTamboli
- [docs] Fix Popover JSdoc (#48310) @nitzan-treg
- [docs] Fix RTL toggle highlight in docs settings drawer (#48476) @sai6855
- [docs] Fix typos (#48155) @ayushshukla1807
- [docs] Fix typos (#48270) @pavan-sh
- [docs] Fix versions page (#48261) @mnajdova
- [docs] Fix vision grammar (#48477) @pavan-sh
- [docs] Improve accessibility for select examples (#48250) @silviuaavram
- [docs] Improve CSP guide with required directives (#48258) @Janpot
- [docs] Link to agent skills in relevant docs (#48387) @mapache-salvaje
- [docs] Make NumberField described by helper text (#48257) @silviuaavram
- [docs] Remove esm.sh references and endorsement (#44649) (#48330) @starboyvarun
- [docs] Remove generated CSS utility component doc (#48383) @mj12albert
- [docs] Remove incorrect message from experiments page and hide `/experiments` from crawlers (#48297) @ZeeshanTamboli
- [docs] Remove outdated references of .ttf and .woff (#48399) @oliviertassinari
- [docs] Restore wider maxWidth for `disableToc` pages (#48260) @LukasTy
- [docs] Show v9 announcement banner (#48242) @mnajdova
- [docs] Sync team members from frontend-public endpoint (#48273) @Janpot
- [docs] Update AGENTS.md testing section (#48392) @mj12albert
- [docs] Update e2e test README and test error message (#48285) @ZeeshanTamboli
- [docs] Update menu examples to always have aria-expanded (#48211) @silviuaavram
- [docs] Update MUI Treasury links (#47760) @siriwatknp
- [docs] Update MUI X dependencies to v9.0.0 (#48231) @siriwatknp
- [docs] Update MUI X roadmap section (#48316) @siriwatknp
- [docs] Update WCAG links and version from 2.1 to 2.2 (#48379) @mj12albert
- [docs] Use `React.useId()` for demo IDs (#48300) @Janpot

### Core

- [blog] Introducing Material UI and MUI X v9 (#48157) @joserodolfofreitas
- [code-infra] bundle size check internal core docs (#48390) @Janpot
- [code-infra] Deduplicate vale script (#48385) @brijeshb42
- [code-infra] Fix type shadowing (#48389) @Janpot
- [code-infra] Migrate to vite from webpack for e2e tests (#48248) @brijeshb42
- [code-infra] Remove a few ts-ignore comments (#43265) @Janpot
- [code-infra] Remove no longer needed `eslint-import-resolver-webpack` package (#48207) @ZeeshanTamboli
- [code-infra] Remove references to @mui/base and @mui/joy (#48358) @brijeshb42
- [code-infra] Use vale rules from code-infra package (#48173) @brijeshb42
- [core] Remove next.mui.com links (#48240) @mnajdova
- [core-docs] Use type-only imports for type-only references (#48386) @JCQuintas
- [docs-infra] Add x-chat to MuiProductId type and product switcher (#48209) @hasdfa
- [docs-infra] Fix duplicate JSDoc in proptypes generation (#48304) @brijeshb42
- [docs-infra] Fix duplicate JSDoc in proptypes generation for merged declarations (#48296) @brijeshb42
- [docs-infra] Fix import of cjs react-simple-code-editor in esm (#48349) @brijeshb42
- [docs-infra] Fix tab index on Base UI tab (#48345) @brijeshb42
- [docs-infra] Migrate docs app container/frame components (#48182) @brijeshb42
- [docs-infra] Migrate MarkdownDocs component to docs package (#48227) @brijeshb42
- [docs-infra] Re-apply changes from previous revert (#48243) @brijeshb42
- [docs-infra] Remove infra around the i18n setup (#48360) @brijeshb42
- [docs-infra] Rename package to @mui/internal-api-docs-builder (#48230) @brijeshb42
- [docs-infra] Revert JSDoc in proptypes generation for merged declarations (#48301) @brijeshb42
- [docs-infra] Revert Migrate docs app container/frame components (#48239) @brijeshb42
- [docs-infra] Revert Migrate MarkdownDocs component to docs package (#48238) @brijeshb42
- [internal] Add missing #host-reference (#48226) @silviuaavram
- [internal] Move changelog and update security page for post v9 release (#48298) @siriwatknp
- [internal] Remove outdated .woff files (#48398) @oliviertassinari
- [test] Fix autocomplete test description (#48395) @ZeeshanTamboli

All contributors of this release in alphabetical order: @ayushshukla1807, @brijeshb42, @chudesno, @franco-dias, @hasdfa, @imazizbohra, @Janpot, @JCQuintas, @joserodolfofreitas, @LukasTy, @mapache-salvaje, @mj12albert, @mnajdova, @Mr-Quin, @nitzan-treg, @oliviertassinari, @pavan-sh, @sai6855, @sandeshdamkondwar, @SAY-5, @silviuaavram, @siriwatknp, @starboyvarun, @tomups, @ZeeshanTamboli

## 9.0.0

<!-- generated comparing v9.0.0-beta.1..master -->

_Apr 7, 2026_

A big thanks to the 7 contributors who made this release possible.

🥳 We're excited to announce the stable release of Material UI v9! This major release focus on accessibility improvements, sx prop performance, and cleanup of deprecated APIs.

For more details, check out the [upgrade guide](https://mui.com/material-ui/migration/upgrade-to-v9/).

### `@mui/material@9.0.0`

- [slider] Use pointer events instead of mouse events (#48164) @mj12albert
- [switch] Add border to make it visible in high contrast mode (#48180) @silviuaavram
- [transitions] Performance improvements & misc fixes (#48151) @mj12albert
- Remove unnecessary overridesResolvers from styled components (#48204) @sai6855

### Core

- [code-infra] Setup workflow to publish internal packages (#47952) @brijeshb42
- [core-docs] Add `x-scheduler` to `MuiProductId` type (#48185) @rita-codes
- [docs-infra] Add scheduler to product switcher (#48208) @rita-codes
- [internal] Prepare libraries for v9 stable release (#48206) @siriwatknp

All contributors of this release in alphabetical order: @brijeshb42, @mj12albert, @noraleonte, @rita-codes, @sai6855, @silviuaavram, @siriwatknp

## 9.0.0-beta.1

<!-- generated comparing v9.0.0-beta.0..master -->

_Apr 2, 2026_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@9.0.0-beta.1`

#### Breaking Changes

- [grid] Remove 'column' and 'column-reverse' options from `direction` prop (#47564) @sai6855
- [icons] Remove legacy `*Outline` icons (#48116) @mj12albert
- [list-item-icon] Use theme spacing instead of hardcoded minWidth (#46597) @adiitxa

#### Changes

- [all components] Fix `slotProps.transition` types (#48153) @mj12albert
- [alert][dialog] Accessibility improvements (#48113) @silviuaavram
- [autocomplete] Fix helper text focusing input when clicked (#48156) @mj12albert
- [button-base] Add `nativeButton` prop (#47989) @mj12albert
- [input] Fix high contrast cutoff on first character (#48150) @silviuaavram
- [menu] Fix empty roving focus container (#48114) @mj12albert
- [utils] Explicitly register roving tab items with parent (#48122) @mj12albert

### Docs

- Fix HTML validation errors (#48107) @Janpot
- Fix duplicate IDs and HTML validation issues (#48095) @Janpot
- Fix the dark mode footer row shadow for the Data Grid on the advanced components page (#48149) @arminmeh
- Improve jsdom section (#48098) @oliviertassinari
- Update "Deprecated APIs removed" section to h2 in "Upgrade to v9" docs (#48115) @ZeeshanTamboli
- [docs][progress] Label all demo components (#48143) @mj12albert
- [docs-infra] Add x-scheduler to component API URL resolver (#48097) @rita-codes
- [docs-infra] Resolve some redirects (#48165) @Janpot
- [docs-infra] Update v9 Search Index (#48028) @dav-is

### Core

- [code-infra] Discover exports for bundle size report (#48170) @Janpot
- [internal] Fix use of ellipsis (#48096) @oliviertassinari
- [test] Add screenshot test for Virtualized Table (#47947) @mnajdova
- [test] Remove `componentsProp` from `describeConformance` tests (#48142) @ZeeshanTamboli
- [theme] Do not create channel tokens for custom colors when `nativeColor` is used (#47765) @ZeeshanTamboli

All contributors of this release in alphabetical order: @adiitxa, @arminmeh, @dav-is, @Janpot, @mj12albert, @mnajdova, @oliviertassinari, @rita-codes, @sai6855, @silviuaavram, @ZeeshanTamboli

## 9.0.0-beta.0

<!-- generated comparing v9.0.0-alpha.4..master -->

_Mar 25, 2026_

A big thanks to the 8 contributors who made this release possible.

### `@mui/material@9.0.0-beta.0`

#### Breaking Changes

- [linear-progress] Remove deprecated CSS classes (#48068) @mj12albert
- [list-item, list-item-text] Remove deprecated props (#48042) @siriwatknp
- [button-group] Remove deprecated classes (#48043) @siriwatknp
- [card] Remove deprecated CardHeader props (#47995) @silviuaavram
- [checkbox][radio][switch] Remove deprecated inputProps and inputRef (#48059) @siriwatknp
- [chip] Remove deprecated classes (#48046) @silviuaavram
- [dialog][modal][drawer][swipeabledrawer] Remove deprecated props and classes (#48039) @silviuaavram
- [divider] Remove deprecated CSS classes (#48075) @siriwatknp
- [drawer] Remove deprecated CSS classes (#48077) @siriwatknp
- [image-list-item-bar] Remove deprecated CSS classes (#48064) @siriwatknp
- [inputs] Remove deprecated props & classes (#48071) @mj12albert
- [material-ui] Remove unnecessary overridesResolvers from styled components (#48082) @ZeeshanTamboli
- [material-ui][system] Remove deprecated system props from Box, Stack, Typography (#48072) @siriwatknp
- [pagination-item] Remove deprecated CSS classes (#48076) @siriwatknp
- [pagination-item] Remove deprecated props (#48038) @siriwatknp
- [rating] Remove deprecated IconContainerComponent (#48019) @siriwatknp
- [select] Remove deprecated CSS classes (#48065) @mj12albert
- [slider] Remove deprecated CSS classes (#48074) @siriwatknp
- [step-connector][step-content][step-label] Remove deprecated props and classes (#48058) @siriwatknp
- [tabs][tab] Remove deprecated CSS classes (#48078) @siriwatknp
- [table-pagination][table-sort-label] Remove deprecated props and classes (#48060) @siriwatknp
- [toggle-button-group] Remove deprecated classes (#48061) @siriwatknp

#### Changes

- [system] Improve performance when using sx prop (#44254) @romgrk

### `@mui/codemod@9.0.0-beta.0`

- [codemod] Add missing codemod links in upgrade guide (#48069) @silviuaavram

### Docs

- Mention all breaking changes in changelog (#48091) @silviuaavram
- Fix link to upgrade-to-v9 docs in release CHANGELOG (#48081) @ZeeshanTamboli

### Core

- Update browserslistrc (#48085) @silviuaavram
- [code-infra] Prevent major version updates of bundler/framework packages in bundling fixtures (#48062) @Copilot
- [code-infra][icons-material] Avoid material utils barrel in createSvgIcon (#48029) @anchmelev
- [docs-infra] Migrate more leaf components to mui-docs (#48018) @brijeshb42

All contributors of this release in alphabetical order: @anchmelev, @brijeshb42, @Copilot, @mj12albert, @romgrk, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.4

<!-- generated comparing v9.0.0-alpha.3..master -->

_Mar 20, 2026_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@9.0.0-alpha.4`

#### Breaking Changes

- [accordion] Remove deprecated props (#47963) @silviuaavram
  - `TransitionComponent`
  - `TransitionProps`
- [accordionsummary] Remove deprecated CSS class (#48006) @silviuaavram
  - `contentGutters`
- [alert] Remove deprecated CSS classes (#48011) @silviuaavram
  - `standardSuccess`
  - `standardInfo`
  - `standardWarning`
  - `standardError`
  - `outlinedSuccess`
  - `outlinedInfo`
  - `outlinedWarning`
  - `outlinedError`
  - `filledSuccess`
  - `filledInfo`
  - `filledWarning`
  - `filledError`
- [alert] Remove deprecated props (#47965) @silviuaavram
  - `components`
  - `componentsProps`
- [autocomplete] Remove deprecated props (#47864) @ZeeshanTamboli
  - `ChipProps`
  - `componentsProps`
  - `ListboxComponent`
  - `ListboxProps`
  - `PaperComponent`
  - `PopperComponent`
  - `renderTags`
- [avatar] Remove deprecated props (#47966) @silviuaavram
  - `imgProps`
- [avatargroup] Remove deprecated props (#47968) @silviuaavram
  - `componentsProps`
- [backdrop] Remove deprecated props (#47991) @silviuaavram
  - `components`
  - `componentsProps`
  - `TransitionComponent`
- [badge] Remove deprecated props (#47993) @silviuaavram
  - `components`
  - `componentsProps`
- [button] Remove deprecated CSS classes (#48012) @silviuaavram
  - Color variant classes: `textInherit`, `outlinedPrimary`, `containedSecondary`, etc.
  - Size classes: `textSizeSmall`, `iconSizeMedium`, etc.
- [circularprogress] Remove deprecated CSS classes (#48014) @silviuaavram
  - `circleDeterminate`
  - `circleIndeterminate`
- [divider] Remove deprecated prop (#48013) @atharva3333
  - `light`
- [formcontrollabel] Remove deprecated props (#48032) @atharva3333
  - `componentsProps`
- [menu] Remove deprecated props (#48021) @siriwatknp
  - `MenuListProps`
  - `PaperProps`
  - `TransitionProps`
- [mobilestepper] Remove deprecated props (#48041) @siriwatknp
  - `LinearProgressProps`
- [popover] Remove deprecated props (#48021) @siriwatknp
  - `BackdropComponent`
  - `BackdropProps`
  - `PaperProps`
  - `TransitionComponent`
  - `TransitionProps`
- [popper] Remove deprecated props (#48020) @siriwatknp
  - `components`
  - `componentsProps`
- [select] Remove deprecated props passed via `MenuProps` (#48021) @siriwatknp
  - `MenuListProps`
  - `PaperProps`
  - `TransitionProps`
- [slider] Remove deprecated props (#47996) @siriwatknp
  - `components`
  - `componentsProps`
- [speeddial] Remove deprecated props (#47998) @siriwatknp
  - `TransitionComponent`
  - `TransitionProps`
- [speeddialaction] Remove deprecated props (#47998) @siriwatknp
  - `FabProps`
  - `tooltipTitle`
  - `tooltipPlacement`
  - `tooltipOpen`
  - `TooltipClasses`
- [tabs] Remove deprecated props (#48017) @siriwatknp
  - `ScrollButtonComponent`
  - `TabIndicatorProps`
  - `TabScrollButtonProps`
  - `slots.StartScrollButtonIcon`
  - `slots.EndScrollButtonIcon`
- [textfield] Remove deprecated props (#47878) @ZeeshanTamboli
  - `InputProps`
  - `inputProps`
  - `SelectProps`
  - `InputLabelProps`
  - `FormHelperTextProps`
- [tooltip] Remove deprecated props (#47988) @siriwatknp
  - `components`
  - `componentsProps`
  - `PopperComponent`
  - `PopperProps`
  - `TransitionComponent`
  - `TransitionProps`
- [typography] Remove deprecated prop (#47986) @siriwatknp
  - `paragraph`
- [buttonbase] Key handlers should not run on a disabled non-native button (#48003) @mj12albert
- [tablepagination] Format pagination numbers according to locale (#47803) @siriwatknp
- [textfield] Use non-native label for `<TextField select/>` (#47958) @mj12albert

Check out the [v9 upgrade guide](https://mui.com/material-ui/migration/upgrade-to-v9/).

#### Changes

- [autocomplete] Optimize selected option lookup (#47953) @anchmelev
- [buttonbase] Fix native button detection (#47985) @mj12albert
- [inputbase] Fix test using removed InputProps on TextField (#48000) @siriwatknp
- [popper] Add missing classes export (#48031) @mj12albert
- [select] Fix focus visible always set on menu item (#47912) @silviuaavram
- [slider] Fix focus visible styles incorrectly applied by pointer (#47894) @mj12albert
- [slider] Accept readonly array for the value prop (#47936) @pcorpet

### `@mui/codemod@9.0.0-alpha.4`

- [codemod] Add slot key rename to `tabs-props` codemod and add to README (#48035) @siriwatknp
- [codemod] Add card-header-props migration guide (#48005) @siriwatknp

### Docs

- [blog] Lowercase 2026-MUI-X-price-changes blog post URL (#47871) @Janpot
- [docs] Wide docs layout (#47950) @noraleonte
- [docs] Mention the list of props removed in upgrade guide (#48010) @silviuaavram
- [docs] Update Autocomplete deprecated props removal migration guide docs (#47990) @ZeeshanTamboli
- [docs-infra] Extract shared App component from \_app into @mui/docs (#47933) @brijeshb42
- [docs-infra] Expose global theme object (#47964) @Janpot
- [docs][system] Update `styled` API docs for easier understanding (#47957) @olivier-lxo

### Core

- [code-infra] Add pkg-pr-new as dev dependency (#47992) @Janpot
- [code-infra] Remove CI coverage collection and upload to Codecov (#47930) @Janpot
- [core] Migrate to ESLint 10 (#47872) @brijeshb42
- [core] Remove GridLegacy component (#47956) @siriwatknp

All contributors of this release in alphabetical order: @anchmelev, @atharva3333, @brijeshb42, @Janpot, @mj12albert, @noraleonte, @olivier-lxo, @pcorpet, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.3

<!-- generated comparing v9.0.0-alpha.2..master -->

_Mar 12, 2026_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- 📖 A new [Menubar](https://mui.com/material-ui/react-menubar/) component page integrated with [Base UI](https://base-ui.com/react/components/menubar)
- ♿️ Improved the Roving TabIndex keyboard navigation for the Stepper, Tabs and MenuList components.

### `@mui/material@9.0.0-alpha.3`

#### Breaking Changes

- [stepper][menulist][tabs] Improve accessibility (#47687) @silviuaavram

#### Changes

- [autocomplete] Add `root` slot (#47852) @GerardasB
- [autocomplete] Fix popup reopening on window focus regain with openOnFocus (#47790) @aman44444
- [autocomplete] Support full slots for clearIndicator and popupIndicator (#47891) @silviuaavram
- [material-ui] Partially revert "[material-ui] Clean up duplicated CSS rules (#47838)" (#47927) @sai6855

### Docs

- [docs][codemod] Add v7 migration docs for deprecated Autocomplete APIs and Autocomplete codemod (#47945) @ZeeshanTamboli
- [docs] Update faq about vendor chunks (#47747) @Janpot
- [docs] Use direct palette vars in Tailwind v4 snippet (#47940) @Ahmad-Alaziz
- [docs][menubar] Add Menubar component page (#47616) @siriwatknp

### Core

- [core] Fix the release prepare steps (#47951) @silviuaavram
- [core] Remove Joy UI code and docs (#47939) @mnajdova
- [code-infra] Add previously missed export of themeCssVarsAugmentation (#47918) @brijeshb42
- [docs-infra] Import font module for nextjs transpilation (#47935) @brijeshb42
- [docs-infra] Migrate simpler modules from docs to mui-docs (#47897) @brijeshb42
- [test] Fix detached anchorEl elements in tests (#47929) @Janpot

All contributors of this release in alphabetical order: @Ahmad-Alaziz, @aman44444, @brijeshb42, @GerardasB, @Janpot, @mnajdova, @sai6855, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.2

<!-- generated comparing v9.0.0-alpha.1..master -->

_Mar 5, 2026_

A big thanks to the 4 contributors who made this release possible.

### @mui/material@9.0.0-alpha.2

- Clean up duplicated CSS rules (#47838) @sai6855

### @mui/system@9.0.0-alpha.2

- Refactor sortContainerQueries to define regex outside of sort function (#47817) @sai6855

### Docs

- Move shared components to @mui/docs package (#47672) @Janpot
- Fix small typo in NumberField page (#47877) @arthur-plazanet

### Core

- [code-infra] Reduce paths for attw checks (#47896) @brijeshb42
- [docs-infra] Run syncTeamMembers (#47900) @Janpot

All contributors of this release in alphabetical order: @arthur-plazanet, @brijeshb42, @Janpot, @sai6855

## 9.0.0-alpha.1

<!-- generated comparing v9.0.0-alpha.0..master -->

_Feb 26, 2026_

A big thanks to the 13 contributors who made this release possible. Here are some highlights ✨:

### @mui/material@9.0.0-alpha.1

#### Breaking Changes

- [Autocomplete] Prevents Autocomplete menu from opening on right click (#47797) @silviuaavram
- [Backdrop] Remove aria-hidden by default (#47798) @silviuaavram
- [ButtonBase] Ensure that onClick propagates when non-native button is clicked (#47800) @silviuaavram
- [Dialog][Modal] Remove `disableEscapeKeyDown` prop (#47695) @silviuaavram
- [Grid] Remove system props support (#47846) @siriwatknp
- [theme] Remove MuiTouchRipple from theme component types (#47849) @siriwatknp
- [useAutocomplete] Improve isOptionEqualToValue value argument type (#47801) @silviuaavram

#### Changes

- [TableCell][theme] Apply `alpha` before color mixing to border bottom color when nativeColor + cssVariables is used (#47762) @ZeeshanTamboli
- [Tooltip] Fix error is thrown when wrapping an input which is disabled while focused (#47684) @ZeeshanTamboli

### Docs

- [docs] Add updated community theme resource (#47847) @PeterTYLiu
- [docs] Few copy fixes (#47806) @pavan-sh
- [docs] Fix IPA reader link in blog post (#47796) @pavan-sh
- [docs] Fix JSX in Overriding component structure docs (#47799) @ZeeshanTamboli
- [docs] Fix the keyboard navigation in GroupedMenu example (#47842) @silviuaavram
- [docs] Fix Theme builder video (#47835) @oliviertassinari
- [docs] Update pricing sankey as done (#47795) @alexfauquette
- [docs][system] Update sizing docs to clarify `(0, 1]` behavior. (#47845) @matthias-ccri

### Core

- [blog] Blogpost for upcoming price changes for MUI X (#47748) @DanailH
- [code-infra] Detect browser envs that don't support layout (#47813) @Janpot
- [code-infra] Enable undefined addition to optional properties (#47750) @brijeshb42
- [code-infra] Exclusively enable test mode in jsdom (#47812) @Janpot
- [code-infra] Fix console.warn during test (#47802) @Janpot
- [code-infra] Remove vale as a workspace dependency (#47860) @brijeshb42
- [code-infra] Setup flat build for packages (#47670) @brijeshb42
- [code-infra] Upgrade react-docgen to v8 (#47685) @JCQuintas
- [docs-infra] Reapply Cookie Banner with Design Fixes (#47744) @dav-is
- [internal] Remove legacy MUI Base API docs (#47804) @ZeeshanTamboli

All contributors of this release in alphabetical order: @alexfauquette, @brijeshb42, @DanailH, @dav-is, @Janpot, @JCQuintas, @matthias-ccri, @oliviertassinari, @pavan-sh, @PeterTYLiu, @silviuaavram, @siriwatknp, @ZeeshanTamboli

## 9.0.0-alpha.0

<!-- generated comparing v7.3.8..master -->

_Feb 17, 2026_

A big thanks to the 3 contributors who made this release possible.

### @mui/material@9.0.0-alpha.0

- [theme] Generate `color-mix` value on top of default generated Material UI CSS variables (#47767) @ZeeshanTamboli

### Docs

- [docs] Make tooltips describe their visible text triggers (#47658) @silviuaavram
- [docs][theme] Fix `nativeColor` docs (#47759) @ZeeshanTamboli

### Core

- [blog] A pattern for opt-in type-only breaking changes in minor versions (#47622) @bernardobelchior
- [internal] Prepare libraries for first v9 alpha release (#47756) @silviuaavram

All contributors of this release in alphabetical order: @bernardobelchior, @silviuaavram, @ZeeshanTamboli

## Older versions

Changes before 9.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).

Note: v8 is skipped to align the release version with MUI X v9.
