import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./diagnosisMappings.css";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getMappingsWithFilters } from "../../apis/Mappings.api";
import Tooltip from "@mui/material/Tooltip";

import { renderCellTooltip } from "../cellTooltip/CellTooltip";

const columns = [
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
    renderCell: renderCellTooltip,
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
    renderCell: renderCellTooltip,
  },
  {
    field: "mappingType",
    width: 100,
    headerName: "Mapping Type",
  },
  {
    field: "source",
    width: 100,
    headerName: "Source",
  },
];

const type = "Diagnosis";

const DiagnosisMappings = () => {
  let { dataSource, statusList } = useParams();
  console.log("Called with", statusList);

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const queryOptions = React.useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize]
  );

  console.log("page:", page);
  console.log("pageSize:", pageSize);

  const { isLoading, data } = useQuery(
    [
      "getMappingsWithFilters",
      { type, dataSource, statusList, page, pageSize },
    ],
    () => getMappingsWithFilters(type, dataSource, statusList, page, pageSize)
  );

  const pageInfo = data?.page || {};

  console.log("isLoading", isLoading);
  console.log("pageInfo", pageInfo);

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo.totalElements || 0
  );

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalElements !== undefined
        ? pageInfo?.totalElements
        : prevRowCountState
    );
  }, [pageInfo?.totalElements, setRowCountState]);

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
        mappingType: x.mappingType,
        source: x.source,
      };
    });

    return mappings;
  };

  const rows = dataToTableData() || [];

  return (
    <>
      <div className="diagnosisMappingsTitle">
        {dataSource.toUpperCase()} Diagnosis Mappings ({statusList} )
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "800px",
            width: "90%",
            marginTop: "20px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            rowCount={rowCountState}
            loading={isLoading}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </div>
      </div>
    </>
  );
};

export default DiagnosisMappings;
