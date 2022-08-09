import React from "react";
import Container from "@mui/material/Container";
import Facet from "../facet/Facet";
import { Button, Grid } from "@mui/material";
import "./facetSideBar.css";

function FacetSideBar({ facets, onSelectionChange, facetsSelection, onReset }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div className="filterTitle">Filter by:</div>
      </Grid>
      <Grid item xs={6}>
        <Button color="warning" variant="outlined" onClick={() => onReset()}>
          Reset
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Container fixed>
          {facets.map(({ key, name, options, type }) => (
            <Facet
              key={key}
              name={name}
              options={options}
              type={type}
              onSelectionChange={(v) => {
                if (onSelectionChange) onSelectionChange(key, v);
              }}
              selection={
                facetsSelection && facetsSelection[key]
                  ? facetsSelection[key]
                  : []
              }
            />
          ))}
        </Container>
      </Grid>
    </Grid>
  );
}

export default FacetSideBar;
