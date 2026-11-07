import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
  // @focus-start @padding 1
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Delivery details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Choose your preferred delivery method, add delivery instructions, and
            update your saved address.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Payment method</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Update your billing information, select a default card, or add a new
            payment method.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Order updates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Get shipment status by email, push notification, or SMS when an order
            changes.
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Save</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
  // @focus-end
}
