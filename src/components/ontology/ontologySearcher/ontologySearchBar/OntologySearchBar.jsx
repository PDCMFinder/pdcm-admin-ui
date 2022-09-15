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
import { useQuery } from "react-query";
import { searchOntologies } from "../../../../apis/Ontologies.api";
import OntologySearchResults from "../ontologySearchResults/OntologySearchResults";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OntologySearchBar = ({
  isOpen,
  mappingEntity,
  initialInput,
  onClosed,
}) => {
  // console.log("OntologySearchBar::isOpen", isOpen);
  // console.log("OntologySearchBar::mappingEntity", mappingEntity);
  // console.log("OntologySearchBar::initialInput", initialInput);

  let currentInput = initialInput;

  const [input, setInput] = React.useState(initialInput);

  const { isLoading, data, refetch } = useQuery(
    ["searchOntologies", { input }],
    () => searchOntologies(input),
    {
      enabled: false,
    }
  );
  // console.log("Current input:", input);
  // console.log("Current mappingEntity:", mappingEntity);

  let testData = [];

  const handleClose = () => {
    setInput("");
    onClosed();
  };

  const handleInputChanged = (event) => {
    currentInput = event.target.value;
  };

  const handleSearch = (event) => {
    console.log("?-->", testData);
    currentInput = document.getElementById("inputTextField").value;
    setInput(currentInput);
    refetch();
    testData = data || [];
    console.log("changed?-->", testData);
    console.log("data?-->", data);
  };

  const handleTermAccepted = (x) => {
    console.log("accepted:", x);
    testData = [];
    onClosed();
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
        <DialogTitle>
          Search in OLS [{input}] dataL: {data?.length | 0} :: {testData.length}{" "}
        </DialogTitle>
        <div>initialInput: {initialInput}</div>
        <DialogContent>
          <DialogContentText>
            ...To subscribe to this website, please enter your email address
            here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="inputTextField"
            label="Text to search"
            type="text"
            // value={input}
            defaultValue={initialInput}
            fullWidth
            variant="standard"
            onChange={handleInputChanged}
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

export default OntologySearchBar;
