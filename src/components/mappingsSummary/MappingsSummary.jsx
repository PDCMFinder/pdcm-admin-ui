import React from "react";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
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
    const searchUrl = `/search?status=${params.field}&entityType=${type}&mq=dataSource:${params.id}`;
    navigate(searchUrl);
  };

  return (
    <>
      <div className="mappingSummaryTitle">{title} Mappings summary</div>
      <div className="container">
        <div
          style={{
            height: "800px",
            width: "650px",
            marginTop: "20px",
          }}
        >
          <DataGrid
            onCellClick={handleOnCellClick}
            getRowId={(row) => row.dataSource}
            rows={rows}
            columns={columns}
            pageSize={20}
          />
        </div>
      </div>
    </>
  );
};

export default MappingsSummary;
