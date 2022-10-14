import {
  Alert,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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

const ProcessModal = ({
  isOpen,
  processingMessage,
  onClosed,
  updateMutation,
}) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {processingMessage}
          <div className="progressIndicator">
            {updateMutation.isLoading && <CircularProgress />}
          </div>

          {updateMutation.isSuccess && (
            <div>
              <List>
                {Object.entries(updateMutation.data.response).map((item) => {
                  const key = item[0];
                  const value = item[1];

                  return (
                    <ListItem key={key} disablePadding>
                      <ListItemText primary={`${key}:  ${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

          {updateMutation.error && (
            <Alert severity="error">{updateMutation.error.message}</Alert>
          )}
          {!updateMutation.isLoading && (
            <Button variant="text" onClick={onClosed}>
              Close
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProcessModal;
