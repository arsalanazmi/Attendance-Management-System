import "./App.css";
import "materialize-css/dist/css/materialize.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import history from "./history";
import jwt_decode from "jwt-decode";

import Home from "./Components/Home";
import AdminLogin from "./Components/Admin/Login";
import EmployeeLogin from "./Components/Employee/Login";

import AdminPrivateRoute from "./Components/private-route/AdminPrivateRoute";
import EmployeePrivateRoute from "./Components/private-route/EmployeePrivateRoute";
import EmployeeAttendancePrivateRoute from "./Components/private-route/EmployeeAttendancePrivateRoute";

import EmployeeHistory from "./Components/Admin/EmployeeHistory";
import EmployeeAttendance from "./Components/Employee/EmployeeAttendance";

import { setAdmin, logoutAdmin } from "./actions/adminActions";
import { setEmployee, logoutEmployee } from "./actions/employeeActions";

import { Provider } from "react-redux";
import store from "./store";

// Admin
// Check for token to keep admin logged in
if (localStorage.adminToken) {
  // Set auth token header auth
  const adminToken = localStorage.adminToken;
  // setAuthToken(adminToken);
  // Decode token and get user info and exp
  const adminDecoded = jwt_decode(adminToken);
  // Set user and isAuthenticated
  store.dispatch(setAdmin(adminDecoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (adminDecoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());
    // Redirect to login
    window.location.href = "./admin/login";
  }
}

// Employee
// Check for token to keep admin logged in
if (localStorage.employeeToken) {
  // Set auth token header auth
  const employeeToken = localStorage.employeeToken;
  // setAuthToken(token);
  // Decode token and get user info and exp
  const employeeDecoded = jwt_decode(employeeToken);
  // Set user and isAuthenticated
  store.dispatch(setEmployee(employeeDecoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (employeeDecoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutEmployee());
    // Redirect to login
    window.location.href = "./employee/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/employee/login" element={<EmployeeLogin />} />
            {/* <Route exact path="/employee/employeeAttendance" element={<EmployeeAttendance />} /> */}
            {/* <Route exact path="/admin/adminPanel/employeeRecord" element={<EmployeeHistory />} /> */}

            <Route
              exact
              path="/admin/adminPanel"
              element={<AdminPrivateRoute />}
            />
            <Route
              exact
              path="/employee/employeePanel"
              element={<EmployeePrivateRoute />}
            />
            <Route
              exact
              path="/employee/employeeAttendance"
              element={<EmployeeAttendancePrivateRoute />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
