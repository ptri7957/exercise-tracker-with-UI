import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const Navbar = ({ auth, logout }) => {
  const onClick = (e) => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/dashboard"><div className="navbar-brand">Exercise</div></Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navContent"
        aria-controls="navContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav ml-auto">
          {auth.isAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/add">
                  Add
                </Link>
              </li>
              <li>
                <Link to="#!" onClick={(e) => onClick(e)}>
                  Logout
                </Link>
              </li>
            </Fragment>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
