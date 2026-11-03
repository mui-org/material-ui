import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import type { PaperProps } from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
// For the sake of this demo, we have to use debounce to reduce Google Maps Places API quote use
// But prefer to use throttle in practice
// import throttle from 'lodash/throttle';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function loadScript(src: string, position: HTMLElement) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);
  return script;
}

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
  secondary_text?: string;
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

function CustomPaper(props: PaperProps) {
  return (
    <Paper {...props}>
      {props.children}
      {/* Legal requirement https://developers.google.com/maps/documentation/javascript/policies#logo */}
      <Box
        sx={(staticTheme) => ({
          display: 'flex',
          justifyContent: 'flex-end',
          p: '5px 10px 6px 10px',
          opacity: 0.9,
          '& path': {
            fill: '#5e5e5e',
          },
          ...staticTheme.applyStyles('dark', {
            opacity: 0.7,
            '& path': {
              fill: '#fff',
            },
          }),
        })}
      >
        <svg
          aria-label="Google Maps"
          height="14"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 98 18"
          width="77"
        >
          <path d="M7.08 13.96a6.9 6.9 0 01-4.99-2.05A6.7 6.7 0 010 6.98Q0 4.1 2.09 2.05A6.9 6.9 0 017.08 0a6.7 6.7 0 014.79 1.92l-1.35 1.35a4.8 4.8 0 00-3.44-1.36q-2.1 0-3.55 1.48a5 5 0 00-1.45 3.59q0 2.12 1.46 3.59a4.8 4.8 0 003.55 1.48 4.8 4.8 0 003.53-1.4q.84-.84 1.04-2.4H7.08v-1.9h6.42a6 6 0 01.1 1.19q0 2.8-1.65 4.46a6.4 6.4 0 01-4.87 1.96M22 12.68a4.4 4.4 0 01-3.2 1.29 4.4 4.4 0 01-3.2-1.29 4.3 4.3 0 01-1.31-3.21q0-1.92 1.31-3.21a4.4 4.4 0 013.2-1.29q1.9 0 3.2 1.29a4.3 4.3 0 011.31 3.21A4.3 4.3 0 0122 12.68m-4.99-1.26q.75.78 1.79.77 1.04 0 1.79-.77.75-.78.75-1.95 0-1.19-.74-1.96-.75-.77-1.8-.77t-1.8.77a2.7 2.7 0 00-.74 1.96q0 1.17.75 1.95m14.84 1.26q-1.3 1.29-3.2 1.29c-1.9 0-2.33-.43-3.2-1.29a4.3 4.3 0 01-1.31-3.21q0-1.92 1.31-3.21 1.3-1.29 3.2-1.29c1.9 0 2.33.43 3.2 1.29a4.3 4.3 0 011.31 3.21q0 1.92-1.31 3.21m-4.99-1.26q.75.78 1.79.77 1.04 0 1.79-.77.75-.78.75-1.95 0-1.19-.74-1.96c-.74-.77-1.09-.77-1.8-.77q-1.05 0-1.8.77a2.7 2.7 0 00-.74 1.96q0 1.17.75 1.95M38.32 18q-1.5 0-2.52-.8a4.5 4.5 0 01-1.46-1.86l1.72-.72q.27.65.85 1.12.59.48 1.41.48a2.3 2.3 0 001.76-.68q.64-.68.64-1.96v-.65h-.07a2.9 2.9 0 01-2.37 1.02 4 4 0 01-3.01-1.31 4.4 4.4 0 01-1.29-3.17 4.4 4.4 0 011.29-3.19 4 4 0 013.01-1.32q.76 0 1.39.29t.98.72h.07v-.72h1.87v8.07q0 2.35-1.2 3.52A4.2 4.2 0 0138.32 18m.13-5.81q1.02 0 1.71-.77a2.8 2.8 0 00.69-1.93q0-1.17-.69-1.96a2.2 2.2 0 00-1.71-.79q-1.03 0-1.77.78a2.8 2.8 0 00-.73 1.96q0 1.16.73 1.93.74.78 1.77.78M45.93.48v13.21h-1.98V.48zm5.41 13.48a4.38 4.38 0 01-4.46-4.49q0-1.98 1.23-3.24a4 4 0 013.01-1.26 3.8 3.8 0 012.68 1.07 5 5 0 011.17 1.8l.2.51-6.01 2.49a2.3 2.3 0 002.18 1.36q1.37 0 2.21-1.24l1.53 1.02q-.5.76-1.45 1.38-.92.6-2.29.6m-2.5-4.63l4.02-1.67a1.4 1.4 0 00-.63-.69 2 2 0 00-1.04-.26q-.87 0-1.63.72a2.4 2.4 0 00-.72 1.9m11.21 4.36V1.5h1.57l4.24 7.42h.07l4.24-7.42h1.57v12.19h-1.57V6.45l.07-2.04h-.07l-3.81 6.69h-.92l-3.81-6.69h-.07l.07 2.04v7.24zm16.31.27q-1.33 0-2.22-.77a2.5 2.5 0 01-.89-2.03q0-1.36 1.06-2.14 1.05-.77 2.61-.77 1.38 0 2.26.51v-.23q0-.91-.63-1.47A2.3 2.3 0 0077 6.51q-.68 0-1.23.32a1.6 1.6 0 00-.77.88l-1.43-.61q.28-.75 1.14-1.39a3.6 3.6 0 012.25-.64q1.6 0 2.66.94 1.05.93 1.06 2.64v5.04h-1.5v-1.16h-.08a3 3 0 01-2.74 1.43m.25-1.43q.97 0 1.76-.72.8-.72.79-1.71-.67-.54-1.99-.54-1.14 0-1.72.49-.58.5-.58 1.16 0 .61.53.97.54.35 1.21.35m9.97 1.43q-.96 0-1.71-.41a3 3 0 01-1.13-1.02h-.07l.07 1.16v3.68h-1.57V5.35h1.5v1.16h.07a3 3 0 011.13-1.02 3.67 3.67 0 014.5.87 4.5 4.5 0 011.18 3.17q0 1.9-1.18 3.17a3.7 3.7 0 01-2.79 1.26m-.26-1.43q1.1 0 1.87-.83.78-.82.78-2.19t-.78-2.19a2.5 2.5 0 00-1.87-.83q-1.11 0-1.88.82-.78.81-.77 2.2c.01 1.39.26 1.65.77 2.2q.78.82 1.88.82m8.39 1.43a3.8 3.8 0 01-3.65-2.38l1.4-.58q.67 1.57 2.26 1.57.73 0 1.2-.32a1 1 0 00.47-.85q0-.81-1.14-1.11l-1.69-.41a4 4 0 01-1.52-.77 1.9 1.9 0 01-.72-1.54q0-1.11.98-1.8a4 4 0 012.32-.69q1.11 0 1.98.5t1.24 1.44l-1.34.56q-.46-1.11-1.91-1.11-.7 0-1.18.29t-.48.78q0 .72 1.11.97l1.65.39a3 3 0 011.74.94q.56.66.56 1.5 0 1.12-.92 1.87-.9.75-2.36.75" />
        </svg>
      </Box>
    </Paper>
  );
}

const fetch = debounce(
  async (
    request: { input: string; sessionToken: any },
    callback: (results?: readonly PlaceType[]) => void,
  ) => {
    try {
      const { suggestions } = await (
        window as any
      ).google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request,
      );

      callback(
        suggestions.map((suggestion: any) => {
          const place = suggestion.placePrediction;
          // Map to the old AutocompleteService.getPlacePredictions format
          // https://developers.google.com/maps/documentation/javascript/places-migration-autocomplete
          return {
            description: place.text.text,
            structured_formatting: {
              main_text: place.mainText.text,
              main_text_matched_substrings: place.mainText.matches.map(
                (match: any) => ({
                  offset: match.startOffset,
                  length: match.endOffset - match.startOffset,
                }),
              ),
              secondary_text: place.secondaryText?.text,
            },
          };
        }),
      );
    } catch (err: any) {
      if (err.message.startsWith('Quota exceeded for quota')) {
        callback(request.input.length === 1 ? fakeAnswer.p : fakeAnswer.paris);
      }

      throw err;
    }
  },
  400,
);

const emptyOptions = [] as any;
let sessionToken: any;

export default function GoogleMaps() {
  // @focus-start @padding 1
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>(emptyOptions);
  const callbackId = React.useId().replace(/[^\w]/g, '');
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    // The Google global is already available (script loaded by a prior mount).
    if ((window as any).google) {
      setLoaded(true);
      return undefined;
    }

    let active = true;
    const GOOGLE_NAMESPACE = '_google_callback';
    const globalContext =
      // @ts-expect-error: Google Maps stores its callback registry on a custom window property.
      window[GOOGLE_NAMESPACE] || (window[GOOGLE_NAMESPACE] = {});
    // Register (or re-register) the callback so it points at this mounted
    // instance. The `active` guard turns a late callback (after unmount, e.g.
    // a Strict Mode remount) into a no-op instead of a setState warning.
    globalContext[callbackId] = () => {
      if (active) {
        setLoaded(true);
      }
    };

    if (!document.querySelector('#google-maps')) {
      const script = loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=${GOOGLE_NAMESPACE}.${callbackId}`,
        document.querySelector('head')!,
      );
      script.id = 'google-maps';
    }

    return () => {
      active = false;
    };
  }, [callbackId]);

  useEnhancedEffect(() => {
    if (!loaded) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : emptyOptions);
      return undefined;
    }

    // Allow to resolve the out of order request resolution.
    let active = true;

    if (!sessionToken) {
      sessionToken = new (
        window as any
      ).google.maps.places.AutocompleteSessionToken();
    }

    fetch({ input: inputValue, sessionToken }, (results?: readonly PlaceType[]) => {
      if (!active) {
        return;
      }

      let newOptions: readonly PlaceType[] = [];

      if (results) {
        newOptions = results;

        if (value) {
          newOptions = [
            value,
            ...results.filter((result) => result.description !== value.description),
          ];
        }
      } else if (value) {
        newOptions = [value];
      }
      setOptions(newOptions);
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, loaded]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      slots={{
        paper: CustomPaper,
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      resetHighlightOnMouseLeave
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches = option.structured_formatting.main_text_matched_substrings;

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight
                        ? 'fontWeightBold'
                        : 'fontWeightRegular',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                {option.structured_formatting.secondary_text ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
  // @focus-end
}

// Fake data in case Google Maps Places API returns a rate limit.
const fakeAnswer = {
  p: [
    {
      description: 'Portugal',
      structured_formatting: {
        main_text: 'Portugal',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Puerto Rico',
      structured_formatting: {
        main_text: 'Puerto Rico',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Pakistan',
      structured_formatting: {
        main_text: 'Pakistan',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Philippines',
      structured_formatting: {
        main_text: 'Philippines',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
      },
    },
    {
      description: 'Paris, France',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 1 }],
        secondary_text: 'France',
      },
    },
  ],
  paris: [
    {
      description: 'Paris, France',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'France',
      },
    },
    {
      description: 'Paris, TX, USA',
      structured_formatting: {
        main_text: 'Paris',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'TX, USA',
      },
    },
    {
      description: "Paris Beauvais Airport, Route de l'Aéroport, Tillé, France",
      structured_formatting: {
        main_text: 'Paris Beauvais Airport',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: "Route de l'Aéroport, Tillé, France",
      },
    },
    {
      description: 'Paris Las Vegas, South Las Vegas Boulevard, Las Vegas, NV, USA',
      structured_formatting: {
        main_text: 'Paris Las Vegas',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: 'South Las Vegas Boulevard, Las Vegas, NV, USA',
      },
    },
    {
      description: "Paris La Défense Arena, Jardin de l'Arche, Nanterre, France",
      structured_formatting: {
        main_text: 'Paris La Défense Arena',
        main_text_matched_substrings: [{ offset: 0, length: 5 }],
        secondary_text: "Jardin de l'Arche, Nanterre, France",
      },
    },
  ],
};
