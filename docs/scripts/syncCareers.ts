import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

interface CareerJob {
  id: string;
  title: string;
  isFutureRole: boolean;
  category: string;
  description: string;
  summary?: string | null;
  applicationUrl: string;
}

const defaultDocsDirectory = fileURLToPath(new URL('..', import.meta.url));
const categoryOrder = ['engineering', 'sales', 'people', 'marketing', 'operations'];

export default async function syncCareers(
  apiUrl = process.env.MUI_CAREERS_API_URL || 'https://frontend-public.mui.com/api/mui-careers',
  docsDirectory = defaultDocsDirectory,
) {
  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch careers: ${response.status} ${response.statusText}`);
  }

  const { data: jobs }: { data: CareerJob[] } = await response.json();
  jobs.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.category.toLowerCase());
    const bIndex = categoryOrder.indexOf(b.category.toLowerCase());
    return (
      (aIndex === -1 ? categoryOrder.length : aIndex) -
        (bIndex === -1 ? categoryOrder.length : bIndex) ||
      a.category.localeCompare(b.category) ||
      a.title.localeCompare(b.title)
    );
  });

  const roles = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    summary: job.summary?.trim() || '',
    applicationUrl: job.applicationUrl,
    url: `/careers/roles/${job.id}/`,
  }));
  const rolesByCategory = new Map<string, typeof roles>();
  const futureRolesByCategory = new Map<string, typeof roles>();
  jobs.forEach((job, index) => {
    const categories = job.isFutureRole ? futureRolesByCategory : rolesByCategory;
    const category = categories.get(job.category) ?? [];
    category.push(roles[index]);
    categories.set(job.category, category);
  });

  const serializeCategories = (categories: Map<string, typeof roles>) =>
    Array.from(categories, ([title, categoryRoles]) => ({ title, roles: categoryRoles }));

  const dataDirectory = path.join(docsDirectory, 'data/careers');
  const content = await format(
    JSON.stringify({
      count: jobs.filter((job) => !job.isFutureRole).length,
      roles: serializeCategories(rolesByCategory),
      futureRoles: serializeCategories(futureRolesByCategory),
    }),
    { parser: 'json' },
  );
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(path.join(dataDirectory, 'roles.json'), content);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncCareers();
}
