import {
  faArrowRotateRight,
  faFileLines,
  faPrescription,
  faStethoscope,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardMenuOption from "../../components/cardMenuOption/CardMenuOption";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import {
  assignAutomaticMappings,
  detectNewMappings,
  getDownloadMappingRulesUrl,
} from "../../apis/Mappings.api";

const options = [
  {
    id: 1,
    title: "Diagnosis Summary",
    description: "See summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faStethoscope} />,
    path: "/mappings/diagnosisSummary",
    type: "link",
    enabled: true,
  },
  {
    id: 2,
    title: "Treatment Summary",
    description: "See summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faPrescription} />,
    path: "/mappings/treatmentSummary",
    type: "link",
    enabled: true,
  },
  {
    id: 3,
    title: "Mapping Rules",
    description: "Download",
    icon: <FontAwesomeIcon className="fa-5x" icon={faFileLines} />,
    path: getDownloadMappingRulesUrl(),
    type: "download",
    enabled: true,
  },
  {
    id: 4,
    title: "New mappings",
    description: "Load new mappings",
    icon: <FontAwesomeIcon className="fa-5x" icon={faArrowRotateRight} />,
    path: "/mappings/mappingRules",
    type: "executableAction",
    enabled: true,
    apiMethodToExecute: detectNewMappings,
  },
  {
    id: 5,
    title: "Automatic Mappings",
    description: "Assign Automatic  Mappings",
    icon: <FontAwesomeIcon className="fa-5x" icon={faWandSparkles} />,
    path: null,
    type: "executableAction",
    enabled: true,
    apiMethodToExecute: assignAutomaticMappings,
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
          marginTop={"20px"}
          container
          rowSpacing={2}
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
