import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider(props) {

  const [authenticatedUserToken, setAuthenticatedUserToken] = useState(() => {
    return JSON.parse(sessionStorage.getItem("UserToken"));
  });

  useEffect(() => {
    sessionStorage.setItem("UserToken", JSON.stringify(authenticatedUserToken));
  }, [authenticatedUserToken]);

  return <UserContext.Provider value={[authenticatedUserToken, setAuthenticatedUserToken]} {...props} />;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Not inside the Provider - no user is signed in");
  return context;
}

export { useUser, UserProvider };
