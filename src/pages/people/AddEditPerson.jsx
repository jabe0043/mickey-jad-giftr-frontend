import CheckAuth from "../../utils/CheckAuth";
import { useUser } from '../../context/userContext';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Styled from "../../styled/components";


export default function Person() {
    const [authenticatedUser, setAuthenticatedUser] = useUser();
    const [person, setPerson] = useState({});
    const navigate = useNavigate();
    const { personId } = useParams();

    console.log(personId);

    useEffect(()=>{
        if(personId){
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
    }}, [authenticatedUser, personId])

    console.log(person);
    console.log(person.length);

        return (
        <main className="container">
            <CheckAuth />
            {/* {person && person.length > 0 ? ( */}
            {person._id ? (
                //EDIT USER
                <div>
                    <h1>Edit Information for {person.fullName}</h1>
                    <Styled.GiftsBanner>
                        <Styled.GiftsBannerAvatar>
                            <img src={person.avatar} alt={`avatar for${person.fullName}`}></img>
                        </Styled.GiftsBannerAvatar>
                        <Styled.GiftsBannerName>{person.fullName}</Styled.GiftsBannerName>
                        <Styled.GiftsBannerDob>
                            {new Date(person.dob).toString().slice(4, 10)}
                        </Styled.GiftsBannerDob>
                        <Styled.GiftsBannerEditButton
                            onClick={() => {
                                navigate(`/people/edit/${personId}`);
                            }}>
                        </Styled.GiftsBannerEditButton>
                    </Styled.GiftsBanner> 
                    <form>
                        <Styled.FormField>
                            <label htmlFor="name">Full Name</label>
                            <Styled.TextInput type="text" id="field1" name="field1"/>
                        </Styled.FormField>
                        <Styled.FormField>
                            <label htmlFor="dob">Date of Birth</label>
                            <Styled.TextInput type="text" id="field2" name="field2"/>
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
                        <i className="bi bi-arrow-left" onClick={()=>newAvatar}></i>
                        <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                        <Styled.GiftsBannerAvatar>
                            <img className='randomAvatar' src={`https://api.dicebear.com/6.x/croodles/svg?seed=${crypto.randomUUID()}&topColor=000000`} alt={`avatar`}></img>
                        </Styled.GiftsBannerAvatar>
                            <Styled.SelectAvatarPrompt> select an avatar</Styled.SelectAvatarPrompt>
                        </div>
                        <i className="bi bi-arrow-right"></i>
                    </Styled.PeopleBanner>
                    <form>
                        <Styled.FormField>
                            <label htmlFor="name">Full Name</label>
                            <Styled.TextInput type="text" id="field1" name="field1"/>
                        </Styled.FormField>
                        <Styled.FormField>
                            <label htmlFor="dob">Date of Birth</label>
                            <Styled.TextInput type="text" id="field2" name="field2"/>
                        </Styled.FormField>
                        <Styled.ButtonsDiv>
                            <Styled.Button type="submit" className="btn save">Save</Styled.Button>
                            <Styled.Button type="button" className="btn delete">Delete</Styled.Button>
                        </Styled.ButtonsDiv>
                    </form>
                </div>
            )}
        </main>
    );  


}