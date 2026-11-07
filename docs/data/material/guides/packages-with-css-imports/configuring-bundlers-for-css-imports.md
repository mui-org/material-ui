# Configuring Bundlers for Packages with CSS Imports

<p class="description">Learn how to configure popular bundlers to correctly handle CSS imports from within npm packages.</p>

When working with npm packages that include CSS imports directly within their files, it's crucial to ensure the project's bundler is correctly configured to handle these styles. This guide provides an overview of how various popular bundlers support such packages and any necessary configuration change required.

## Next.js

### App Router

✅ Works out of the box.

### Pages Router

❌ Configuration change is required.

Add the desired package(s) to the `transpilePackages` array item.

```js title="next.config.mjs"
const nextConfig = {
  // ...rest of the config
  transpilePackages: ['@mui/x-data-grid'],
};

export default nextConfig;
```

## Parcel

✅ Works out of the box.

## Rsbuild

✅ Works out of the box.

## Rspack

✅ Works out of the box.

## Vite

### For client side apps

✅ Works out of the box.

### For apps using Vite's SSR

❌ Works with a minor configuration change.

Add the desired packages to `ssr.noExternal` array.

```ts title="vite.config.ts"
import { defineConfig } from 'vite';
// ...

export default defineConfig({
  plugins: [
    // plugins,
  ],
  ssr: {
    noExternal: ['@mui/x-data-grid'],
  },
});
```

## webpack

❌ Configuration change is required.

We'll have to configure `css-loader` to target CSS files within `node_modules` of the packages.

In both the development and production modes, we'll need to add one more loader to `module.rules` key of the config as shown.

Development mode -

```js title="webpack.config.js"
module.exports = {
  module: {
    rules: [
      // rest of the loaders
      {
        test: /node_modules\/(@mui\/x-data-grid|package2)\/(.*)\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

Make sure that `css-loader` and `style-loader` is already installed.

Production mode -

```js title="webpack.config.js"
module.exports = {
  module: {
    rules: [
      // rest of the loaders
      {
        test: /node_modules\/(@mui\/x-data-grid|package2)\/(.*)\.css$/,
        use: [
          // or add other minifier's loader as per your app
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};
```

These rules specifically target CSS files within packages inside `node_modules`. If there's already a CSS loader configured for app specific CSS files, make sure to add the `exclude: /node_modules/` key so that the same CSS file doesn't go through both the loaders.

## Node.js

❌ Configuration change is required.

To run scripts directly with Node.js (or Bun) where CSS imports are also involved, we need to configure loader for the runtime to ignore such imports. At the bare minimum, we need a loader file and slight modification to the script invocation.

```js title="loader.js"
function load(url, context, nextLoad) {
  if (url.substring(url.length - 4) === '.css') {
    return {
      format: 'module',
      shortCircuit: true,
      source: '',
    };
  }

  // Do default loading for other files
  return nextLoad(url, context);
}

// Or
// exports.load = load;
// for CJS
export { load };
```

and modify the script call -

```json title="package.json"
{
  "scripts": {
    "start": "node --loader ./loader.js my-script.js"
  }
}
```

This might log a warning for older Node.js version like -

```bash
(node:56826) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
```

In that case, the script call would be -

```json title="package.json"
{
  "scripts": {
    "start": "node --import 'data:text/javascript,import { register } from \"node:module\"; import { pathToFileURL } from \"node:url\"; register(\"./loader.js\", pathToFileURL(\"./\"));' my-script.js"
  }
}
```

## Conclusion

Most modern bundlers handle CSS imports from npm packages quite well, often requiring no extra setup. However, certain setups like webpack or specific server-rendering contexts might need explicit configuration to transpile or correctly process these packages.

Feel free to open a PR to this doc (through `Edit this page` link at the bottom) if certain runtimes or bundler configurations are wrong or missing.
