import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

// A component that receives the data product of calling a method to call (api), shows a progress circle while the data is fetching
// and at the end parses the response as feedback to the user.
// The response is assumed to be in the form of a map.
const ExecuterResult = ({ active, onHandleClosed, data, isLoading }) => {
  const [open, setOpen] = React.useState(active);
  const handleClose = () => setOpen(false);

  const handleEndOfProcess = () => {
    handleClose();
    onHandleClosed();
  };

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

  return (
    <Modal
      open={open}
      onClose={handleEndOfProcess}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="progressIndicator">
          {isLoading && <CircularProgress />}
        </div>

        {data && !isLoading && (
          <div>
            <List>
              {Object.keys(data).map((element, key) => {
                return (
                  <ListItem key={key} disablePadding>
                    <ListItemText primary={`${element}:  ${data[element]}`} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}

        {!isLoading && (
          <Button variant="text" onClick={handleEndOfProcess}>
            Close
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ExecuterResult;
