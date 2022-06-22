import React from "react";
import FeatureCard from "../../featureCard/FeatureCard";

import "./ontologySummaryReport.css";

const formatISODate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const OntologySummaryReport = ({
  totalCount,
  latestLoadingDate,
  previousLoadingDate,
  countsByType,
  countAddedTermsLatestLoadByType,
  countAddedTermsPreviousLoadByType,
  errors,
}) => {
  return (
    <div className="ontologySumaryContainer">
      <div className="loadingDateInfo">
        <span className="loadingDatelabel">Last Loading Date:</span>
        <span className="loadingDateValue">
          {formatISODate(latestLoadingDate)}
        </span>
      </div>
      <div className="loadingDateInfo">
        <span className="loadingDatelabel">Previous Loading Date:</span>
        <span className="loadingDateValue">
          {formatISODate(previousLoadingDate)}
        </span>
      </div>

      <div className="sectionTitle">Current Ontology Terms counts:</div>

      <div className="cards">
        <FeatureCard title={"Total"} value={totalCount} />
        {Object.entries(countsByType).map((item) => {
          const title = item[0];
          const value = item[1];
          return <FeatureCard title={title} value={value} />;
        })}
      </div>

      <div className="sectionTitle">
        Terms added during last loading process:
      </div>
      <div className="cards">
        {Object.entries(countAddedTermsLatestLoadByType).map((item) => {
          const key = item[0];
          const value = item[1];
          const previous = countAddedTermsPreviousLoadByType[key];

          const differenceWithPrevious = value - previous;
          return (
            <FeatureCard
              title={key}
              value={value}
              change={differenceWithPrevious}
              note={"Compared to last loading"}
            />
          );
        })}
      </div>

      <div className="sectionTitle">Errrors in last loading process:</div>
      <div className="errors">{errors}</div>
    </div>
  );
};

export default OntologySummaryReport;
