import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employeeLogin } from "../../actions/employeeActions.js";
import Navbar from "../Home/Navbar.js";
import EmployeePanel from "./EmployeePanel";

const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employee);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(20)
        .required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: values => {
      const employeeData = {
        userName: values.userName,
        password: values.password
      };
      console.log("Employee Login Data", employeeData);

      dispatch(employeeLogin(employeeData));
    }
  });

  return (
    <div>
      {employee.isAuthenticated ? (
        <EmployeePanel />
      ) : (
        <div>
          <Navbar />
          <div className="container">
            <div style={{ margin: "3rem auto" }} className="row">
              <div
                className="card col s10 m7 offset-s1 offset-m3 z-depth-3 #e0e0e0 grey lighten-2"
                style={{ padding: "1.5rem" }}
              >
                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back
                  to home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Employee Login</b> below
                  </h4>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <div className="input-field col s12">
                    <input
                      id="userName"
                      type="text"
                      name="userName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <label htmlFor="userName">User Name</label>
                    {formik.touched.userName && formik.errors.userName ? (
                      <span className="red-text">{formik.errors.userName}</span>
                    ) : null}
                  </div>

                  <div className="input-field col s12">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <label htmlFor="password">Password</label>
                    {formik.touched.password && formik.errors.password ? (
                      <span className="red-text">{formik.errors.password}</span>
                    ) : null}
                  </div>

                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLogin;
