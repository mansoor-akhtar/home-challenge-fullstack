import { useState, useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { gotProperty, isEmpty, withRouter } from "../../utils";
import { connect, useDispatch } from "react-redux";
import { GET_ERRORS } from "../../store/action/actionTypes";

const Register = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formHelper, setFormHelper] = useState(null);

    const Schema = Yup.object().shape({
        first_name: Yup.string()
            .max(255, "The first name field must not be greater than 255 characters")
            .required("First Name is required"),
        last_name: Yup.string()
            .max(255, "The last name field must not be greater than 255 characters")
            .required("Last Name is required"),
        email: Yup.string()
            .max(255, "The email field must not be greater than 255 characters")
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "The password must be at least 8 characters")
            .max(255, "The password field must not be greater than 255 characters")
            .required("Password is required."),
        confirm_password: Yup.string()
        .min(8, "The password must be at least 8 characters")
        .max(255, "The confirm password field must not be greater than 255 characters")
        .oneOf(
            [Yup.ref("password"), null],
            "Password and Confirm Password must match"
        )
        .required("Confirm Password is required.")
    });

    useEffect(() => {
        if (!isEmpty(props.errors) && formHelper) {
            setLoading(false);
            if (gotProperty(props.errors, 'first_name'))
                formHelper.setFieldError('first_name', props.errors.first_name);
            if (gotProperty(props.errors, 'last_name'))
                formHelper.setFieldError('last_name', props.errors.last_name);
            if (gotProperty(props.errors, 'email'))
                formHelper.setFieldError('email', props.errors.email);
            if (gotProperty(props.errors, 'password'))
                formHelper.setFieldError('password', props.errors.password);
            if (gotProperty(props.errors, 'confirm_password'))
                formHelper.setFieldError('confirm_password', props.errors.confirm_password);
            dispatch({
                type: GET_ERRORS,
                payload: null,
            });
        }
    }, [props.errors]);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
          setLoading(false);
          navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.auth.isAuthenticated]);

    const formikProps = {
        initialValues: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: ""
        },
        validationSchema: Schema,
        onSubmit: (data, formHelper) => {
            setFormHelper(formHelper);
            setLoading(true);
            props.registerUser(data);
        },
    };

    return (
        <Formik {...formikProps}>
        {(formik) => {
            const { values, handleChange, handleSubmit, handleBlur } = formik;
            return (
                <div className="col-md-12">
                    <div className="card card-container auth-form">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center">User Signup</h2>
                            <div className="form-group mt-4">
                                <label htmlFor="first-name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    id="first-name"
                                    placeholder="Enter First Name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="first_name"
                                    render={(error) => <span className="error">{error}</span>}
                                />
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="last-name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    id="last-name"
                                    placeholder="Enter Last Name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="last_name"
                                    render={(error) => <span className="error">{error}</span>}
                                />
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control same-input"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="email"
                                    render={(error) => <span className="error">{error}</span>}
                                />
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="password"
                                    render={(error) => (
                                    <span className="error">{error}</span>
                                    )}
                                />
                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirm_password"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    value={values.confirm_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    name="confirm_password"
                                    render={(error) => (
                                    <span className="error">{error}</span>
                                    )}
                                />
                            </div>

                            <div className="form-group mt-4">
                                <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Register</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }}
        </Formik>
    );

}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));