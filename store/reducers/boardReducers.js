import {
  BOARD_DETAILS_FAIL,
  BOARD_DETAILS_REQUEST,
  BOARD_DETAILS_SUCCESS,
} from "../constants/boardConstants";

export const boardDetailsReducer = (state = { board: {} }, action) => {
  switch (action.type) {
    case BOARD_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOARD_DETAILS_SUCCESS:
      return { loading: false, board: action.payload };
    case BOARD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
