import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { AppHeader, Logo } from "../styled/components";

export default function Header() {
  // const [params, setParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;
  const loggedOut = pathname === "/"; //url path when user is logged out.

  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.removeItem("UserToken");
    navigate("/");
  };

  const handleAddButton = () => {
    if (pathname.includes('/people')) {
      navigate('/people/add')
    } else if (pathname.includes('/gift')) {
      navigate('/gift/add')
    }
  };

  return (
    <header>
      <AppHeader className="container">
        {/* if loggedOut is false, then user is signed in */}
        {!loggedOut && (
          <i onClick={() => logOut()} className="bi bi-door-open-fill"></i>
        )}

        <Logo onClick={() => navigate("/people")}>GIFT'R</Logo>

        {!loggedOut && (
          <i className="bi bi-plus" onClick={() => handleAddButton()}></i>
        )}
      </AppHeader>
    </header>
  );
}
