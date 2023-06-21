import React, { useState, ChangeEvent } from "react";
import useAuth from "../../hooks/useAuth";
import WelcomeView from "./WelcomeView";
import "../styles/LoginView.css";

const LoginView: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegisterMode, setRegisterMode] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const { login, register, error } = useAuth();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (): Promise<void> => {
    try {
      if (isRegisterMode) {
        const user = { email, password };
        const response = await register(email, password);

        if (response) {
          console.log("loginview-REGISTER-res", response)
          const { data: { token }  } = response;

          if (token) {
            localStorage.setItem("token", token);
            setLoggedIn(true);
          }
        }
      } else {
        const credentials = { email, password };
        const response = await login(email, password);
        
        if (!!response && response.data === "Authentication successful") {
          console.log("loginview-LOGIN-res", response)
          setLoggedIn(true)
          console.log(isLoggedIn)
        }
        
      }
    } catch (error) {
      console.error("Error logging in or registering:", error);
    }
  };

  const handleToggleMode = () => {
    setRegisterMode(!isRegisterMode);
  };

  return (
    <div className="login-screen">
      {isLoggedIn ? (
        <WelcomeView />
      ) : (
        <>
          <h2>{isRegisterMode ? "Register" : "Login"}</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          {isRegisterMode ? (
            <button onClick={handleLogin}>Register</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <p className="toggle-button" onClick={handleToggleMode}>
            {isRegisterMode ? "Switch to Login" : "Switch to Register"}
          </p>
        </>
      )}
    </div>
  );
};

export default LoginView;
