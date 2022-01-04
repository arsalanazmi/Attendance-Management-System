import React from "react";
import { useSelector } from "react-redux";
import EmployeeLogin from "../Employee/Login";
import EmployeePanel from "../Employee/EmployeePanel";

const EmployeePrivateRoute = () => {
  const employee = useSelector(state => state.employee);
  
  return employee.isAuthenticated ? (
    <div className="App">
      <EmployeePanel />
    </div>
  ) : (
    <EmployeeLogin />
  );
};

export default EmployeePrivateRoute;