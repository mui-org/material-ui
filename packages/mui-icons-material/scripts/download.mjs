/* eslint-disable no-console */
import fetch from 'cross-fetch';
import fs from 'node:fs/promises';
import path from 'path';
import yargs from 'yargs';
import { fileURLToPath } from 'url';
import { mapAsync } from 'es-toolkit/array';
import { retry } from 'es-toolkit/function';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));

// Icons we don't publish.
// This is just a list of new icons.
// In the future we might change what icons we want to exclude (for example by popularity)
const ignoredIconNames = new Set([
  // TODO v6: Whatsapp duplicates with WhatsApp
  // We don't need it https://fonts.google.com/icons?icon.set=Material+Icons&icon.query=whatsapp
  // 'whatsapp'
  '123',
  '6_ft_apart',
  'add_chart', // Leads to inconsistent casing with `Addchart`
  'exposure_neg_1', // Google product
  'exposure_neg_2', // Google product
  'exposure_plus_1', // Google product
  'exposure_plus_2', // Google product
  'exposure_zero', // Google product
  'horizontal_distribute', // Advanced text editor
  'motion_photos_on', // Google product
  'motion_photos_pause', // Google product
  'motion_photos_paused', // Google product
  'polymer', // Legacy brand
  'vertical_distribute', // Advanced text editor
]);

const legacyIconNames = new Set([
  'battery_20',
  'battery_30',
  'battery_50',
  'battery_60',
  'battery_80',
  'battery_90',
  'battery_charge_20',
  'battery_charging_20',
  'battery_charge_30',
  'battery_charging_30',
  'battery_charge_50',
  'battery_charging_50',
  'battery_charge_60',
  'battery_charging_60',
  'battery_charge_80',
  'battery_charging_80',
  'battery_charge_90',
  'battery_charging_90',
  'signal_cellular_1_bar',
  'signal_cellular_2_bar',
  'signal_cellular_3_bar',
  'signal_cellular_connected_no_internet_1_bar',
  'signal_cellular_connected_no_internet_2_bar',
  'signal_cellular_connected_no_internet_3_bar',
  'signal_wifi_1_bar',
  'signal_wifi_1_bar_lock',
  'signal_wifi_2_bar',
  'signal_wifi_2_bar_lock',
  'signal_wifi_3_bar',
  'signal_wifi_3_bar_lock',
  // Removed in v9: exact SVG-path duplicates of their *Outlined counterparts
  'add_circle_outline',
  'chat_bubble_outline',
  'check_circle_outline',
  'delete_outline',
  'done_outline',
  'drive_file_move_outline',
  'error_outline',
  'help_outline',
  'info_outline',
  'label_important_outline',
  'lightbulb_outline',
  'lock_outline',
  'mail_outline',
  'mode_edit_outline',
  'pause_circle_outline',
  'people_outline',
  'person_outline',
  'pie_chart_outline',
  'play_circle_outline',
  'remove_circle_outline',
  'star_outline',
  'work_outline',
  'workspaces_outline',
]);

// list of icons that need to be overridden
const overrides = new Map([
  [
    // official icon is not rounded: https://fonts.google.com/icons?selected=Material+Icons+Round:apps:&icon.query=apps&icon.size=24&icon.color=%23e8eaed&icon.set=Material+Icons&icon.style=Rounded
    // fixes https://github.com/mui/material-ui/issues/41064
    'apps_rounded',
    '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20ZM12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM18 20C17.45 20 16.9792 19.8042 16.5875 19.4125C16.1958 19.0208 16 18.55 16 18C16 17.45 16.1958 16.9792 16.5875 16.5875C16.9792 16.1958 17.45 16 18 16C18.55 16 19.0208 16.1958 19.4125 16.5875C19.8042 16.9792 20 17.45 20 18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14ZM6 8C5.45 8 4.97917 7.80417 4.5875 7.4125C4.19583 7.02083 4 6.55 4 6C4 5.45 4.19583 4.97917 4.5875 4.5875C4.97917 4.19583 5.45 4 6 4C6.55 4 7.02083 4.19583 7.4125 4.5875C7.80417 4.97917 8 5.45 8 6C8 6.55 7.80417 7.02083 7.4125 7.4125C7.02083 7.80417 6.55 8 6 8ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8ZM18 8C17.45 8 16.9792 7.80417 16.5875 7.4125C16.1958 7.02083 16 6.55 16 6C16 5.45 16.1958 4.97917 16.5875 4.5875C16.9792 4.19583 17.45 4 18 4C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6C20 6.55 19.8042 7.02083 19.4125 7.4125C19.0208 7.80417 18.55 8 18 8Z"/></svg>',
  ],
  [
    // fixes https://github.com/mui/material-ui/issues/32016
    'cases',
    '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 22C2.45 22 1.97917 21.8042 1.5875 21.4125C1.19583 21.0208 1 20.55 1 20V9H3V20H20V22H3ZM7 18C6.45 18 5.97917 17.8042 5.5875 17.4125C5.19583 17.0208 5 16.55 5 16V5H10V3C10 2.45 10.1958 1.97917 10.5875 1.5875C10.9792 1.19583 11.45 1 12 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V5H23V16C23 16.55 22.8042 17.0208 22.4125 17.4125C22.0208 17.8042 21.55 18 21 18H7ZM12 5H16V3H12V5Z"/></svg>',
  ],
  [
    // fixes https://github.com/mui/material-ui/issues/34863
    'label_important_outlined',
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 19H3l4.5-7L3 5h12c.65 0 1.26.31 1.63.84L21 12l-4.37 6.16c-.37.52-.98.84-1.63.84zm-8.5-2H15l3.5-5L15 7H6.5l3.5 5-3.5 5z"/></svg>',
  ],
]);

const themeMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_round',
  twotone: '_two_tone',
  sharp: '_sharp',
};

const themeFileMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_rounded',
  twotone: '_two_tone',
  sharp: '_sharp',
};

const familyMap = {
  baseline: 'Material Icons',
  outline: 'Material Icons Outlined',
  round: 'Material Icons Round',
  sharp: 'Material Icons Sharp',
  twotone: 'Material Icons Two Tone',
};

/**
 * Downloads an icon in various themes and saves it as an SVG file.
 *
 * @param {Object} icon - The icon object.
 * @param {string} icon.name - The name of the icon.
 * @param {number} icon.version - The version of the icon.
 * @param {number} icon.popularity - The popularity of the icon.
 * @param {number} icon.codepoint - The codepoint of the icon.
 * @param {string[]} icon.unsupported_families - The unsupported families of the icon.
 * @param {string[]} icon.categories - The categories of the icon.
 * @param {string[]} icon.tags - The tags associated with the icon.
 * @param {number[]} icon.sizes_px - The available sizes of the icon in pixels.
 * @returns {Promise<void[]>} A promise that resolves when all icons are downloaded and saved.
 */
function downloadIcon(icon) {
  console.log(`downloadIcon ${icon.index}: ${icon.name}`);

  return Promise.all(
    Object.keys(themeMap).map(async (theme) => {
      const formattedTheme = themeMap[theme].split('_').join('');
      const family = familyMap[theme];
      if (icon.unsupported_families.includes(family)) {
        return;
      }
      const response = await fetch(
        `https://fonts.gstatic.com/s/i/materialicons${formattedTheme}/${icon.name}/v${icon.version}/24px.svg`,
      );
      if (response.status !== 200) {
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fs.writeFile(
        path.join(
          currentDirectory,
          `../material-icons/${icon.name}${themeFileMap[theme]}_24px.svg`,
        ),
        overrides.get(`${icon.name}${themeFileMap[theme]}`) || SVG,
      );
    }),
  );
}

async function run() {
  const argv = yargs(process.argv.slice(2))
    .usage('Download the SVG from material.io/resources/icons')
    .describe('start-after', 'Resume at the following index').argv;
  console.log('run', argv);
  const iconDir = path.join(currentDirectory, '../material-icons');
  await fs.rm(iconDir, { recursive: true, force: true });
  await fs.mkdir(iconDir, { recursive: true });
  const response = await fetch(
    'https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true',
  );
  const text = await response.text();
  const data = JSON.parse(text.replace(")]}'", ''));
  let icons = data.icons;
  icons = icons.filter((icon) => {
    return !ignoredIconNames.has(icon.name) && !legacyIconNames.has(icon.name);
  });
  icons = icons.map((icon, index) => ({ index, ...icon }));
  icons = icons.splice(argv.startAfter || 0);
  console.log(`${icons.length} icons to download`);

  // Third party endpoint, keep the request rate modest.
  await mapAsync(
    icons,
    (icon) =>
      retry(() => downloadIcon(icon), {
        retries: 2,
        delay: (attempts) => (attempts + 1) * 100,
      }),
    { concurrency: 5 },
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
