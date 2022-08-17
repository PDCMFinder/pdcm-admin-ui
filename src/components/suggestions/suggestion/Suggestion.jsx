import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateEntity } from "../../../apis/Mappings.api";
import OntologySuggestionData from "../ontologySuggestionData copy/OntologySuggestionData";
import RuleSpeficicSuggestionData from "../ruleSpecificSuggestionData/RuleSpeficicSuggestionData";

const SourceSpecificData = ({ suggestion }) => {
  if (suggestion.sourceType === "Rule") {
    return <RuleSpeficicSuggestionData suggestion={suggestion} />;
  } else {
    return <OntologySuggestionData suggestion={suggestion} />;
  }
};

const Suggestion = ({ suggestion, mappingEntity }) => {
  const queryClient = useQueryClient();

  const acceptSuggestionMutation = useMutation(
    ["updateEntity", { mappingEntity }],
    () => updateEntity(mappingEntity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["searchMappings"]);
        queryClient.invalidateQueries(["getCountsByStatusWithFilter"]);
      },
    }
  );

  const acceptSuggestion = () => {
    mappingEntity.mappedTermUrl = suggestion.suggestedTermUrl;
    mappingEntity.mappedTermLabel = suggestion.suggestedTermLabel;
    mappingEntity.source = suggestion.sourceType;
    acceptSuggestionMutation.mutate();
  };
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
              {suggestion.sourceType}
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
            <SourceSpecificData suggestion={suggestion} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={acceptSuggestion}>
          Accept suggestion
        </Button>
      </CardActions>
    </Card>
  );
};

export default Suggestion;
