import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import React, { Fragment } from "react";
import CommonData from "./commonData/CommonData";
import DiagnosisKeyData from "./keyData/diagnosisKeyData/DiagnosisKeyData";
import SuggestionsList from "../../suggestions/suggestionsList/SuggestionsList";
import TreatmentKeyData from "./keyData/treatmentKeyData/TreatmentKeyData";
import { getValueByKey } from "../../../util/Util";
import { updateEntity } from "../../../apis/Mappings.api";
import { useMutation } from "react-query";

const EntityTypeSpecificData = ({ mappingEntity }) => {
  if (mappingEntity.entityTypeName.toLowerCase() === "diagnosis") {
    return (
      <DiagnosisKeyData
        titleVariant={"h5"}
        sampleDiagnosis={getValueByKey(
          mappingEntity.mappingValues,
          "SampleDiagnosis"
        )}
        tumorType={getValueByKey(mappingEntity.mappingValues, "TumorType")}
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

function MappingCard({ mappingEntity, onDataChanged, onOntoSearchOpen }) {
  const isMapped = mappingEntity.status.toLowerCase() === "mapped";
  const isUnmapped = mappingEntity.status.toLowerCase() === "unmapped";
  const isReview = mappingEntity.status.toLowerCase() === "review";
  const isRequest = mappingEntity.status.toLowerCase() === "request";

  const updateMutation = useMutation(
    ["updateEntity", { mappingEntity }],
    () => updateEntity(mappingEntity),
    {
      onSuccess: () => {
        onDataChanged();
      },
    }
  );

  const changeStatus = (newStatus) => {
    mappingEntity.status = newStatus;
    updateMutation.mutate();
  };

  const handleOpenOntoSearch = () => {
    onOntoSearchOpen(mappingEntity);
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
            <SuggestionsList
              mappingEntity={mappingEntity}
              onDataChanged={onDataChanged}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {isMapped && (
          <Button size="small" onClick={() => changeStatus("Review")}>
            Move to Review
          </Button>
        )}
        {isUnmapped && (
          <Button size="small" onClick={() => changeStatus("Request")}>
            Move to Request
          </Button>
        )}
        {isReview && (
          <Fragment>
            <Button size="small" onClick={() => changeStatus("Mapped")}>
            Move to Mapped
          </Button>
          <Button size="small" onClick={() => changeStatus("Request")}>
          Move to Request
        </Button>
          </Fragment>
          
        )}
        {isRequest && (
          <Button size="small" onClick={() => changeStatus("Unmapped")}>
            Move to Unmapped
          </Button>
        )}

        <Button size="small" onClick={handleOpenOntoSearch}>
          Ontology Search
        </Button>
      </CardActions>
    </Card>
  );
}

export default MappingCard;
