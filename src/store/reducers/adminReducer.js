import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  isAdmin: false,
  token: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
        isAdmin: action.adminInfo.is_admin,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
        token: null,
        isAdmin: false,
      };

    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
        isAdmin: false,
        token: null,
      };
    default:
      return state;
  }
};

export default appReducer;
