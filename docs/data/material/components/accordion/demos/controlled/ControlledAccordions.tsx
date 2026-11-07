import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions() {
  // @focus-start @padding 1
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Account
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Primary contact and timezone
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Choose the contact name and email that appear on invoices and customer
            emails.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Team access
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            3 admins, 12 members
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Invite teammates, assign roles, and choose who can approve billing
            changes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Order routing
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Routes to the closest warehouse
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Set fulfillment rules so orders ship from the warehouse with the best
            stock and delivery speed.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Data export
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Generate a downloadable archive of account activity, order history, and
            customer records.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  // @focus-end
}
