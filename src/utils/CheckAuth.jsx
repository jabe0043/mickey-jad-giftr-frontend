import { useUser } from "../context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuth() {
  console.log("CheckAuth rendered");
  const navigate = useNavigate();
  const [_authenticatedUser, setAuthenticatedUser] = useUser();

  useEffect(() => {
//     const haveUserToken = sessionStorage.getItem("UserToken");
//     console.log("haveUserToken: ", haveUserToken);
    if (!_authenticatedUser) {
      console.log("No user token found, redirecting to login page");
      setAuthenticatedUser(null);
      navigate("/");
    }
  }, []);

  return null;
}