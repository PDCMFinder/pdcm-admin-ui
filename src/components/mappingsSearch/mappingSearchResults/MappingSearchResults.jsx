import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OntologySearchBar from "../../ontology/ontologySearcher/ontologySearchBar/OntologySearchBar";
import MappingsContent from "../mappingsContent/MappingsContent";

const MappingSearchResults = ({ results, isLoading, onDataChanged }) => {
  const [ontoSearchOpen, setOntoSearchOpen] = useState(false);
  const [ontoSearchEntity, setOntoSearchEntity] = useState(null);

  const handleOntoSearchOpen = (mappingEntity) => {
    console.log("Open for ", mappingEntity);
    setOntoSearchOpen(true);
    setOntoSearchEntity(mappingEntity);
  };

  const handleOntoSearchClosed = () => {
    setOntoSearchOpen(false);
    setOntoSearchEntity(null);
  };
  return (
    <div>
      {results.length === 0 && !isLoading && (
        <Alert severity="warning">
          Your query/filter did not return any results
        </Alert>
      )}

      {isLoading && (
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

      {!isLoading && results.length > 0 && (
        <MappingsContent
          mappings={results}
          onDataChanged={onDataChanged}
          onOntoSearchOpen={handleOntoSearchOpen}
        />
      )}

      {/* A component to search ontologies. Activated if the button is clicked in one of the 
      MappingCards elements */}
      <OntologySearchBar
        isOpen={ontoSearchOpen}
        mappingEntity={ontoSearchEntity}
        onClosed={handleOntoSearchClosed}
        onDataChanged={onDataChanged}
      />
    </div>
  );
};

export default MappingSearchResults;
