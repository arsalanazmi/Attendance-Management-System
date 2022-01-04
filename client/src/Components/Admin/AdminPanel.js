import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  registerEmployee,
  getEmployees,
  editEmployee,
  updateEmployee,
  deleteEmployee
} from "../../actions/employeeActions";

import { useDispatch, useSelector } from "react-redux";
import "./AdminPanel.css";

const AdminPanel = () => {
  const employee = useSelector(state => state.employee);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const handleEdit = id => {
    setEdit(true);
    dispatch(editEmployee(id));
  };

  const handleUpdate = (id, data) => {
    dispatch(updateEmployee(id, data));
    setEdit(false);
  };

  const handleDelete = id => {
    dispatch(deleteEmployee(id));
  };

  useEffect(
    () => {
      dispatch(getEmployees());
    },
    [employee,dispatch]
  );

  const formik = useFormik({
    initialValues: {
      userName: employee.editEmployee.userName,
      password: employee.editEmployee.password
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      userName: Yup.string()
        // .matches(/^[A-Za-z,.- ]*$/, "Please enter valid name")
        .max(20)
        .required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Too Short!")
        .max(20, "Too Long!")
    }),
    onSubmit: (values, { resetForm }) => {
      const employeeData = {
        userName: values.userName,
        password: values.password
      };

      edit === false
        ? dispatch(registerEmployee(employeeData))
        : handleUpdate(employee.editEmployee._id, employeeData);

      resetForm({ values: "" });
    }
  });

  return (
    <div>
      <AdminNavbar />
      <div className="container valign-wrapper">
        <div style={{ margin: "2rem auto" }} className="row">
          <div
            className="card col s10 m10 offset-s1 offset-m1 z-depth-3 #e0e0e0 grey lighten-2"
            style={{ padding: "1.5rem" }}
          >
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Employee</b> below
              </h4>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-field col s12 ">
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
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

              <div className="row buttons" style={{ paddingLeft: "11.250px" }}>
                <div className="col s8 m6">
                  {edit === false ? (
                    <button
                      style={{
                        width: "140px",
                        borderRadius: "3px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-medium waves-effect waves-light hoverable blue accent-3"
                    >
                      Add Employee
                    </button>
                  ) : (
                    <button
                      style={{
                        width: "140px",
                        borderRadius: "3px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-medium waves-effect waves-light hoverable green"
                    >
                      Update Employee
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div>
            {employee.employees ? (
              <table className="striped centered">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employee.employees
                    ? employee.employees.map((list, i) => {
                        return (
                          <tr key={i}>
                            <td>{list.userName}</td>
                            <td>{list.password}</td>
                            <td>
                              <button
                                className="btn-small waves-effect waves-light hoverable green"
                                onClick={() => handleEdit(list._id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-small waves-effect waves-light hoverable red accent-4"
                                onClick={() => handleDelete(list._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
