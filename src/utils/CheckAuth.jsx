import { useUser } from "../context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuth() {
  const navigate = useNavigate();
  const [_authenticatedUser, setAuthenticatedUser] = useUser();

  useEffect(() => {
    const haveUserToken = sessionStorage.getItem("UserToken");
    if (!haveUserToken || haveUserToken === "") {
      setAuthenticatedUser(null);
      navigate("/");
    }
  }, []);

  return null;
}
