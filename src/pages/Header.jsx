import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { AppHeader, Logo } from "../styled/components";

export default function Header() {
  const { personId } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const loggedOut = pathname === "/"; //url path when user is logged out.

  const navigate = useNavigate();

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

  return (
    <header>
      <AppHeader className="container">
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
