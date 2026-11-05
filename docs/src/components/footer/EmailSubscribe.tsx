import * as React from 'react';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const NEWSLETTER_SUBSCRIBE_URL =
  process.env.DEPLOY_ENV === 'production' || process.env.DEPLOY_ENV === 'staging'
    ? 'https://f0433e60.sibforms.com/serve/MUIEAHEhgYhMvLAw0tycwk1BQaIB-q0akob3JdtDBmHLhSR-jLheJ2T44LFCz27alz9wq_Nkdz9EK7Y8hzM1vQND9kTFyKkkhTIbEzXaH5d-_S9Fw4PXS1zAK8efPY6nhCdoAop1SKTeZ_GAPW5S0xBFQRLUGYbvvRgE4Q2Ki_f1KjbiCqaRuzmj_I3SD1r0CoR4INmK3CLtF4kF'
    : 'https://f0433e60.sibforms.com/serve/MUIEAE9LexIU5u5hYkoDJ-Mc379-irLHNIlGEgCm5njkAwg6OYFfNQTd25n4SO6vJom9WvQ89GJ0sYBzFYswLRewcOvD_dRtoFycXIObP8SMm-kNO1CdXKaWEZutrfqMKygHb1Je1QBGrMUnJg8J5qVeCwa7rSPBN0A1_6Ug3SiGjgIlbiCcMVA4KbhaYTiBvKkaejlCjgZcLHBT';

const Form = styled('form')({});

function searchParams(params: any) {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default function EmailSubscribe({ sx }: { sx?: SxProps<Theme> }) {
  const [form, setForm] = React.useState<{
    email: string;
    status: 'initial' | 'loading' | 'failure' | 'sent';
  }>({
    email: '',
    status: 'initial',
  });
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm((current) => ({ ...current, status: 'loading' }));
    try {
      await fetch(NEWSLETTER_SUBSCRIBE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: searchParams({
          EMAIL: form.email,
          email_address_check: '',
          locale: 'en',
          SOURCE: 'Home form newsletter',
        }),
      });
      setForm((current) => ({ ...current, status: 'sent' }));
    } catch (error) {
      setForm((current) => ({ ...current, status: 'failure' }));
    }
  };
  if (form.status === 'sent') {
    return (
      <Alert
        icon={<CheckCircleRoundedIcon fontSize="small" />}
        severity="success"
        sx={[
          (theme) => ({
            fontWeight: 'medium',
            bgcolor: 'success.50',
            border: '1px solid',
            borderColor: 'success.200',
            color: 'success.900',
            ...theme.applyDarkStyles({
              color: 'success.200',
              bgcolor: alpha(theme.palette.success[700], 0.1),
              borderColor: alpha(theme.palette.success[600], 0.3),
            }),
          }),
        ]}
      >
        Go to your email and open the <strong>confirmation email</strong> to confirm your
        subscription.
      </Alert>
    );
  }
  return (
    <Form onSubmit={handleSubmit} sx={sx}>
      <FormLabel
        htmlFor="email-subscribe"
        sx={{ typography: 'caption', color: 'text.secondary', fontWeight: 'medium' }}
      >
        Your email
      </FormLabel>
      <Box
        sx={{
          mt: 1,
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '100%', sm: 320 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
        }}
      >
        <InputBase
          id="email-subscribe"
          name="email"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={form.email}
          onChange={(event) => setForm({ email: event.target.value, status: 'initial' })}
          inputProps={{ required: true }}
          sx={[
            (theme) => ({
              typography: 'body1',
              flexGrow: 1,
              minWidth: 220,
              borderRadius: '10px',
              border: '1px solid',
              borderColor: 'grey.300',
              bgcolor: '#FFF',
              boxShadow: `inset 0 1px 2px ${
                (theme.vars || theme).palette.grey[50]
              }, 0 2px .5px ${alpha(theme.palette.grey[100], 0.5)}`,
              '&:hover': {
                borderColor: 'grey.400',
                boxShadow: `inset 0 1px 2px ${(theme.vars || theme).palette.grey[100]}`,
              },
              [`&.${inputBaseClasses.focused}`]: {
                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary[500], 0.5)}`,
                borderColor: 'primary.500',
              },
              [`& .${inputBaseClasses.input}`]: {
                borderRadius: theme.shape.borderRadius,
                px: 1,
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                bgcolor: 'primaryDark.800',
                borderColor: alpha(theme.palette.primaryDark[600], 0.8),
                boxShadow: `inset 0 1px 1px ${
                  (theme.vars || theme).palette.primaryDark[900]
                }, 0 2px .5px ${(theme.vars || theme).palette.common.black}`,
                '&:hover': {
                  borderColor: 'primaryDark.500',
                  boxShadow: `inset 0 1px 2px ${(theme.vars || theme).palette.common.black}`,
                },
                [`&.${inputBaseClasses.focused}`]: {
                  borderColor: 'primary.400',
                },
              }),
          ]}
        />
        <Button variant="outlined" size="small" disabled={form.status === 'loading'} type="submit">
          Subscribe
        </Button>
      </Box>
      {form.status === 'failure' && (
        <FormHelperText
          sx={(theme) => ({
            mt: 1,
            fontWeight: 'semiBold',
            color: 'error.700',
            ...theme.applyDarkStyles({
              color: 'error.400',
            }),
          })}
        >
          Oops! Something went wrong, please try again later.
        </FormHelperText>
      )}
    </Form>
  );
}
