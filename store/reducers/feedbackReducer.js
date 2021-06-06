import {
  FEEDBACK_LIST_FAIL,
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
} from "../../constants/feedbackConstants";

export const feedbackListReducer = (state = { feedbackList: [] }, action) => {
  switch (action.type) {
    case FEEDBACK_LIST_REQUEST:
      return { loading: true, feedbackList: [] };
    case FEEDBACK_LIST_SUCCESS:
      return { loading: false, feedbackList: action.payload };
    case FEEDBACK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
