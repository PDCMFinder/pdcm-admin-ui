import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faDatabase,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, Typography } from "@mui/material";
import React from "react";

function DiagnosisKeyData() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="div">
            osteosarcoma giant rich cell ho neurofibrosarcomapath necrosis
            microscopic or macroscopic present 70 tumor gradestage high grade
            pt1pnxrecurrent disease primary tumor site long bones of upper limb
            scapula with cortical involvement medullary cavity involvement and
            extension into soft tissue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faSuitcaseMedical}
            />
            Metastatic
          </Typography>
          <Typography variant="caption" component="div">
            Tumor Type
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBullseye} />
            musculoskeletal
          </Typography>
          <Typography variant="caption" component="div">
            Origin Tissue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faDatabase} />
            pdmr
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
