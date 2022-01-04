import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { EmployeeBackground, Employee } from "../../Images";
import "./EmployeePanel.css"
import { logoutEmployee } from "../../actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const EmployeeNavbar = () => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);
  
  const onLogoutClick = e => {
    dispatch(logoutEmployee());
  };  
  useEffect(() => {
    M.AutoInit();
    const options = {}
    document.addEventListener("DOMContentLoaded", () => {
      const elems = document.querySelectorAll(".side-nav");
      M.Sidenav.init(elems,options);
    });
  });
  
  return (
    <div>
      <nav>
        <div className="nav-wrapper #263238 blue-grey darken-4" style={{padding:" 0 2%"}}>
          <Link to="/employee/employeePanel" className="brand-logo">Employee Panel</Link>
          <Link to="#" data-target="slide-out" className="sidenav-trigger show-on-small">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/employee/employeePanel">Dashboard</Link></li>
            <li><Link to="/employee/employeeAttendance">Employee Record</Link></li>
            <li>
              <button
                style={{
                  width: "100%",
                  borderRadius: "3px",
                  
                }}
                onClick={onLogoutClick}
                className="btn btn-medium waves-effect waves-light hoverable red accent-4"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src={EmployeeBackground} alt="EmployeeBackground" className="employee-background"/>
            </div>
            <Link to="#user"><img src={Employee} alt="employee" className="logo" /></Link>
            <Link to="#name"><span className="white-text name">{employee.employee.employeeData.userName}</span></Link>
          </div>
        </li>
        <li><Link to="/employee/employeePanel">Dashboard</Link></li>
        <li><Link to="/employee/employeeAttendance">Employee Attendance</Link></li>
        <li> 
          <button
            style={{
              width:"80%",
              borderRadius: "3px",
              margin:"0 0 0 9%",
            }}
            onClick={onLogoutClick}
            className="btn btn-medium waves-effect waves-light hoverable red accent-4"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeNavbar;