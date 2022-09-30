import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { updateEntity } from "../../../../apis/Mappings.api";
import { searchOntologies } from "../../../../apis/Ontologies.api";
import { getValueByKey } from "../../../../util/Util";
import OntologySearchResults from "../ontologySearchResults/OntologySearchResults";

const getSearchTextFromMappingEntity = (mappingEntity) => {
  let inputByEntity = "-";
  if (mappingEntity) {
    if (mappingEntity.entityTypeName === "diagnosis") {
      inputByEntity = getValueByKey(
        mappingEntity.mappingValues,
        "SampleDiagnosis"
      );
    } else if (mappingEntity.entityTypeName === "treatment") {
      inputByEntity = getValueByKey(
        mappingEntity.mappingValues,
        "TreatmentName"
      );
    }
  }
  return inputByEntity;
};

const OntologySearchBar = ({
  isOpen,
  mappingEntity,
  onDataChanged,
  onClosed,
}) => {
  let input = getSearchTextFromMappingEntity(mappingEntity);

  const { isLoading, data, refetch, error } = useQuery(
    ["searchOntologies", { input }],
    () => searchOntologies(input),
    {
      enabled: false,
      retry: false,
    }
  );

  const acceptTermMutation = useMutation(
    ["updateEntity", { mappingEntity }],
    () => updateEntity(mappingEntity),
    {
      onSuccess: () => {
        onDataChanged();
      },
    }
  );

  const handleClose = () => {
    onClosed();
  };

  const handleSearch = () => {
    input = document.getElementById("inputTextField").value;
    refetch();
  };

  const handleTermAccepted = (result) => {
    handleClose();

    mappingEntity.mappedTermUrl = result.suggestedTermUrl;
    mappingEntity.mappedTermLabel = result.suggestedTermLabel;
    mappingEntity.source = result.sourceType;
    acceptTermMutation.mutate();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        scroll={"paper"}
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Search in OLS</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Introduce the text to search. Initially it contains the{" "}
            {mappingEntity?.entityTypeName.toLowerCase() === "diagnosis"
              ? "diagnosis name"
              : "treatment name"}{" "}
            of the term to be mapped.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="inputTextField"
            label="Text to search"
            type="text"
            defaultValue={input}
            fullWidth
            variant="standard"
          />

          <DialogActions>
            <Button onClick={handleSearch}>Search</Button>
          </DialogActions>
          {error && <Alert severity="error">{error.message}</Alert>}
          {!isLoading && data && (
            <OntologySearchResults
              results={data}
              onTermAccepted={handleTermAccepted}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OntologySearchBar;
