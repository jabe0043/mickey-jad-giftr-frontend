import {useNavigate, useSearchParams, useLocation } from 'react-router-dom';


export default function Header(){

    // const [params, setParams] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;

    //url pathname when user is logged out.
    const loggedOut = pathname === '/'; //use token to figure out if logged in instead of pathname

    return(
        <header>
            <div>
                {/* if loggedOut is false, then user is signed in so render log-out and add buttons */}
                {!loggedOut && <i className="bi bi-door-open-fill"></i>} 
                <h1> GIFT'R</h1>
                {!loggedOut && <i className="bi bi-plus-circle-fill"></i>}
            </div>
        </header>
    )
}