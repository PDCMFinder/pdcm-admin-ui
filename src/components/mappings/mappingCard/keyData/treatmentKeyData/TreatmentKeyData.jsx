import {
  faBullseye,
  faDatabase,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";

const TreatmentKeyData = ({ titleVariant, treatmentData }) => {
  console.log("treatmentData", treatmentData);

  console.log(
    "rule.value.treatmentName",
    treatmentData["rule.value.treatmentName"]
  );

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant={titleVariant} component="div">
            {treatmentData["rule.value.treatmentName"]}
          </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faDatabase} />
            {treatmentData["rule.value.dataSource"]}
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
