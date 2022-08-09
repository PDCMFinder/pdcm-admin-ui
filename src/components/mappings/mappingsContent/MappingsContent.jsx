import { Box } from "@mui/system";
import React from "react";
import MappingCard from "../mappingCard/MappingCard";

const MappingsContent = ({ mappings }) => {
  console.log("MappingsContent mappings", mappings);
  return (
    <Box>
      {mappings.map((element, index) => {
        return <MappingCard mappingEntity={element} key={index} />;
      })}
    </Box>
  );
};

export default MappingsContent;
