import React, { useState } from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import "./facet.css";

const Facet = ({ name, type, options, selection, onSelectionChange }) => {
  const [open, setOpen] = useState(selection.length > 0);
  const [currentSelection, setCurrentSelection] = useState(selection);

  const containsKey = (key) => {
    return currentSelection.some((element) => {
      return element.key === key;
    });
  };

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
                    key={option.key}
                    checked={containsKey(option.key)}
                    onChange={(e) => {
                      let newSelection = [...currentSelection];
                      if (e.target.checked) {
                        newSelection.push(option);
                      } else {
                        newSelection = newSelection.filter(
                          (selectedKey) => selectedKey.key !== option.key
                        );
                      }
                      setCurrentSelection(newSelection);
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
    <>
      <Accordion disableGutters elevation={0} expanded={open}>
        <AccordionSummary
          onClick={() => setOpen(!open)}
          expandIcon={<FontAwesomeIcon icon={faAngleRight} />}
        >
          {name}
        </AccordionSummary>
        <AccordionDetails>
          <div id={`facet-section-${name}`}>{renderOptions()}</div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Facet;
