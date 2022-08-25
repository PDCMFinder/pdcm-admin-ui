import {
  faBook,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { extractNCTiName, getSuggestionValueByKey } from "../../../util/Util";
import DiagnosisKeyData from "../../mappingsSearch/mappingCard/keyData/diagnosisKeyData/DiagnosisKeyData";
import TreatmentKeyData from "../../mappingsSearch/mappingCard/keyData/treatmentKeyData/TreatmentKeyData";

const RuleSpeficicSuggestionData = ({ suggestion }) => {
  const EntityTypeSpecificData = () => {
    const data = suggestion.ruleSuggestion.mappingValues;

    if (
      suggestion.ruleSuggestion.entityTypeName.toLowerCase() === "diagnosis"
    ) {
      return (
        <DiagnosisKeyData
          titleVariant={"subtitle1"}
          sampleDiagnosis={getSuggestionValueByKey(
            data,
            "rule.value.sampleDiagnosis"
          )}
          tumorType={getSuggestionValueByKey(data, "rule.value.tumorType")}
          dataSource={getSuggestionValueByKey(data, "rule.value.dataSource")}
          originTissue={getSuggestionValueByKey(
            data,
            "rule.value.originTissue"
          )}
        />
      );
    } else {
      return (
        <TreatmentKeyData
          titleVariant={"subtitle1"}
          treatmentname={getSuggestionValueByKey(
            data,
            "rule.value.treatmentName"
          )}
          dataSource={getSuggestionValueByKey(data, "rule.value.dataSource")}
        />
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EntityTypeSpecificData ruleData={suggestion.ruleSuggestion} />
      </Grid>

      <Grid item xs={12} sm={8}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
          {suggestion.suggestedTermLabel}
        </Typography>
        <Typography variant="caption" component="div">
          Ontology Term Label
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
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
