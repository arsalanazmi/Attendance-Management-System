import axios from "axios";
import history from "../history";
import jwt_decode from "jwt-decode";
import { SET_ADMIN, LOGOUT_ADMIN } from "./types";
import Swal from "sweetalert2";

// ADMIN

// Admin Login - get user token
export const adminLogin = adminData => dispatch => {
  console.log("Login", adminData);
  axios
    .post("http://localhost:5000/admin/login", adminData)
    .then(res => {
      console.log(res);
      console.log(res.data.message);
      res.data.message
        ? Swal.fire({
            icon: "error",
            title: res.data.message
          })
        : history.push("/admin/adminPanel");

      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("adminToken", token);
      console.log(token);
      // Decode token to get user data
      const adminDecoded = jwt_decode(token);
      console.log(adminDecoded);
      // Set admin
      dispatch(setAdmin(adminDecoded));
      // history.push("/admin/adminPanel");
    })
    .catch(err => {
      console.log(err);
    });
};

// Set admin logged in user
export const setAdmin = adminDecoded => {
  return {
    type: SET_ADMIN,
    payload: adminDecoded
  };
};

// Log admin out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.clear();
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(signOutAdmin());
  history.push("/admin/login");
};

// Set logged out user
export const signOutAdmin = () => {
  return {
    type: LOGOUT_ADMIN
  };
};
