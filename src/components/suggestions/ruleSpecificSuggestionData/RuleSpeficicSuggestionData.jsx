import {
  faBook,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { extractNCTiName } from "../../../util/Util";
import DiagnosisKeyData from "../../mappings/mappingCard/keyData/diagnosisKeyData/DiagnosisKeyData";
import TreatmentKeyData from "../../mappings/mappingCard/keyData/treatmentKeyData/TreatmentKeyData";

const RuleSpeficicSuggestionData = ({ suggestion }) => {
  console.log("suggestion (RuleSpeficicSuggestionData) ", suggestion);
  const EntityTypeSpecificData = () => {
    if (suggestion.ruleSuggestion.entityTypeName === "diagnosis") {
      return <DiagnosisKeyData titleVariant={"subtitle1"} />;
    } else {
      return (
        <TreatmentKeyData
          titleVariant={"subtitle1"}
          treatmentData={suggestion.ruleSuggestion.data}
        />
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EntityTypeSpecificData ruleData={suggestion.ruleSuggestion} />
      </Grid>

      <Grid item xs={3}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
          {suggestion.suggestedTermLabel}
        </Typography>
        <Typography variant="caption" component="div">
          Ontology Term Label
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faSquareArrowUpRight}
          />

          <a
            href={suggestion.suggestedTermUrl}
            target="_blank"
            rel="noreferrer"
          >
            {extractNCTiName(suggestion.suggestedTermUrl)}
          </a>
        </Typography>
        <Typography variant="caption" component="div">
          NCIt term
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RuleSpeficicSuggestionData;
