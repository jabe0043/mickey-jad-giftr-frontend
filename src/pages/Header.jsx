import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppHeader, HeaderIconLeft, HeaderIconRight, Logo } from "../styled/components";
import { useUser } from "../context/userContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const personId = pathname.split("/")[2]; //id of the current selected person
  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();

  const logOut = () => {
    sessionStorage.removeItem("UserToken");
    navigate("/");
    setAuthenticatedUserToken(null); //instead make it re-render homepage
  };

  const handleAddButton = () => {
    if (pathname.includes("/people")) {
      navigate(`/people/add`);
    } else if (pathname.includes("/gift")) {
      navigate(`/gift/${personId}/add`);
    }
  };

  const renderLeftIcon = () => {
    switch (pathname) {
      case "/people":
        return (
          <HeaderIconLeft>
            <i onClick={() => logOut()} className="bi bi-door-open-fill"></i>
          </HeaderIconLeft>
        );
        break;
      case "/people/add":
      case `/people/edit/${pathname.split("/")[3]}`:
      case pathname.match(/^\/gift/)?.input: // Check if the pathname starts with "/gift"
        return (
          <HeaderIconLeft>
            <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
          </HeaderIconLeft>
        );
        break;
      default:
        return <HeaderIconLeft></HeaderIconLeft>;
        break;
    }
  };

  const renderRightIcon = () => {
    switch (pathname) {
      case "/people":
        return (
          <HeaderIconRight>
            <i className="bi bi-plus" onClick={() => handleAddButton()} />
          </HeaderIconRight>
        );
        break;
      case "/people/add":
        return <HeaderIconRight></HeaderIconRight>;
        break;
      case `/gift/${personId}`:
        return (
          <HeaderIconRight>
            <i className="bi bi-plus" onClick={() => handleAddButton()} />
          </HeaderIconRight>
        );
        break;
      default:
        return <HeaderIconRight></HeaderIconRight>;
        break;
    }
  };

  return (
    <header
      className="container"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        marginRight: "auto",
        marginLeft: "auto",
        zIndex: "1000",
        backgroundColor: "#F5F5F5",
        opacity: "0.98",

      }}
    >
      <AppHeader>
        {renderLeftIcon()}
        <Logo onClick={() => authenticatedUserToken && navigate("/people")}>GIFT'R</Logo>
        {renderRightIcon()}
      </AppHeader>
    </header>
  );
}
