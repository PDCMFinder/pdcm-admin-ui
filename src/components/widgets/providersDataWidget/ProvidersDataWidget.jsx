import { Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateInputData } from "../../../apis/InputDataUpdater.api";
import { getReport } from "../../../apis/ProcessReport.api";
import ProcessModal from "../../processModal/ProcessModal";
import ProcessSummary from "../../processSummary/ProcessSummary";

const ProvidersDataWidget = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const moduleName = "Input data";

  const processReportQuery = useQuery(["getReport", moduleName], () =>
    getReport(moduleName)
  );

  const updateMutation = useMutation(
    ["updateInputData"],
    () => updateInputData(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getReport", moduleName]);
      },
    }
  );

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
        processingMessage={"Input data update"}
        updateMutation={updateMutation}
        onClosed={handleClose}
      />
      {processReportQuery.isSuccess && (
        <ProcessSummary
          title={"Input Data Update"}
          data={processReportQuery.data}
          button={updateButton}
        />
      )}
    </>
  );
};

export default ProvidersDataWidget;
