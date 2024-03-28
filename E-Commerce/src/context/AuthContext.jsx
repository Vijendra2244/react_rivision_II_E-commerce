import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
