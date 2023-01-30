import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
  };

  if (
    user?.email === null ||
    user?.email === "undefined" ||
    user?.password === null ||
    user?.password === "undefined"
  ) {
    return <Navigate to="/" replace />;
  }
  return children || <Outlet />;
};

export default ProtectedRoutes;