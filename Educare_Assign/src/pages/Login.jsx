import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    setError("");
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    if (
      loginData.email === savedUser.email &&
      loginData.password === savedUser.password
    ) {
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>
          Signin to your
          <br />
          PopX account
        </h1>

        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>

        <Input
          label="Email Address"
          placeholder="Enter email address"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <Button
          text="Login"
          variant={
            loginData.email && loginData.password
              ? "primary"
              : "disabled"
          }
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;