import "./app.css"
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
        </div>
      </div>
    </>

  );
}

export default App;
