import * as React from 'react';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';

const PointerContext = React.createContext<undefined | ((data: Data) => void)>(undefined);

export const withPointer = <T extends React.ElementType>(
  Component: T,
  options: { id: string; name: string },
) => {
  function WithPointer(props: object) {
    const root = React.useRef<HTMLElement>(null);
    const handleMouseOver = React.useContext(PointerContext);
    return (
      <React.Fragment>
        {/* @ts-expect-error: The generic element type cannot prove support for the injected ref and mouse handler. */}
        <Component
          ref={root}
          {...props}
          onMouseOver={(event: React.MouseEvent) => {
            event.stopPropagation();
            if (handleMouseOver && root.current) {
              handleMouseOver({
                id: options.id,
                target: root.current,
                name: options.name,
              });
            }
          }}
        />
      </React.Fragment>
    );
  }

  return WithPointer as T;
};

export type Data = { id: null | string; name: null | string; target: null | HTMLElement };

export default function PointerContainer({
  onElementChange,
  ...props
}: BoxProps & { onElementChange?: (data: Data) => void }) {
  const container = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<Data>({
    id: null,
    name: null,
    target: null,
  });
  const handleMouseOver = React.useMemo(
    () =>
      debounce((elementData: Data) => {
        setData(elementData);
      }, 200),
    [],
  );
  React.useEffect(() => {
    if (onElementChange) {
      onElementChange(data);
    }
  }, [data, onElementChange]);
  return (
    <PointerContext.Provider value={handleMouseOver}>
      <Box
        ref={container}
        {...props}
        onMouseLeave={() => handleMouseOver({ id: null, name: null, target: null })}
        sx={{ position: 'relative', ...props.sx }}
      >
        {props.children}
        {container.current && data.target && (
          <Box
            sx={{
              border: '1px solid',
              borderColor: '#0072E5',
              pointerEvents: 'none',
              position: 'absolute',
              zIndex: 10,
              transition: 'none !important',
              ...(() => {
                const containerRect = container.current.getBoundingClientRect();
                const targetRect = data.target.getBoundingClientRect();
                return {
                  top: targetRect.top - containerRect.top,
                  left: targetRect.left - containerRect.left,
                  width: `${targetRect.width}px`,
                  height: `${targetRect.height}px`,
                };
              })(),
            }}
          >
            <Box
              sx={{
                bgcolor: '#0072E5',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
                px: 0.5,
                position: 'absolute',
                top: 0,
                transform: 'translateY(-100%)',
                left: -1,
              }}
            >
              <Typography
                sx={{ color: '#fff', fontSize: '0.625rem', fontWeight: 500, display: 'block' }}
              >
                {data.name}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </PointerContext.Provider>
  );
}
