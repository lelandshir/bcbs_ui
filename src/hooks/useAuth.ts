import { useState } from "react";
import axios from "axios";

// eve.holt@reqres.in
// pistol
const useAuth = () => {
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (!!response) {
        return response;
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });

      if (!!response) {
        return response;
      } else {
        setError("Error registering user");
      }
    } catch (error) {
      setError("Error registering user");
    }
  };

  return { login, register, error };
};

export default useAuth;
