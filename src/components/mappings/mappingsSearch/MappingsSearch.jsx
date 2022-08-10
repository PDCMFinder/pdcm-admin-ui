import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  TablePagination,
} from "@mui/material";
import React from "react";
import FacetSideBar from "../../facets/facetSideBar/FacetSideBar";

import searchFacets from "../../../data/search-facets.json";
import { useQuery } from "react-query";
import { getMappingsWithFilters } from "../../../apis/Mappings.api";
import MappingsContent from "../mappingsContent/MappingsContent";

const MappingsSearch = () => {
  let type = "diagnosis";
  let dataSource = "pdmr";
  let statusList = "unmapped";

  const facets = searchFacets.facets;

  const facetsSelection = [];

  let selectionChanged = (e) => {
    console.log("selection change aknowdleged", e);
  };

  let onFacetSidebarChange = (params1, params2) => {
    console.log("handle this later:", params1, params2);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    console.log("newPage:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isLoading, data, error } = useQuery(
    [
      "getMappingsWithFilters",
      { type, dataSource, statusList, page, rowsPerPage },
    ],
    () =>
      getMappingsWithFilters(type, dataSource, statusList, page, rowsPerPage)
  );

  console.log("data", data);
  return (
    <Grid container spacing={2} style={{ marginTop: "5px" }}>
      <Grid item xs={3}>
        <FacetSideBar
          facets={facets}
          onSelectionChange={selectionChanged}
          facetsSelection={facetsSelection}
          onReset={() => {
            onFacetSidebarChange({}, {});
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2} style={{ marginTop: "5px" }}>
          <Grid item xs={9}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
          <Grid item xs={9}>
            {data && data._embedded && (
              <MappingsContent mappings={data?._embedded.mappings} />
            )}
            {data && !data._embedded && (
              <Alert severity="warning">
                Your query/filter did not return any results
              </Alert>
            )}
            {isLoading && (
              <Box
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={100} />
              </Box>
            )}
          </Grid>
          <Grid item xs={9}>
            Other actions
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MappingsSearch;
