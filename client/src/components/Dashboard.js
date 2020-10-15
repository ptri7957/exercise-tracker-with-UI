import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { completeExercise, deleteExercise, getUserExercise } from "../actions/exercise";

const Dashboard = ({ exercise, getUserExercise, deleteExercise, completeExercise }) => {
  useEffect(() => {
    document.title = "Exercise | Dashboard";
    // Get Exercise from user
    getUserExercise();
  }, [getUserExercise]);

  const handleDelete = (id) => {
    deleteExercise(id);
  }

  const handleComplete = (id) => {
    completeExercise(id);
  }

  return (<Fragment>
    {exercise.exercises.length > 0 && exercise.exercises.map(e => (
      <div className="card mt-5 mb-5" key={e._id}>
        <div className="card-body">
          <h1>{e.description}</h1>
          <p>{`Date Created: ${e.date}`}</p>
          <p>{`Duration: ${e.duration} minutes`}</p>
          <p>{`Completed: ${e.completed}`}</p>
          <div className="userBtns">
            <button className="btn btn-danger" onClick={()=>handleDelete(e._id)}>Delete</button>
            <button className="btn btn-primary" onClick={()=>handleComplete(e._id)}>Complete</button>
          </div>
        </div>
      </div>
    ))}
  </Fragment>);
};

Dashboard.propTypes = {
  exercise: PropTypes.object.isRequired,
  getUserExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  completeExercise: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise
});

export default connect(mapStateToProps, { getUserExercise, deleteExercise, completeExercise })(Dashboard);
