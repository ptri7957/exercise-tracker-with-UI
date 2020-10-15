import {
  ADD_EXERCISE,
  GET_USER_EXERCISE,
  ADD_EXERCISE_ERROR,
  DELETE_EXERCISE
} from "../actions/types";

const initialState = {
  exercise: null,
  exercises: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXERCISE:
      return {
        ...state,
        exercise: action.payload,
        loading: false,
      };
    case GET_USER_EXERCISE:
      return {
        ...state,
        exercises: action.payload,
        loading: false,
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(e => e._id.toString() !== action.payload),
        loading: false
      }
    case ADD_EXERCISE_ERROR:
      return {
        ...state,
        exercise: null,
        loading: false,
      };
    default:
      return state;
  }
}
