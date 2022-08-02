import React from "react";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getMappingsSummary } from "../../apis/Mappings.api";

import "./mappingsSummary.css";
import { renderMappingsProgress } from "../mappingsProgressBar/MappingsProgressBar";

const columns = [
  {
    field: "dataSource",
    headerName: "Data Source",
    width: 120,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "unmapped",
    headerName: "Unmapped terms",
    type: "number",
    width: 150,
  },
  { field: "mapped", headerName: "Mapped terms", type: "number", width: 150 },
  {
    field: "progress",
    headerName: "Progress",
    type: "number",
    width: 150,
    renderCell: renderMappingsProgress,
  },
];

const MappingsSummary = ({ type }) => {
  const title = type || "unknown";

  const { data } = useQuery(["getMappingsSummary", { type }], () =>
    getMappingsSummary(type)
  );

  const rows = data?.summaryEntries || [];

  const navigate = useNavigate();

  const handleOnCellClick = (params) => {
    console.log(params);
    console.log(params.id);
    console.log(params.field);

    if (params.field === "mapped") {
      console.log("Show mapped view");
      navigate("/mappings/diagnosisSummary/detail/" + params.id + "/mapped");
    }
    if (params.field === "unmapped") {
      console.log("Show unmapped view");
    }
    console.log("for", params.id);
  };

  return (
    <div className="mappingsSummary">
      <div className="mappingSummaryTitle">{title} Mappings summary</div>
      <div className="mappingSummaryTable">
        <div style={{ height: "100%", width: "60%" }}>
          <DataGrid
            onCellClick={handleOnCellClick}
            getRowId={(row) => row.dataSource}
            rows={rows}
            columns={columns}
            pageSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default MappingsSummary;
