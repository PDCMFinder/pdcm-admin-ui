import { Grid } from "@mui/material";
import React from "react";
import OntologySearchCardResult from "../ontologySearchCardResult/OntologySearchCardResult";

const OntologySearchResults = ({ results, onTermAccepted }) => {
  //   console.log("results", results);
  return (
    <div>
      {results.map((element, index) => {
        return (
          <Grid item xs={12} key={index}>
            <OntologySearchCardResult
              result={element}
              onTermAccepted={onTermAccepted}
            />
          </Grid>
        );
      })}
    </div>
  );
};

export default OntologySearchResults;
