import { Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { loadOntologies } from "../../../apis/Ontologies.api";
import { getReport } from "../../../apis/ProcessReport.api";
import ProcessModal from "../../processModal/ProcessModal";
import ProcessSummary from "../../processSummary/ProcessSummary";

const OntologiesWidget = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const moduleName = "Ontologies";

  const processReportQuery = useQuery(["getReport", moduleName], () =>
    getReport(moduleName)
  );

  const updateMutation = useMutation(
    ["loadOntologies"],
    () => loadOntologies(),
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

  const sortData = () => {
    const sortedData = {
      "Update date": processReportQuery.data["Update date"] || "No data",
      "Number of diagnosis terms":
        processReportQuery?.data["Number of diagnosis terms"] || "No data",
      "Number of treatment terms":
        processReportQuery?.data["Number of treatment terms"] || "No data",
      "Number of regimen terms":
        processReportQuery?.data["Number of regimen terms"] || "No data",
    };

    return sortedData;
  };

  return (
    <>
      <ProcessModal
        isOpen={open}
        processingMessage={"Ontologies load"}
        updateMutation={updateMutation}
        onClosed={handleClose}
      />
      {processReportQuery.isSuccess && (
        <ProcessSummary
          title={"Ontology Load"}
          data={sortData()}
          button={updateButton}
        />
      )}
    </>
  );
};

export default OntologiesWidget;
