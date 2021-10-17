import React, { useState, useEffect } from "react";
//React context is optimized for high frequency changes!
//it will be an object that contain a component.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {
    console.log(email);
    console.log(password);
  },
});

export const AuthcontextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    //without useEffect we will end up with an infinite loop.
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setisLoggedIn(true);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setisLoggedIn(false);
  };
  const loginHandler = () => {
    //1 refers to user is logged in.
    localStorage.setItem("isLoggedIn", "1");
    setisLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: loginHandler,
        onLogin: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
