import React, { useState } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

import "./facet.css";

const Facet = ({ name, type, options, selection, onSelectionChange }) => {
  const elementsSelected = selection.length > 0;

  const [open, setOpen] = useState(elementsSelected);

  let currentSelection = selection;

  const containsKey = (key) => {
    return currentSelection.some((element) => {
      return element.toLowerCase() === key.toLowerCase();
    });
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const renderOptions = () => {
    switch (type) {
      case "check":
        return (
          <FormGroup key={name}>
            {options.map((option) => (
              <FormControlLabel
                key={option.key}
                control={
                  <Checkbox
                    size="small"
                    key={option.key}
                    checked={containsKey(option.key)}
                    onChange={(e) => {
                      let newSelection = [...currentSelection];
                      if (e.target.checked) {
                        newSelection.push(option.name);
                      } else {
                        newSelection = newSelection.filter(
                          (selectedKey) =>
                            selectedKey.toLowerCase() !==
                            option.name.toLowerCase()
                        );
                      }
                      currentSelection = newSelection;
                      onSelectionChange(newSelection);
                    }}
                  />
                }
                label={option.name}
              />
            ))}
          </FormGroup>
        );

      default:
        return null;
    }
  };

  return (
    <Accordion disableGutters elevation={0} expanded={open || elementsSelected}>
      <AccordionSummary
        onClick={() => setOpen(!open)}
        expandIcon={<FontAwesomeIcon icon={faAngleRight} />}
      >
        <Div>{name}</Div>
      </AccordionSummary>
      <AccordionDetails>
        <div id={`facet-section-${name}`}>{renderOptions()}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Facet;
