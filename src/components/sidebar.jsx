import TsunamiIcon from '@mui/icons-material/Tsunami';
import EqualizerIcon from "@mui/icons-material/Equalizer";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useLocation } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <TsunamiIcon sx={{width: "35px", color: "#d70b0b"}} />
        </div>
        <div className="sidebar-title">Admin</div>
      </div>
      <div className="sidebar-items">
        <button
          className={
            location.pathname === "/" ? "sidebar-item-selected" : "sidebar-item"
          }
          onClick={() => navigate("/")}
        >
          <EqualizerIcon sx={{width: "20px"}} />
          <div className="sidebar-item-title">Analytics</div>
        </button>
        <button
          className={
            location.pathname === "/inventory"
              ? "sidebar-item-selected"
              : "sidebar-item"
          }
          onClick={() => navigate("/inventory")}
        >
          <StorefrontIcon sx={{width: "20px"}}/>
          <div className="sidebar-item-title">Inventory</div>
        </button>
        <button
          className={
            location.pathname === "/sales"
              ? "sidebar-item-selected"
              : "sidebar-item"
          }
          onClick={() => navigate("/sales")}
        >
          <ReceiptIcon sx={{width: "20px"}}/>
          <div className="sidebar-item-title">Sales</div>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
