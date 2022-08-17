import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MappingsContent from "../mappingsContent/MappingsContent";

const MappingSearchResults = ({ results, isLoading }) => {
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
        <MappingsContent mappings={results} />
      )}
    </div>
  );
};

export default MappingSearchResults;
