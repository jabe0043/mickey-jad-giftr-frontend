// create a custom hook that lets us read and write to local storage
// and hold whatever the value is inside of a state variable
// this hook lets us extract and hold in state whatever we need from local storage

import { useState, useEffect } from "react";

export function useSessionStorage(key, initialState) {
  //when calling our custom hook we pass in a key and an initial value.

  const [authenticatedUserToken, setAuthenticatedUserToken] = useState(() => {
    const userToken = sessionStorage.getItem(key);
    return userToken ? JSON.parse(userToken) : initialState;
  });

  useEffect(() => {;
    sessionStorage.setItem(key, JSON.stringify(authenticatedUserToken));
  }, [authenticatedUserToken]);

  //each time useSessionStorageState is called it will return a reference
  // to the authenticatedUserToken variable and the function to update the value
  return [authenticatedUserToken, setAuthenticatedUserToken];
}
