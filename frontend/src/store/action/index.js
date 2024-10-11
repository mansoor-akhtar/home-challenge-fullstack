import axios from "../../axios-instance";
import { setAuthToken, isEmpty, getQueryString } from "../../utils";
import { GET_ERRORS, SET_CURRENT_USER, LOGOUT_SUCCESS } from "./actionTypes";

export const registerUser = (userData) => (dispatch) => {
  axios
    .post("signup", userData)
    .then((res) => {
      // Save to localStorage
      const { access_token } = res.data.data;

      // Set token to ls
      localStorage.setItem("jwtToken", access_token);
      // Set token to Auth header
      setAuthToken(access_token);
      dispatch(setCurrentUser());
    })
    .catch((err) => {
      let message = err.response.data.message;
      if (!isEmpty(err.response.data.errors)) {
        message = err.response.data.errors;
      }
      dispatch({
        type: GET_ERRORS,
        payload: message,
      });
    });
}

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("login", userData)
    .then((res) => {
      // Save to localStorage
      const { access_token } = res.data.data;

      // Set token to ls
      localStorage.setItem("jwtToken", access_token);
      // Set token to Auth header
      setAuthToken(access_token);
      dispatch(setCurrentUser());
    })
    .catch((err) => {
      let message = err.response.data.message;
      if (!isEmpty(err.response.data.data)) {
        message = err.response.data.data;
      }
      dispatch({
        type: GET_ERRORS,
        payload: message,
      });
    });
};


// Set logged in user
export const setCurrentUser = () => {
  return {
    type: SET_CURRENT_USER
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  dispatch({
    type: GET_ERRORS,
    payload: null,
  });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};


/**
 * Get news
 * @param {*} options
 * @returns
 */
export const getNews = (options) => async (dispatch) => {
  const { onSuccess, onError, params } = options || {};
  let newsUrl = "news";
  if (!isEmpty(params))
    newsUrl = `${newsUrl}?${getQueryString(params)}`;
  axios
    .get(newsUrl)
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
      
    });
};


/**
 * Get categories
 * @param {*} options
 * @returns
 */
export const getCategories = (options) => async (dispatch) => {
  const { onSuccess, onError } = options || {};
  axios
    .get("categories")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
      
    });
};


/**
 * Get article sources
 * @param {*} options
 * @returns
 */
export const getSources = (options) => async (dispatch) => {
  const { onSuccess, onError } = options || {};
  axios
    .get("sources")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
    });
};


export const getUserPreferences = (options) => async (dispatch) => {
  const { onSuccess, onError } = options || {};
  axios
    .get("user-preferences")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
    });
}


export const saveUserPreferences = (options) => async (dispatch) => {
  const { onSuccess, onError, data } = options || {};
  axios
    .post("user-preferences", data)
    .then((res) => {
      const { data: resData } = res || {};
      onSuccess(resData);
    })
    .catch((error) => {
      if (onError) {
        onError(error);
      }
  });
};


