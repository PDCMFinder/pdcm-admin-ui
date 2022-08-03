import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DIAGNOSIS_TYPE, TREATMENT_TYPE } from "../../constants";
import "./home.css";

import DashboardBarChart from "../../components/charts/dashboardBarChart/DashboardBarChart";
import { useQuery } from "react-query";
import { getMappingsSummary } from "../../apis/Mappings.api";
import DashboardPieChart from "../../components/charts/dashboardPieChart/DashboardPieChart";
import Sidebar from "../../components/sidebar/Sidebar";

const MAPPED = "mapped";
const UNMAPPED = "unmapped";

const titlesByStatus = new Map();
titlesByStatus.set(MAPPED, "Mapped terms");
titlesByStatus.set(UNMAPPED, "Unmapped terms");

const getReducedCountsByType = (data) => {
  const countsByType = data.reduce(
    (counts, e) => {
      counts[MAPPED] += e.mapped;
      counts[UNMAPPED] += e.unmapped;

      return counts;
    },
    { [MAPPED]: 0, [UNMAPPED]: 0 }
  );

  return Object.entries(countsByType).map((x) => {
    return { id: x[0], label: titlesByStatus.get(x[0]), value: x[1] };
  });
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
    diagnosisTotalMappingsCounts = getReducedCountsByType(
      diagnosisMappingsSummary.data.summaryEntries
    );
  }

  let treatmentTotalMappingsCounts = [];

  if (treatmentMappingsSummary.data) {
    treatmentTotalMappingsCounts = getReducedCountsByType(
      treatmentMappingsSummary.data.summaryEntries
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              alignItems="center"
              justifyContent="space-around"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <div style={{ height: "450px", width: "450px" }}>
                  {diagnosisMappingsSummary.data && (
                    <DashboardPieChart
                      title={"Diagnosis terms"}
                      data={diagnosisTotalMappingsCounts}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ height: "450px", width: "450px" }}>
                  {diagnosisMappingsSummary.data && (
                    <DashboardPieChart
                      title={"Treatment terms"}
                      data={treatmentTotalMappingsCounts}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ height: "500px", width: "600px" }}>
                  {treatmentMappingsSummary.data && (
                    <DashboardBarChart
                      title={"Treatment terms"}
                      data={treatmentMappingsSummary.data.summaryEntries}
                      indexKey={"dataSource"}
                      keys={["mapped", "unmapped"]}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ height: "500px", width: "600px" }}>
                  {diagnosisMappingsSummary.data && (
                    <DashboardBarChart
                      title={"Diagnosis terms"}
                      data={diagnosisMappingsSummary.data.summaryEntries}
                      indexKey={"dataSource"}
                      keys={["mapped", "unmapped"]}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
