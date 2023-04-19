import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppHeader, Logo } from "../styled/components";
import { useUser } from '../context/userContext';

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
          <i onClick={() => logOut()} className="bi bi-door-open-fill"></i>
        );
        break;
      case "/people/add":
      case `/people/edit/${pathname.split('/')[3]}`:
      case pathname.match(/^\/gift/)?.input: // Check if the pathname starts with "/gift"
        return (
          <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
        );
        break;
      default:
        return null;
        break;
    }
  };

  const renderRightIcon = () => {
    switch (pathname) {
      case "/people":
        return <i className="bi bi-plus" onClick={() => handleAddButton()}></i>;
        break;
      case "/people/add":
        return null;
        break;
      case `/gift/${personId}`:
        return <i className="bi bi-plus" onClick={() => handleAddButton()}></i>;
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <header>
      <AppHeader className="container">
        {renderLeftIcon()}
        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <Logo onClick={() => authenticatedUserToken && navigate("/people")}>GIFT'R</Logo>
        </div>
        {renderRightIcon()}
      </AppHeader>
    </header>
  );
}
