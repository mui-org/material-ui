export function isNewLocation(url: string) {
  url = url.replace(/^\/[a-z]{2}\//, '/');
  if (url === '/x' || url === '/x/') {
    // skipped if it is the X marketing page
    return false;
  }
  return (
    url.startsWith('/x') ||
    url.startsWith('/material-ui') ||
    url.startsWith('/base') ||
    url.startsWith('/system')
  );
}

export const replaceMaterialLinks = (url: string) => {
  if (isNewLocation(url)) {
    return url;
  }
  return url.replace(
    /(guides|customization|getting-started|discover-more|experimental-api|migration|integrations)/,
    'material-ui/$1',
  );
};

export const replaceComponentLinks = (url: string) => {
  if (isNewLocation(url)) {
    return url;
  }
  url = url.replace(/\/components\/data-grid/, '/x/react-data-grid');
  if (isNewLocation(url)) {
    return url;
  }
  if (url.startsWith('/customization')) {
    url = url.replace('customization', 'material-ui/customization');
  } else if (url.match(/components\/(icons|material-icons|transitions|pickers|about-the-lab)/)) {
    url = url.replace(/\/components\/(.*)/, '/material-ui/$1');
  } else {
    url = url.replace(/\/components\/(.*)/, '/material-ui/react-$1');

    // TODO remove, fix the markdown files to match the URLs
    if (!url.match(/\/react-(tabs|breadcrumbs)/)) {
      url = url
        .replace(/(react-[-a-z]+)(x|ch)es([^a-z-])/, '$1$2$3')
        .replace(/(react-[-a-z]+)s([^a-z-])/, '$1$2')
        .replace(/(react-[-a-z]+)(x|ch)es$/, '$1$2')
        .replace(/(react-[-a-z]+)s$/, '$1')
        .replace(/react-trap-focu/, 'react-trap-focus')
        .replace(/react-circular-progres/, 'react-circular-progress')
        .replace(/react-linear-progres/, 'react-linear-progress')
        .replace(/react-progres/, 'react-progress');
    }
  }
  return url;
};

export const replaceAPILinks = (url: string) => {
  if (isNewLocation(url) || !url.replace(/^\/[a-zA-Z]{2}\//, '/').startsWith('/api')) {
    return url;
  }
  url = url
    .replace(/\/api\/data-grid(.*)/, '/x/api/data-grid$1')
    .replace(
      /\/api\/(unstable-trap-focus|click-away-listener|no-ssr|portal|textarea-autosize)(.*)/,
      '/base-ui/api/$1$2',
    )
    .replace(/\/api\/([^/]+-unstyled)(.*)/, '/base-ui/api/$1$2');

  if (isNewLocation(url)) {
    return url;
  }

  url = url.replace(
    /\/api\/(loading-button|tab-list|tab-panel|date-picker|date-time-picker|time-picker|calendar-picker|calendar-picker-skeleton|desktop-picker|mobile-date-picker|month-picker|pickers-day|static-date-picker|year-picker|masonry|timeline|timeline-connector|timeline-content|timeline-dot|timeline-item|timeline-opposite-content|timeline-separator|unstable-trap-focus|tree-item|tree-view)(.*)/,
    '/material-ui/api/$1$2',
  );

  if (isNewLocation(url)) {
    return url;
  }

  return url.replace(/\/api\/(.*)/, '/material-ui/api/$1');
};

export default function replaceUrl(url: string, asPath: string) {
  if (isNewLocation(asPath)) {
    url = replaceMaterialLinks(replaceAPILinks(replaceComponentLinks(url)));
    url = url.replace(/^\/styles\/(.*)/, '/system/styles/$1');
    url = url.replace(/^\/([a-z]{2})\/styles\/(.*)/, '/$1/system/styles/$2');
  }
  return url;
}
