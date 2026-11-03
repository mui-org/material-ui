import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

function TypographyDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

export default function SkeletonTypography() {
  return (
    // @focus-start @padding 2
    <Grid container spacing={8}>
      <Grid size="grow">
        <TypographyDemo loading />
      </Grid>
      <Grid size="grow">
        <TypographyDemo />
      </Grid>
    </Grid>
    // @focus-end
  );
}
