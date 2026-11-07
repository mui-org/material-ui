import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DisabledAccordion() {
  // @focus-start @padding 1
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Active subscription</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Review your plan, renewal date, and the number of seats included in your
            subscription.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Billing history</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Download invoices, review payment status, or update the billing contact
            for your account.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Cancellation unavailable</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
  // @focus-end
}
