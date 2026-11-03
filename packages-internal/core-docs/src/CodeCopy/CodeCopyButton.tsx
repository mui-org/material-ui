import useClipboardCopy from './useClipboardCopy';

export interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton(props: CodeCopyButtonProps) {
  const { code, ...other } = props;
  const { copy, isCopied } = useClipboardCopy();
  // This component is designed to be wrapped in NoSsr
  const macOS = window.navigator.platform.toUpperCase().includes('MAC');
  const key = macOS ? '⌘' : 'Ctrl + ';

  return (
    <div className="MuiCode-copy-container">
      <button
        {...other}
        aria-label="Copy the code"
        type="button"
        className="MuiCode-copy"
        onClick={async () => {
          // event.stopPropagation();
          await copy(code);
        }}
      >
        {isCopied ? 'Copied' : 'Copy'}
        <span className="MuiCode-copyKeypress" style={{ opacity: isCopied ? 0 : 1 }}>
          <span>(or</span> {key}C<span>)</span>
        </span>
      </button>
    </div>
  );
}
