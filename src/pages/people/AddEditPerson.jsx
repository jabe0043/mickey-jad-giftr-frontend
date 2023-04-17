import CheckAuth from "../../utils/CheckAuth";
import { useUser } from '../../context/userContext';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Styled from "../../styled/components";


export default function Person() {
    const [authenticatedUser, setAuthenticatedUser] = useUser();
    console.log(authenticatedUser);
    const navigate = useNavigate();
    const { personId } = useParams();

    const [person, setPerson] = useState({
        avatar:"",
        fullName: "",
        dob: "",
        gifts: "",
    });


    useEffect(()=>{
        if(personId){
            const url = `http://localhost:3001/api/people/${personId}`; //TODO:
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
                console.log('DATA', data);
                let personData = data.data;
                setPerson({                 //setting fetched data person in state 
                    ownerID: personData.ownerID,
                    _id: personData._id,
                    avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${personData._id}&topColor=000000`,
                    fullName: personData.fullName,
                    dob: new Date(personData.dob).toISOString().slice(0, 10),
                    gifts: personData.gifts,
                    createdAt: personData.createdAt,
                });
            })
            .catch(console.warn);
    }}, [authenticatedUser, personId])


// Change avatar based on arrow click 
    const [avatar, setAvatar] = useState("");
    function changeAvatar(ev){
        let shuffleIcon = ev.target;  
        let currentAvatar = shuffleIcon.parentElement.querySelector('img').src; 
        setAvatar(currentAvatar)
        currentAvatar = `https://api.dicebear.com/6.x/croodles/svg?seed=${crypto.randomUUID()}&topColor=000000`
    }


// Create state variable for keyboard entries
    const [updatedPerson, setUpdatedPerson] = useState({});

// Update state above^ with form entries
    function updatePerson(ev) {
        const { name, value } = ev.target;
        setUpdatedPerson(prevPerson => ({ ...prevPerson, [name]: value }));
    }

// Update stateObj with user input. If no input, leave default fetched person data.
    function handleSubmit(ev) {
        ev.preventDefault();
        const currentUrl = window.location.pathname;

        // creating updatedPerson obj
        setUpdatedPerson({
            ownerID: person.ownerID,
            _id: person._id,        
            avatar: avatar || person.avatar,
            fullName: updatedPerson.fullName || person.fullName,
            dob: updatedPerson.dob || person.dob,
            gifts: updatedPerson.gifts || person.gifts,
            createdAt: person.createdAt,
        });

        // building request
        const method = currentUrl.includes('people/edit/') ? "PATCH" : "POST";
        const url = `http://localhost:3001/api/people/${method === "PATCH" ? personId : ""}`; 
        accessDb(updatedPerson, url, method);   //Initiating fetch              //TODO: need to grab userId for post need to use a context provider
        console.log(url);
        console.log(method); 
    }
    console.log(updatedPerson)



    //TODO: Turn this into a global fetch variable (put in utils);
    function accessDb(updatedPerson, url, method) {
        const request = new Request(url, {
                method: method,
                headers: {
                Authorization: `Bearer ${authenticatedUser}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPerson)
        });
        console.log(request);
        fetch(request)
            .then(res => {
                if (res.status === 401) throw new Error("Unauthorized access to API.");
                if (!res.ok) {
                throw new Error('Failed to update person data in database');
                }
            console.log(`${person.firstName}has been added/patched`);
            // update the person state with the updatedPerson state
            })
            .catch(console.warn);
        }



        //TODO: can make way shorter
        return (
        <main className="container">
            <CheckAuth />
            {person._id ? (
                //EDIT USER
                <div>
                    <h1>Edit Information for {person.fullName}</h1>
                    <Styled.PeopleBanner>
                        <i className="bi bi-arrow-left" onClick={(ev)=>changeAvatar(ev)}></i>
                        <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                        <Styled.GiftsBannerAvatar>
                            <img className='randomAvatar' src={person.avatar} alt={`avatar`}></img>
                        </Styled.GiftsBannerAvatar>
                            <Styled.SelectAvatarPrompt> select an avatar</Styled.SelectAvatarPrompt>
                        </div>
                        <i className="bi bi-arrow-right" onClick={(ev)=>changeAvatar(ev)}></i>
                    </Styled.PeopleBanner>
                    <form onSubmit={handleSubmit}>
                        <Styled.FormField>
                            <label htmlFor="name">Full Name</label>
                            <Styled.TextInput type="text" id="fullName" name="fullName" defaultValue={person.fullName} onChange={updatePerson}/>
                        </Styled.FormField>
                        <Styled.FormField>
                            <label htmlFor="dob">Date of Birth</label>
                            <Styled.TextInput type="date" id="dob" name="dob" defaultValue={person.dob} onChange={updatePerson} />
                        </Styled.FormField>
                        <Styled.ButtonsDiv>
                            <Styled.Button type="submit" className="btn save">Save</Styled.Button>
                            <Styled.Button type="button" className="btn delete">Delete</Styled.Button>
                        </Styled.ButtonsDiv>
                    </form>
                </div>
            ) : (               
                //ADD USER
                <div>
                    <h1>Add a new person to the list</h1>
                    <Styled.PeopleBanner>
                        {/* <i className="bi bi-arrow-left" onClick={(ev)=>changeAvatar(ev)}></i> */}
                        <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                        <Styled.GiftsBannerAvatar>
                            <img className='randomAvatar' src={`https://api.dicebear.com/6.x/croodles/svg?seed=${crypto.randomUUID()}&topColor=000000`} alt={`avatar`}></img>
                        </Styled.GiftsBannerAvatar>
                            {/* <Styled.SelectAvatarPrompt> select an avatar</Styled.SelectAvatarPrompt> */}
                            <i className="bi bi-shuffle" onClick={(ev)=>changeAvatar(ev)} style={{alignSelf: 'center'}}></i>
                        </div>
                        {/* <i className="bi bi-arrow-right" onClick={(ev)=>changeAvatar(ev)}></i> */}
                    </Styled.PeopleBanner>
                    <form onSubmit={handleSubmit}>
                        <Styled.FormField>
                            <label htmlFor="name">Full Name</label>
                            <Styled.TextInput type="text" id="fullName" name="fullName" onChange={updatePerson}/>
                        </Styled.FormField>
                        <Styled.FormField>
                            <label htmlFor="dob">Date of Birth</label>
                            <Styled.TextInput type="date" id="dob" name="dob" defaultValue={person.dob} onChange={updatePerson} />
                        </Styled.FormField>
                        <Styled.ButtonsDiv>
                            <Styled.Button type="submit" className="btn save">Save</Styled.Button>
                        </Styled.ButtonsDiv>
                    </form>
                </div>
            )}
        </main>
    );  


}