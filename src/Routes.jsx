import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  if (!sessionStorage.getItem("sesion"))
    return <Navigate to="/login" replace />;
  return <Outlet />;
};

export const AdminRoute = () => {
  // si no está logueado, se va a login
  if (!sessionStorage.getItem("sesion"))
    return <Navigate to="/login" replace />;

  // Si no es admin, se va a ventas
  if (JSON.parse(sessionStorage.getItem("sesion")).employment != "Admin")
    return <Navigate to="/sales" replace />;

  return <Outlet />;
};
