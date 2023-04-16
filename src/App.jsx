import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import People from './pages/people/People'
// import PersonForm from './pages/people/PersonForm'       //this comp. will be called by the person page. This is the equiv. of ListCard comp for people page.
import Person from './pages/people/Person'
import Header from './pages/Header';
import Gifts from './pages/gifts/Gifts'
import GiftForm from './pages/gifts/GiftForm'


export default function App() {

  return (
    <div className="App">
      <Header></Header>


      <Routes>
        <Route path='/' element={<Login />}/>

        <Route path='/people' element={<People />} />
        <Route path='/people/edit/:personId' element={<Person />} />
        <Route path='/people/add' element={<Person />} />
        
        <Route path='/gift' element={<Gifts />} />
        <Route path='/gift/edit' element={<GiftForm />} />
        <Route path='/gift/add' element={<GiftForm />} /> 
      
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