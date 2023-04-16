import CheckAuth from "../../utils/CheckAuth";
import { useUser } from '../../context/userContext';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Person() {
    const [authenticatedUser, setAuthenticatedUser] = useUser();
    const [person, setPerson] = useState({});
    const navigate = useNavigate();
    const { personId } = useParams();



    useEffect(()=>{
        console.log('FETCHING FOR SINGLE PERSON OBJ - IT SHOULD RETURN THE GIFTS TOO')
        const url = `http://localhost:3001/api/people/${personId}`;
        let request = new Request(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authenticatedUser}`,
                "content-type": "application/json",
            },
        });
        fetch(request)
        .then((res) => {
            if (res.status === 401) throw new Error("Unauthorized access to API.");
            if (!res.ok) throw new Error("Invalid response.");
            return res.json();
        })
        .then((data) => {
            let personData = data.data;
            console.log(personData);
            setPerson({                 //setting fetched person in state 
                ownerID: personData.ownerID,
                _id: personData._id,
                avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${personData._id}&topColor=000000`,
                fullName: personData.fullName,
                dob: new Date(personData.dob).toString().slice(4, 10),
                gifts: personData.gifts
            });
        })
        .catch(console.warn);
    }, [authenticatedUser, personId]);

    console.log(person)




    return (
        <main>
            <CheckAuth />
            <h1>ADD OR EDIT PERSON PAGE</h1>
        </main>
    );
}