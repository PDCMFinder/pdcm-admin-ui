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
import MappingOptions from "./pages/mappings/MappingOptions";
import Mappings from "./components/mappings/Mappings";
import DiagnosisMappings from "./components/diagnosis-mappings/DiagnosisMappings";

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

  return (
    <Router>
      <Topbar />
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ontologies" element={<OntologiesPage />} />
            <Route path="/mappings" element={<MappingOptions />} />
            <Route path="mappings/diagnosisSummary" element={<MappingsSummary type={DIAGNOSIS_TYPE} />} />
            <Route path="mappings/treatmentSummary" element={<MappingsSummary type={TREATMENT_TYPE} />} />
            <Route path="/mappings/diagnosisSummary/detail/:dataSource/:statusList" element={<DiagnosisMappings />} />
            <Route path="/mappings/treatmentSummary/details/:statusList" element={<Mappings />} />
          </Routes>

        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>

  );
}

export default App;
