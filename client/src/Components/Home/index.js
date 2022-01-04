import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Header, Admin, Employee } from "../../Images";
import "./index.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="header">
          <img src={Header} alt="home" className="header-img" />
        </div>
        <div className="select-panel row">
          <div className="admin col m6">
            <Link to="/admin/login">
              <img src={Admin} alt="admin" className="admin-logo" />
              <h6>
                <b>Admin</b>
              </h6>
            </Link>
          </div>
          <div className="employee col m6">
            <Link to="/employee/login">
            <img src={Employee} alt="emplyee" className="employee-logo" />
            <h6>
              <b>Employee</b>
            </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;