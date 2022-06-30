import React from "react";
import { DIAGNOSIS_TYPE, TREATMENT_TYPE } from "../../constants";
import "./home.css";

import DashboardBarChart from "../../components/charts/dashboardBarChart/DashboardBarChart";
import { useQuery } from "react-query";
import { getMappingsSummary } from "../../apis/Mappings.api";
import DashboardPieChart from "../../components/charts/dashboardPieChart/DashboardPieChart";

const getTotalMappingsCountsPieData = (mappingsSummaries) => {
  let totalMapped = 0;
  let totalUnmapped = 0;

  mappingsSummaries.summaryEntries.forEach((x) => {
    totalMapped += x.mapped;
    totalUnmapped += x.unmapped;
  });

  return [
    {
      id: "mapped",
      label: "Mapped Terms",
      value: totalMapped,
    },
    {
      id: "unmapped",
      label: "Unmapped Terms",
      value: totalUnmapped,
    },
  ];
};

const Home = () => {
  let treatmentMappingsSummary = useQuery(
    ["getMappingsSummary", { TREATMENT_TYPE }],
    () => {
      return getMappingsSummary(TREATMENT_TYPE);
    }
  );
  let diagnosisMappingsSummary = useQuery(
    ["getMappingsSummary", { DIAGNOSIS_TYPE }],
    () => {
      return getMappingsSummary(DIAGNOSIS_TYPE);
    }
  );

  let diagnosisTotalMappingsCounts = [];

  if (diagnosisMappingsSummary.data) {
    diagnosisTotalMappingsCounts = getTotalMappingsCountsPieData(
      diagnosisMappingsSummary.data
    );
  }

  let treatmentTotalMappingsCounts = [];

  if (treatmentMappingsSummary.data) {
    treatmentTotalMappingsCounts = getTotalMappingsCountsPieData(
      treatmentMappingsSummary.data
    );
  }

  return (
    <>
      <div className="home">
        <div className="row">
          <div style={{ height: "450px", width: "450px" }}>
            {diagnosisMappingsSummary.data && (
              <DashboardPieChart
                title={"Diagnosis terms"}
                data={diagnosisTotalMappingsCounts}
              />
            )}
          </div>
          <div style={{ height: "450px", width: "450px" }}>
            {diagnosisMappingsSummary.data && (
              <DashboardPieChart
                title={"Treatment terms"}
                data={treatmentTotalMappingsCounts}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div style={{ height: "500px", width: "40%" }}>
            {treatmentMappingsSummary.data && (
              <DashboardBarChart
                title={"Treatment terms"}
                data={treatmentMappingsSummary.data.summaryEntries}
                indexKey={"dataSource"}
                keys={["mapped", "unmapped"]}
              />
            )}
          </div>
          <div style={{ height: "500px", width: "40%" }}>
            {diagnosisMappingsSummary.data && (
              <DashboardBarChart
                title={"Diagnosis terms"}
                data={diagnosisMappingsSummary.data.summaryEntries}
                indexKey={"dataSource"}
                keys={["mapped", "unmapped"]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
