import React from "react";
import Tooltip from "@mui/material/Tooltip";

function CellTooltip(params) {
  return (
    <Tooltip title={params.value}>
      <span>{params.value}</span>
    </Tooltip>
  );
}

export default CellTooltip;

export function renderCellTooltip(params) {
  //   console.log("params renderCellTooltip", params);
  return <CellTooltip value={params.value} />;
}
