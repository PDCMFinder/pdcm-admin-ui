import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

import Suggestion from "../suggestion/Suggestion";
import RuleSpeficicSuggestionData from "../ruleSpecificSuggestionData/RuleSpeficicSuggestionData";

const SuggestionsList = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const suggestions = [
    {
      sourceType: "Rule",
      suggestedTermLabel: "Pancreatic Adenocarcinoma",
      suggestedTermUrl: "http://purl.obolibrary.org/obo/NCIT_C8294",
      score: 131.12985229492188,
      relativeScore: 0.0,
      ruleSuggestion: {
        id: 1616601,
        mappingEntityId: 812316,
        entityTypeName: "diagnosis",
        data: {
          "rule.value.originTissue": "pancreas",
          "rule.value.dataSource": "jax",
          "rule.value.tumourType": "primary",
          "rule.value.sampleDiagnosis": "mucinous adenocarcinoma",
        },
      },
      ontologySuggestion: null,
      id: 1616600,
    },
    {
      sourceType: "Ontology",
      suggestedTermLabel: "Colon Mucinous Adenocarcinoma",
      suggestedTermUrl: "http://purl.obolibrary.org/obo/NCIT_C7966",
      score: 175.65565490722656,
      relativeScore: 0.0,
      ruleSuggestion: null,
      ontologySuggestion: {
        id: 1628343,
        definition:
          "An invasive adenocarcinoma of the colon characterized by the presence of pools of extracellular mucin.  Malignant glandular epithelial cells are pr...",
        synonyms: [
          "mucinous adenocarcinoma of colon",
          "colonic colloidal adenocarcinoma",
          "colon mucinous adenocarcinoma",
          "colloid adenocarcinoma of colon",
          "colon colloid adenocarcinoma",
          "mucinous adenocarcinoma of the colon",
          "colloid adenocarcinoma of the colon",
          "colonic mucinous adenocarcinoma",
          "colloidal adenocarcinoma of the colon",
          "colloidal colon adenocarcinoma",
          "colon colloidal adenocarcinoma",
          "colloidal adenocarcinoma of colon",
          "colloid colon adenocarcinoma",
          "mucinous colon adenocarcinoma",
          "colonic colloid adenocarcinoma",
        ],
      },
      id: 1628342,
    },

    {
      sourceType: "Rule",
      suggestedTermLabel: "EPIRUBICIN",
      suggestedTermUrl: "http://purl.obolibrary.org/obo/NCIT_C62028",
      score: 2622.358642578125,
      relativeScore: 0.0,
      ruleSuggestion: {
        id: null,
        mappingEntityId: 819696,
        entityTypeName: "treatment",
        data: {
          "rule.value.treatmentName": "epirubicin",
          "rule.value.dataSource": "pdmr",
        },
      },
      ontologySuggestion: null,
      id: 12,
    },
  ];

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
          {suggestions.map((suggestion) => {
            return <Suggestion suggestion={suggestion} key={suggestion.id} />;
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SuggestionsList;
