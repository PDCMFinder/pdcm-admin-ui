import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";

const TreatmentKeyData = ({ titleVariant, treatmentname, dataSource }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={titleVariant} component="div">
            {treatmentname}
          </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
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
};

export default TreatmentKeyData;
