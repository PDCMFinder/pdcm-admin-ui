import "./app.css"
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import OntologiesPage from "./pages/ontologies/OntologiesPage";
import { QueryClient, QueryClientProvider } from "react-query";


// Create a client
const queryClient = new QueryClient();

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
          </Routes>

        </div>
      </QueryClientProvider>
    </Router>

  );
}

export default App;
