import "./app.css"
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";

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
import Mappings from "./components/mappings/Mappings";
import DiagnosisMappings from "./components/diagnosis-mappings/DiagnosisMappings";
import { ThemeProvider, useTheme } from "@mui/material";
import MappingOptions from "./pages/mappings-options/MappingOptions";

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

  return (
    <Router>
      <Topbar />
      <QueryClientProvider client={queryClient}>
        <div>
          <ThemeProvider theme={theme}>


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ontologies" element={<OntologiesPage />} />
              <Route path="/mappings-options" element={<MappingOptions />} />
              <Route path="mappings/diagnosisSummary" element={<MappingsSummary type={DIAGNOSIS_TYPE} />} />
              <Route path="mappings/treatmentSummary" element={<MappingsSummary type={TREATMENT_TYPE} />} />
              <Route path="/mappings/diagnosisSummary/detail/:dataSource/:statusList" element={<DiagnosisMappings />} />
              <Route path="/mappings" element={<Mappings />} />
            </Routes>
          </ThemeProvider>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>

  );
}

export default App;
