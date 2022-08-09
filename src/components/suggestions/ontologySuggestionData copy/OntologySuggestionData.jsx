import styled from "@emotion/styled";
import {
  faBook,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CommonData from "../../mappings/mappingCard/commonData/CommonData";
import DiagnosisKeyData from "../../mappings/mappingCard/keyData/diagnosisKeyData/DiagnosisKeyData";

const url = "http://purl.obolibrary.org/obo/NCIT_C9145";

const extractNCTiName = (url) => {
  console.log("url", url);
  const index = url.indexOf("NCIT");
  console.log(index);
  if (index > -1) {
    return url.substring(index);
  }
  return "N/A";
};

const OntologySuggestionData = ({ suggestionData }) => {
  console.log("suggestionData in OntologySuggestionData", suggestionData);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="button" component="div">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faBook} />
          {suggestionData.suggestedTermLabel}
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
            href={suggestionData.suggestedTermUrl}
            target="_blank"
            rel="noreferrer"
          >
            {extractNCTiName(suggestionData.suggestedTermUrl)}
          </a>
        </Typography>
        <Typography variant="caption" component="div">
          NCIt term
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" component="div">
          {suggestionData.ontologySuggestion.definition}
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
            {suggestionData.ontologySuggestion.synonyms.map(
              (synonym, index) => {
                return (
                  <ListItem key={index}>
                    <Chip label={synonym} />
                  </ListItem>
                );
              }
            )}
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
