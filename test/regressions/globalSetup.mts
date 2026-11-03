import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

/**
 * Serves the regression test build on http://localhost:5001 while the tests run.
 */
export default async function setup() {
  const server = await preview({
    root: fileURLToPath(new URL('.', import.meta.url)),
    preview: { port: 5001, strictPort: true },
  });

  return async () => {
    await server.close();
  };
}
