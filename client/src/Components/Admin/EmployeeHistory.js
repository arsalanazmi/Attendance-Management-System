import React, { useState, useEffect } from "react";
import moment from "moment";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeCheckIn,
  getEmployeeCheckOut
} from "../../actions/employeeActions.js";

const EmployeeRecord = () => {
  const employee = useSelector(state => state.employee);
  const dispatch = useDispatch();

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
      dispatch(getEmployeeCheckIn());
      dispatch(getEmployeeCheckOut());

      employee.checkOut
        ? setAttendance(
            employee.checkIn.map(In => ({
              ...In,
              ...employee.checkOut.find(Out => Out.day === In.day)
            }))
          )
        : setAttendance(employee.checkIn);
    },
    [dispatch, employee]
  );
  return (
    <div>
      <AdminNavbar />

      <div className="container">
        <h4>
          <b>Employee Attendance History</b>
        </h4>

        <table className="striped centered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Attendance</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {attendance
              ? attendance.map((list, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(list.date).format("MMM Do YYYY")}</td>
                      <td>{list.attendance}</td>
                      <td>{list.checkIn}</td>
                      <td>{list.checkOut}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeRecord;