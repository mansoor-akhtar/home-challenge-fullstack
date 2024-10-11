
import { useState, useEffect } from "react";
import { getNews, getCategories, getSources } from "../../store/action/index";
import { connect } from "react-redux";
import { FormSelect, FormGroup, Button, FormLabel, Toast, ToastContainer } from "react-bootstrap";
import { capitaLize } from "../../utils";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { getUserPreferences, saveUserPreferences } from "../../store/action/index";


let initialValues = {
    category_id: "",
    source_id: ""
};

const Preference = (props) => {

    const [formValues, setFormValues] = useState(null);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const { getCategories, getSources, getUserPreferences } = props;
        setLoading(true);
    
        getSources({
          onSuccess: function (response) {
            if (response.success) {
              setSources(response.data.sources);
            }
            setLoading(false);
          },
          onError: function (error) {
            console.log("error sources api", error);
          },
        });
    
        getCategories({
          onSuccess: function (response) {
            if (response.success) {
              setCategories(response.data.categories);
            }
            setLoading(false);
          },
          onError: function (error) {
            console.log("error categories api", error);
          },
        });

        getUserPreferences({
            onSuccess: function (response) {
                setFormValues({
                    ...response.data.data
                });
            },
            onError: function (error) {
              console.log("error categories api", error);
            },
          });
    
    }, []);

    return (
        <div className="news-container">
            <Formik
                initialValues={formValues || initialValues}
                enableReinitialize
                onSubmit={(values) => {
                    const { saveUserPreferences } = props; 
                    setLoading(true);
                    saveUserPreferences({
                        data: {
                            ...values
                        },
                        onSuccess: (response) => {
                          setLoading(false);
                          setShowToast(true);
                          setTimeout(() => {
                            setShowToast(false);
                          }, 3000);
                        },
                        onError: (error) => {
                          setLoading(false);
                        },
                    });
                    
                }}
            >
            {(formik) => {
            const { values, handleChange, handleSubmit, handleBlur } = formik;
                return (
                    <form onSubmit={handleSubmit} method="POST">
                        <h2 className="text-center text-white">Preference Settings</h2>
                        <ToastContainer position="top-end" className="p-3">
                            <Toast show={showToast} onClose={""} className="btn btn-success">
                                <Toast.Body>Preferences saved successfully !</Toast.Body>
                            </Toast>
                        </ToastContainer>
                        <FormGroup className="mb-4">
                            <FormLabel className="text-white">Source</FormLabel>
                            <FormSelect 
                                    onChange={(e) => { 
                                        handleChange({
                                            target: { 
                                                name: "source_id", 
                                                value:e.target.value 
                                            }
                                        });
                                    }} 
                                    name="source_id"
                                    value={values.source_id}
                                >
                                    <option value="">Select Source</option>
                                    {sources.map((source) => {
                                        return (
                                            <option value={source.id} key={uuidv4()}>{ source.name }</option>
                                        )
                                    })}
                            </FormSelect>
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <FormLabel className="text-white">Category</FormLabel>
                            <FormSelect 
                                    onChange={(e) => { 
                                        handleChange({
                                            target: { 
                                                name: "category_id", 
                                                value:e.target.value 
                                            }
                                        });
                                    }} 
                                    value={values.category_id}
                                    name="category_id"
                                >
                                <option value="">Select Category</option>
                                    {categories.map((category) => {
                                        return (
                                            <option value={category.id} key={uuidv4()}>{ capitaLize(category.name)}</option>
                                        )
                                    })}
                            </FormSelect>
                        </FormGroup>

                        <FormGroup>
                            <Button variant="primary" type="submit">
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )} &nbsp;
                                Save
                            </Button>
                        </FormGroup>
                    </form>
                );
            }}
            </Formik>
        </div>
    )

}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    getNews,
    getCategories,
    getSources,
    getUserPreferences,
    saveUserPreferences
  })(Preference);