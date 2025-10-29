import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to booking management
    navigate("/admin/booking-management", { replace: true });
  }, [navigate]);

  return null;
};

export default AdminDashboard;
