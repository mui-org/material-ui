import * as React from 'react';
import { ThemeProvider, createTheme, useTheme, alpha } from '@mui/material/styles';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import MaterialDesignDemo, { componentCode } from 'docs/src/components/home/MaterialDesignDemo';
import ShowcaseContainer, { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import type { Data } from 'docs/src/components/home/ElementPointer';
import PointerContainer from 'docs/src/components/home/ElementPointer';
import { MoreInfoBox, MaterialVsCustomToggle } from '@mui/internal-core-docs/AppLayout';

import FlashCode from 'docs/src/components/animation/FlashCode';
import { ROUTES } from '@mui/internal-core-docs/constants';

const lineMapping: Record<string, number | number[]> = {
  card: [0, 20],
  cardmedia: [1, 5],
  stack: [6, 19],
  stack2: [7, 16],
  typography: 8,
  stack3: [9, 16],
  chip: [10, 14],
  rating: 15,
  switch: 18,
};

export default function CoreShowcase() {
  const { vars, ...globalTheme } = useTheme();
  const mode = globalTheme.palette.mode;
  const [element, setElement] = React.useState<Data>({ id: null, name: null, target: null });
  const [customized, setCustomized] = React.useState(true);
  const theme = React.useMemo(
    () =>
      customized
        ? createTheme(globalTheme, {
            palette: {
              background: {
                default:
                  mode === 'dark'
                    ? globalTheme.palette.primaryDark[900]
                    : globalTheme.palette.grey[50],
              },
            },
            shape: {
              borderRadius: 12,
            },
            shadows: ['none', '0px 4px 20px 0px hsla(210, 14%, 28%, 0.2)'],
            components: {
              MuiCard: {
                styleOverrides: {
                  root: {
                    boxShadow:
                      mode === 'dark'
                        ? `0 4px 8px ${alpha(globalTheme.palette.common.black, 0.3)}`
                        : `0 4px 8px ${alpha(globalTheme.palette.primaryDark[300], 0.3)}`,
                    backgroundColor:
                      mode === 'dark' ? globalTheme.palette.primaryDark[800] : '#fff',
                    border: '1px solid',
                    borderColor:
                      mode === 'dark'
                        ? globalTheme.palette.primaryDark[700]
                        : globalTheme.palette.grey[200],
                  },
                },
              },
              MuiAvatar: {
                styleOverrides: {
                  root: {
                    width: 50,
                    height: 50,
                    borderRadius: 99,
                  },
                },
              },
              MuiSwich: globalTheme.components?.MuiSwitch,
              MuiChip: {
                styleOverrides: {
                  filled: {
                    fontWeight: 'medium',
                    '&.MuiChip-colorSuccess': {
                      backgroundColor:
                        mode === 'dark'
                          ? globalTheme.palette.success[900]
                          : globalTheme.palette.success[100],
                      color:
                        mode === 'dark'
                          ? globalTheme.palette.success[100]
                          : globalTheme.palette.success[900],
                    },
                    '&.MuiChip-colorDefault': {
                      backgroundColor:
                        mode === 'dark'
                          ? globalTheme.palette.primaryDark[700]
                          : globalTheme.palette.grey[100],
                      color:
                        mode === 'dark'
                          ? globalTheme.palette.grey[200]
                          : globalTheme.palette.grey[800],
                    },
                  },
                },
              },
            },
          })
        : createTheme({ palette: { mode: globalTheme.palette.mode } }),
    [customized, globalTheme, mode],
  );
  const highlightedLines = element.id ? lineMapping[element.id] : null;
  let startLine;
  let endLine;
  if (highlightedLines !== null) {
    startLine = Array.isArray(highlightedLines) ? highlightedLines[0] : highlightedLines;
    endLine = Array.isArray(highlightedLines) ? highlightedLines[1] : startLine;
  }

  return (
    <ShowcaseContainer
      preview={
        <ThemeProvider theme={theme}>
          <PointerContainer
            onElementChange={setElement}
            sx={{ minWidth: 300, width: '100%', maxWidth: '100%' }}
          >
            <MaterialDesignDemo />
          </PointerContainer>
        </ThemeProvider>
      }
      code={
        <React.Fragment>
          <MaterialVsCustomToggle customized={customized} setCustomized={setCustomized} />
          <ShowcaseCodeWrapper maxHeight={320} hasDesignToggle>
            {startLine !== undefined && (
              <FlashCode startLine={startLine} endLine={endLine} sx={{ m: 1, mt: 7 }} />
            )}
            <HighlightedCode copyButtonHidden code={componentCode} language="jsx" plainStyle />
          </ShowcaseCodeWrapper>
          <MoreInfoBox
            primaryBtnLabel="Start with Material UI"
            primaryBtnHref={ROUTES.materialDocs}
            secondaryBtnLabel="View all components"
            secondaryBtnHref={ROUTES.materialAllComponents}
          />
        </React.Fragment>
      }
    />
  );
}
