import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React from "react";

import Suggestion from "../suggestion/Suggestion";
import { useQuery } from "react-query";
import { getMappingEntitySuggestions } from "../../../apis/Mappings.api";
import { Box } from "@mui/system";

const SuggestionsList = ({ mappingEntity, onDataChanged }) => {
  const [expanded, setExpanded] = React.useState(false);

  const suggestionsQuery = useQuery(
    ["getMappingEntitySuggestions", mappingEntity.id],
    () => getMappingEntitySuggestions(mappingEntity.id),
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
      retry: false,
    }
  );

  const suggestions = suggestionsQuery.data || [];
  let suggestionsQueryIsLoading = suggestionsQuery.isLoading;
  const refetchSuggestions = suggestionsQuery.refetch;

  const handleChange = (_event, isExpanded) => {
    if (suggestions.length === 0) {
      refetchSuggestions();
    }
    setExpanded(isExpanded);
  };

  const handleSuggestionAccepted = () => {
    setExpanded(false);
    onDataChanged();
  };

  return (
    <>
      {suggestionsQuery.error && (
        <Alert severity="error">{suggestionsQuery.error.message}</Alert>
      )}
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

      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Button variant="text">
            {expanded ? "Hide suggestions" : "See suggestions"}
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          {suggestions.length > 0 && (
            <div>
              {suggestions.map((suggestion, index) => {
                return (
                  <Suggestion
                    suggestion={suggestion}
                    key={index}
                    mappingEntity={mappingEntity}
                    onDataChanged={handleSuggestionAccepted}
                  />
                );
              })}
            </div>
          )}
          <Button variant="text" onClick={() => {setExpanded(false);}}>
            {expanded ? "Hide suggestions" : "See suggestions"}
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SuggestionsList;
