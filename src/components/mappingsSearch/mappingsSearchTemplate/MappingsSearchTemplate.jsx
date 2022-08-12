import { Grid, TablePagination } from "@mui/material";
import React from "react";
import FacetSideBar from "../../facets/facetSideBar/FacetSideBar";
import MappingSearchResults from "../mappingSearchResults/MappingSearchResults";

import TabsByStatus from "../tabsByStatus/TabsByStatus";

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

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChanged = (event, newValue) => {
    if (newValue === 0) {
      facetsSelection["status"] = ["unmapped"];
    } else if (newValue === 1) {
      facetsSelection["status"] = ["mapped"];
    } else if (newValue === 2) {
      facetsSelection["status"] = ["revision"];
    }
    onFacetSidebarChange(facetsSelection);
    setSelectedTabIndex(newValue);
  };
  return (
    <Grid container spacing={2} style={{ marginTop: "5px" }}>
      <Grid item xs={3}>
        <FacetSideBar
          facets={facets}
          onSelectionChange={(facet, options) => {
            let newSelection = {
              ...facetsSelection,
              [facet]: options,
            };

            onFacetSidebarChange(newSelection);
          }}
          facetsSelection={facetsSelection}
          onReset={() => {
            facetsSelection = { status: ["unmapped"] };
            onFacetSidebarChange(facetsSelection);
            setSelectedTabIndex(0);
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
              rowsPerPageOptions={[5, 10, 20]}
              onRowsPerPageChange={onPageSizeChange}
            />
          </Grid>

          <Grid item xs={9}>
            <TabsByStatus
              value={selectedTabIndex}
              onTabChanged={handleTabChanged}
            ></TabsByStatus>
          </Grid>

          <Grid item xs={9}>
            <MappingSearchResults
              results={returnedMappings}
              isLoading={loadingSearchResults}
            />
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
