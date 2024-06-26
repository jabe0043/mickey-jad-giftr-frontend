import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useUser } from "../../context/userContext";
import * as Styled from "../../styled/components";
import WelcomeIllustration from "../../assets/welcomeIllustration.png";

export default function Login() {
  //////////////////URL/////////////////////
  //Local Server URL
  // const baseURL = `http://localhost:3001`;

  //Remote Server URL
  const baseURL = `https://gift-backend.onrender.com`;

  //Client localhost URL
  // const clientURL = `http://localhost:5173`;

  //Client Netlify URL
  const clientURL = `https://giftr-mj-jj.netlify.app`;
  ////////////////////////////////////////////

  const navigate = useNavigate();
  const [params, _setParams] = useSearchParams();
  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      // console.log("set token to the sessionStorage", token);
      setAuthenticatedUserToken(token);
      navigate("/people");
    } else {
      if (authenticatedUserToken) {
        navigate("/people");
      }
    }
  }, []);

  function initiateLogin() {
    let url = baseURL + `/auth/google?redirect_url=${clientURL}`;
    // console.log(url);
    location.href = url;
  }

  return (
    <Styled.Login className="container">
      <Styled.LoginH1>
        Welcome to
        <br />
        GIFT'R!
      </Styled.LoginH1>

      <img src={WelcomeIllustration} style={{ maxHeight: "40vh" }} alt="a woman shaking hand at a window" />

      <Styled.LoginH2>Please login to explore all features</Styled.LoginH2>

      <Styled.Button onClick={initiateLogin}>Login</Styled.Button>
    </Styled.Login>
  );
}
