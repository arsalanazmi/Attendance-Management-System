import { SET_ADMIN, LOGOUT_ADMIN } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  admin: {},
  loading: false
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload
      };
    case LOGOUT_ADMIN:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
