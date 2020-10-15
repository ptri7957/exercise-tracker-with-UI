import { LOGIN_USER, REGISTER_USER, AUTH_ERROR, LOGOUT, LOAD_USER } from "./types";
import setToken from "../utils/setToken";
import axios from "axios";

export const loadUser = () => async dispatch => {
  try {
    if(localStorage.token){
      setToken(localStorage.token);
    }

    const res = await axios.get("/api/exercise/get-auth-user");
    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const user = { email, password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(user);

    const res = await axios.post("/api/exercise/login", body, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const user = { username, email, password };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(user);

    const res = await axios.post("/api/exercise/new-user", body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    });
};
