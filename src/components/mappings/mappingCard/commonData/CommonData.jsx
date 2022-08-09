import {
  faBook,
  faBookOpenReader,
  faCheckToSlot,
  faDatabase,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Grid, Typography } from "@mui/material";
import React from "react";

const url = "http://purl.obolibrary.org/obo/NCIT_C9145";

function CommonData() {
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
            OSTEOSARCOMA
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
            <a href={url} target="_blank" rel="noreferrer">
              NCIT_C9145
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
            Manual (Rule)
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
            Mapped
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
