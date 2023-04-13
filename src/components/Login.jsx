import {useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react'; 


export default function Login(){
    const navigate = useNavigate(); //in app navigation only;
    
    const serverSideURL= ''; //TODO:
    const baseURL = `https://${serverSideURL}.com/api`
    const clientSideURL= ''; //TODO:
    const clientURL = `https://${clientSideURL}.com/api`    
    
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
        //TODO: navigate to the auth login url in our API (URL: baseURL+ /auth/google)                 
        let url = baseURL + `/auth/google?url_redirect=${clientURL}` 
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

