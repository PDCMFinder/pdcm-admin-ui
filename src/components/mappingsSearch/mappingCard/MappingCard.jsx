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
import { useMutation } from "react-query";
import OntologySearchLauncher from "../../ontology/ontologySearcher/ontologySearchLauncher/OntologySearchLauncher";

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

function MappingCard({
  mappingEntity,
  onDataChanged,
  onOpenOntologySearchClicked,
}) {
  const isMapped = mappingEntity.status.toLowerCase() === "mapped";
  const isUnmapped = mappingEntity.status.toLowerCase() === "unmapped";
  const isRevise = mappingEntity.status.toLowerCase() === "revise";
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

  const handleOpenOntologySearchClicked = () => {
    console.log("Open search");
    onOpenOntologySearchClicked(mappingEntity);
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
        <Button size="small" onClick={handleOpenOntologySearchClicked}>
          Open Ontology Search
        </Button>

        <OntologySearchLauncher mappingEntity={mappingEntity} />
      </CardActions>
    </Card>
  );
}

export default MappingCard;
