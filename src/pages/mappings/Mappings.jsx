import {
  faFileLines,
  faPrescription,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Biotech } from "@mui/icons-material";
import React from "react";
import CardMenuOption from "../../components/cardMenuOption/CardMenuOption";
import "./mappings.css";

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

const Mappings = () => {
  return (
    <div className="mappings">
      <div className="mappingsTitle">Mappings</div>
      <div className="options">
        {options.map((option) => {
          return <CardMenuOption key={option.id} {...option} />;
        })}
      </div>
    </div>
  );
};

export default Mappings;
