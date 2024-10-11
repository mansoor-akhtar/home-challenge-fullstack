import React from "react";
import errorImg from "../../assets/images/img_404.svg";
import "./ErrorPage.css";

const Error404 = () => {
    return (
        <section className="error_page">
            <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-auto error_column">
                <img src={errorImg} alt='error img' className="img_404" />
                <h1>OPPS! PAGE NOT FOUND</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                </div>
            </div>
            </div>
        </section>
    );
}


export default Error404;
