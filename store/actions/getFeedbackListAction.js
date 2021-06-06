import {
  FEEDBACK_LIST_FAIL,
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
} from "../../constants/feedbackConstants";

export const listFeedbackList = () => async (dispatch) => {
  try {
    dispatch({ type: FEEDBACK_LIST_REQUEST });

    const res = await fetch("/api/new");
    const data = await res.json();

    dispatch({
      type: FEEDBACK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
