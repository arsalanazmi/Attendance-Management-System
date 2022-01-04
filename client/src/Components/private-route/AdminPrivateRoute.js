import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "../Admin/Login";
import AdminPanel from "../Admin/AdminPanel";

const AdminPrivateRoute = () => {
  const admin = useSelector(state => state.admin);
  console.log("Protected route Auth", admin);

  return admin.isAuthenticated ? <AdminPanel /> : <AdminLogin />;
};

export default AdminPrivateRoute;
