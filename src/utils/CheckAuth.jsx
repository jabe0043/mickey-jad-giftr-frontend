import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/userContext";

export default function CheckAuth() {
  const navigate = useNavigate();
  
  const [_authenticatedUser, setAuthenticatedUser] = useUser();

  useEffect(() => {
    if (!_authenticatedUser) {
      // console.log("No user token found, redirecting to login page");
      setAuthenticatedUser(null);
      navigate("/");
    }
  }, []);

  return null;
}