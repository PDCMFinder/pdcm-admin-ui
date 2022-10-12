import { Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { index } from "../../../apis/Indexer.api";

import { getReport } from "../../../apis/ProcessReport.api";
import ProcessModal from "../../processModal/ProcessModal";
import ProcessSummary from "../../processSummary/ProcessSummary";

const IndexerWidget = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const moduleName = "Indexer";

  const processReportQuery = useQuery(["getReport", moduleName], () =>
    getReport(moduleName)
  );

  const updateMutation = useMutation([moduleName], () => index(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getReport", moduleName]);
    },
  });

  const handleUpdateButtonClick = () => {
    updateMutation.mutate();
    handleOpen();
  };

  const updateButton = (
    <Button variant="contained" onClick={handleUpdateButtonClick}>
      Update
    </Button>
  );

  return (
    <>
      <ProcessModal
        isOpen={open}
        processingMessage={"Indexation of rules and ontologies"}
        updateMutation={updateMutation}
        onClosed={handleClose}
      />
      {processReportQuery.isSuccess && (
        <ProcessSummary
          title={"Indexer"}
          data={processReportQuery.data}
          button={updateButton}
        />
      )}
    </>
  );
};

export default IndexerWidget;
