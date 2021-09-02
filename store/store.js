import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import {
  feedbackItemDetailsReducer,
  postFeedbackReducer,
} from "./reducers/feedbackReducer";
import { boardDetailsReducer } from "./reducers/boardReducers";
import { userLoginReducer, userVerifyReducer } from "./reducers/userReducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  boardDetails: boardDetailsReducer,
  feedbackItemDetails: feedbackItemDetailsReducer,
  feedbackSubmit: postFeedbackReducer,
  userLogin: userLoginReducer,
});

// const setStateFromLocalStorage = (info) => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem(info)
//       ? JSON.parse(localStorage.getItem(info))
//       : null;
//   }
// };

// const userInfoFromStorage = setStateFromLocalStorage("userInfo");

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initialState = {
  userLogin: { loading: "idle" },
};

const initStore = () => {
  return createStore(reducer,initialState, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
