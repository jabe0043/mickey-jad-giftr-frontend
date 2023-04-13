import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';


export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header>
        <h1> GIFT'R</h1>
      </header>
      <Routes>
        <Route path='/' element={<Login />}/>
        {/*TODO: ADD Other Paths*/}
      
      </Routes>
    </div>
  )
}


/* ROUTE PLANNING (Use context variables for ids or put them in the url?) 


  ROUTE               NAVIGATION 

//****** AUTHORIZATION NOT REQUIRED *********
  /                   --> login route   


  // ***** AUTHORIZATION REQUIRED *****
  /people             --> list of people from the DB (need to be logged in)
  
  /people/add         --> add a new person form OR
  /people/:pid        --> edit a person   OR
  /people/form/:pid   --> edit a person
  /people/form        --> add a person (you're adding or editing based on whether or not there's an id in the route (if the route has no id, i know im adding a new person))
  
  /gifts              --> get person id from a context variable OR
  /people/:pid/gifts  --> person id is part of the url 
  
  /gifts/form         --> both person and gift id are context variables
  /gifts/form/:gid
  /people/:pid/gifts/:gid
  
  */