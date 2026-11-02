import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const count = 10;

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

export default function UsePagination() {
  const firstPageRef = React.useRef<HTMLButtonElement>(null);
  const lastPageRef = React.useRef<HTMLButtonElement>(null);

  // @focus-start @padding 1
  const { items } = usePagination({
    count,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, onClick, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            let pageRef;

            if (page === 1) {
              pageRef = firstPageRef;
            } else if (page === count) {
              pageRef = lastPageRef;
            }

            children = (
              <button
                type="button"
                ref={pageRef}
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
                onClick={onClick}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                onClick={(event) => {
                  let focusTarget: typeof firstPageRef | undefined;

                  if (type === 'previous' && page === 1) {
                    focusTarget = firstPageRef;
                  } else if (type === 'next' && page === count) {
                    focusTarget = lastPageRef;
                  }

                  const shouldMoveFocus =
                    event.currentTarget.ownerDocument.activeElement ===
                    event.currentTarget;

                  onClick(event);

                  if (shouldMoveFocus) {
                    focusTarget?.current?.focus();
                  }
                }}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
  // @focus-end
}
