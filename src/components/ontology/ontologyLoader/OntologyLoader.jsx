import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { loadOntologies } from "../../../apis/Ontologies.api";
import "./ontologyLoader.css";

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

const OntologyLoader = ({ onProcessFinished }) => {
  const { data, error, refetch, isFetching } = useQuery(
    "loadOntologies",
    loadOntologies,
    {
      enabled: false,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  const { numberDiagnosisTerms, numberTreatmentTerms, numberRegimenTerms } =
    data || {};

  const errorInLoadedOntologies = data ? data.error : null;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoad = () => {
    refetch();
    // Open Modal to show progress there
    handleOpen();
  };

  const handleEndOfProcess = () => {
    handleClose();
    onProcessFinished(true);
  };

  return (
    <div>
      <button className="reloadButton" onClick={handleLoad}>
        Reload Ontologies
      </button>
      <Modal
        open={open}
        onClose={handleEndOfProcess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="progressIndicator">
            {isFetching && <CircularProgress />}
          </div>

          {data && !errorInLoadedOntologies && !isFetching && (
            <div>
              <List>
                <ListItem disablePadding>
                  <ListItemText
                    primary={`Diagnosis terms loaded:  ${numberDiagnosisTerms}`}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={`Treatment terms loaded: ${numberTreatmentTerms}`}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary={`Regimen terms loaded: ${numberRegimenTerms}`}
                  />
                </ListItem>
              </List>
            </div>
          )}

          {errorInLoadedOntologies && (
            <div className="errorInProcess">Errors: {data.error}</div>
          )}

          {!isFetching && (
            <Button variant="text" onClick={handleEndOfProcess}>
              Close
            </Button>
          )}
        </Box>
      </Modal>
      <div>
        {error && (
          <div className="errorCallingApi">
            Error communicating with the server
          </div>
        )}
      </div>
    </div>
  );
};

export default OntologyLoader;
