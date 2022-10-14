import {
  faBook,
  faBookOpenReader,
  faCheckToSlot,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { convertToOLSUrl, extractNCTiName } from "../../../../util/Util";

function CommonData({ mappingEntity }) {
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
            {mappingEntity.mappedTermLabel}
          </Typography>
          <Typography variant="caption" component="div">
            Ontology Term Label
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faSquareArrowUpRight}
            />
            <a
              href={convertToOLSUrl(mappingEntity.mappedTermUrl)}
              target="_blank"
              rel="noreferrer"
            >
              {extractNCTiName(mappingEntity.mappedTermUrl)}
            </a>
          </Typography>
          <Typography variant="caption" component="div">
            NCIt term
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faBookOpenReader}
            />
            {mappingEntity.mappingType} ({mappingEntity.source})
          </Typography>
          <Typography variant="caption" component="div">
            Mapping Type / Source
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button" component="div">
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faCheckToSlot}
            />
            {mappingEntity.status}
          </Typography>
          <Typography variant="caption" component="div">
            Status
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CommonData;
