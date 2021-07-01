# Réduire la taille du bundle

<p class="description">En savoir plus sur les outils que vous pouvez utiliser pour réduire la taille du bundle.</p>

## La taille du bundle compte

The bundle size of Material-UI is taken very seriously. Size snapshots are taken on every commit for every package and critical parts of those packages ([view the latest snapshot](/size-snapshot)). Combined with [dangerJS](https://danger.systems/js/) we can inspect [detailed bundle size changes](https://github.com/mui-org/material-ui/pull/14638#issuecomment-466658459) on every Pull Request.

## When and how to use tree-shaking?

Tree-shaking of Material-UI works out of the box in modern frameworks. Material-UI exposes its full API on the top-level `material-ui` import. If you're using ES6 modules and a bundler that supports tree-shaking ([`webpack` >= 2.x](https://webpack.js.org/guides/tree-shaking/), [`parcel` with a flag](https://en.parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support)) you can safely use named imports and still get an optimized bundle size automatically:

```js
import { Button, TextField } from '@material-ui/core';
```

⚠️ The following instructions are only needed if you want to optimize your development startup times or if you are using an older bundler that doesn't support tree-shaking.

## Development environment

Development bundles can contain the full library which can lead to **slower startup times**. This is especially noticeable if you import from `@material-ui/icons`. Startup times can be approximately 6x slower than without named imports from the top-level API.

If this is an issue for you, you have various options:

### Option 1

You can use path imports to avoid pulling in unused modules. For instance, use:

```js
// 🚀 Fast
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
```

instead of top level imports (without a Babel plugin):

```js
import { Button, TextField } from '@material-ui/core';
```

This is the option we document in all the demos, since it requires no configuration. It is encouraged for library authors extending the components. Head to [Option 2](#option-2) for the approach that yields the best DX and UX.

While importing directly in this manner doesn't use the exports in [the main file of `@material-ui/core`](https://unpkg.com/@material-ui/core), this file can serve as a handy reference as to which modules are public.

Be aware that we only support first and second level imports. Anything deeper is considered private and can cause issues, such as module duplication in your bundle.

```js
// ✅ OK
import { Add as AddIcon } from '@material-ui/icons';
import { Tabs } from '@material-ui/core';
//                                 ^^^^ 1st or top-level

// ✅ OK
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
//                                  ^^^^ 2nd level

// ❌ NOT OK
import TabIndicator from '@material-ui/core/Tabs/TabIndicator';
//                                               ^^^^^^^^^^^^ 3rd level
```

If you're using `eslint` you can catch problematic imports with the [`no-restricted-imports` rule](https://eslint.org/docs/rules/no-restricted-imports). The following `.eslintrc` configuration will highlight problematic imports from `@material-ui` packages:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"]
      }
    ]
  }
}
```

### Option 2

This option provides the best User Experience and Developer Experience:

- UX: The Babel plugin enables top level tree-shaking even if your bundler doesn't support it.
- DX: The Babel plugin makes startup time in dev mode as fast as Option 1.
- DX: This syntax reduces the duplication of code, requiring only a single import for multiple modules. Overall, the code is easier to read, and you are less likely to make a mistake when importing a new module.

```js
import { Button, TextField } from '@material-ui/core';
```

However, you need to apply the two following steps correctly.

#### 1. Configure Babel

Pick one of the following plugins:

- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) with the following configuration:

  `yarn add -D babel-plugin-import`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];

  module.exports = { plugins };
  ```

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) with the following configuration:

  `yarn add -D babel-plugin-transform-imports`

  Create a `.babelrc.js` file in the root directory of your project:

  ```js
  const plugins = [
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          transform: '@material-ui/core/${member}',
          preventFullImport: true,
        },
        '@material-ui/icons': {
          transform: '@material-ui/icons/${member}',
          preventFullImport: true,
        },
      },
    ],
  ];

  module.exports = { plugins };
  ```

If you are using Create React App, you will need to use a couple of projects that let you use `.babelrc` configuration, without ejecting.

`yarn add -D react-app-rewired customize-cra`

Create a `config-overrides.js` file in the root directory:

```js
"scripts": {
-  "start": "react-scripts start"
+  "start": "react-app-rewired start"
  }
```

If you wish, `babel-plugin-import` can be configured through `config-overrides.js` instead of `.babelrc` by using this [configuration](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options).

Modify your `package.json` start command:

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

Enjoy significantly faster start times.

#### 2. Convert all your imports

Finally, you can convert your existing codebase to this option with this [top-level-imports codemod](https://www.npmjs.com/package/@material-ui/codemod#top-level-imports). It will perform the following diffs:

```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```

## Available bundles

The package published on npm is **transpiled**, with [Babel](https://github.com/babel/babel), to take into account the [supported platforms](/getting-started/supported-platforms/).

⚠️ In order to minimize duplication of code in users' bundles, library authors are **strongly discouraged** to import from any of the other bundles.

### Modern bundle

The modern bundle can be found under the [`/modern` folder](https://unpkg.com/@material-ui/core/modern/). It targets the latest released versions of evergreen browsers (Chrome, Firefox, Safari, Edge). This can be used to make separate bundles targeting different browsers.

### Legacy bundle

If you need to support IE 11 you cannot use the default or modern bundle without transpilation. However, you can use the legacy bundle found under the [`/legacy` folder](https://unpkg.com/@material-ui/core/legacy/). You don't need any additional polyfills.
