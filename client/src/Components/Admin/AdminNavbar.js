import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { AdminBackground, Admin } from "../../Images";
import { logoutAdmin } from "../../actions/adminActions";
import { useDispatch } from "react-redux";
import "./AdminPanel.css"

const AdminNavbar = () => {
  const dispatch = useDispatch();
  
  const onLogoutClick = e => {
    dispatch(logoutAdmin());
  };
  
  useEffect(()=>{
    M.AutoInit();
      document.addEventListener("DOMContentLoaded", () => {
        const elems = document.querySelectorAll(".side-nav");
        M.Sidenav.init(elems);
      });
  },[]) 
  
  return (
    <div>
      <nav>
        <div className="nav-wrapper #263238 blue-grey darken-4"  style={{padding:" 0 2%"}}>
          <Link to="#!" className="brand-logo">Admin Panel</Link>
          <Link to="#" data-target="slide-out" className="sidenav-trigger show-on-small">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/admin/adminPanel">Dashboard</Link></li>
            <li><Link to="/admin/adminPanel/employeeRecord">Employee Record</Link></li>
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
            <img src={AdminBackground} alt="AdminBackground" className="admin-background" />
            </div>
            <Link to="#user"><img src={Admin} alt="admin" className="logo" /></Link>
            <Link to="#name"><span className="white-text name">Admin Panel</span></Link>
          </div>
        </li>
        <li><Link to="/admin/adminPanel">Dashboard</Link></li>
        <li><Link to="/admin/adminPanel/employeeRecord">Employee Record</Link></li>
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
  )}

export default AdminNavbar;