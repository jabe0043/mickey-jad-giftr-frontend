import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider(props) {
  console.log("UserProvider rendered");

  const [authenticatedUserToken, setAuthenticatedUserToken] = useState(() => {
    console.log("UserProvider useState");
    return JSON.parse(sessionStorage.getItem("UserToken"));
  });

  useEffect(() => {
    // console.log("UserProvider useEffect / Token:", authenticatedUserToken);
    sessionStorage.setItem("UserToken", JSON.stringify(authenticatedUserToken));
    // console.log(JSON.parse(sessionStorage.getItem("UserToken")));
  }, [authenticatedUserToken]);

  return <UserContext.Provider value={[authenticatedUserToken, setAuthenticatedUserToken]} {...props} />;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Not inside the Provider - no user is signed in");
  return context;
}

//export the hook and the provider
export { useUser, UserProvider };
