import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

import Suggestion from "../suggestion/Suggestion";

const SuggestionsList = ({ suggestions }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Button variant="text">
          {expanded ? "Hide sugestions" : "See suggestions"}
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {suggestions.map((suggestion, index) => {
            return <Suggestion suggestion={suggestion} key={index} />;
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SuggestionsList;
