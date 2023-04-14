import {useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react'; 


export default function Login(){
    const navigate = useNavigate(); //in app navigation only;
    
    const baseURL = `http://localhost:3001`    //server side url
    const clientURL = `http://localhost:5173/people`    // client side url
    
    // const [token, setToken] = useToken(); TODO: create a useToken hook. 
    const [params, setParams] = useSearchParams();

    useEffect(() =>{
        let token = params.get('token');
        console.log(token);
        if (token){
            //TODO:setToken(token) -- from context, save token string in session storage
            navigate('/people');
        }
    }, []);

    function initiateLogin(){
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

