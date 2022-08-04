import React from "react";
import Container from "@mui/material/Container";
import Facet from "../facet/Facet";

function FacetSideBar({ facets, onSelectionChange, facetsSelection, onReset }) {
  return (
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
            facetsSelection && facetsSelection[key] ? facetsSelection[key] : []
          }
        />
      ))}
    </Container>
  );
}

export default FacetSideBar;
