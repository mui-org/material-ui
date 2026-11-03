import * as React from 'react';
import clipboardCopy from 'clipboard-copy';

export default function useClipboardCopy() {
  const [isCopied, setIsCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(
    () => () => {
      clearTimeout(timeout.current);
    },
    [],
  );

  const copy = async (text: string) => {
    await clipboardCopy(text);
    setIsCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  };

  return { copy, isCopied };
}
