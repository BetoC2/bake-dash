import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  if (!sessionStorage.getItem("sesion"))
    return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const AdminRoute = () => {
  if (!sessionStorage.getItem("sesion"))
    return <Navigate to="/login" replace />;

  if (JSON.parse(sessionStorage.getItem("sesion")).employment != "Admin")
    return <Navigate to="/sales" replace />;

  return <Outlet />;
};
