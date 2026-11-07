import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionExpandDefault() {
  // @focus-start @padding 1
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Delivery options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Choose standard shipping, scheduled delivery, or pickup based on what is
            available for your order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Gift options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Add a gift message, choose wrapping, and hide prices on the packing slip.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  // @focus-end
}
