import { Grid } from "@mui/material";
import React from "react";
import CommonData from "./commonData/CommonData";
import DiagnosisKeyData from "./keyData/diagnosisKeyData/DiagnosisKeyData";
import SuggestionsList from "../../suggestions/suggestionsList/SuggestionsList";
import TreatmentKeyData from "./keyData/treatmentKeyData/TreatmentKeyData";

const EntityTypeSpecificData = ({ mappingEntity }) => {
  console.log("EntityTypeSpecificData mappingEntity", mappingEntity);

  if (mappingEntity.entityTypeName === "diagnosis") {
    return (
      <DiagnosisKeyData
        titleVariant={"h5"}
        sampleDiagnosis={mappingEntity.mappingValues["SampleDiagnosis"]}
        tumourType={mappingEntity.mappingValues["TumourType"]}
        dataSource={mappingEntity.mappingValues["DataSource"]}
        originTissue={mappingEntity.mappingValues["OriginTissue"]}
      />
    );
  } else {
    return (
      <TreatmentKeyData
        titleVariant={"h5"}
        treatmentname={mappingEntity.mappingValues["TreatmentName"]}
        dataSource={mappingEntity.mappingValues["DataSource"]}
      />
    );
  }
};

function MappingCard({ mappingEntity }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <EntityTypeSpecificData mappingEntity={mappingEntity} />
      </Grid>
      <Grid item xs={6}>
        <CommonData mappingEntity={mappingEntity} />
      </Grid>
      <Grid item xs={12}>
        <SuggestionsList suggestions={mappingEntity.suggestions} />
      </Grid>
    </Grid>
  );
}

export default MappingCard;
