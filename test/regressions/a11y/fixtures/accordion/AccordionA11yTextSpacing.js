import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionA11yTextSpacing() {
  const id = React.useId();
  return (
    <Accordion defaultExpanded sx={{ maxWidth: 320 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-panel1-content`}
        id={`${id}-panel1-header`}
      >
        <Typography component="span">
          Review your accessibility settings before continuing to the next step
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget. Vivamus auctor neque a sapien fringilla, in dictum
          massa pretium.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
