import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  VERIFY_USER_FAIL,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    console.log("USER LOGIN REQUEST");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyUser = () => async (dispatch) => {
  dispatch({
    type: VERIFY_USER_REQUEST,
  });
  console.log("VERIFY REQUEST");


  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users/refreshToken",
      config,
      { withCredentials: true }
    );

    console.log(data);

    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: VERIFY_USER_FAIL,
      payload: null,
    });
  }
};

// export const logout = () => (dispatch) => {
//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT });
//   dispatch({ type: USER_DETAILS_RESET });
//   dispatch({ type: ORDER_LIST_MY_RESET });
//   dispatch({ type: USER_LIST_RESET });
// };
