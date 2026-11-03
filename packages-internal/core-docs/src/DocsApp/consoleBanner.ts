import { getTheme } from '../branding';

interface WindowWithTheme extends Window {
  theme?: ReturnType<typeof getTheme>;
}

declare const window: WindowWithTheme;

export function printConsoleBanner(): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    window.theme = getTheme('ltr');
    // eslint-disable-next-line no-console
    console.log(
      `%c

███╗   ███╗ ██╗   ██╗ ██████╗
████╗ ████║ ██║   ██║   ██╔═╝
██╔████╔██║ ██║   ██║   ██║
██║╚██╔╝██║ ██║   ██║   ██║
██║ ╚═╝ ██║ ╚██████╔╝ ██████╗
╚═╝     ╚═╝  ╚═════╝  ╚═════╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
      'font-family:monospace;color:#1976d2;font-size:12px;',
    );
  }
}
