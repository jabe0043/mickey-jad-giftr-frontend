import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';  //
import giftImg from '../../assets/pixeltrue-giveaway.png'
import ListCard from '../ListCard';
import {useTheme} from 'styled-components';
import {Title} from '../../styled/components'



export default function People(){

    const [people, setPeople] = useState([]);
    const [authenticatedUser, setAuthenticatedUser] = useUser();
    const theme = useTheme();

    useEffect(()=>{
        const url = `http://localhost:3001/api/people/`
        let request = new Request (url, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${authenticatedUser}`,
                'content-type' : 'application/json'
            }
        })
        fetch(request)
        .then((res)=>{
            if (res.status === 401) throw new Error('Unauthorized access to API.');
            if (!res.ok) throw new Error('Invalid response.');
            return res.json();
        })
        .then((data)=>{
            let peopleArr = data.data;
            console.log(peopleArr);
            setPeople(
                peopleArr.map((person) => (
                    {       
                    ownerID: person.ownerID,
                    _id: person._id,
                    avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${person._id}&topColor=000000`,
                    fullName: person.fullName,
                    dob: person.dob
                }))
            );
        })
        .catch(console.warn);
    }, []);

console.log(people);
    
    return(
        <main>
            <div className='page-banner'>
                <Title>Welcome</Title>
                <div>
                    <img src={giftImg} alt="Happy lady with 2 gift boxes"></img>
                </div>
                <h2>Here's your list of giftees</h2>
            </div>
                <ul className='people'>
                    {people.map((person) => <ListCard key={person._id} person={person}/>)}
                </ul>
        </main>
    )
}
