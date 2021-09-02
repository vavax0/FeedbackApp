import axios from "axios";
import {
  BOARD_DETAILS_FAIL,
  BOARD_DETAILS_REQUEST,
  BOARD_DETAILS_SUCCESS,
} from "../constants/boardConstants";

export const listBoardDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: BOARD_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/boards/${slug}`
    );
    dispatch({
      type: BOARD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
