import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { AuthContext } from "./../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user);
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">My Social App</h3>
          <span className="loginDesc">
            Connect with Friends around the World
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              className="loginInput"
            />
            <button className="loginButton">
              {isFetching ? <CircularProgress /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password ?</span>
            <button className="loginRegisterButton">
              {isFetching ? <CircularProgress /> : `Create New Account!!!`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
