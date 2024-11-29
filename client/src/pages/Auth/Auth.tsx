import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Auth = () => {
  // authMode : LOGIN || SIGNUP
  const [authMode, setAuthMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "LOGIN" ? "SIGNUP" : "LOGIN"));
  };

  return (
    <>
      {authMode === "LOGIN" && <LoginForm toggleAuthMode={toggleAuthMode} />}
      {authMode === "SIGNUP" && <SignupForm toggleAuthMode={toggleAuthMode} />}
    </>
  );
};

export default Auth;
