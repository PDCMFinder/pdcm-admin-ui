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
import "./mappingOptions.css";

const options = [
  {
    id: 1,
    title: "Diagnosis",
    description: "See mappings summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faStethoscope} />,
    path: "/mappings/diagnosisSummary",
  },
  {
    id: 2,
    title: "Treatment",
    description: "See mappings summary",
    icon: <FontAwesomeIcon className="fa-5x" icon={faPrescription} />,
    path: "/mappings/treatmentSummary",
  },
  {
    id: 3,
    title: "Mapping rules",
    description: "See mapping rules",
    icon: <FontAwesomeIcon className="fa-5x" icon={faFileLines} />,
    path: "/mappings/mappingRules",
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
      <Box sx={{ width: "80%", height: 400 }}>
        <div className="mappingsTitle">Mappings Options</div>

        <Grid
          marginLeft={"200px"}
          container
          rowSpacing={1}
          justifyContent="flex-end"
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {options.map((option) => {
            return (
              <Grid item xs={4}>
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
