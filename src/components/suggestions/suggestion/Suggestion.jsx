import { faBook, faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import OntologySuggestionData from "../ontologySuggestionData copy/OntologySuggestionData";
import RuleSpeficicSuggestionData from "../ruleSpecificSuggestionData/RuleSpeficicSuggestionData";

const SourceSpecificData = ({ suggestionData }) => {
  if (suggestionData.sourceType === "Rule") {
    return (
      <RuleSpeficicSuggestionData ruleData={suggestionData.ruleSuggestion} />
    );
  } else {
    return <OntologySuggestionData suggestionData={suggestionData} />;
  }
};

const Suggestion = ({ suggestionData }) => {
  return (
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
          <Grid item xs={3}>
            <Typography variant="button" component="div">
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                icon={faBookOpenReader}
              />
              {suggestionData.sourceType}
            </Typography>
            <Typography variant="caption" component="div">
              Source
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="button" component="div">
              N/A
            </Typography>
            <Typography variant="caption" component="div">
              Score
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SourceSpecificData suggestionData={suggestionData} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Accept suggestion</Button>
      </CardActions>
    </Card>
  );
};

export default Suggestion;
