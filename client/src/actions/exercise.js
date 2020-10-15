import { ADD_EXERCISE, GET_USER_EXERCISE, ADD_EXERCISE_ERROR, DELETE_EXERCISE } from "./types";
import axios from "axios";

export const addExercise = (description, duration, history) => async (dispatch) => {
  try {
    const exercise = {
      description: description,
      duration: duration,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(exercise);

    const res = await axios.post("/api/exercise/add", body, config);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });

    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: ADD_EXERCISE_ERROR,
    });
  }
};

export const getUserExercise = () => async dispatch => {
  try {
    const res = await axios.get(`/api/exercise/log/`);
    dispatch({
      type: GET_USER_EXERCISE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADD_EXERCISE_ERROR,
    });
  }
}

export const deleteExercise = (id) => async dispatch => {
  try {
    await axios.delete(`/api/exercise/log/activity/${id}`);
    dispatch({
      type: DELETE_EXERCISE,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: ADD_EXERCISE_ERROR,
    });
  }
}

export const completeExercise = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/exercise/log/activity/${id}`);
    dispatch(getUserExercise());
  } catch (error) {
    dispatch({
      type: ADD_EXERCISE_ERROR,
    });
  }
}
