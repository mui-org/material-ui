import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useEventCallback, useForkRef } from '@mui/material/utils';
import useTimeout from '@mui/utils/useTimeout';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Virtualizer } from '@tanstack/react-virtual';
import { fetchMovies, getMovieLabel, normalizeMovieQuery } from './server';
import type { Movie } from './movies';

const ITEM_HEIGHT_PX = 36;
const MAX_LISTBOX_HEIGHT_PX = 8 * ITEM_HEIGHT_PX;
const OVERSCAN = 5;
const PREFETCH_WITHIN_ITEMS = 5;
const INPUT_DEBOUNCE_MS = 200;

// Autocomplete invokes `renderOption(props, option)` for every option that
// would be rendered. Returning this tuple lets the virtual listbox own layout
// and mount only the rows that are visible.
type OptionTuple = readonly [
  React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
  Movie,
];

type ListboxVirtualizer = Virtualizer<HTMLUListElement, Element>;

/** Props added to the Autocomplete listbox slot for infinite loading and virtualization. */
interface VirtualListboxProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Called when the rendered window gets close enough to the end to load another page. */
  onReachEnd: () => void;
  /** Changes when the search context changes so the listbox can reset to the first row. */
  resetScrollKey: string;
  /** Exposes the virtualizer to the parent so keyboard navigation can scroll highlighted rows into view. */
  virtualizerRef: React.RefObject<ListboxVirtualizer | null>;
}

/**
 * Virtualized Autocomplete listbox.
 * It mounts only visible options and triggers pagination as the rendered range approaches the end.
 */
const VirtualListbox = React.forwardRef<HTMLUListElement, VirtualListboxProps>(
  function VirtualListbox(props, forwardedRef) {
    const {
      children,
      onReachEnd,
      resetScrollKey,
      virtualizerRef,
      style,
      ...listboxProps
    } = props;
    const items = children as OptionTuple[];

    // One DOM node must serve both Autocomplete's listbox ref and the virtualizer's
    // scroll observer, so merge the forwarded ref with the local ref.
    const scrollContainerRef = React.useRef<HTMLUListElement | null>(null);
    const setScrollContainerRef = useForkRef(scrollContainerRef, forwardedRef);

    const virtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => scrollContainerRef.current,
      estimateSize: () => ITEM_HEIGHT_PX,
      overscan: OVERSCAN,
      // Avoids forcing synchronous updates while Autocomplete is rendering.
      useFlushSync: false,
    });

    React.useEffect(() => {
      virtualizerRef.current = virtualizer;
      return () => {
        if (virtualizerRef.current === virtualizer) {
          virtualizerRef.current = null;
        }
      };
    }, [virtualizer, virtualizerRef]);

    React.useEffect(() => {
      scrollContainerRef.current?.scrollTo({ top: 0 });
      virtualizer.scrollToOffset(0);
    }, [resetScrollKey, virtualizer]);

    const virtualItems = virtualizer.getVirtualItems();
    const lastRenderedIndex = virtualItems[virtualItems.length - 1]?.index ?? -1;

    // Trigger pagination from the virtualizer's rendered range, not raw scroll
    // offsets, so overscan and keyboard scrolling behave consistently.
    React.useEffect(() => {
      if (
        items.length > 0 &&
        lastRenderedIndex >= items.length - PREFETCH_WITHIN_ITEMS
      ) {
        onReachEnd();
      }
    }, [lastRenderedIndex, items.length, onReachEnd]);

    return (
      <ul
        ref={setScrollContainerRef}
        {...listboxProps}
        style={{
          ...style,
          boxSizing: 'border-box',
          maxHeight: MAX_LISTBOX_HEIGHT_PX,
          overflow: 'auto',
          paddingBlock: 0,
          paddingInline: 0,
          margin: 0,
          position: 'relative',
          listStyle: 'none',
        }}
      >
        {/* This spacer gives the <ul> its scroll height without nesting a div inside the listbox. */}
        <li
          aria-hidden
          role="presentation"
          style={{
            height: virtualizer.getTotalSize(),
            pointerEvents: 'none',
          }}
        />
        {virtualItems.map((virtualItem) => {
          const [optionProps, option] = items[virtualItem.index];
          const { key, style: optionStyle, ...htmlProps } = optionProps;
          const label = getMovieLabel(option);

          return (
            <li
              key={key}
              {...htmlProps}
              style={{
                ...optionStyle,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <span
                title={label}
                style={{
                  display: 'block',
                  flexGrow: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    );
  },
);

function InfiniteQueryAutocomplete() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Movie | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [searchInputValue, setSearchInputValue] = React.useState('');
  const [queryInputValue, setQueryInputValue] = React.useState('');
  const virtualizerRef = React.useRef<ListboxVirtualizer | null>(null);
  const wasOpenRef = React.useRef(false);
  const queryDebounce = useTimeout();

  React.useEffect(() => {
    // Opening the popup should query for whatever text is already visible in the
    // input, but reopening should not retrigger this sync while it is already open.
    if (open && !wasOpenRef.current) {
      setSearchInputValue(inputValue);
      setQueryInputValue(inputValue);
    }
    wasOpenRef.current = open;
  }, [inputValue, open]);

  React.useEffect(() => {
    if (!open || searchInputValue === queryInputValue) {
      queryDebounce.clear();
      return undefined;
    }

    queryDebounce.start(INPUT_DEBOUNCE_MS, () => {
      setQueryInputValue(searchInputValue);
    });

    return queryDebounce.clear;
  }, [open, queryDebounce, queryInputValue, searchInputValue]);

  const normalizedQuery = React.useMemo(
    () => normalizeMovieQuery(queryInputValue),
    [queryInputValue],
  );

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['movies', normalizedQuery],
      queryFn: ({ pageParam, signal }) =>
        fetchMovies(normalizedQuery, pageParam, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: open,
    });

  const options = React.useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const optionIndexMap = React.useMemo(() => {
    const indexMap = new Map<number, number>();

    options.forEach((option, index) => {
      indexMap.set(option.id, index);
    });

    return indexMap;
  }, [options]);

  const handleReachEnd = useEventCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const handleInputChange = useEventCallback(
    (
      _event: React.SyntheticEvent,
      newInputValue: string,
      reason: 'input' | 'reset' | 'clear' | 'blur' | 'selectOption' | 'removeOption',
    ) => {
      setInputValue(newInputValue);

      // Autocomplete also calls `onInputChange` for selection and blur resets.
      // Only real typing should advance the remote query.
      if (reason === 'input') {
        setSearchInputValue(newInputValue);
      }

      if (reason === 'clear') {
        setSearchInputValue(newInputValue);
        setQueryInputValue(newInputValue);
      }
    },
  );

  const handleHighlightChange = useEventCallback(
    (_event: React.SyntheticEvent, option: Movie | null) => {
      const virtualizer = virtualizerRef.current;
      if (!option || !virtualizer) {
        return;
      }

      // Keep keyboard navigation aligned with virtualization. Autocomplete can
      // highlight rows that are not mounted, so its default scrollIntoView would
      // otherwise no-op for off-screen options.
      const index = optionIndexMap.get(option.id);
      if (index !== undefined) {
        virtualizer.scrollToIndex(index, { align: 'auto' });
      }
    },
  );

  // The listbox scrolls back to the top when the popup opens or the search
  // query changes, matching what users expect from a newly loaded result set.
  const listboxResetKey = open ? normalizedQuery : `closed:${normalizedQuery}`;

  return (
    <Autocomplete<Movie>
      sx={{ width: 320 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      value={value}
      onChange={(_event, newValue) => setValue(newValue)}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      // Results are already filtered by the query key, so disable the built-in
      // client filter.
      filterOptions={(x) => x}
      getOptionLabel={getMovieLabel}
      isOptionEqualToValue={(option, candidate) => option.id === candidate.id}
      loading={isFetching}
      loadingText="Loading movies…"
      disableListWrap
      onHighlightChange={handleHighlightChange}
      renderOption={(optionProps, option) =>
        [optionProps, option] as unknown as React.ReactNode
      }
      renderInput={(params) => {
        const { endAdornment, ...inputSlotProps } = params.slotProps.input;

        return (
          <TextField
            {...params}
            label="Movie"
            slotProps={{
              ...params.slotProps,
              input: {
                ...inputSlotProps,
                endAdornment: (
                  <React.Fragment>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={18} />
                    ) : null}
                    {endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        );
      }}
      slotProps={{
        // The cast is only for the extra props injected into this custom slot.
        listbox: {
          component: VirtualListbox,
          onReachEnd: handleReachEnd,
          resetScrollKey: listboxResetKey,
          virtualizerRef,
        } as any,
      }}
    />
  );
}

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
};

export default function InfiniteLoading() {
  // Create the QueryClient once for this mounted demo. In an app, this usually
  // lives near the root alongside the rest of your data-fetching setup.
  const [queryClient] = React.useState(() => new QueryClient(queryClientOptions));

  return (
    // @focus-start @padding 2
    <QueryClientProvider client={queryClient}>
      <InfiniteQueryAutocomplete />
    </QueryClientProvider>
    // @focus-end
  );
}
