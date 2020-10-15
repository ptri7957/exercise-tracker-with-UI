import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Prepare store
import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { loadUser } from "./actions/auth";
import setToken from "./utils/setToken";
import PrivateRoute from "./components/PrivateRoute";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";

if (localStorage.token) {
  setToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  });
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Login} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/add" component={Form} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
