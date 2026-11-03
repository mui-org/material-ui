import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * README
 *
 * Optimize PNG/JPEG images in place using sharp (reduce file size, optionally cap width).
 *
 * Usage:
 * - `node docs/scripts/optimizeImages.mjs <path...>` optimize one or more images
 * - `node docs/scripts/optimizeImages.mjs --max-width=1600 <path...>` also downscale wider images
 * - `node docs/scripts/optimizeImages.mjs --quality=80 <path...>` set output quality (default 80)
 * - `node docs/scripts/optimizeImages.mjs --no-palette <path...>` disable PNG palette quantization
 *
 * Notes:
 * - Palette quantization (on by default) is lossy but ideal for flat UI graphics/screenshots.
 *   Disable it with `--no-palette` for photographic images to avoid banding.
 * - Files are rewritten in place; commit only after visually verifying the result.
 */

function parseArgs(argv) {
  const options = { maxWidth: Infinity, quality: 80, palette: true };
  const files = [];
  for (const arg of argv) {
    if (arg.startsWith('--max-width=')) {
      options.maxWidth = Number(arg.slice('--max-width='.length));
    } else if (arg.startsWith('--quality=')) {
      options.quality = Number(arg.slice('--quality='.length));
    } else if (arg === '--no-palette') {
      options.palette = false;
    } else {
      files.push(arg);
    }
  }
  return { options, files };
}

async function optimize(file, options) {
  const before = (await fs.stat(file)).size;
  const meta = await sharp(file).metadata();
  const pipeline = sharp(file).resize({
    width: Math.min(meta.width, options.maxWidth),
    withoutEnlargement: true,
  });

  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline.jpeg({ quality: options.quality, mozjpeg: true });
  } else {
    pipeline.png({
      quality: options.quality,
      compressionLevel: 9,
      effort: 10,
      palette: options.palette,
    });
  }

  const buf = await pipeline.toBuffer();
  await fs.writeFile(file, buf);
  const out = await sharp(buf).metadata();
  const mb = (bytes) => (bytes / 1e6).toFixed(2);
  const saved = ((1 - buf.length / before) * 100).toFixed(0);
  // eslint-disable-next-line no-console
  console.log(
    `${file}\n  ${meta.width}x${meta.height} -> ${out.width}x${out.height}  ` +
      `${mb(before)}MB -> ${mb(buf.length)}MB  (-${saved}%)`,
  );
}

async function run() {
  const { options, files } = parseArgs(process.argv.slice(2));
  if (files.length === 0) {
    console.error(
      'Usage: node docs/scripts/optimizeImages.mjs [--max-width=N] [--quality=N] [--no-palette] <path...>',
    );
    process.exit(1);
  }
  await Promise.all(files.map((file) => optimize(file, options)));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
