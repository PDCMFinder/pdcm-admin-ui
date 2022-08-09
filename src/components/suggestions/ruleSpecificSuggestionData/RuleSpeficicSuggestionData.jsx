import {
  faBook,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";
import CommonData from "../../mappings/mappingCard/commonData/CommonData";
import DiagnosisKeyData from "../../mappings/mappingCard/keyData/diagnosisKeyData/DiagnosisKeyData";
import TreatmentKeyData from "../../mappings/mappingCard/keyData/treatmentKeyData/TreatmentKeyData";

const url = "http://purl.obolibrary.org/obo/NCIT_C9145";

const RuleSpeficicSuggestionData = ({ ruleData }) => {
  console.log("ruleData", ruleData);
  const EntityTypeSpecificData = () => {
    console.log(ruleData);
    if (ruleData.entityTypeName === "diagnosis") {
      return <DiagnosisKeyData titleVariant={"subtitle1"} />;
    } else {
      return (
        <TreatmentKeyData
          titleVariant={"subtitle1"}
          treatmentData={ruleData.data}
        />
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EntityTypeSpecificData ruleData={ruleData} />
      </Grid>

      <Grid item xs={3}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
          OSTEOSARCOMA
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
          <a href={url} target="_blank" rel="noreferrer">
            NCIT_C9145
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
