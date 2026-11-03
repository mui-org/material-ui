import { defineConfig } from 'vite';
import { benchmarkPlugin } from '@mui/internal-benchmark/vitePlugin';

export default defineConfig({ plugins: [benchmarkPlugin()] });
