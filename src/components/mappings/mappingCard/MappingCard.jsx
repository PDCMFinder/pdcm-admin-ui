import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import CommonData from "./commonData/CommonData";
import DiagnosisKeyData from "./keyData/diagnosisKeyData/DiagnosisKeyData";
import SuggestionsList from "../../suggestions/suggestionsList/SuggestionsList";

function MappingCard({ mappingEntity }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DiagnosisKeyData titleVariant={"h5"} />
      </Grid>
      <Grid item xs={6}>
        <CommonData />
      </Grid>
      <Grid item xs={12}>
        <SuggestionsList />
      </Grid>
    </Grid>
  );
}

export default MappingCard;
