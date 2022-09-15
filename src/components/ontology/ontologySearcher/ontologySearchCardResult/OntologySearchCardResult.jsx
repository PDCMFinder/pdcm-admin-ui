import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import React from "react";
import OntologySuggestionData from "../../../suggestions/ontologySuggestionData/OntologySuggestionData";

const OntologySearchCardResult = ({ result, onTermAccepted }) => {
  //   console.log("result", result);
  return (
    <div>
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OntologySuggestionData suggestion={result} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onTermAccepted(result)}>
            Accept term
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default OntologySearchCardResult;
