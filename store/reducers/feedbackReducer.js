import {
  FEEDBACK_LIST_FAIL,
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
} from "../../constants/feedbackConstants";
import {
  FEEDBACK_ITEM_DETAILS_FAIL,
  FEEDBACK_ITEM_DETAILS_REQUEST,
  FEEDBACK_ITEM_DETAILS_SUCCESS,
  FEEDBACK_SUBMIT_FAIL,
  FEEDBACK_SUBMIT_REQUEST,
  FEEDBACK_SUBMIT_SUCCESS,
} from "../constants/feedbackConstants";

export const feedbackListReducer = (state = { feedbackList: [] }, action) => {
  switch (action.type) {
    case FEEDBACK_LIST_REQUEST:
      return { feedbackList: [] };
    case FEEDBACK_LIST_SUCCESS:
      return { feedbackList: action.payload };
    case FEEDBACK_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const feedbackItemDetailsReducer = (
  state = { feedbackItem: { feedback: {} } },
  action
) => {
  switch (action.type) {
    case FEEDBACK_ITEM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FEEDBACK_ITEM_DETAILS_SUCCESS:
      return { loading: false, feedbackItem: action.payload };
    case FEEDBACK_ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_SUBMIT_REQUEST:
      return { loading: true };
    case FEEDBACK_SUBMIT_SUCCESS:
      return { loading: false, feedbackInfo: action.payload };
    case FEEDBACK_SUBMIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};