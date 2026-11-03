import fs from 'fs';
import path from 'path';
import { getHeaders } from '@mui/internal-markdown';

const blogDir = path.join(process.cwd(), 'pages/blog');

export const getBlogFilePaths = (ext = '.md') => {
  return fs.readdirSync(blogDir).filter((file) => file.endsWith(ext));
};

const caseStudyDir = path.join(process.cwd(), 'pages/customers');

export const getCaseStudyFilePaths = (ext = '.md') => {
  return fs.readdirSync(caseStudyDir).filter((file) => file.endsWith(ext));
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: Array<string>;
  authors?: Array<string>;
  date?: string;
  rank?: string;
  /**
   * If `true`, it omits posts with `hideFromHomeList: true` in frontmatter. Use it for SEO only blog posts.
   */
  hideFromHomeList?: string;
}

export function getBlogPost(filePath: string): BlogPost {
  const slug = filePath.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(blogDir, filePath), 'utf-8');

  const headers = getHeaders(content) as unknown as BlogPost;

  return {
    ...headers,
    slug,
  };
}

export function getCaseStudyPost(filePath: string): BlogPost {
  const slug = filePath.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(caseStudyDir, filePath), 'utf-8');

  const headers = getHeaders(content) as unknown as BlogPost;

  return {
    ...headers,
    slug,
  };
}

// Avoid typos in the blog markdown pages.
// https://www.notion.so/mui-org/Blog-247ec2bff5fa46e799ef06a693c94917
const ALLOWED_TAGS = [
  'Company',
  'Developer Survey',
  'Guide',
  'Product',
  'Tech',
  // Product tags
  'Material UI',
  'Base UI',
  'Pigment CSS',
  'Joy UI',
  'MUI X',
  'Toolpad',
];

export const getAllBlogPosts = () => {
  const filePaths = getBlogFilePaths();
  const rawBlogPosts = filePaths
    .map((name) => getBlogPost(name))
    // sort allBlogPosts by date in descending order
    .sort((post1, post2) => {
      if (post1.date && post2.date) {
        return new Date(post1.date) > new Date(post2.date) ? -1 : 1;
      }
      if (post1.date && !post2.date) {
        return 1;
      }
      return -1;
    });
  const allBlogPosts = rawBlogPosts.filter((post) => !!post.title);
  const tagInfo: Record<string, number | undefined> = {};
  allBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!ALLOWED_TAGS.includes(tag)) {
        throw new Error(
          `The tag "${tag}" in "${post.title}" was not whitelisted. Are you sure it's not a typo?`,
        );
      }

      tagInfo[tag] = (tagInfo[tag] || 0) + 1;
    });
  });

  return {
    allBlogPosts, // posts with at least a title
    tagInfo,
  };
};

export const getCaseStudies = () => {
  const filePaths = getCaseStudyFilePaths();

  const caseStudies = filePaths.map((name) => getCaseStudyPost(name));

  return caseStudies;
};
