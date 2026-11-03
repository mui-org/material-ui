import * as path from 'path';
import * as fs from 'node:fs/promises';
import * as colors from '@mui/material/colors';

// #host-reference
// use netlify deploy preview if you want to test changes
const HOST = 'https://next.mui.com/';

function getColorHref(name, variant) {
  return `static/colors-preview/${name}-${variant}-24x24.svg`;
}

function buildColorType(name, variants) {
  const typesFilename = path.resolve(__dirname, `../packages/mui-material/src/colors/${name}.d.ts`);

  const typescript = `
/**
 * ${Object.entries(variants)
   .map((entry) => {
     const [variant] = entry;

     return `![${name} ${variant}](${HOST}${getColorHref(name, variant)})`;
   })
   .join(' ')}
 */
declare const ${name}: {
${Object.entries(variants)
  .map((entry) => {
    const [variant, color] = entry;

    return `  /**
   * Preview: ![${name} ${variant}](${HOST}${getColorHref(name, variant)})
   */
  ${variant}: '${color}';`;
  })
  .join('\n')}
};

export default ${name};
`;

  return fs.writeFile(typesFilename, typescript, { encoding: 'utf8' });
}

function buildColorPreviews(name, variants) {
  const nextPublicPath = path.resolve(__dirname, '../docs/public/');

  return Promise.all(
    Object.entries(variants).map(async (variantEntry) => {
      const [variant, color] = variantEntry;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
<rect width="100%" height="100%" fill="${color}"/>
</svg>`;
      const filename = path.resolve(nextPublicPath, getColorHref(name, variant));
      await fs.writeFile(filename, svg, { encoding: 'utf8' });
    }),
  );
}

// #host-reference
/**
 * The goal is to have a preview of the actual color and the color string in IntelliSense
 * We create for each color an svg that is filled with that color and reference
 * that svg in the corresponding JSDoc.
 * Since we use https://next.mui.com as a reference changes are only visible
 * after release
 */
async function main() {
  await Promise.all(
    Object.entries(colors).map(async (entry) => {
      const [name, variants] = entry;

      await Promise.all([buildColorPreviews(name, variants), buildColorType(name, variants)]);
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(error.code || 1);
});
