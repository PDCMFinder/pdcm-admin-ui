import React from "react";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { getMappingsSummary } from "../../apis/Mappings.api";

import "./mappingsSummary.css";
import { renderMappingsProgress } from "../mappingsProgressBar/MappingsProgressBar";

const columns = [
  {
    field: "dataSource",
    headerName: "Data Source",
    width: 100,
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

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery(
    ["getMappingsSummary", { type }],
    () => getMappingsSummary(type)
  );

  const rows = data?.summaryEntries || [];

  return (
    <div className="mappingsSummary">
      <div className="mappingSummaryTitle">{title} Mappings summary</div>
      <div className="mappingSummaryTable">
        <div style={{ height: "100%", width: "70%" }}>
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
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
