import { createContext, useContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

const UserContext = createContext();   

function UserProvider(props) {
const [authenticatedUser, setAuthenticatedUser] = useSessionStorage('UserToken', '');
return <UserContext.Provider value={[authenticatedUser, setAuthenticatedUser]} {...props} />; 
}


function useUser() {
    const context = useContext(UserContext);  
    if (!context) throw new Error('Not inside the Provider - no user is signed in');
    return context;
}

//export the hook and the provider
export { useUser, UserProvider };