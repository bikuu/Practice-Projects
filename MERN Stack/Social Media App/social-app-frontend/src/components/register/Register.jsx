import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const ConfPassword = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ConfPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        ConfPassword: ConfPassword.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">My Social App</h3>
          <span className="registerDesc">
            Connect with Friends around the World
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              minLength="6"
              className="registerInput"
            />
            <input
              placeholder="Re-Password"
              required
              ref={ConfPassword}
              type="password"
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Register
            </button>
            <button className="registerRegisterButton">Login Here !!! </button>
          </form>
        </div>
      </div>
    </div>
  );
}
