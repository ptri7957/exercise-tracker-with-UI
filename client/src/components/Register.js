import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/auth";

const Register = ({auth, register}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  if(auth.isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="card mt-5 auth-form">
      <div className="card-body">
        <h1>Register</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p className="mt-5">
            Already have an account? <Link to="/login">Sign in</Link> now.
          </p>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register })(Register);
