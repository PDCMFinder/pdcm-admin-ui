import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

import Suggestion from "../suggestion/Suggestion";
import { useQuery } from "react-query";
import { getMappingEntitySuggestions } from "../../../apis/Mappings.api";
import { Box } from "@mui/system";

const SuggestionsList = ({ mappingEntityId }) => {
  const [expanded, setExpanded] = React.useState(false);

  const suggestionsQuery = useQuery(
    ["getMappingEntitySuggestions", mappingEntityId],
    () => getMappingEntitySuggestions(mappingEntityId),
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );

  const suggestions = suggestionsQuery.data || [];
  let suggestionsQueryIsLoading = suggestionsQuery.isLoading;
  const refetchSuggestions = suggestionsQuery.refetch;

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("suggestions.length", suggestions.length);
    console.log("suggestions", suggestions);
    if (suggestions.length === 0) {
      refetchSuggestions();
    }
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {suggestionsQueryIsLoading && (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}

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
          {suggestions.length > 0 && (
            <div>
              {suggestions.map((suggestion, index) => {
                return <Suggestion suggestion={suggestion} key={index} />;
              })}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SuggestionsList;
