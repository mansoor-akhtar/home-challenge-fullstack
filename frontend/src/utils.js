import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "./axios-instance";


export const navbarBrand = "World News";


/**
 * with router high order component
 * @param {*} Component
 * @returns
 */
export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

/**
 * Set auth token to send with each request
 * @param {*} token 
 */
export const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};


export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

/**
 * check if property exist or not
 * @param {*} obj
 * @param {*} prop
 * @return boolean
 */
export const gotProperty = (obj, prop) => {
  return !isEmpty(obj) ? prop in obj : false;
};

/**
 * capitalize
 * @param {*} string 
 * @returns 
 */
export const capitaLize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


/**
 * Generate a query string form object params
 * @param {*} params 
 */
export const getQueryString = (params) => {
  let queryString = [];
    for (let param in params) {
      if (!isEmpty(params[param]))
        queryString.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
    }
    return queryString.join("&")
}

export const navs = [
    { nav: "Home", page: "/" }
];