import axios from "axios";
import history from "../history";
import jwt_decode from "jwt-decode";
import {
  SET_EMPLOYEE,
  GET_EMPLOYEES,
  EDIT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  EMPLOYEE_CHECKIN,
  EMPLOYEE_CHECKOUT,
  LOGOUT_EMPLOYEE
} from "./types";
import Swal from "sweetalert2";

// EMPLOYEE
// Employee Login - get user token
export const employeeLogin = employeeData => dispatch => {
  axios
    .post("http://localhost:5000/create-employee/login", employeeData)
    .then(res => {
      res.data.message
        ? Swal.fire({
            icon: "error",
            title: res.data.message
          })
        : history.push("/employee/employeePanel");

      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("employeeToken", token);
      // Decode token to get employee data
      const employeeDecoded = jwt_decode(token);
      // Set current user
      dispatch(setEmployee(employeeDecoded));
    })
    .catch(err => console.log(err));
};

// Set employee logged in user
export const setEmployee = employeeDecoded => {
  return {
    type: SET_EMPLOYEE,
    payload: employeeDecoded
  };
};

// Log Employee out
export const logoutEmployee = () => dispatch => {
  // Remove token from local storage
  localStorage.clear();
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(signOutEmployee());
  history.push("/employee/login");
  window.location.reload();
};

// Set Employee logged out
export const signOutEmployee = () => {
  return {
    type: LOGOUT_EMPLOYEE
  };
};

// Register Employee
export const registerEmployee = employeeData => () => {
  axios
    .post("http://localhost:5000/create-employee/register", employeeData)
    .then(res => {
      res.data.message
        ? Swal.fire({
            icon: "error",
            title: res.data.message
          })
        : Swal.fire("Employee Registered Successfully!", "", "success");
    })
    .catch(err => console.log("error", err));
};

// Get Employees
export const getEmployees = () => dispatch => {
  axios
    .get("http://localhost:5000/create-employee/get-employees")
    .then(res => {
      dispatch(setEmployees(res.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const setEmployees = data => {
  return {
    type: GET_EMPLOYEES,
    payload: data
  };
};

// Edit Employeee
export const editEmployee = id => dispatch => {
  axios
    .get("http://localhost:5000/create-employee/edit-employee/" + id)
    .then(res => {
      dispatch(employeeEdit(res.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const employeeEdit = employee => {
  return {
    type: EDIT_EMPLOYEE,
    payload: employee
  };
};

// UPDATE Employee
export const updateEmployee = (id, data) => dispatch => {
  axios
    .put("http://localhost:5000/create-employee/update-employee/" + id, data)
    .then(res => {
      if (res.data) {
        Swal.fire("Student Record Successfully Updated!", "", "success");
        dispatch(employeeUpdate(res.data));
      }
      if (res.data.message) {
        Swal.fire({
          icon: "error",
          title: res.data.message
        });
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const employeeUpdate = data => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: data
  };
};

export const deleteEmployee = id => dispatch => {
  axios
    .delete("http://localhost:5000/create-employee/delete-employee/" + id)
    .then(res => {
      console.log("DELETED", res.data);
      if (res.data) {
        Swal.fire("Employee Deleted successfully!", "", "success");
      }
    })
    .catch(error => {
      console.log("Error", error);
    });
};

// Register Employee CheckIn Time
export const employeeCheckIn = id => dispatch => {
  axios
    .post("http://localhost:5000/employee/checkIn/" + id)
    .then(res => {
      console.log("checkIn",res.data);
    })
    .catch(e => console.log(e));
};

// Register Employee CheckOut Time
export const employeeCheckOut = id => dispatch => {
  axios
    .post("http://localhost:5000/employee/checkOut/" + id)
    .then(res => {
      console.log("checkOut",res.data);
    })
    .catch(e => console.log(e));
};

// Get Employee CheckIn Time
export const getEmployeeCheckIn = () => dispatch => {
  axios
  .get("http://localhost:5000/employee/employee-checkIn")
  .then(res => {
    dispatch(checkInEmployee(res.data));
  })
  .catch(error => {
    console.log(error);
  });
};

export const checkInEmployee = data => {
  // console.log("CheckIn",data)
  return {
    type: EMPLOYEE_CHECKIN,
    payload: data 
  };
};

// Get Employee CheckOut Time
export const getEmployeeCheckOut = () => dispatch => {
  axios
    .get("http://localhost:5000/employee/employee-checkOut")
    .then(res => {
      dispatch(checkOutEmployee(res.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const checkOutEmployee = data => {
  return {
    type: EMPLOYEE_CHECKOUT,
    payload: data
  };
};