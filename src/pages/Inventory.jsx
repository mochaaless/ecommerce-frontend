import SideBar from "../components/sidebar.jsx";
import TableInventory from "../components/inventory.jsx";
import { colors } from "../static.js";

function Inventory() {
  return (
    <div className="page">
      <SideBar />
      <div className="main">
        <div className="main-header">
          <h1 style={{ color: colors.primary }}>Inventory</h1>
          <p>Manage your inventory here!</p>
        </div>
        <div className="main-content">
          <TableInventory />
        </div>
      </div>
    </div>
  );
}

export default Inventory;
