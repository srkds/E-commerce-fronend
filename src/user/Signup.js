import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  /* 3 things
    - where to store incoming data from frontend to submit it to backend
     A: for that we use state
    - when somebody types into input then we wanto handle that
     A: handleChange method
    - submitting data 
  
  */

  /* VARIABLE: */
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // VARIABLE: destructuring values instead of values.name we can use name directly
  const { name, email, password, error, success } = values;

  /* METHOD: This method sets data comming from form into state */
  const handleChange = (name) => (event) => {
    // ...values loads all values
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  /* METHOD: onSubmit button it will call api and get response */
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }) // calling function that calls backend passing details
      .then((data) => {
        // if error
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          // else clear all and set success true
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in Signup"));
  };

  // METHOD: reusable method SignupForm
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                value={name}
                onChange={handleChange("name")}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    );
  };

  /* METHOD: success message */
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }} // if success then show, otherwise don't show
          >
            New account was created successfuly. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  /* METHOD: error message  */
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }} // if error then show, otherwise don't show
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user to signup">
      {successMessage()}
      {errorMessage()}

      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
