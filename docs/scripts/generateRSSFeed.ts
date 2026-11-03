import fs from 'fs';
import { Feed } from 'feed';
import type { BlogPost } from 'docs/lib/sourcing';
import { ROUTES } from '@mui/internal-core-docs/constants';

export default function generateRssFeed(allBlogPosts: Array<BlogPost>) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  const siteUrl = 'https://mui.com';

  const feed = new Feed({
    title: 'MUI - Blog',
    description:
      'Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives.',
    id: `${siteUrl}/blog`,
    link: `${siteUrl}/blog`,
    language: 'en',
    image: `${siteUrl}/static/logo.svg`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} Material UI SAS, trading as MUI.`,
    feedLinks: {
      rss2: `${siteUrl}/public${ROUTES.rssFeed}`,
    },
  });

  allBlogPosts.forEach((post) => {
    const postAuthors = post.authors && post.authors.map((author) => ({ name: author }));
    const postDate = post.date ? new Date(post.date) : new Date();
    const postCategory = post.tags.map((tag) => ({ name: tag }));
    const postLink = `${siteUrl}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      image: post.image,
      id: postLink,
      link: postLink,
      description: post.description,
      category: postCategory,
      date: postDate,
      author: postAuthors,
    });
  });

  fs.mkdirSync(`public${ROUTES.rssFeed.replace('rss.xml', '')}`, { recursive: true });
  fs.writeFileSync(`public${ROUTES.rssFeed}`, feed.rss2());
}
