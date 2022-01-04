import React from "react";
import { useSelector } from "react-redux";
import EmployeeLogin from "../Employee/Login";
import EmployeeAttendance from "../Employee/EmployeeAttendance";

const EmployeeAttendancePrivateRoute = () => {
  const employee = useSelector(state => state.employee);
  console.log(employee.isAuthenticated)
  return employee.isAuthenticated ? (
    <div className="App">
      <EmployeeAttendance />
    </div>
  ) : (
    <EmployeeLogin />
  );
};

export default EmployeeAttendancePrivateRoute;
