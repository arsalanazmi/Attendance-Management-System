import {
  SET_EMPLOYEE,
  GET_EMPLOYEES,
  EDIT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  EMPLOYEE_CHECKIN,
  EMPLOYEE_CHECKOUT,
  LOGOUT_EMPLOYEE
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  employee: {},
  employees: [],
  editEmployee: {},
  checkIn: [],
  checkOut: []
};

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE:
      return {
        ...state,
        isAuthenticated: true,
        employee: action.payload
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        isAuthenticated: true,
        employees: action.payload
      };
    case EDIT_EMPLOYEE:
      return {
        isAuthenticated: true,
        editEmployee: action.payload
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        isAuthenticated: true,
        editEmployee: action.payload
      };
    case EMPLOYEE_CHECKIN:
      return {
        ...state,
        isAuthenticated: true,
        checkIn: action.payload
      };
    case EMPLOYEE_CHECKOUT:
      return {
        ...state,
        isAuthenticated: true,
        checkOut: action.payload
      };
    case LOGOUT_EMPLOYEE:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
