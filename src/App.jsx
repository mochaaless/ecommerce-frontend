import Inventory from "./pages/Inventory.jsx";
import Sales from "./pages/Sales.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard />
        }
      />
      <Route
        path="/inventory"
        element={
          <Inventory />
        }
      />
      <Route
        path="/sales"
        element={
          <Sales />
        }
      />
    </Routes>
  );
}

export default App;
