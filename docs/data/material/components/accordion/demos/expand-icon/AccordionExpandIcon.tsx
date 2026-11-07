import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon() {
  // @focus-start @padding 1
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
          <Typography component="span">Performance reports</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Download sales, traffic, and conversion reports from the previous
            quarter.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component="span">Inventory alerts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Receive notifications when popular items are low in stock or ready to
            reorder.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  // @focus-end
}
