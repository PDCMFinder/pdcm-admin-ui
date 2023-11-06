import "./app.css"

import { ReactQueryDevtools } from 'react-query/devtools'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import OntologiesPage from "./pages/ontologies/OntologiesPage";
import { QueryClient, QueryClientProvider } from "react-query";
import MappingsSummary from "./components/mappingsSummary/MappingsSummary";
import { DIAGNOSIS_TYPE, TREATMENT_TYPE } from "./constants";
import { createTheme, CssBaseline, Grid, ThemeProvider, useTheme } from "@mui/material";
import MappingOptions from "./pages/mappings-options/MappingOptions";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import MappingsSearchPage from "./pages/mappingsSearchPage/MappingsSearchPage";
import TopBar from "./components/topBar/TopBar";
import ReleaseDataOptions from "./pages/release-data-options/ReleaseDataOptions";
import AllModelsByRelease from "./components/releaseData/modelsByRelease/ModelsByRelease";
import ModelsByRelease from "./components/releaseData/modelsByRelease/ModelsByRelease";


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const theme = useTheme()
  const mdTheme = createTheme();

  return (
    <>
      <Router>
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <Grid container spacing={2} rowSpacing={10}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <Grid item xs={12} style={{ marginLeft: "20px" }}>
              <QueryClientProvider client={queryClient}>

                <ThemeProvider theme={theme}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/ontologies" element={<OntologiesPage />} />
                    <Route path="/mappings-options" element={<MappingOptions />} />
                    <Route path="mappings/diagnosisSummary" element={<MappingsSummary type={DIAGNOSIS_TYPE} />} />
                    <Route path="mappings/treatmentSummary" element={<MappingsSummary type={TREATMENT_TYPE} />} />
                    <Route path="/search" element={<MappingsSearchPage />} />
                    <Route path="/release-data-options" element={<ReleaseDataOptions />} />
                    <Route path="/all-models-by-release" element={<ModelsByRelease viewName={'allModels'} />} />
                    <Route path="/paediatric-models-by-release" element={<ModelsByRelease viewName={'paediatricModels'} />} />

                  </Routes>
                </ThemeProvider>

                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
