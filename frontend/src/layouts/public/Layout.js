import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ Component, route }) => (
  <>
    <Header />
    <div className="container layout-container">
      <Component route={route} />
    </div>
    <Footer />
  </>
);

export default Layout;