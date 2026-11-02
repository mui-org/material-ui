/**
 * @file Configuration file for bundle-size-checker
 *
 * This file determines which packages and components will have their bundle sizes measured.
 */
import { defineConfig } from '@mui/internal-bundle-size-checker';

/**
 * Generates the entrypoints configuration by scanning the project structure.
 */
export default defineConfig(async () => {
  // Return the complete entrypoints configuration
  return {
    entrypoints: [
      { id: '@mui/material', expand: true },
      '@mui/material/styles#createTheme',
      { id: '@mui/lab', expand: true },
      '@mui/private-theming',
      { id: '@mui/system', expand: true },
      { id: '@mui/utils', expand: true },
      // @TODO - Re-enable separately
      // { id: '@mui/internal-core-docs', expand: true },
    ],
    upload: !!process.env.CI,
    comment: true,
  };
});
