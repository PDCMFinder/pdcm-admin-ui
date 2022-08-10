import { Grid } from "@mui/material";
import React from "react";
import MappingCard from "../mappingCard/MappingCard";

const MappingsContent = ({ mappings }) => {
  return (
    <Grid container spacing={2}>
      {mappings.map((element, index) => {
        return (
          <Grid item xs={12}>
            <MappingCard mappingEntity={element} key={index} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MappingsContent;
