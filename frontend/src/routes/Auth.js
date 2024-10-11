import React from "react";

import { isPrivate } from "./routeTypes";
import { Navigate } from "react-router-dom";
import PublicLayout from "../layouts/public/Layout";
import ForbiddenPage from "../views/errors/ForbiddenPage";
import { connect } from "react-redux";

const Auth = (props) => {
  const { appRoute, Template, route, type } = props;

  if (isPrivate(type) && !props.auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  /**
   * show forbidden page, if one user type try to access another user type page
   */
  if (isPrivate(type) && props.auth.isAuthenticated) {
    if (localStorage.userType && appRoute.userType !== localStorage.userType) {
      return <PublicLayout Component={ForbiddenPage} route={route} />;
    }
  }

  const Layout = appRoute.template ? appRoute.template : Template;

  return <Layout Component={appRoute.component} route={route} props={props} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Auth);
