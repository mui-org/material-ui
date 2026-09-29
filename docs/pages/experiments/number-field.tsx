import * as React from 'react';
import { Field } from '@base-ui/react/field';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import NumberField, { NumberFieldProps } from '@mui/material/NumberField';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const previewStyles = {
  minHeight: 96,
  pt: 3,
  pb: 1,
  border: '1px dashed',
  borderColor: 'divider',
  borderRadius: 1,
};

const componentTheme = createTheme({
  components: {
    MuiNumberField: {
      defaultProps: {
        color: 'secondary',
        required: true,
        helperText: 'This helper text comes from theme defaultProps.',
        slotProps: { inputLabel: { shrink: true } },
      },
      styleOverrides: {
        root: {
          minHeight: 96,
          paddingTop: 24,
          paddingBottom: 8,
          border: '2px solid',
          borderColor: theme.palette.secondary.main,
          borderRadius: 8,
        },
      },
      variants: [
        {
          props: { size: 'small' },
          style: { backgroundColor: theme.palette.action.hover },
        },
      ],
    },
  },
});

const CustomLabel = styled(InputLabel)({ fontWeight: 700 });
const CustomHelperText = styled(FormHelperText)({ fontStyle: 'italic' });
const variants = ['outlined', 'filled', 'standard'] as const;

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack component="section" spacing={2} sx={{ minWidth: 0 }}>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

export default function NumberFieldExperiment() {
  const [disabled, setDisabled] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [parentDisabled, setParentDisabled] = React.useState(true);
  const [variant, setVariant] =
    React.useState<NonNullable<NumberFieldProps['variant']>>('outlined');
  const [rootClicks, setRootClicks] = React.useState(0);
  const [inspection, setInspection] = React.useState(
    'Select "Inspect rendered slots" to read the current DOM.',
  );
  const examplesRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  function inspectSlots() {
    const fields = Array.from(
      examplesRef.current?.querySelectorAll<HTMLElement>('[data-number-field-case]') ?? [],
      (root) => {
        const label = root.querySelector('label');
        const helper = root.querySelector('.MuiFormHelperText-root');
        return {
          example: root.dataset.numberFieldCase,
          rootTag: root.tagName.toLowerCase(),
          rootDisabled: root.hasAttribute('data-disabled'),
          labelDisabled: label?.classList.contains('Mui-disabled') ?? null,
          labelId: label?.id || null,
          labelFor: label?.htmlFor || null,
          helperId: helper?.id || null,
          rootCallbackState: root.getAttribute('title'),
          labelCallbackState: label?.getAttribute('title') ?? null,
          helperCallbackState: helper?.getAttribute('title') ?? null,
        };
      },
    );
    setInspection(JSON.stringify({ forwardedRefTag: rootRef.current?.tagName, fields }, null, 2));
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack component="main" spacing={4} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1100, mx: 'auto' }}>
        <div>
          <Typography component="h1" variant="h4" gutterBottom>
            NumberField composition checks
          </Typography>
          <Typography color="text.secondary">
            Check the root, label, and helper text. The input and stepper buttons are not
            implemented yet. Dashed borders mark the preview area; they are not input outlines.
          </Typography>
        </div>

        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={disabled} onChange={(_, checked) => setDisabled(checked)} />}
            label="Disabled"
          />
          <FormControlLabel
            control={<Switch checked={required} onChange={(_, checked) => setRequired(checked)} />}
            label="Required"
          />
          <FormControlLabel
            control={<Switch checked={error} onChange={(_, checked) => setError(checked)} />}
            label="Error"
          />
          <FormControlLabel
            control={<Switch checked={small} onChange={(_, checked) => setSmall(checked)} />}
            label="Small size"
          />
          <FormControlLabel
            control={
              <Switch checked={secondary} onChange={(_, checked) => setSecondary(checked)} />
            }
            label="Secondary color"
          />
          <Button
            variant="outlined"
            onClick={() => setVariant(variants[(variants.indexOf(variant) + 1) % variants.length])}
          >
            Variant: {variant}
          </Button>
        </Stack>

        <Box
          ref={examplesRef}
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}
        >
          <Example title="Props and root events">
            <NumberField
              id="number-field-live"
              data-number-field-case="live"
              label="Live state"
              helperText="Toggle the controls above. Click this preview to test root events."
              disabled={disabled}
              required={required}
              error={error}
              size={small ? 'small' : 'medium'}
              color={secondary ? 'secondary' : 'primary'}
              variant={variant}
              fullWidth
              onClick={() => setRootClicks((count) => count + 1)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={previewStyles}
            />
            <Typography variant="body2">Root clicks: {rootClicks}</Typography>
          </Example>

          <Example title="Inherited disabled and slot callbacks">
            <FormControlLabel
              control={
                <Switch
                  checked={parentDisabled}
                  onChange={(_, checked) => setParentDisabled(checked)}
                />
              }
              label="Disable Base UI parent"
            />
            <Field.Root disabled={parentDisabled}>
              <NumberField
                id="number-field-inherited"
                data-number-field-case="inherited"
                label="Inherited state"
                helperText="The label, helper text, and all three callbacks should agree."
                fullWidth
                slotProps={{
                  root: (state) => ({ title: `disabled: ${state.disabled}` }),
                  inputLabel: (state) => ({ shrink: true, title: `disabled: ${state.disabled}` }),
                  formHelperText: (state) => ({ title: `disabled: ${state.disabled}` }),
                }}
                sx={previewStyles}
              />
            </Field.Root>
          </Example>

          <Example title="Theme defaults, overrides, and variants">
            <ThemeProvider theme={componentTheme}>
              <NumberField
                id="number-field-themed"
                data-number-field-case="theme"
                label="Themed field"
                size="small"
                fullWidth
              />
            </ThemeProvider>
            <Typography variant="body2">
              Expect a required label, theme helper text, purple border, and a shaded small-size
              variant.
            </Typography>
          </Example>

          <Example title="Custom slots, root tag, classes, and ref">
            <NumberField
              id="number-field-custom"
              data-number-field-case="custom"
              ref={rootRef}
              label="Custom slots"
              helperText="Bold label, italic helper text, and a section root."
              required
              disabled={disabled}
              slots={{ inputLabel: CustomLabel, formHelperText: CustomHelperText }}
              slotProps={{ root: { component: 'section' }, inputLabel: { shrink: true } }}
              classes={{ root: 'number-field-experiment-custom' }}
              sx={{
                ...previewStyles,
                '&.number-field-experiment-custom': { borderColor: 'secondary.main' },
              }}
            />
          </Example>

          <Example title="Generated IDs">
            <NumberField
              data-number-field-case="generated-id"
              label="No explicit id"
              helperText="Inspect: labelId, labelFor, and helperId should be populated."
              slotProps={{ inputLabel: { shrink: true } }}
              sx={previewStyles}
            />
            <NumberField
              data-number-field-case="second-generated-id"
              label="Second generated id"
              helperText="These IDs should differ from the field above."
              slotProps={{ inputLabel: { shrink: true } }}
              sx={previewStyles}
            />
          </Example>

          <Example title="No label or helper text">
            <NumberField
              id="number-field-empty"
              data-number-field-case="empty"
              label=""
              helperText=""
              sx={previewStyles}
            />
            <Typography variant="body2">
              Expect an empty root with no label or helper-text elements.
            </Typography>
          </Example>
        </Box>

        <Stack spacing={2}>
          <Button variant="contained" onClick={inspectSlots} sx={{ alignSelf: 'flex-start' }}>
            Inspect rendered slots
          </Button>
          <Box
            component="pre"
            aria-label="Slot inspection"
            sx={{
              m: 0,
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              overflow: 'auto',
              fontSize: 13,
            }}
          >
            {inspection}
          </Box>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
