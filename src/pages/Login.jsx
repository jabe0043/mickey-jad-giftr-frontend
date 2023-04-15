import {useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react'; 
import { useUser } from '../context/userContext';  


export default function Login(){
    const navigate = useNavigate(); //in app navigation only;
    
    // const baseURL = `http://localhost:3001`    //server side url
    const baseURL = `https://gift-backend.onrender.com`    //server side url
    const clientURL = `http://localhost:5173`    // client side url

    
    const [params, setParams] = useSearchParams();
    const [authenticatedUser, setAuthenticatedUser] = useUser();

    useEffect(() =>{
        let token = params.get('token');
        if (token){
            setAuthenticatedUser(token);
            navigate('/people');       
        }
    }, []);

    function initiateLogin(){
        // let url = baseURL + `/auth/google?redirect_url=${clientURL}` 
        let url = baseURL + `/auth/google?redirect_url=${clientURL}` 
        console.log(url);
        location.href = url;
    }

    return (
        <main>
            <p>
                <button onClick={(initiateLogin)}>Login</button>
            </p>
        </main>
    )
}

