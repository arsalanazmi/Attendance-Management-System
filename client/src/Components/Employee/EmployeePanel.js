import React, { useState, useEffect } from "react";
import moment from "moment";
import EmployeeNavbar from "./EmployeeNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeCheckIn,
  employeeCheckOut,
  getEmployeeCheckIn,
  getEmployeeCheckOut
} from "../../actions/employeeActions.js";

const EmployeePanel = () => {
  const employee = useSelector(state => state.employee);
  const dispatch = useDispatch();

  // const [checkIn, setCheckIn] = useState([]);
  // const [checkInDisable, setCheckInDisable] = useState(false);
  // const [checkOutDisable, setCheckOutDisable] = useState(true);

  const handleCheckIn = id => {
    dispatch(employeeCheckIn(id));
  };

  const handleCheckOut = id => {
    dispatch(employeeCheckOut(id));
  };
  var currentDate = new Date();
  var d = currentDate.getDate() + 2;
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var date = d + "-" + month + "-" + year;
  useEffect(
    () => {
      // debugger;

      dispatch(getEmployeeCheckIn());
      dispatch(getEmployeeCheckOut());

        // console.log("CheckIn",employee.checkIn)
        // console.log("CheckOut",employee.checkOut)
      // console.log(employee);
      // console.log(employee.employee.employeeData._id);
      // console.log(employee.checkIn.map(In => In.userId).toString());
      // console.log(
      //   employee.employee.employeeData._id ===
      //     employee.checkIn.map(In => In.userId).toString()
      // );
      // employee.checkIn.map(In => In.day === date).toString()
      //   ? setCheckInDisable(true) && setCheckOutDisable(false)
      //   : setCheckInDisable(false)
      // employee.checkOut.map(Out => Out.day === date).toString()
      //   ? setCheckOutDisable(true)
      //   : setCheckOutDisable(false)

      // console.log(date);
      // console.log(employee.checkIn.map(In => In.day === date).toString());

      // console.log(employee.checkIn.map(In => In.day === date).toString());
      // if (
      //   employee.employee.employeeData._id ===
      //   employee.checkIn.map(In => In.userId).toString()
      // ) {
      //   if (employee.checkOut) {
      //     setCheckIn(
      //       employee.checkIn.map(In => ({
      //         ...In,
      //         ...employee.checkOut.find(Out => Out.day === In.day)
      //       }))
      //     );
      //   }
      //   else{
      //     setCheckIn(employee.checkIn);
      //   }
      // }
    },
    [dispatch, employee, date]
  );

  return (
    <div>
      <EmployeeNavbar />

      <div className="container">
        <h4>
          <b>Employee Attendance Portal</b>
        </h4>
        <div>
          <button
            className="btn-small waves-effect waves-light hoverable green"
            onClick={() => handleCheckIn(employee.employee.employeeData._id)}
            //disabled={checkInDisable}
          >
            Check In
          </button>

          <button
            className="btn-small waves-effect waves-light hoverable red accent-4"
            onClick={() => handleCheckOut(employee.employee.employeeData._id)}
            //disabled={checkOutDisable}
          >
            Check Out
          </button>
        </div>

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
            {employee
              ? employee.checkIn.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td >{moment(data.date).format("MMM Do YYYY")}</td>
                      <td >{data.attendance}</td>
                      <td >{data.checkIn}</td>
                      {employee.checkOut ? employee.checkOut.map((checkOutData) => {
                       return(
                          <td >{checkOutData.checkOut}</td>
                      )}): ""}
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

export default EmployeePanel;
