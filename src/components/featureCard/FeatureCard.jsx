import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React from "react";
import "./featureCard.css";

const FeatureCard = ({ title, value, change, note }) => {
  change = change === 0 ? null : change;

  let icon;
  if (!change) {
    icon = null;
  } else if (change < 0) {
    icon = <ArrowDownward className="featuredIcon negative" />;
  } else {
    icon = <ArrowUpward className="featuredIcon " />;
  }

  let noteSection;
  if (note) {
    noteSection = <span className="featuredSub">{note}</span>;
  }

  return (
    <div className="featuredCard">
      <span className="featureTitle">{title}</span>
      <div className="featuredContainer">
        <span className="featureValue">{value}</span>
        <span className="featuredValueChange">
          {change} {icon}
        </span>
      </div>
      {noteSection}
    </div>
  );
};

export default FeatureCard;
