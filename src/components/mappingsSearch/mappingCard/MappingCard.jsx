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
import { updateEntity } from "../../../apis/Mappings.api";
import { useMutation, useQueryClient } from "react-query";

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
  const isUnmapped = mappingEntity.status.toLowerCase() === "unmapped";
  const isRevise = mappingEntity.status.toLowerCase() === "revise";
  const isRequest = mappingEntity.status.toLowerCase() === "request";

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    ["updateEntity", { mappingEntity }],
    () => updateEntity(mappingEntity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["searchMappings"]);
        queryClient.invalidateQueries(["getCountsByStatusWithFilter"]);
      },
    }
  );

  const changeStatus = (newStatus) => {
    mappingEntity.status = newStatus;
    updateMutation.mutate();
  };

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
            <SuggestionsList mappingEntity={mappingEntity} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {isMapped && (
          <Button size="small" onClick={() => changeStatus("Revise")}>
            Move to Revise
          </Button>
        )}
        {isUnmapped && (
          <Button size="small" onClick={() => changeStatus("Request")}>
            Move to Request
          </Button>
        )}
        {isRevise && (
          <Button size="small" onClick={() => changeStatus("Mapped")}>
            Move to Mapped
          </Button>
        )}
        {isRequest && (
          <Button size="small" onClick={() => changeStatus("Unmapped")}>
            Move to Unmapped
          </Button>
        )}
        <Button size="small">Open Ontology Search</Button>
      </CardActions>
    </Card>
  );
}

export default MappingCard;
