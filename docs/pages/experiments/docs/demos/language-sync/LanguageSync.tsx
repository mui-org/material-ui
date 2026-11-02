interface LanguageSyncProps {
  label?: string;
}

export default function LanguageSync({ label = 'Language sync' }: LanguageSyncProps) {
  return <div data-testid="language-sync-preview">{label}</div>;
}
