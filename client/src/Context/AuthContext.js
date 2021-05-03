import {  useState, createContext } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const accessToken = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("userInfo");
  const  accessExpiresAt= localStorage.getItem("accessExpiresAt");
  const [authState, setAuthState] = useState({
    accessToken,
    accessExpiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ accessToken, userInfo, accessExpiresAt }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("accessExpiresAt", accessExpiresAt);

    setAuthState({
      accessToken,
      userInfo,
       accessExpiresAt,
    });
  };

  const isAuthenticated = () => {
    if (!authState.accessToken || !authState.accessExpiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.accessExpiresAt;
  };

  const isAdmin = () => {
    return authState.userInfo.role === "admin";
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessExpiresAt");
    setAuthState({});
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
