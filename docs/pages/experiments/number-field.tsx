import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { Field } from '@base-ui/react/field';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import NumberField, { numberFieldClasses } from '@mui/material/NumberField';
import type { NumberFieldOwnerState, NumberFieldProps } from '@mui/material/NumberField';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';

const ltrCache = createCache({ key: 'number-field-ltr' });
const rtlCache = createCache({
  key: 'number-field-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const variants = ['outlined', 'filled', 'standard'] as const;
const positions = ['start', 'end', 'split'] as const;
const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
const sections = [
  ['playground', 'Playground'],
  ['appearance', 'Appearance'],
  ['values', 'Values'],
  ['controls', 'Controls'],
  ['scrubbing', 'Scrubbing'],
  ['numbers', 'Numbers'],
  ['state', 'State'],
  ['slots', 'Slots and refs'],
  ['events', 'Events'],
  ['forms', 'Forms'],
  ['accessibility', 'Accessibility'],
  ['themes', 'Themes'],
  ['ssr', 'SSR'],
  ['inspection', 'Inspection'],
] as const;
const gridStyles = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
  gap: 2,
};
const customIconProps = {
  incrementButton: { children: <KeyboardArrowUpIcon fontSize="inherit" /> },
  decrementButton: { children: <KeyboardArrowDownIcon fontSize="inherit" /> },
};

type RecordEvent = (source: string, details?: unknown) => void;

interface ExampleProps {
  title: string;
  expected: string;
  children: React.ReactNode;
}

function Example({ title, expected, children }: ExampleProps) {
  return (
    <Paper component="article" variant="outlined" sx={{ p: 2.5, minWidth: 0 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
        {children}
        <Typography variant="body2" color="text.secondary">
          Expected: {expected}
        </Typography>
      </Stack>
    </Paper>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Stack component="section" id={id} spacing={2} sx={{ scrollMarginTop: 24 }}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <FormControlLabel
      label={label}
      control={<Switch checked={checked} onChange={(_, value) => onChange(value)} />}
    />
  );
}

function Output({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box
      component="pre"
      aria-label={label}
      sx={{
        m: 0,
        p: 2,
        bgcolor: 'action.hover',
        borderRadius: 1,
        overflow: 'auto',
        maxHeight: 400,
        fontSize: 12,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </Box>
  );
}

// Base's mergeProps adds this method before invoking consumer handlers.
function preventBaseHandler(event: React.SyntheticEvent) {
  (event as React.SyntheticEvent & { preventBaseUIHandler: () => void }).preventBaseUIHandler();
}

function Playground({ record }: { record: RecordEvent }) {
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  const [colorIndex, setColorIndex] = React.useState(0);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [customIcons, setCustomIcons] = React.useState(false);
  const [variant, setVariant] = React.useState<(typeof variants)[number]>('outlined');
  const [position, setPosition] = React.useState<(typeof positions)[number]>('end');

  return (
    <Section id="playground" title="Live props and events">
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        <Toggle label="Read only" checked={readOnly} onChange={setReadOnly} />
        <Toggle label="Required" checked={required} onChange={setRequired} />
        <Toggle label="Error" checked={error} onChange={setError} />
        <Toggle label="Small" checked={small} onChange={setSmall} />
        <Button variant="outlined" onClick={() => setColorIndex((colorIndex + 1) % colors.length)}>
          {`Color: ${colors[colorIndex]}`}
        </Button>
        <Toggle label="Full width" checked={fullWidth} onChange={setFullWidth} />
        <Toggle label="Use custom chevron icons" checked={customIcons} onChange={setCustomIcons} />
        <Button
          variant="outlined"
          onClick={() => setVariant(variants[(variants.indexOf(variant) + 1) % variants.length])}
        >
          {`Variant: ${variant}`}
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            setPosition(positions[(positions.indexOf(position) + 1) % positions.length])
          }
        >
          {`Controls: ${position}`}
        </Button>
      </Stack>
      <Example
        title="Uncontrolled field"
        expected="The label, helper, input, and buttons agree on state. Click the label, type, clear, step, hold a button, and blur. Public focus/blur callbacks target the input; clicks bubble to the root."
      >
        <NumberField
          id="number-field-live"
          data-number-field-case="live"
          label="Live amount"
          helperText="Range 0–20. Watch the event log below."
          defaultValue={5}
          min={0}
          max={20}
          variant={variant}
          controlsPosition={position}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          error={error}
          size={small ? 'small' : 'medium'}
          color={colors[colorIndex]}
          fullWidth={fullWidth}
          slotProps={customIcons ? customIconProps : undefined}
          onFocus={(event) => record('public focus', { tag: event.currentTarget.tagName })}
          onBlur={(event) => record('public blur', { tag: event.currentTarget.tagName })}
          onClick={(event) =>
            record('root click', { target: (event.target as HTMLElement).tagName })
          }
          onValueChange={(value, details) =>
            record('value change', { value, reason: details.reason })
          }
          onValueCommitted={(value, details) =>
            record('value commit', { value, reason: details.reason })
          }
        />
      </Example>
    </Section>
  );
}

function AppearanceCases() {
  return (
    <Section id="appearance" title="Variants, sizes, and control positions">
      <Alert severity="info">
        These fields use the default plus/minus icons and control styles. Check hover, focus,
        disabled controls at bounds, narrow widths, light/dark mode, and RTL. The playground can
        replace the icons with chevrons.
      </Alert>
      <Box
        sx={{ ...gridStyles, gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, minmax(0, 1fr))' } }}
      >
        {variants.flatMap((variant) =>
          positions.map((controlsPosition) => (
            <Example
              key={variant + controlsPosition}
              title={`${variant} / ${controlsPosition}`}
              expected="Both sizes fit the input. Controls use logical start/end, stay inside the outline, and do not overlap the label or entered value. Compare in light/dark mode and RTL."
            >
              {(['medium', 'small'] as const).map((size) => (
                <NumberField
                  key={size}
                  data-number-field-case={`${variant}-${controlsPosition}-${size}`}
                  variant={variant}
                  controlsPosition={controlsPosition}
                  size={size}
                  defaultValue={5}
                  label={`${size} amount`}
                  fullWidth
                />
              ))}
            </Example>
          )),
        )}
      </Box>
      <Example
        title="Alignment with TextField"
        expected="Each pair has matching input height, label position, and helper spacing. Default controls fit inside the NumberField without making it taller. Resize the page and check long labels and focus outlines."
      >
        {variants.map((variant) => (
          <Stack key={variant} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <NumberField
              data-number-field-case={`alignment-${variant}`}
              variant={variant}
              label="NumberField with a longer label"
              helperText="Numeric input with default controls."
              defaultValue={5}
              fullWidth
            />
            <TextField
              variant={variant}
              label="TextField with a longer label"
              helperText="Reference input for comparison."
              defaultValue="5"
              fullWidth
            />
          </Stack>
        ))}
      </Example>
    </Section>
  );
}

function ScrubbingCases({ record }: { record: RecordEvent }) {
  return (
    <Section id="scrubbing" title="Scrub handles and floating cursors">
      <Box sx={{ ...gridStyles, gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' } }}>
        {variants.map((variant) => (
          <Example
            key={variant}
            title={variant}
            expected="Handles and buttons fit both sizes. The handle and floating cursor indicate the drag axis. Consumer adornments stay beside the value. Check the cursor in dark mode and RTL too."
          >
            {(['medium', 'small'] as const).map((size) => (
              <NumberField
                key={size}
                data-number-field-case={`scrub-${variant}-${size}`}
                variant={variant}
                size={size}
                label={`${size} amount`}
                defaultValue={5}
                scrubArea={size === 'medium' ? 'start' : 'end'}
                controlsPosition="split"
                fullWidth
                slotProps={{
                  scrubArea: { direction: size === 'medium' ? 'horizontal' : 'vertical' },
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  },
                }}
                onValueCommitted={(value, details) =>
                  record('scrub commit', { value, reason: details.reason })
                }
              />
            ))}
          </Example>
        ))}
      </Box>
      <Example
        title="Disabled, read-only, and empty fields"
        expected="Disabled and read-only handles use a neutral cursor and cannot change the value. An empty start handle shrinks the label; an empty end handle leaves it resting until focus."
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <NumberField label="Disabled" defaultValue={5} scrubArea="start" disabled fullWidth />
          <NumberField
            label="Read only"
            defaultValue={5}
            scrubArea="end"
            readOnly
            fullWidth
            slotProps={{ scrubArea: { direction: 'vertical' } }}
          />
          <NumberField label="Empty start" scrubArea="start" fullWidth />
          <NumberField label="Empty end" scrubArea="end" fullWidth />
        </Stack>
      </Example>
    </Section>
  );
}

function ValueCases({ record }: { record: RecordEvent }) {
  const [value, setValue] = React.useState<number | null>(5);
  const [reject, setReject] = React.useState(false);

  return (
    <Section id="values" title="Controlled values and empty input">
      <Example
        title="Controlled value and cancellation"
        expected="Parent updates appear immediately. Zero remains zero; clearing produces null. Rejecting changes keeps the accepted value. Change and commit events report numeric values and reasons."
      >
        <NumberField
          data-number-field-case="controlled"
          label="Controlled amount"
          value={value}
          fullWidth
          onValueChange={(next, details) => {
            record('controlled proposal', {
              value: next,
              reason: details.reason,
              rejected: reject,
            });
            if (reject) {
              details.cancel();
            } else {
              setValue(next);
            }
          }}
          onValueCommitted={(next, details) =>
            record('controlled commit', { value: next, reason: details.reason })
          }
        />
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button onClick={() => setValue(0)}>Set zero</Button>
          <Button onClick={() => setValue(null)}>Set null</Button>
          <Button onClick={() => setValue(17)}>Set 17</Button>
          <Toggle label="Reject proposed changes" checked={reject} onChange={setReject} />
        </Stack>
        <Output label="Controlled value">{JSON.stringify({ value }, null, 2)}</Output>
      </Example>
    </Section>
  );
}

function ControlCases({ record }: { record: RecordEvent }) {
  const [position, setPosition] = React.useState<(typeof positions)[number]>('end');
  const [lockIncrement, setLockIncrement] = React.useState(false);
  const [cancelPointer, setCancelPointer] = React.useState(false);
  const [unsetHandlers, setUnsetHandlers] = React.useState<'undefined' | 'null'>('undefined');
  // Deliberately exercise JavaScript callers passing null, which React's TS handler types exclude.
  const absentHandlers = {
    onPointerDown: unsetHandlers === 'null' ? null : undefined,
    onClick: unsetHandlers === 'null' ? null : undefined,
  } as unknown as Pick<IconButtonProps, 'onPointerDown' | 'onClick'>;

  return (
    <Section id="controls" title="Button behavior and adornment composition">
      <Box sx={gridStyles}>
        <Example
          title="Bounds and independent disabled control"
          expected="Increment disables at 6, decrement at 4. Consumer disabled=false cannot enable a boundary control. Locking increment leaves decrement available."
        >
          <Toggle label="Lock increment" checked={lockIncrement} onChange={setLockIncrement} />
          <NumberField
            data-number-field-case="button-bounds"
            label="Between 4 and 6"
            min={4}
            max={6}
            defaultValue={5}
            slotProps={{
              incrementButton: { disabled: lockIncrement },
              decrementButton: { disabled: false },
            }}
            onValueChange={(value, details) =>
              record('bounded change', { value, reason: details.reason })
            }
            onValueCommitted={(value, details) =>
              record('bounded commit', { value, reason: details.reason })
            }
          />
        </Example>
        <Example
          title="Consumer handlers and cancellation"
          expected="A pointer handler runs before Base stepping and can cancel it. Mouse stepping begins on pointerdown; canceling only onClick does not undo that earlier change."
        >
          <Toggle
            label="Cancel pointer stepping"
            checked={cancelPointer}
            onChange={setCancelPointer}
          />
          <NumberField
            data-number-field-case="button-handlers"
            label="Button handler amount"
            defaultValue={5}
            slotProps={{
              incrementButton: {
                onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
                  record('consumer increment pointerdown');
                  if (cancelPointer) {
                    preventBaseHandler(event);
                  }
                },
                onClick: () => record('consumer increment click'),
              },
            }}
            onValueChange={(value, details) =>
              record('button change', { value, reason: details.reason })
            }
          />
        </Example>
        <Example
          title="Unset handlers preserve internal behavior"
          expected="Both undefined and null consumer handlers leave Base's pointer and click behavior active."
        >
          <Button onClick={() => setUnsetHandlers(unsetHandlers === 'null' ? 'undefined' : 'null')}>
            {`Consumer handlers: ${unsetHandlers}`}
          </Button>
          <NumberField
            data-number-field-case="unset-button-handlers"
            label="Unset button handlers"
            defaultValue={5}
            slotProps={{
              incrementButton: absentHandlers,
              decrementButton: absentHandlers,
            }}
          />
        </Example>
        <Example
          title="Both consumer adornments"
          expected="For start: controls, $, input, USD. For end: $, input, USD, controls. For split: decrement, $, input, USD, increment. Each adornment keeps its own wrapper."
        >
          {positions.map((controlsPosition) => (
            <NumberField
              key={controlsPosition}
              data-number-field-case={`adornments-${controlsPosition}`}
              label={`${controlsPosition} controls`}
              controlsPosition={controlsPosition}
              defaultValue={5}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                },
              }}
            />
          ))}
        </Example>
        <Example
          title="Move controls after editing"
          expected="Type a value, then move the controls. The edited value and native input stay intact. Consumer $/kg adornments keep their order, and an empty label shrinks when controls move to start or split."
        >
          <Stack direction="row" spacing={1}>
            {positions.map((option) => (
              <Button
                key={option}
                variant={position === option ? 'contained' : 'outlined'}
                onClick={() => setPosition(option)}
              >
                {option}
              </Button>
            ))}
          </Stack>
          <NumberField
            data-number-field-case="moving-controls"
            label="Move controls"
            defaultValue={5}
            controlsPosition={position}
            slotProps={{
              input: () => ({
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }),
            }}
          />
          <NumberField
            data-number-field-case="moving-empty-controls"
            label="Empty moving controls"
            controlsPosition={position}
          />
        </Example>
      </Box>
    </Section>
  );
}

function NumericCases({ record }: { record: RecordEvent }) {
  const [snap, setSnap] = React.useState(false);
  const [allowOutOfRange, setAllowOutOfRange] = React.useState(false);
  const [wheel, setWheel] = React.useState(false);
  const locales = ['en-US', 'de-DE', 'fr-FR', 'ar-EG'] as const;
  const [localeIndex, setLocaleIndex] = React.useState(0);

  return (
    <Section id="numbers" title="Constraints, stepping, formatting, and parsing">
      <Box sx={gridStyles}>
        <Example
          title="Off-grid value and modifier steps"
          expected="Arrows/buttons use step=2, Alt uses 0.25, and Shift uses 5. Snapping chooses step multiples. Enter an out-of-range value and blur to compare clamping modes. Home/End should respect bounds."
        >
          <Toggle label="Snap on step" checked={snap} onChange={setSnap} />
          <Toggle
            label="Allow out-of-range typing"
            checked={allowOutOfRange}
            onChange={setAllowOutOfRange}
          />
          <NumberField
            data-number-field-case="steps"
            label="Steps and limits"
            defaultValue={5}
            min={0}
            max={10}
            step={2}
            smallStep={0.25}
            largeStep={5}
            snapOnStep={snap}
            allowOutOfRange={allowOutOfRange}
            onValueChange={(value, details) =>
              record('step change', { value, reason: details.reason })
            }
          />
          <NumberField
            data-number-field-case="step-any"
            label="Any numeric value"
            defaultValue={1.25}
            step="any"
            helperText="Decimals remain valid; interactive stepping still works."
          />
        </Example>
        <Example
          title="Locale and formatting"
          expected="Display strings follow the selected locale. Type/paste localized decimals, negative numbers, and formatted currency; callbacks retain raw numbers. Percent display maps to fractional numeric values."
        >
          <Button onClick={() => setLocaleIndex((localeIndex + 1) % locales.length)}>
            {`Locale: ${locales[localeIndex]}`}
          </Button>
          <NumberField
            data-number-field-case="currency"
            label="Currency"
            defaultValue={-1234.5}
            locale={locales[localeIndex]}
            format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
            onValueChange={(value, details) =>
              record('currency change', { value, reason: details.reason })
            }
          />
          <NumberField
            data-number-field-case="percent"
            label="Percentage"
            defaultValue={0.125}
            locale={locales[localeIndex]}
            format={{ style: 'percent', maximumFractionDigits: 2 }}
            step={0.01}
          />
        </Example>
        <Example
          title="Wheel stepping"
          expected="Wheel stepping is opt-in and only acts while the input is focused and hovered. Check ordinary page scrolling elsewhere and modifier steps."
        >
          <Toggle label="Allow wheel scrub" checked={wheel} onChange={setWheel} />
          <NumberField
            data-number-field-case="wheel"
            label="Wheel amount"
            defaultValue={5}
            allowWheelScrub={wheel}
            onValueChange={(value, details) =>
              record('wheel change', { value, reason: details.reason })
            }
            onValueCommitted={(value, details) =>
              record('wheel commit', { value, reason: details.reason })
            }
          />
        </Example>
      </Box>
    </Section>
  );
}

function StateCases() {
  const [disabled, setDisabled] = React.useState(true);
  const [required, setRequired] = React.useState(true);
  const [readOnly, setReadOnly] = React.useState(false);
  const [inheritedDisabled, setInheritedDisabled] = React.useState(true);
  const conflictingProps = { disabled: !disabled, required: !required, readOnly: !readOnly };
  const paths: Array<{ name: string; slotProps: NumberFieldProps['slotProps'] }> = [
    { name: 'root', slotProps: { root: { disabled: !disabled, required: !required } } },
    { name: 'input callback', slotProps: { input: () => conflictingProps } },
    { name: 'htmlInput', slotProps: { htmlInput: conflictingProps } },
    { name: 'input.inputProps', slotProps: { input: { inputProps: conflictingProps } } },
    {
      name: 'input.slotProps.input',
      slotProps: { input: { slotProps: { input: conflictingProps } } },
    },
  ];

  return (
    <Section id="state" title="Behavioral prop precedence and inherited state">
      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Toggle label="Public disabled" checked={disabled} onChange={setDisabled} />
        <Toggle label="Public required" checked={required} onChange={setRequired} />
        <Toggle label="Public read only" checked={readOnly} onChange={setReadOnly} />
      </Stack>
      <Box sx={gridStyles}>
        {paths.map(({ name, slotProps }) => (
          <Example
            key={name}
            title={`Conflicting ${name}`}
            expected="Public/Base behavioral flags win over opposite slot flags. Check input attributes, editing, required asterisk, label/helper styling, and button availability."
          >
            <NumberField
              data-number-field-case={`precedence-${name}`}
              label={`${name} amount`}
              helperText="Slot flags deliberately disagree with the public props."
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              slotProps={slotProps}
              fullWidth
            />
          </Example>
        ))}
        <Example
          title="Base Field disabled inheritance"
          expected="Base parent disabled wins even with public disabled=false and false in every slot. Callback titles report the inherited state; all interactive elements and Material disabled styles agree."
        >
          <Toggle
            label="Disable Base parent"
            checked={inheritedDisabled}
            onChange={setInheritedDisabled}
          />
          <Field.Root disabled={inheritedDisabled}>
            <NumberField
              data-number-field-case="inherited"
              label="Inherited amount"
              helperText="Inspect the callback titles and native attributes."
              disabled={false}
              fullWidth
              slotProps={{
                root: (state) => ({ disabled: false, title: `root disabled: ${state.disabled}` }),
                input: (state) => ({ disabled: false, title: `input disabled: ${state.disabled}` }),
                htmlInput: { disabled: false },
                inputLabel: (state) => ({ title: `label disabled: ${state.disabled}` }),
                formHelperText: (state) => ({ title: `helper disabled: ${state.disabled}` }),
                incrementButton: { disabled: false },
                decrementButton: { disabled: false },
              }}
            />
          </Field.Root>
        </Example>
      </Box>
    </Section>
  );
}

const CustomRoot = styled(FormControl)({ border: '1px dashed', padding: 16 });
const CustomInput = styled(OutlinedInput)({ borderRadius: 12 });
const CustomLabel = styled(InputLabel)({ fontWeight: 700 });
const CustomHelper = styled(FormHelperText)({ fontStyle: 'italic' });
const CustomHtmlInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'> & {
    ownerState?: NumberFieldOwnerState;
    as?: React.ElementType;
  }
>(function CustomHtmlInput({ ownerState, as, ...other }, ref) {
  return <input {...other} ref={ref} data-custom-native="true" />;
});
const CustomButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps & { ownerState?: NumberFieldOwnerState }
>(function CustomButton({ ownerState, ...other }, ref) {
  return (
    <IconButton
      {...other}
      ref={ref}
      data-button-owner-disabled={String(ownerState?.disabled)}
      data-button-owner-readonly={String(ownerState?.readOnly)}
    />
  );
});

function CustomSlotCases() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const materialRef = React.useRef<HTMLDivElement>(null);
  const publicInputRef = React.useRef<HTMLInputElement>(null);
  const nativeRef = React.useRef<HTMLInputElement>(null);
  const incrementRef = React.useRef<HTMLButtonElement>(null);
  const decrementRef = React.useRef<HTMLButtonElement>(null);
  const [refs, setRefs] = React.useState('Inspect refs after editing or reaching a boundary.');

  return (
    <Section id="slots" title="Custom components, refs, and owner state">
      <Box sx={gridStyles}>
        <Example
          title="Every slot replaced"
          expected="The section root, input wrapper, native input, label/helper, and button replacements preserve behavior. Both input refs point to the same input. At max=6, increment owner state is disabled while decrement stays enabled."
        >
          <NumberField
            data-number-field-case="custom-slots"
            id="number-field-custom"
            ref={rootRef}
            inputRef={publicInputRef}
            label="Custom slots"
            helperText="Bold label, italic helper, dashed section root."
            defaultValue={5}
            min={4}
            max={6}
            fullWidth
            slots={{
              root: CustomRoot,
              input: CustomInput,
              htmlInput: CustomHtmlInput,
              inputLabel: CustomLabel,
              formHelperText: CustomHelper,
              incrementButton: CustomButton,
              decrementButton: CustomButton,
            }}
            classes={{ root: 'number-field-experiment-custom' }}
            slotProps={{
              root: { component: 'section' },
              input: { ref: materialRef },
              htmlInput: { ref: nativeRef },
              incrementButton: { ref: incrementRef, 'aria-label': 'Add one' },
              decrementButton: { ref: decrementRef, 'aria-label': 'Subtract one' },
            }}
            sx={{ '&.number-field-experiment-custom': { borderColor: 'secondary.main' } }}
          />
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button onClick={() => publicInputRef.current?.focus()}>Focus through inputRef</Button>
            <Button
              onClick={() =>
                setRefs(
                  JSON.stringify(
                    {
                      rootTag: rootRef.current?.tagName,
                      materialTag: materialRef.current?.tagName,
                      nativeTag: nativeRef.current?.tagName,
                      inputRefsAgree: publicInputRef.current === nativeRef.current,
                      rootContainsInput: rootRef.current?.contains(nativeRef.current),
                      incrementTag: incrementRef.current?.tagName,
                      decrementTag: decrementRef.current?.tagName,
                      incrementOwnerDisabled: incrementRef.current?.dataset.buttonOwnerDisabled,
                      decrementOwnerDisabled: decrementRef.current?.dataset.buttonOwnerDisabled,
                    },
                    null,
                    2,
                  ),
                )
              }
            >
              Inspect refs
            </Button>
          </Stack>
          <Output label="Custom slot refs">{refs}</Output>
        </Example>
        <Example
          title="Native button slots"
          expected="Replacing both IconButtons with native buttons preserves stepping, labels, bounds, and refs. Internal ownerState must not become a DOM attribute."
        >
          <NumberField
            data-number-field-case="native-button-slots"
            label="Native controls"
            defaultValue={5}
            min={4}
            max={6}
            slots={{ incrementButton: 'button', decrementButton: 'button' }}
          />
        </Example>
        <Example
          title="Owned input children"
          expected="Neither top-level children nor root slot children replace the input, hidden submission input, label, helper, or controls. Neither replacement message should appear."
        >
          <NumberField
            data-number-field-case="owned-children"
            label="Preserved input"
            helperText="Owned field structure remains present."
            defaultValue={5}
            slotProps={{ root: { children: <span>Root replacement message</span> } }}
          >
            <span>Top-level replacement message</span>
          </NumberField>
        </Example>
      </Box>
    </Section>
  );
}

function EventCases({ record }: { record: RecordEvent }) {
  const [path, setPath] = React.useState<'htmlInput' | 'inputProps' | 'nested' | 'unset'>(
    'htmlInput',
  );
  const [cancelArrow, setCancelArrow] = React.useState(false);
  const htmlRef = React.useRef<HTMLInputElement>(null);
  const legacyRef = React.useRef<HTMLInputElement>(null);
  const nestedRef = React.useRef<HTMLInputElement>(null);
  const [refs, setRefs] = React.useState('Inspect the selected native ref.');

  function nativeProps(source: string, ref: React.Ref<HTMLInputElement>) {
    return {
      ref,
      placeholder: source,
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        record(`${source} keydown`, { key: event.key });
        if (cancelArrow && event.key === 'ArrowUp') {
          preventBaseHandler(event);
        }
      },
      onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) =>
        record(`${source} keyup`, { key: event.key }),
      onFocus: () => record(`${source} focus`),
      onBlur: () => record(`${source} blur`),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        record(`${source} DOM change`, { text: event.target.value }),
    };
  }

  const inputSlotProps: OutlinedInputProps = {
    onKeyDown: () => record('Material input keydown'),
    onKeyUp: () => record('Material input keyup'),
    ...(path !== 'htmlInput' && {
      inputProps: path === 'unset' ? undefined : nativeProps('input.inputProps', legacyRef),
    }),
    ...(path === 'nested' && {
      slotProps: { input: nativeProps('input.slotProps.input', nestedRef) },
    }),
  };

  return (
    <Section id="events" title="Native prop selection and event composition">
      <Example
        title="Competing native configurations"
        expected="htmlInput is selected first, input.inputProps replaces it, and input.slotProps.input wins last. Only the selected native handlers/ref remain. Explicitly undefined inputProps discards htmlInput, leaving Material keyboard handlers and Base behavior. ArrowUp steps unless canceled; focus/blur and label shrink survive."
      >
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
          {(['htmlInput', 'inputProps', 'nested', 'unset'] as const).map((option) => (
            <Button
              key={option}
              variant={path === option ? 'contained' : 'outlined'}
              onClick={() => setPath(option)}
            >
              {option}
            </Button>
          ))}
          <Toggle label="Cancel native ArrowUp" checked={cancelArrow} onChange={setCancelArrow} />
        </Stack>
        <NumberField
          variant="outlined"
          data-number-field-case="native-selection"
          label="Native precedence"
          defaultValue={5}
          onFocus={() => record('public input focus')}
          onBlur={() => record('public input blur')}
          onValueChange={(value, details) =>
            record('merged numeric change', { value, reason: details.reason })
          }
          slotProps={{
            input: inputSlotProps,
            htmlInput: nativeProps('htmlInput', htmlRef),
          }}
        />
        <Button
          onClick={() =>
            setRefs(
              JSON.stringify(
                {
                  htmlInput: htmlRef.current?.tagName ?? null,
                  inputProps: legacyRef.current?.tagName ?? null,
                  nested: nestedRef.current?.tagName ?? null,
                  selectedPlaceholder: (htmlRef.current ?? legacyRef.current ?? nestedRef.current)
                    ?.placeholder,
                },
                null,
                2,
              ),
            )
          }
        >
          Inspect selected ref
        </Button>
        <Output label="Native prop refs">{refs}</Output>
      </Example>
    </Section>
  );
}

function FormCases({ record }: { record: RecordEvent }) {
  const [submission, setSubmission] = React.useState(
    'Submit to inspect FormData; reset and submit again.',
  );

  return (
    <Section id="forms" title="Form submission, validation, and reset">
      <Example
        title="Raw values, one entry per name, and external form association"
        expected="FormData contains raw numeric amount, quantity, fixed, and externalAmount entries exactly once. Disabled omitted is absent. Required/range/step validation blocks invalid submission. Edit a value, reset, and submit again to check the reset gap below."
      >
        <Alert severity="warning">
          Known gap: native form reset currently preserves edited uncontrolled values instead of
          restoring defaultValue. Edit the currency amount, reset, then submit to compare its
          visible and submitted values. Reset all examples remounts the fields and restores
          defaults.
        </Alert>
        <Box
          component="form"
          id="number-field-form"
          onSubmit={(event) => {
            event.preventDefault();
            const entries = Array.from(new FormData(event.currentTarget).entries());
            setSubmission(JSON.stringify(entries, null, 2));
            record('form submit', entries);
          }}
          onReset={() => record('form reset')}
          onInvalidCapture={(event) => {
            const input = event.target as HTMLInputElement;
            record('form invalid', { name: input.name, message: input.validationMessage });
          }}
        >
          <Stack spacing={2}>
            <NumberField
              data-number-field-case="form-currency"
              label="Submitted currency"
              name="amount"
              defaultValue={1234.5}
              locale="de-DE"
              format={{ style: 'currency', currency: 'EUR' }}
            />
            <NumberField
              data-number-field-case="form-required"
              label="Required even quantity"
              name="quantity"
              defaultValue={2}
              required
              min={0}
              max={10}
              step={2}
              allowOutOfRange
            />
            <NumberField
              data-number-field-case="form-disabled"
              label="Excluded from submission"
              name="omitted"
              defaultValue={8}
              disabled
            />
            <NumberField
              data-number-field-case="form-readonly"
              label="Read-only submitted value"
              name="fixed"
              defaultValue={7}
              readOnly
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained">
                Submit form
              </Button>
              <Button type="reset" variant="outlined">
                Reset form
              </Button>
            </Stack>
          </Stack>
        </Box>
        <NumberField
          data-number-field-case="external-form"
          label="Outside the form"
          name="externalAmount"
          form="number-field-form"
          defaultValue={3}
        />
        <Output label="Form submission">{submission}</Output>
      </Example>
    </Section>
  );
}

function AccessibilityCases() {
  const [autoFocus, setAutoFocus] = React.useState(false);
  const [content, setContent] = React.useState<'text' | 'zero' | 'none'>('text');
  const contentProps = {
    text: { label: 'Changing amount', helperText: 'Changing helper' },
    zero: { label: 0, helperText: 0 },
    none: { label: undefined, helperText: undefined },
  }[content];

  return (
    <Section id="accessibility" title="Labels, helper text, IDs, and keyboard access">
      <Box sx={gridStyles}>
        <Example
          title="Generated IDs and Tab order"
          expected="Each field has a unique input ID, label association, and helper description. Clicking a label focuses its input. Tab reaches inputs and surrounding actions; Base stepper buttons stay out of the Tab sequence."
        >
          <Button variant="outlined">Before fields</Button>
          <NumberField
            data-number-field-case="generated-id"
            label="First generated id"
            helperText="First helper description."
          />
          <NumberField
            data-number-field-case="second-generated-id"
            label="Second generated id"
            helperText="Second helper description."
            error
            required
          />
          <Button variant="outlined">After fields</Button>
        </Example>
        <Example
          title="No visible label/helper and explicit shrink"
          expected="Empty label/helper props create no label/helper elements or dangling helper description. The input remains named through aria-label. Explicit shrink=false is preserved even with a start adornment."
        >
          <NumberField
            data-number-field-case="no-label"
            label=""
            helperText=""
            slotProps={{ htmlInput: { 'aria-label': 'Amount without visible label' } }}
          />
          <NumberField
            data-number-field-case="explicit-shrink"
            label="Explicit shrink false"
            controlsPosition="split"
            slotProps={{ inputLabel: { shrink: false } }}
          />
        </Example>
        <Example
          title="Autofocus on mount"
          expected="Mounting the field focuses its visible input. The root and stepper controls must not receive autofocus instead."
        >
          <Toggle label="Mount autofocus field" checked={autoFocus} onChange={setAutoFocus} />
          {autoFocus && (
            <NumberField
              data-number-field-case="autofocus"
              label="Autofocused amount"
              autoFocus
              defaultValue={5}
            />
          )}
        </Example>
        <Example
          title="Label and helper updates"
          expected="Switch content without remounting. Text and numeric zero render as label/helper content. Removing them removes their elements and the helper association, while aria-label keeps the input named."
        >
          <Stack direction="row" spacing={1}>
            {(['text', 'zero', 'none'] as const).map((option) => (
              <Button
                key={option}
                variant={content === option ? 'contained' : 'outlined'}
                onClick={() => setContent(option)}
              >
                {option}
              </Button>
            ))}
          </Stack>
          <NumberField
            data-number-field-case="changing-label-helper"
            {...contentProps}
            slotProps={{
              htmlInput: { 'aria-label': content === 'none' ? 'Changing amount' : undefined },
            }}
          />
        </Example>
      </Box>
    </Section>
  );
}

function ThemeCases() {
  const outerTheme = useTheme();
  const componentTheme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: outerTheme.palette.mode },
        direction: outerTheme.direction,
        components: {
          MuiNumberField: {
            defaultProps: {
              color: 'secondary',
              required: true,
              controlsPosition: 'split',
              helperText: 'Theme defaultProps helper.',
            },
            styleOverrides: {
              root: {
                padding: 16,
                border: '2px solid',
                borderColor: outerTheme.palette.secondary.main,
                borderRadius: 8,
              },
              controls: {
                outline: `1px dashed ${outerTheme.palette.info.main}`,
                gap: 4,
              },
              incrementButton: ({ ownerState, theme }) => ({
                border: '1px solid',
                borderColor: ownerState.disabled
                  ? theme.palette.action.disabled
                  : theme.palette.success.main,
                borderRadius: 4,
              }),
              decrementButton: ({ ownerState, theme }) => ({
                border: '1px solid',
                borderColor: ownerState.disabled
                  ? theme.palette.action.disabled
                  : theme.palette.warning.main,
                borderRadius: 4,
              }),
            },
            variants: [
              {
                props: { size: 'small' },
                style: { backgroundColor: outerTheme.palette.action.hover },
              },
            ],
          },
        },
      }),
    [outerTheme],
  );

  return (
    <Section id="themes" title="Theme defaults, variants, and styling hooks">
      <Box sx={gridStyles}>
        <Example
          title="Theme defaults and explicit prop precedence"
          expected="Theme defaults supply required, secondary color, split controls, and helper text. All four styleOverride slots apply: root border, dashed controls, green increment, orange decrement. Only small gets the shaded variant. At 4/6, the unavailable button border turns gray from its resolved owner state."
        >
          <ThemeProvider theme={componentTheme}>
            <NumberField
              data-number-field-case="theme-defaults"
              label="Theme defaults"
              size="small"
              defaultValue={5}
              min={4}
              max={6}
            />
            <NumberField
              data-number-field-case="theme-explicit"
              label="Explicit props"
              color="primary"
              required={false}
              controlsPosition="end"
              size="medium"
              defaultValue={5}
              min={4}
              max={6}
            />
          </ThemeProvider>
        </Example>
        <Example
          title="Utility classes, custom classes, and sx"
          expected="Custom root and controls classes add a purple border and blue dotted outlines. Exported button classes add dashed outlines through sx. Disabled Material button states remain visible at the bounds."
        >
          <NumberField
            data-number-field-case="control-classes"
            label="Styling hooks"
            defaultValue={5}
            min={4}
            max={6}
            controlsPosition="split"
            classes={{
              root: 'number-field-custom-root',
              controls: 'number-field-custom-controls',
              incrementButton: 'number-field-custom-increment',
              decrementButton: 'number-field-custom-decrement',
            }}
            sx={{
              '&.number-field-custom-root': {
                border: '1px solid',
                borderColor: 'secondary.main',
                p: 2,
              },
              '& .number-field-custom-controls': {
                outline: '1px dotted',
                outlineColor: 'info.main',
              },
              [`& .${numberFieldClasses.incrementButton}, & .${numberFieldClasses.decrementButton}`]:
                {
                  outline: '1px dashed',
                  outlineColor: 'secondary.main',
                },
            }}
          />
        </Example>
      </Box>
    </Section>
  );
}

function SsrCases() {
  const cases = [
    { name: 'empty-end', value: null, controlsPosition: 'end', shrink: false },
    { name: 'zero', value: 0, controlsPosition: 'end', shrink: true },
    { name: 'filled', value: 42, controlsPosition: 'end', shrink: true },
    { name: 'empty-start', value: null, controlsPosition: 'start', shrink: true },
    { name: 'empty-split', value: null, controlsPosition: 'split', shrink: true },
  ] as const;

  return (
    <Section id="ssr" title="Server markup and initial label shrink">
      <Alert severity="info">
        Live DOM inspection runs after effects. Use <code>Capture server markup</code> below to
        inspect a fresh server response before hydration. These fixed cases do not depend on the
        playground settings.
      </Alert>
      <Box
        sx={{ ...gridStyles, gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, minmax(0, 1fr))' } }}
      >
        {variants.map((variant) => (
          <Example
            key={variant}
            title={`${variant} initial state`}
            expected="Zero, formatted values, and empty start adornments shrink immediately; empty end controls do not. Explicit shrink=false wins. Server attributes must match the expected values before hydration."
          >
            {cases.map(({ name, value, controlsPosition, shrink }) => (
              <NumberField
                key={name}
                data-number-field-case={`ssr-${variant}-${name}`}
                data-expected-shrink={String(shrink)}
                variant={variant}
                label={name}
                value={value}
                controlsPosition={controlsPosition}
                fullWidth
              />
            ))}
            <NumberField
              data-number-field-case={`ssr-${variant}-default-zero`}
              data-expected-shrink="true"
              variant={variant}
              label="Uncontrolled zero"
              defaultValue={0}
            />
            <NumberField
              data-number-field-case={`ssr-${variant}-formatted`}
              data-expected-shrink="true"
              variant={variant}
              label="Formatted initial value"
              defaultValue={1234.5}
              locale="de-DE"
              format={{ style: 'currency', currency: 'EUR' }}
            />
            <NumberField
              data-number-field-case={`ssr-${variant}-consumer-start`}
              data-expected-shrink="true"
              variant={variant}
              label="Empty consumer adornment"
              slotProps={{
                input: () => ({
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }),
              }}
            />
            <NumberField
              data-number-field-case={`ssr-${variant}-explicit-shrink`}
              data-expected-shrink="false"
              variant={variant}
              label="Explicit shrink false"
              controlsPosition="start"
              slotProps={{ inputLabel: { shrink: false } }}
            />
          </Example>
        ))}
      </Box>
    </Section>
  );
}

function inspectFields(container: ParentNode) {
  return Array.from(container.querySelectorAll<HTMLElement>('[data-number-field-case]'), (root) => {
    const input = root.querySelector<HTMLInputElement>('input:not([aria-hidden="true"])');
    // Base's submission input is this root's sibling, not another field's input.
    const sibling = root.nextElementSibling;
    const hidden =
      root.querySelector<HTMLInputElement>('input[aria-hidden="true"]') ??
      (sibling?.matches('input[aria-hidden="true"]') ? (sibling as HTMLInputElement) : null);
    const label = root.querySelector('label');
    const helper = root.querySelector('.MuiFormHelperText-root');
    const expectedShrink = root.dataset.expectedShrink;
    return {
      example: root.dataset.numberFieldCase,
      rootTag: root.tagName.toLowerCase(),
      rootClasses: root.className,
      rootCallbackState: root.getAttribute('title'),
      inputCallbackState: root.querySelector('.MuiInputBase-root')?.getAttribute('title'),
      input: input && {
        id: input.id,
        value: input.value,
        type: input.type,
        disabled: input.disabled,
        required: input.required,
        readOnly: input.readOnly,
        placeholder: input.placeholder,
        describedBy: input.getAttribute('aria-describedby'),
        invalid: input.getAttribute('aria-invalid'),
        valid: input.validity.valid,
        validationMessage: input.validationMessage,
        name: input.name,
        form: input.form?.id ?? null,
      },
      hiddenInput: hidden && {
        value: hidden.value,
        name: hidden.name,
        disabled: hidden.disabled,
        form: hidden.form?.id ?? null,
        valid: hidden.validity.valid,
        validationMessage: hidden.validationMessage,
      },
      label: label && {
        id: label.id,
        htmlFor: label.htmlFor,
        matchesInput: label.htmlFor === input?.id,
        shrink: label.dataset.shrink,
        expectedShrink,
        matchesExpectedShrink:
          expectedShrink === undefined ? undefined : label.dataset.shrink === expectedShrink,
        disabled: label.classList.contains('Mui-disabled'),
        callbackState: label.getAttribute('title'),
      },
      helper: helper && {
        id: helper.id,
        callbackState: helper.getAttribute('title'),
        describedByInput: input?.getAttribute('aria-describedby')?.split(' ').includes(helper.id),
      },
      controls: Array.from(root.querySelectorAll(`.${numberFieldClasses.controls}`), (control) => ({
        classes: control.className,
        position: control.classList.contains('MuiInputAdornment-positionStart') ? 'start' : 'end',
      })),
      buttons: Array.from(root.querySelectorAll<HTMLButtonElement>('button'), (button) => ({
        name: button.getAttribute('aria-label') ?? button.textContent,
        disabled: button.disabled,
        ariaDisabled: button.getAttribute('aria-disabled'),
        tabIndex: button.tabIndex,
        controls: button.getAttribute('aria-controls'),
        classes: button.className,
        iconCount: button.querySelectorAll('svg').length,
        ownerDisabled: button.dataset.buttonOwnerDisabled,
        ownerStateLeaked: button.hasAttribute('ownerState'),
      })),
    };
  });
}

function Inspection({ examplesRef }: { examplesRef: React.RefObject<HTMLDivElement | null> }) {
  const [inspection, setInspection] = React.useState(
    'Inspect live slots or capture fresh server markup.',
  );
  const [loading, setLoading] = React.useState(false);

  async function inspectServer() {
    setLoading(true);
    try {
      const response = await fetch(window.location.href, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Server response: ${response.status}`);
      }
      const document = new DOMParser().parseFromString(await response.text(), 'text/html');
      const fields = inspectFields(document).filter((field) => field.example?.startsWith('ssr-'));
      if (fields.length === 0) {
        throw new Error('The server response did not contain the NumberField SSR cases.');
      }
      setInspection(
        JSON.stringify(
          {
            source: 'Fresh server response, before hydration',
            matches: fields.filter((field) => field.label?.matchesExpectedShrink).length,
            total: fields.length,
            mismatches: fields
              .filter((field) => !field.label?.matchesExpectedShrink)
              .map((field) => ({
                example: field.example,
                expected: field.label?.expectedShrink,
                actual: field.label?.shrink,
              })),
            fields,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      setInspection(`Server inspection failed: ${String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="inspection" title="DOM and server inspection">
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          onClick={() =>
            setInspection(
              JSON.stringify(
                {
                  source: 'Live DOM after effects',
                  activeElement: document.activeElement?.tagName,
                  fields: examplesRef.current ? inspectFields(examplesRef.current) : [],
                },
                null,
                2,
              ),
            )
          }
        >
          Inspect live slots
        </Button>
        <Button variant="outlined" disabled={loading} onClick={inspectServer}>
          {loading ? 'Reading server markup…' : 'Capture server markup'}
        </Button>
      </Stack>
      <Output label="Slot inspection">{inspection}</Output>
    </Section>
  );
}

export default function NumberFieldExperiment() {
  const [dark, setDark] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [generation, setGeneration] = React.useState(0);
  const [events, setEvents] = React.useState<string[]>([]);
  const eventSequence = React.useRef(0);
  const examplesRef = React.useRef<HTMLDivElement>(null);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: dark ? 'dark' : 'light' },
        direction: rtl ? 'rtl' : 'ltr',
      }),
    [dark, rtl],
  );
  const record = React.useCallback<RecordEvent>((source, details) => {
    eventSequence.current += 1;
    const entry = `${eventSequence.current}. ${source}${details === undefined ? '' : ` ${JSON.stringify(details)}`}`;
    setEvents((previous) => [...previous.slice(-39), entry]);
  }, []);

  return (
    <CacheProvider value={rtl ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme}>
        <Box
          dir={rtl ? 'rtl' : 'ltr'}
          sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}
        >
          <Stack
            component="main"
            spacing={5}
            sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1280, mx: 'auto' }}
          >
            <div>
              <Typography component="h1" variant="h4" gutterBottom>
                NumberField implementation checks
              </Typography>
              <Typography color="text.secondary">
                Manual integration and visual checks for the implemented API. Each case describes
                the expected result; use the event log and DOM/server inspection to verify it.
                Compare light/dark mode, RTL, and narrow screens before deciding which control
                styles need refinement.
              </Typography>
            </div>
            <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
              <Toggle label="Dark mode" checked={dark} onChange={setDark} />
              <Toggle label="RTL" checked={rtl} onChange={setRtl} />
              <Button
                variant="outlined"
                onClick={() => {
                  setGeneration((current) => current + 1);
                  setEvents([]);
                }}
              >
                Reset all examples
              </Button>
            </Stack>
            <Stack
              component="nav"
              aria-label="NumberField checks"
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {sections.map(([id, title]) => (
                <Button key={id} component="a" href={`#${id}`} size="small">
                  {title}
                </Button>
              ))}
            </Stack>
            <Alert severity="info">
              Default icons, control classes, theme overrides, slot composition, and initial SSR
              label state and scrub-area composition are implemented. This page supports manual
              review; accessibility checks in the regression suite still need to be added for the
              new component. The Forms section also records a confirmed native reset gap.
            </Alert>
            <Stack key={generation} ref={examplesRef} spacing={5}>
              <Playground record={record} />
              <AppearanceCases />
              <ValueCases record={record} />
              <ControlCases record={record} />
              <ScrubbingCases record={record} />
              <NumericCases record={record} />
              <StateCases />
              <CustomSlotCases />
              <EventCases record={record} />
              <FormCases record={record} />
              <AccessibilityCases />
              <ThemeCases />
              <SsrCases />
            </Stack>
            <Inspection examplesRef={examplesRef} />
            <Stack component="section" spacing={2} aria-label="Event log">
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Typography component="h2" variant="h5">
                  Event log
                </Typography>
                <Button onClick={() => setEvents([])}>Clear log</Button>
              </Stack>
              <Output label="NumberField event log">
                {events.length
                  ? events.join('\n')
                  : 'Interact with the fields to record events. The latest 40 events are kept.'}
              </Output>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
