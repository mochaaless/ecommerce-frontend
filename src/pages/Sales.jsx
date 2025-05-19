import SideBar from "../components/sidebar.jsx";
import TableSales from "../components/sales.jsx";
import { colors } from "../static.js";

function Sales() {
  return (
    <div className="page">
      <SideBar />
      <div className="main">
        <div className="main-header">
          <h1 style={{ color: colors.primary }}>Sales</h1>
          <p>Manage your sales here!</p>
        </div>
        <div className="main-content">
          <TableSales />
        </div>
      </div>
    </div>
  );
}

export default Sales;
