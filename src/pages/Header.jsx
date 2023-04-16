import {useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AppHeader } from '../styled/components';




export default function Header(){

    // const [params, setParams] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;
    const loggedOut = pathname === '/';  //url path when user is logged out.


    const navigate = useNavigate();

    const handleNav = (page) => {       //temp
        navigate(page);
        };
    



    return(
        <header>
            <AppHeader className='container'>
                {/* if loggedOut is false, then user is signed in */}
                {!loggedOut && <i className="bi bi-door-open-fill"></i>} 
                <h1> GIFT'R</h1>
                {!loggedOut && <i className="bi bi-plus" onClick={()=> handleClick('/people/add')}></i>}
            </AppHeader>
        </header>
    )
}