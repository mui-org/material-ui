import useMediaQuery from '@mui/material/useMediaQuery';

export default function SimpleMediaQuery() {
  // @focus-start @padding 1
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
  // @focus-end
}
