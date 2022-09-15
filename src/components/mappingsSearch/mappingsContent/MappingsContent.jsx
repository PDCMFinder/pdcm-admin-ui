import { Grid } from "@mui/material";
import React from "react";
import { getValueByKey } from "../../../util/Util";
import OntologySearchBar from "../../ontology/ontologySearcher/ontologySearchBar/OntologySearchBar";
import OntologySearcher from "../../ontology/ontologySearcher/ontologySearchBar/OntologySearchBar";
import MappingCard from "../mappingCard/MappingCard";

const MappingsContent = ({ mappings, onDataChanged }) => {
  const [ontologySearcherOpen, setOntologySearcherOpen] = React.useState(false);
  const [
    currentMappingEntityToSearchOntologies,
    setCurrentMappingEntityToSearchOntologies,
  ] = React.useState(null);

  const [currentSearchOntologyInput, setCurrentSearchOntologyInput] =
    React.useState("");

  const handleOpenOntologySearchClicked = (mappingEntity) => {
    setOntologySearcherOpen(true);
    setCurrentMappingEntityToSearchOntologies(mappingEntity);
    const newInputText = getSearchTextFromMappingEntity(mappingEntity);
    setCurrentSearchOntologyInput(newInputText);
  };

  const getSearchTextFromMappingEntity = (currentMappingEntity) => {
    let input = "-";
    if (currentMappingEntity) {
      if (currentMappingEntity.entityTypeName === "diagnosis") {
        input = getValueByKey(
          currentMappingEntity.mappingValues,
          "SampleDiagnosis"
        );
      } else if (currentMappingEntity.entityTypeName === "treatment") {
        input = getValueByKey(
          currentMappingEntity.mappingValues,
          "TreatmentName"
        );
      }
    }
    return input;
  };

  const handleOntologySearchClosed = () => {
    setOntologySearcherOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {mappings.map((element, index) => {
          return (
            <Grid item xs={12} key={index}>
              <MappingCard
                mappingEntity={element}
                onDataChanged={onDataChanged}
                onOpenOntologySearchClicked={handleOpenOntologySearchClicked}
              />
            </Grid>
          );
        })}
      </Grid>

      {currentMappingEntityToSearchOntologies && (
        <OntologySearchBar
          isOpen={ontologySearcherOpen}
          mappingEntity={currentMappingEntityToSearchOntologies}
          initialInput={currentSearchOntologyInput}
          onClosed={handleOntologySearchClosed}
        />
      )}
    </>
  );
};

export default MappingsContent;
