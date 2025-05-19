import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="navbar">
      <button onClick={handleLogout}>
        <LogoutIcon />
        <div className="sidebar-item-title">Log Out</div>
      </button>
    </div>
  );
}

export default NavBar;
