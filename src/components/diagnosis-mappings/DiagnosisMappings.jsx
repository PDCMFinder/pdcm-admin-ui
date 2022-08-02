import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./diagnosisMappings.css";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getMappingsWithFilters } from "../../apis/Mappings.api";
import Tooltip from "@mui/material/Tooltip";

import { renderCellTooltip } from "../cellTooltip/CellTooltip";

const columns = [
  //   {
  //     field: "dataSource",
  //     headerName: "Data Source",
  //     width: 150,
  //     headerClassName: "super-app-theme--header",
  //     headerAlign: "center",
  //     renderCell: renderCellTooltip,
  //   },
  {
    field: "sampleDiagnosis",
    width: 300,
    headerName: "Sample Diagnosis",
    renderCell: renderCellTooltip,
  },
  {
    field: "originTissue",
    width: 200,
    headerName: "Origin Tissue",
  },
  {
    field: "tumourType",
    width: 100,
    headerName: "Tumor Type",
  },
  {
    field: "mappedTermLabel",
    width: 300,
    headerName: "Mapped Term",
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <span>{params.value}</span>
      </Tooltip>
    ),
  },
];

const type = "Diagnosis";

const DiagnosisMappings = () => {
  let { dataSource, statusList } = useParams();
  console.log("Called with", statusList);

  const { data } = useQuery(
    ["getMappingsWithFilters", { type, dataSource, statusList }],
    () => getMappingsWithFilters(type, dataSource, statusList)
  );

  console.log("data", data);
  console.log("type", typeof data);

  const dataToTableData = () => {
    let mappings = [];
    if (data && data._embedded) {
      mappings = data._embedded.mappings;
    }

    mappings = mappings.map((x) => {
      return {
        id: x.id,
        dataSource: x.mappingValues.DataSource,
        sampleDiagnosis: x.mappingValues.SampleDiagnosis,
        originTissue: x.mappingValues.OriginTissue,
        tumourType: x.mappingValues.TumourType,
        mappedTermLabel: x.mappedTermLabel,
        mappedTermUrl: x.mappedTermUrl,
      };
    });

    return mappings;
  };

  const rows = dataToTableData() || [];

  return (
    <div className="diagnosisContainer">
      <div className="diagnosisMappingsTitle">
        {dataSource.toUpperCase()} Diagnosis Mappings ({statusList} )
      </div>
      <div className="diagnosisTable">
        <div style={{ height: "90%", width: "90%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisMappings;
