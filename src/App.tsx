import React, { useState, useEffect } from "react";
import LoginView from "./components/views/LoginView";
import WelcomeView from "./components/views/WelcomeView";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      {isLoggedIn ? <WelcomeView /> : <LoginView />}
    </div>
  );
};

export default App;
