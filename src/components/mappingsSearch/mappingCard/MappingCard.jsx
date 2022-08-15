import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import CommonData from "./commonData/CommonData";
import DiagnosisKeyData from "./keyData/diagnosisKeyData/DiagnosisKeyData";
import SuggestionsList from "../../suggestions/suggestionsList/SuggestionsList";
import TreatmentKeyData from "./keyData/treatmentKeyData/TreatmentKeyData";
import { getValueByKey } from "../../../util/Util";

const EntityTypeSpecificData = ({ mappingEntity }) => {
  if (mappingEntity.entityTypeName.toLowerCase() === "diagnosis") {
    return (
      <DiagnosisKeyData
        titleVariant={"h5"}
        sampleDiagnosis={getValueByKey(
          mappingEntity.mappingValues,
          "SampleDiagnosis"
        )}
        tumourType={getValueByKey(mappingEntity.mappingValues, "TumourType")}
        dataSource={getValueByKey(mappingEntity.mappingValues, "DataSource")}
        originTissue={getValueByKey(
          mappingEntity.mappingValues,
          "OriginTissue"
        )}
      />
    );
  } else {
    return (
      <TreatmentKeyData
        titleVariant={"h5"}
        treatmentname={getValueByKey(
          mappingEntity.mappingValues,
          "TreatmentName"
        )}
        dataSource={getValueByKey(mappingEntity.mappingValues, "DataSource")}
      />
    );
  }
};

function MappingCard({ mappingEntity }) {
  const isMapped = mappingEntity.status.toLowerCase() === "mapped";
  return (
    <Card sx={{ boxShadow: 3, width: "100%" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EntityTypeSpecificData mappingEntity={mappingEntity} />
            <Divider style={{ marginTop: 10, marginBottom: 10 }} light />
          </Grid>
          <Grid item xs={6}>
            <CommonData mappingEntity={mappingEntity} />
          </Grid>
          <Grid item xs={12}>
            <SuggestionsList mappingEntityId={mappingEntity.id} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {isMapped && <Button size="small">Move to Revision</Button>}

        <Button size="small">Open Ontology Search</Button>
      </CardActions>
    </Card>
  );
}

export default MappingCard;
