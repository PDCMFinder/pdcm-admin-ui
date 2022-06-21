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

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ontologies" element={<OntologiesPage />} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
