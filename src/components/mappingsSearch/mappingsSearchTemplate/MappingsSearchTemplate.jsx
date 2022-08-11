import { CircularProgress, Grid, TablePagination } from "@mui/material";
import React from "react";
import FacetSideBar from "../../facets/facetSideBar/FacetSideBar";
import MappingsContent from "../mappingsContent/MappingsContent";
import MappingSearchResults from "../mappingSearchResults/MappingSearchResults";

let selectionChanged = (e) => {
  console.log("selection change aknowdleged", e);
};

const MappingsSearchTemplate = ({
  facets,
  facetsSelection,
  onFacetSidebarChange,
  searchResults,
  loadingSearchResults,
  totalElements,
  page,
  size,
  onPaginationChange,
  onPageSizeChange,
}) => {
  const returnedMappings = searchResults?._embedded?.mappings || [];
  console.log("On MappingsSearchTemplate: facets:", facets);
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
              count={totalElements}
              page={page}
              onPageChange={onPaginationChange}
              rowsPerPage={size}
              onRowsPerPageChange={onPageSizeChange}
            />
          </Grid>
          <Grid item xs={9}>
            <MappingSearchResults
              results={returnedMappings}
              isLoading={loadingSearchResults}
            />
            {/* {data && data._embedded && (
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
            )} */}
          </Grid>
          <Grid item xs={9}>
            Other actions
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MappingsSearchTemplate;
