import { useState, useEffect } from 'react';


// will need to create a context provider or state

// this needs to be conditional rendering depending on person or gift card
export default function ListCard(props){

    const person =  props.person;
    console.log(person);



    return(
        <li className='person__card'>
            <div className='person__avatar'>
                <img src={person.avatar}></img>
            </div>
            <p className='person__fullname'>{ person.fullName} </p>
            <p className='person__dob'>{ person.dob }</p>
        </li>
    )
}




