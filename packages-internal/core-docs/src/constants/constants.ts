export const CODE_VARIANTS = {
  JS: 'JS',
  TS: 'TS',
};

export const CODE_STYLING = {
  SYSTEM: 'MUI System',
  TAILWIND: 'Tailwind',
  CSS: 'CSS',
};

// Valid languages to use in production
export const LANGUAGES_LABEL = [
  {
    code: 'en',
    text: 'English',
  },
];

export const stylingSolutionMapping = {
  [CODE_STYLING.TAILWIND]: 'tailwind',
  [CODE_STYLING.CSS]: 'css',
  [CODE_STYLING.SYSTEM]: 'system',
};

// Valid languages to server-side render in production
export const LANGUAGES = ['en'];

// Server side rendered languages
export const LANGUAGES_SSR = ['en'];

// Work in progress
export const LANGUAGES_IN_PROGRESS = LANGUAGES.slice();

export const LANGUAGES_IGNORE_PAGES = (pathname: string) => {
  // We don't have the bandwidth like Qt to translate our blog posts
  // https://www.qt.io/zh-cn/blog
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return true;
  }

  if (pathname === '/size-snapshot/') {
    return true;
  }

  return false;
};
