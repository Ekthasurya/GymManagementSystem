import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  const userRole = user?.role?.toLowerCase();

  const hasPermission =
    allowedRoles
      .map((role) => role.toLowerCase())
      .includes(userRole);

  if (!hasPermission) {
    // User is logged in but doesn't have permission
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;