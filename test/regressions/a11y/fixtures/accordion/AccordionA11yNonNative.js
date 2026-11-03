import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomDivSummary = React.forwardRef(function CustomDivSummary(props, ref) {
  return <div ref={ref} {...props} />;
});

export default function AccordionA11yNonNative() {
  const id = React.useId();
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          component={CustomDivSummary}
          nativeButton={false}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">Non-native summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          component={CustomDivSummary}
          nativeButton={false}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">Disabled non-native summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
