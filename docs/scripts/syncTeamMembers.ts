/* eslint-disable no-console */
import url from 'url';
import * as fs from 'fs/promises';
import path from 'path';

import getMemberImageFile from '../src/components/about/getMemberImageFile';

interface Person {
  name: string;
}

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const teamMembersPath = path.resolve(currentDirectory, '../data/about/teamMembers.json');
const imagesDirectory = path.resolve(currentDirectory, '../public/static/branding/about');

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readCurrentMembers(): Promise<Person[]> {
  if (!(await fileExists(teamMembersPath))) {
    return [];
  }
  return JSON.parse(await fs.readFile(teamMembersPath, 'utf8'));
}

// Delete images of removed members and report new members missing a photo.
async function syncImagesAndSummary(previousMembers: Person[], people: Person[]) {
  const previousNames = new Set(previousMembers.map((person) => person.name));
  const nextNames = new Set(people.map((person) => person.name));
  const added = people.filter((person) => !previousNames.has(person.name));
  const removed = previousMembers.filter((person) => !nextNames.has(person.name));

  // Delete images of members who are no longer part of the team.
  await Promise.all(
    removed.map(async (person) => {
      const imagePath = path.join(imagesDirectory, getMemberImageFile(person));
      if (await fileExists(imagePath)) {
        await fs.unlink(imagePath);
      }
    }),
  );

  // Flag new members whose image still needs to be added manually.
  const missingImages = (
    await Promise.all(
      added.map(async (person) => {
        const fileName = getMemberImageFile(person);
        const exists = await fileExists(path.join(imagesDirectory, fileName));
        return exists ? null : `${person.name} (\`${fileName}\`)`;
      }),
    )
  ).filter((item): item is string => item !== null);

  const summary = missingImages.length
    ? `### ⚠️ Missing images

Add a photo for the following new members to \`docs/public/static/branding/about/\`:

${missingImages.map((entry) => `- ${entry}`).join('\n')}`
    : '';

  if (summary) {
    console.log(summary);
  }
}

async function run() {
  const previousMembers = await readCurrentMembers();
  const response = await fetch('https://frontend-public.mui.com/api/mui-about');
  if (!response.ok || response.status !== 200) {
    throw new Error(`Failed to fetch team members: ${response.status} ${response.statusText}`);
  }
  const { people }: { people: Person[] } = await response.json();

  await fs.writeFile(teamMembersPath, JSON.stringify(people), 'utf8');

  await syncImagesAndSummary(previousMembers, people);
}

run();
