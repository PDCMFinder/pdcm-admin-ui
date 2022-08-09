import styled from "@emotion/styled";
import {
  faBook,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import React from "react";
import { extractNCTiName } from "../../../util/Util";

const OntologySuggestionData = ({ suggestion }) => {
  console.log("suggestionData in OntologySuggestionData", suggestion);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
          {suggestion.suggestedTermLabel}
        </Typography>
        <Typography variant="caption" component="div">
          Ontology Term Label
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faSquareArrowUpRight}
          />
          <a
            href={suggestion.suggestedTermUrl}
            target="_blank"
            rel="noreferrer"
          >
            {extractNCTiName(suggestion.suggestedTermUrl)}
          </a>
        </Typography>
        <Typography variant="caption" component="div">
          NCIt term
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          {suggestion.ontologySuggestion.definition}
        </Typography>
        <Typography variant="caption" component="div">
          Definition
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          <Box
            component="ul"
            sx={{
              display: "flex",
              justifyContent: "left",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
          >
            {suggestion.ontologySuggestion.synonyms.map((synonym, index) => {
              return (
                <ListItem key={index}>
                  <Chip label={synonym} />
                </ListItem>
              );
            })}
          </Box>
        </Typography>
        <Typography variant="caption" component="div">
          Synonyms
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OntologySuggestionData;
