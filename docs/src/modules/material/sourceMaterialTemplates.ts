const templateMap = new Map<string, { files: Record<string, string>; codeVariant: 'TS' | 'JS' }>();
let sharedTheme: { files: Record<string, string>; codeVariant: 'TS' | 'JS' } | null = null;
const req = require.context(
  '../../../data/material/getting-started/templates/?raw',
  true,
  /^\.\/[^/]+\/.*\.(js|tsx|ts)$/,
);
req.keys().forEach((key: string) => {
  const match = /\/(?<name>[^/]+)\/(?<filePath>.*)/.exec(key);
  if (match) {
    const name = match.groups?.name;
    const filePath = match.groups?.filePath;
    if (name && filePath?.match(/\.(ts|tsx)$/)) {
      if (name === 'shared-theme') {
        sharedTheme = {
          files: { ...sharedTheme?.files, [`theme/${filePath}`]: req(key) },
          codeVariant: 'TS',
        };
      } else {
        templateMap.set(name, {
          files: { ...templateMap.get(name)?.files, [filePath]: req(key) },
          codeVariant: 'TS',
        });
      }
    }
  }
});

export interface TemplateData {
  files: Record<string, string>;
  codeVariant: 'TS' | 'JS';
}

export default function sourceMaterialTemplates() {
  return {
    names: Array.from(templateMap.keys()),
    templates: Array.from(templateMap.values()),
    map: new Map(templateMap),
    sharedTheme,
  };
}
