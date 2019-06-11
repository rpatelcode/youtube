import React, { useState, useEffect, useReducer } from "react";
import { login } from "./utils";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload
      };
    }

    case "login": {
      return {
        ...state,
        error: "",
        isLoading: true
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false
      };
    }
    case "error": {
      return {
        ...state,
        // error: "Incorrect username or password!",
        error: [
          {
            login: "Incorrect username or password!",
            // username: state.username === "" ? "User name Required" : "",
            username: "",
            password: "Password error"
          }
        ],
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: ""
      };
    }
    case "logOut": {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    default:
      return state;
  }
};

const initialState = {
  username: "",
  password: "",
  agreeing: false,
  isLoading: false,
  error: [{ login: "", username: "", password: "" }],
  isLoggedIn: false
};

const LoginUseReducer = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  // const [errors, setErrors] = useState({});
  const { username, password, isLoading, error, isLoggedIn } = state;

  // const validate = values => {
  //   let errors = {};
  //   if (username === "") {
  //     errors.username = "User Name is required";
  //   }
  //   return errors;
  // };

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && isLoading) {
  //     console.log("No errors");
  //   }
  // }, [errors]);

  const onSubmit = async e => {
    e.preventDefault();

    // setErrors(validate());

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  console.log(state);
  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: "logOut" })}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error.login && <p className="error">{error.login}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value
                })
              }
            />
            {error.username && <p>User Id is required</p>}
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value
                })
              }
            />
            <label htmlFor="cID">Click me and chceck </label>
            <input
              type="checkbox"
              id="cID"
              value={password}
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "agreeing",
                  payload: e.currentTarget.checked
                })
              }
            />

            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginUseReducer;
