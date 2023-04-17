import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/userContext";

export default function Login() {
  const navigate = useNavigate(); //in app navigation only;

  //Local Server URL
  const baseURL = `http://localhost:3001`;

  //Remote Server URL
  // const baseURL = `https://gift-backend.onrender.com`

  //Client localhost URL
  const clientURL = `http://localhost:5173`;

  //Client Netlify URL
  // const clientURL = `netlify.app`;

  const [params, setParams] = useSearchParams();
  const [authenticatedUser, setAuthenticatedUser] = useUser();

  useEffect(() => {
    let token = params.get("token");
    if (token) {
      setAuthenticatedUser(token);
      navigate("/people");
    }
    if (authenticatedUser) navigate("/people");
  }, []);

  function initiateLogin() {
    let url = baseURL + `/auth/google?redirect_url=${clientURL}`;
    console.log(url);
    location.href = url;
  }

  return (
    <main>
      <p>
        <button onClick={initiateLogin}>Login</button>
      </p>
    </main>
  );
}
