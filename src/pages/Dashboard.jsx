import SideBar from "../components/sidebar.jsx";
import Analytics from "../components/analytics.jsx";
import { colors } from "../static.js";

function Dashboard() {
  return (
    <div className="page">
      <SideBar />
      <div className="main">
        <div className="main-header">
          <h1 style={{ color: colors.primary }}>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
        <div className="main-content">
          <Analytics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
