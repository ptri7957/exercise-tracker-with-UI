import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addExercise } from "../actions/exercise";

const Form = ({ history, addExercise }) => {
  useEffect(() => {
    document.title = "Exercise | Add Exercise";
  }, []);

  const [formData, setFormData] = useState({
    description: "",
    duration: "",
  });

  const { description, duration } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Post exercise and redirect
    addExercise(description, duration, history);
  };
  return (
    <div className="card mt-5">
      <div className="card-body">
        <h1>Add Exercise</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={description}
              placeholder="Description"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              className="form-control"
              value={duration}
              placeholder="Duration (Minutes)"
              onChange={(e) => onChange(e)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  addExercise: PropTypes.func.isRequired,
};

export default connect(null, { addExercise })(withRouter(Form));
