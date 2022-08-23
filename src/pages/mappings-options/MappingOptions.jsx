import {
  faFileLines,
  faPrescription,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardMenuOption from "../../components/cardMenuOption/CardMenuOption";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { detectNewMappings } from "../../apis/Mappings.api";

const options = [
  {
    id: 1,
    title: "Diagnosis",
    description: "See mappings summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faStethoscope} />,
    path: "/mappings/diagnosisSummary",
    type: "link",
    enabled: true,
  },
  {
    id: 2,
    title: "Treatment",
    description: "See mappings summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faPrescription} />,
    path: "/mappings/treatmentSummary",
    type: "link",
    enabled: true,
  },
  {
    id: 3,
    title: "Treatment Rules",
    description: "Download",
    icon: <FontAwesomeIcon className="fa-5x" icon={faFileLines} />,
    path: "/mappings/mappingRules",
    type: "executableAction",
    enabled: true,
  },
  {
    id: 4,
    title: "Diagnosis Rules",
    description: "Download",
    icon: <FontAwesomeIcon className="fa-5x" icon={faFileLines} />,
    path: "/mappings/mappingRules",
    type: "executableAction",
    enabled: true,
  },
  {
    id: 5,
    title: "New mappings",
    description: "Load new mappings",
    icon: <FontAwesomeIcon className="fa-5x" icon={faFileLines} />,
    path: "/mappings/mappingRules",
    type: "executableAction",
    enabled: true,
    apiMethodToExecute: detectNewMappings,
  },
];

const MappingOptions = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginLeft: "50px",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Typography variant="h4" component="h2">
          Mappings Options
        </Typography>

        <Grid
          marginLeft={"200px"}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {options.map((option) => {
            return (
              <Grid key={option.id} item xs={4}>
                <CardMenuOption key={option.id} {...option} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default MappingOptions;
