import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DIAGNOSIS_TYPE, TREATMENT_TYPE } from "../../constants";
import "./dashboard.css";

import DashboardBarChart from "../../components/charts/dashboardBarChart/DashboardBarChart";
import { useQuery } from "react-query";
import { getMappingsSummary } from "../../apis/Mappings.api";
import DashboardPieChart from "../../components/charts/dashboardPieChart/DashboardPieChart";
import { Drawer, Toolbar } from "@mui/material";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import { ListItems } from "./DashboardMenuList";
import ProvidersDataWidget from "../../components/widgets/providersDataWidget/ProvidersDataWidget";
import OntologiesWidget from "../../components/widgets/ontologiesWidget/OntologiesWidget";
import IndexerWidget from "../../components/widgets/indexerWidget/IndexerWidget";

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

const Dashboard = () => {
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
    
      <Grid container spacing={2} style={{ marginLeft: "20px" }}>
        <Grid item xs={2}>
          <Drawer variant="permanent" open={true}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            ></Toolbar>
            <Divider />
            <List component="nav">
              {ListItems}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
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

              <Grid item xs={12}>
                <OntologiesWidget />
              </Grid>
              <Grid item xs={12}>
                <IndexerWidget />
              </Grid>
              <Grid item xs={12}>
                <ProvidersDataWidget />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
