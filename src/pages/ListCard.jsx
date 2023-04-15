import { useState, useEffect } from 'react';


// will need to create a context provider or state

// this needs to be conditional rendering depending on person or gift card
export default function ListCard(props){

    const person =  props.person;
    let gender = 'male'; //default for now - we will need to add giftee's gender to the person obj.
    let url = `https://avatars.dicebear.com/api/croodles/random.svg?options[gender]=${gender}&options[top][]=black&options[hairColor][]=000000&seed=${person.fullName}`
    console.log(url);

    useEffect(()=>{
        fetchAvatar(url)
    }, []);


    function fetchAvatar(){    
        fetch(url)
        .then((res) =>{
            if (!res.ok) throw new Error (res.statusText);
            return res.blob();
        })
        .then((data) =>{
            person.avatar = data.url;
        })
    }



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




