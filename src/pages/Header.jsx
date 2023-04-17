
import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import { AppHeader, Logo } from "../styled/components";

export default function Header() {
  const navigate = useNavigate();
  const { personId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  //url path when user is logged out.
  const loggedOut = pathname === "/";
  
  //id of the current selected person
  // const personId = pathname.split('/')[2];

  const logOut = () => {
    sessionStorage.removeItem("UserToken");
    navigate("/");
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
        return (
          <i
            className="bi bi-arrow-left"
            onClick={() => navigate("/people")}
          ></i>
        );
        break;
      case `/gift/${personId}`:
        return (
          <i
            className="bi bi-arrow-left"
            onClick={() => navigate("/people")}
          ></i>
        );
        break;
      case `/gift/${personId}/add`:
        return (
          <i
            className="bi bi-arrow-left"
            onClick={() => navigate(`/gift/${personId}`)}
          ></i>
        );
        break;
      case `/gift/${personId}/edit`:
        return (
          <i
            className="bi bi-arrow-left"
            onClick={() => navigate(`/gift/${personId}`)}
          ></i>
        );
        break;
    }
  };

  const renderRightIcon = () => {
    switch (pathname) {
      case "/people":
        return (
          <i className="bi bi-plus" onClick={() => navigate("/people/add")}></i>
        );
        break;
      case "/people/add":
        return null;
        break;
      case `/gift/${personId}`:
        return (
          <i
            className="bi bi-plus"
            onClick={() => navigate(`/gift/${personId}/add`)}
          ></i>
        );
        break;
    }
  };

  return (
    <header>
      <AppHeader className="container">
        {/*        
        {renderLeftIcon()}
        <div style={{display:"flex", justifyContent:"center", flexGrow:1}} >
          <Logo onClick={() => navigate("/people")}>GIFT'R</Logo>
        </div>
        {renderRightIcon()}
       */}
        {/* Only if the pathname ends with '/people'(Home page), then show logout button */}
        {pathname.match(/people$/) ? (
          <i onClick={() => logOut()} className="bi bi-door-open-fill"></i>
        ) : (
          <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
        )}

        <Logo onClick={() => navigate("/people")}>GIFT'R</Logo>

        {!loggedOut && (
          <i className="bi bi-plus" onClick={() => handleAddButton()}></i>
        )}
      </AppHeader>
    </header>
  );
}

