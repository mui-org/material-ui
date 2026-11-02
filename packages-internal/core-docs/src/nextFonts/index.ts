import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  preload: false,
});

export const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  preload: false,
});

export const generalSans = localFont({
  variable: '--font-general-sans',
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  src: [{ path: './fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' }],
});

// The fallback face comes from the preloaded loader, with metrics of its weights.
const generalSansDeferred = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  preload: false,
  adjustFontFallback: false,
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

// 400 (body copy) and 600 (the chip row under every intro, nav sections)
// render in the first viewport of every docs page, so a late swap of either
// reflows it: Lighthouse reported CLS 0.018–0.021 from "web font loaded" with
// only 400 preloaded. 500 is app bar and desktop nav text and 700 a single
// "⌘K" badge; each preloaded file delays LCP on slow links (~0.3s per 55kB
// on Lighthouse mobile), so those two stay deferred.
export const ibmPlexSans = localFont({
  variable: '--font-ibm-plex-sans',
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  src: [
    { path: './fonts/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

// The fallback face comes from the preloaded loader, with metrics of its weights.
const ibmPlexSansDeferred = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  preload: false,
  adjustFontFallback: false,
  src: [
    { path: './fonts/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fonts = [
  ibmPlexSans,
  generalSans,
  ibmPlexSansDeferred,
  generalSansDeferred,
  inter,
  roboto,
];

// `className` also sets font-weight for single-file loaders, so body only gets the variables.
export const fontClasses = [ibmPlexSans, generalSans, inter, roboto]
  .map((font) => font.variable)
  .join(' ');
