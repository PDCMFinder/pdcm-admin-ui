import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchOntologies } from "../../../../apis/Ontologies.api";
import { getValueByKey } from "../../../../util/Util";
import OntologySearchResults from "../ontologySearchResults/OntologySearchResults";

const getSearchTextFromMappingEntity = (mappingEntity) => {
  let input = "-";
  if (mappingEntity) {
    if (mappingEntity.entityTypeName === "diagnosis") {
      input = getValueByKey(mappingEntity.mappingValues, "SampleDiagnosis");
    } else if (mappingEntity.entityTypeName === "treatment") {
      input = getValueByKey(mappingEntity.mappingValues, "TreatmentName");
    }
  }
  //   console.log(mappingEntity.id, "-->", input);
  return input;
};

const OntologySearchLauncher = ({ mappingEntity }) => {
  //   console.log("mappingEntity", mappingEntity);
  const [open, setOpen] = useState(false);
  const [textToSearch, setTextToSearch] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // setInput("");
    data = [];
    console.log("closeeee", data);
  };

  const handleInputChange = (event) => {
    // setTextToSearch(event.target.value);
    setInput(event.target.value);
  };

  const handleSearch = (event) => {
    refetch();
  };

  const handleTermAccepted = (x) => {
    console.log("accepted:", x);
    // testData = [];
    // onClosed();
  };

  const initialInput = getSearchTextFromMappingEntity(mappingEntity);

  const [input, setInput] = React.useState(initialInput);

  let { isLoading, data, refetch } = useQuery(
    ["searchOntologies", { input }],
    () => searchOntologies(input),
    {
      enabled: false,
    }
  );
  console.log("data (probably after calling API):::", data);

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        My test {open ? "(Open)" : "(Closed)"} count: {data?.length || 0}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>OLS search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Input"
            type="text"
            fullWidth
            variant="standard"
            value={input}
            onChange={handleInputChange}
          />

          <DialogActions>
            <Button onClick={handleSearch}>Search</Button>
          </DialogActions>
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

export default OntologySearchLauncher;
