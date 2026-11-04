import Grid from '@mui/material/Grid';
import type { IconImageProps } from '@mui/internal-core-docs/IconImage';
import IconImage from '@mui/internal-core-docs/IconImage';

export const CORE_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Spotify logo',
    name: 'companies/spotify',
    width: 100,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Nasa logo',
    name: 'companies/nasa',
    mode: '',
    width: 52,
    height: 42,
  },
  {
    alt: 'Netflix logo',
    name: 'companies/netflix',
    mode: '',
    width: 80,
    height: 52,
  },
  {
    alt: 'Unity logo',
    name: 'companies/unity',
    width: 69,
    height: 52,
  },
  {
    alt: 'Shutterstock logo',
    name: 'companies/shutterstock',
    width: 100,
    height: 52,
  },
];

export const ADVANCED_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Southwest logo',
    name: 'companies/southwest',
    width: 130,
    height: 54,
    style: {
      marginTop: -10,
    },
  },
  {
    alt: 'Tesla logo',
    name: 'companies/tesla',
    width: 140,
    height: 52,
    style: {
      marginTop: -11,
    },
  },
  {
    alt: 'Apple logo',
    name: 'companies/apple',
    width: 29,
    height: 52,
    style: {
      marginTop: -21,
    },
  },
  {
    alt: 'Siemens logo',
    name: 'companies/siemens',
    mode: '',
    width: 119,
    height: 59,
    style: {
      marginTop: -13,
    },
  },
  {
    alt: 'Volvo logo',
    name: 'companies/volvo',
    width: 128,
    height: 52,
    style: {
      marginTop: -11,
    },
  },
  {
    alt: 'Deloitte logo',
    name: 'companies/deloitte',
    width: 97,
    height: 52,
    style: {
      marginTop: -12,
    },
  },
];

export const DESIGNKITS_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Spotify logo',
    name: 'companies/spotify',
    width: 100,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Apple logo',
    name: 'companies/apple',
    width: 29,
    height: 52,
  },
  {
    alt: 'Netflix logo',
    name: 'companies/netflix',
    mode: '',
    width: 80,
    height: 52,
  },
  {
    alt: 'X logo',
    name: 'companies/x',
    mode: '',
    width: 30,
    height: 30,
  },
  {
    alt: 'Salesforce logo',
    name: 'companies/salesforce',
    mode: '',
    width: 50,
    height: 52,
  },
];

export const TEMPLATES_CUSTOMERS: Array<IconImageProps> = [
  {
    alt: 'Ebay logo',
    name: 'companies/ebay',
    width: 73,
    height: 52,
  },
  {
    alt: 'Amazon logo',
    name: 'companies/amazon',
    width: 80,
    height: 52,
  },
  {
    alt: 'Samsung logo',
    name: 'companies/samsung',
    mode: '',
    width: 88,
    height: 52,
  },
  {
    alt: 'Patreon logo',
    name: 'companies/patreon',
    width: 103,
    height: 52,
  },
  {
    alt: 'AT&T logo',
    name: 'companies/atandt',
    width: 71,
    height: 52,
  },
  {
    alt: 'Verizon logo',
    name: 'companies/verizon',
    width: 91,
    height: 52,
  },
];

export default function CompaniesGrid({ data }: { data: Array<IconImageProps> }) {
  return (
    <Grid container spacing={4}>
      {data.map((imgProps) => (
        <Grid
          key={imgProps.name}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'contain',
          }}
          size={{ xs: 6, sm: 4, md: 2 }}
        >
          <IconImage alt={imgProps.alt} loading="eager" {...imgProps} />
        </Grid>
      ))}
    </Grid>
  );
}
