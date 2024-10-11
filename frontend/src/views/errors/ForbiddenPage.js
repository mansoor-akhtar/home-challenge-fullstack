import React from "react";
import errorImg from "../../assets/images/img_403.svg";
import "./ErrorPage.css";

const Error500 = () => {
    return (
        <section className="error_page">
            <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-auto error_column">
                <img src={errorImg} alt='error img' />
                <h1>OPPS! PERMISSION DENIED</h1>
                <p>You don't have permission to access on this page.</p>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Error500;
