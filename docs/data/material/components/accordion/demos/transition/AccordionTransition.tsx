import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import type { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function AccordionTransition() {
  // @focus-start @padding 1
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: 'auto',
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'block',
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'none',
                },
              },
        ]}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Custom transition using Fade</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Fade transition animates opacity when the details are shown or
            hidden.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Default transition using Collapse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Collapse animates the panel height and is the default transition used by
            the Accordion.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  // @focus-end
}
