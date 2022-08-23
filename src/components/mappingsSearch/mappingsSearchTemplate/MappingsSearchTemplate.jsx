import { Grid, TablePagination } from "@mui/material";
import React from "react";
import FacetSideBar from "../../facets/facetSideBar/FacetSideBar";
import MappingSearchResults from "../mappingSearchResults/MappingSearchResults";

import TabsByStatus from "../tabsByStatus/TabsByStatus";

const tabStatusMap = new Map();
tabStatusMap.set("unmapped", 0);
tabStatusMap.set("mapped", 1);
tabStatusMap.set("revise", 2);
tabStatusMap.set("request", 3);

const MappingsSearchTemplate = ({
  facets,
  facetsSelection,
  onFacetSidebarChange,
  onDataChanged,
  searchResults,
  loadingSearchResults,
  loadingCountsByStatus,
  countsByStatus,
  totalElements,
  page,
  size,
  onPaginationChange,
  onPageSizeChange,
}) => {
  const returnedMappings = searchResults?._embedded?.mappings || [];

  const calculateTabIndex = () => {
    let index = 0;
    const facetStatusValues = facetsSelection["status"];
    if (facetStatusValues) {
      const currentSelectedStatus = facetStatusValues[0].toLowerCase();
      index = tabStatusMap.get(currentSelectedStatus);
    }
    return index;
  };

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(
    calculateTabIndex()
  );

  const handleTabChanged = (e, selectedIndex) => {
    if (selectedIndex === 0) {
      facetsSelection["status"] = ["unmapped"];
    } else if (selectedIndex === 1) {
      facetsSelection["status"] = ["mapped"];
    } else if (selectedIndex === 2) {
      facetsSelection["status"] = ["revise"];
    } else if (selectedIndex === 3) {
      facetsSelection["status"] = ["request"];
    }
    onFacetSidebarChange(facetsSelection);
    setSelectedTabIndex(selectedIndex);
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
            onPaginationChange(0);
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
              rowsPerPageOptions={[10, 20, 50]}
              onRowsPerPageChange={onPageSizeChange}
            />
          </Grid>

          <Grid item xs={9}>
            <TabsByStatus
              value={selectedTabIndex}
              countsByStatus={countsByStatus}
              loadingCountsByStatus={loadingCountsByStatus}
              onTabChanged={handleTabChanged}
            ></TabsByStatus>
          </Grid>

          <Grid item xs={9}>
            <MappingSearchResults
              results={returnedMappings}
              isLoading={loadingSearchResults}
              onDataChanged={onDataChanged}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MappingsSearchTemplate;
