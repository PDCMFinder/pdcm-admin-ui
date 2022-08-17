import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faDatabase,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Typography } from "@mui/material";
import React from "react";

function DiagnosisKeyData({
  titleVariant,
  sampleDiagnosis,
  tumourType,
  dataSource,
  originTissue,
}) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={titleVariant} component="div">
            {sampleDiagnosis}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faSuitcaseMedical}
            />
            {tumourType}
          </Typography>
          <Typography variant="caption" component="div">
            Tumor Type
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBullseye} />
            {originTissue}
          </Typography>
          <Typography variant="caption" component="div">
            Origin Tissue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faDatabase} />
            {dataSource}
          </Typography>
          <Typography variant="caption" component="div">
            Data Source
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DiagnosisKeyData;
