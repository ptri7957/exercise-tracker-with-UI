import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({login, auth}) => {
  useEffect(() => {
    document.title = "Exercise | Login";
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if(auth.isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="card mt-5 auth-form">
      <div className="card-body">
        <h1>Login</h1>
        <form onSubmit={(e) => onSubmit(e)}>
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
            Don't have an account? <Link to="/register">Sign up</Link> now.
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {login})(Login);
