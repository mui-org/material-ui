export interface SectionTitleProps<Hash extends string = string> {
  title: string;
  hash: Hash;
  level?: 'h2' | 'h3' | 'h4';
}
export function SectionTitle(props: SectionTitleProps) {
  const { title, hash, level: Level = 'h2' } = props;
  return (
    <Level id={hash} style={{ flexGrow: 1 }}>
      <a aria-labelledby={hash} className="title-link-to-anchor" href={`#${hash}`} tabIndex={-1}>
        {title}
        <span className="anchor-icon">
          <svg>
            <use xlinkHref="#anchor-link-icon" />
          </svg>
        </span>
      </a>
    </Level>
  );
}
