import axios from "axios";
import { FEEDBACK_LIST_FAIL } from "../../constants/feedbackConstants";
import {
  FEEDBACK_ITEM_DETAILS_FAIL,
  FEEDBACK_ITEM_DETAILS_REQUEST,
  FEEDBACK_ITEM_DETAILS_SUCCESS,
  FEEDBACK_SUBMIT_FAIL,
  FEEDBACK_SUBMIT_REQUEST,
  FEEDBACK_SUBMIT_SUCCESS,
} from "../constants/feedbackConstants";
import { toast } from "react-toastify";

export const getFeedbackDetails = (slug, id) => async (dispatch) => {
  try {
    dispatch({ type: FEEDBACK_ITEM_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/feedback/${slug}/${id}`
    );
    dispatch({
      type: FEEDBACK_ITEM_DETAILS_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: FEEDBACK_ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const submitFeedbackPost = (title, body, slug) => async (dispatch) => {
  try {
    dispatch({
      type: FEEDBACK_SUBMIT_REQUEST,
    });
    console.log("Dispatched FEEDBACK_SUBMIT_REQUEST");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/feedback/${slug}/new-post`,
      { title, body },
      config
    );

    console.log(data);

    dispatch({
      type: FEEDBACK_SUBMIT_SUCCESS,
      payload: data,
    });
    console.log("Dispatched FEEDBACK_SUBMIT_SUCCESS");
    toast.success("MY SUCCESS");
  } catch (error) {
    dispatch({
      type: FEEDBACK_SUBMIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.warn("Feedback not submited");
  }
};
