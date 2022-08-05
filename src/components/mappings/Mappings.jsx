import { Grid } from "@mui/material";
import React from "react";
import FacetSideBar from "../facets/facetSideBar/FacetSideBar";

import searchFacets from "./../../data/search-facets.json";

const Mappings = () => {
  const facets = searchFacets.facets;

  const facetsSelection = [];

  let selectionChanged = (e) => {
    console.log("selection change aknowdleged", e);
  };

  let onFacetSidebarChange = (params1, params2) => {
    console.log("handle this later:", params1, params2);
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
      <Grid item xs={3}>
        <div className="filtersx">
          <FacetSideBar
            facets={facets}
            onSelectionChange={selectionChanged}
            facetsSelection={facetsSelection}
            onReset={() => {
              onFacetSidebarChange({}, {});
            }}
          />
        </div>
      </Grid>
      <Grid item xs={9}>
        Section for results
      </Grid>
    </Grid>
  );
};

export default Mappings;
