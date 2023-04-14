
// create a custom hook that lets us read and write to local storage
// and hold whatever the value is inside of a state variable
// this hook lets us extract and hold in state whatever we need from local storage


import { useState, useEffect } from 'react';

export function useSessionStorage(key, initialState) {
  //when calling our custom hook we pass in a key and an initial value.

    const [state, setState] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    //each time useLocalStorageState is called it will return a reference
    // to the state variable and the function to update the value
    return [state, setState];
}
