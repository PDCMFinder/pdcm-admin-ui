import React from "react";
import FeatureCard from "../../featureCard/FeatureCard";

import "./ontologySummaryReport.css";

const formatISODate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const OntologySummaryReport = ({ data }) => {
  return (
    <div className="ontologySumaryContainer">
      <div className="loadingDateInfo">
        <span className="loadingDatelabel">Last Loading Date:</span>
        <span className="loadingDateValue">
          {formatISODate(data["Update date"])}
        </span>
      </div>

      <div className="sectionTitle">Number of loaded terms:</div>

      <div className="cards">
        <FeatureCard
          title={"Diagnosis"}
          value={data["Number of diagnosis terms"]}
        />
        <FeatureCard
          title={"Treatment"}
          value={data["Number of treatment terms"]}
        />
        <FeatureCard
          title={"Regimen"}
          value={data["Number of regimen terms"]}
        />
      </div>
    </div>
  );
};

export default OntologySummaryReport;
