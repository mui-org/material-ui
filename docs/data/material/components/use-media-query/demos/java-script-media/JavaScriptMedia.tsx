import json2mq from 'json2mq';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function JavaScriptMedia() {
  // @focus-start @padding 1
  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    }),
  );

  return <span>{`{ minWidth: 600 } matches: ${matches}`}</span>;
  // @focus-end
}
