import CheckAuth from "../../utils/CheckAuth";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Styled from "../../styled/components";
import { motion } from "framer-motion";


export default function AddEditPerson() {
  console.log("AddEditPerson rendered");
  const offset = -4; // the time difference between EST & UTC
  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();
  const navigate = useNavigate();
  const { personId } = useParams();

  const [avatarSeed, setAvatarSeed] = useState(crypto.randomUUID());

  const [person, setPerson] = useState({
    avatar: "",
    fullName: "",
    dob: "",
    gifts: "",
  });

  useEffect(() => {
    if (personId) {
      console.log("fetch person data with id: ", personId);
      const url = `http://localhost:3001/api/people/${personId}`; 
      let request = new Request(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authenticatedUserToken}`,
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
          setPerson({
            //setting fetched data person in state
            ownerID: personData.ownerID,
            _id: personData._id,
            avatar: personData.avatar,
            fullName: personData.fullName,
            dob: new Date(personData.dob).toISOString().slice(0, 10),
            gifts: personData.gifts,
            createdAt: personData.createdAt,
          });
          setAvatarSeed(personData.avatar.split("seed=")[1].split("&")[0]);
        })
        .catch(console.warn);
    }
  }, []);


  useEffect(() => {
    setUpdatedPerson((prevPerson) => ({ ...prevPerson, avatar:`https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`}));
  }, [avatarSeed]);

  // Create state variable for keyboard entries
  const [updatedPerson, setUpdatedPerson] = useState({});

  // Update state above^ with form entries
  function updatePerson(ev) {
    console.log("updatePerson");
    const { name, value } = ev.target;
    setUpdatedPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  }

  // Update stateObj with user input. If no input, leave default fetched person data.
  function handleSubmit(ev) {
    console.log("handleSubmit");
    ev.preventDefault();

    // building request
    if (personId) {
      const method = ev.target.id === "save" ? "PATCH" : "DELETE";
      const url = `http://localhost:3001/api/people/${personId}`;
      accessDb(updatedPerson, url, method);
    } else {
      const method = "POST";
      const url = `http://localhost:3001/api/people/`;
      accessDb(updatedPerson, url, method);
    }
  }

  console.log(updatedPerson.avatar); // TODO: why are these undefined
  console.log(updatedPerson.dob); 

  //TODO: Turn this into a global fetch variable (put in utils);
  function accessDb(updatedPerson, url, method) {
    console.log(`accessDb -- method: ${method}`);
    console.log('UPDATED PERSON:', updatedPerson);
    const request = new Request(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${authenticatedUserToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPerson),
    });
    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error(`Failed to ${method} person data in database`);
        console.log(`${method} was successful`);
      })
      .then(navigate(method === "DELETE" ? -2 : -1)) //If we're deleting a user, navigating back by 1 will take us to their gift page, which no longer exists
      .catch(console.warn);
  }




  //TODO: can make way shorter
  return (
    <motion.main className="container" 
    initial={{ x: "100%" }}
    animate={{ x: "0" }}
    exit={{ x: "100%" }}
    transition={{ duration: 0.2, ease: "easeIn" }}
    >
        <CheckAuth />
        {person._id ? (
            //EDIT USER
            <div>
                <Styled.PersonAddEditTitle>Edit Information for {person.fullName}</Styled.PersonAddEditTitle>
                <Styled.PeopleBanner>
                    {/* <i className="bi bi-arrow-left" onClick={() => {
                        setAvatarSeed(crypto.randomUUID());
                        }}></i> */}
                    <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                    <Styled.GiftsBannerAvatar>
                        <img className='randomAvatar' src={`https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`}></img>
                    </Styled.GiftsBannerAvatar>
                    <i className="bi bi-shuffle" onClick={() => {
                        setAvatarSeed(crypto.randomUUID());
                        }} style={{alignSelf: 'center', color:'#1E1E1E'}}></i>
                    </div>
                    {/* <i className="bi bi-arrow-right" onClick={() => {
                        setAvatarSeed(crypto.randomUUID());
                        }}></i> */}
                </Styled.PeopleBanner>
                <form onSubmit={handleSubmit}>
                    <Styled.FormField>
                        <Styled.Label For="name">Full Name</Styled.Label>
                        <Styled.TextInput type="text" id="fullName" name="fullName" defaultValue={person.fullName} onChange={updatePerson}/>
                    </Styled.FormField>
                    <Styled.FormField>
                        <Styled.Label htmlFor="dob">Date of Birth</Styled.Label>
                        <Styled.TextInput type="date" id="dob" name="dob" defaultValue={person.dob} onChange={updatePerson} onClick={(ev)=> {ev.target.showPicker();}}/>
                    </Styled.FormField>
                    <Styled.ButtonsDiv>
                        <Styled.Button type="submit" id="save" onClick={handleSubmit}>Save</Styled.Button>
                        <Styled.Button $secondary type="delete" id="del" onClick={handleSubmit}>Delete</Styled.Button>
                    </Styled.ButtonsDiv>
                </form>
            </div>
        ) : (               
            //ADD USER
            <div>
                <Styled.GiftAddEditH1>Add a new person to the list</Styled.GiftAddEditH1>
                <Styled.PeopleBanner>
                    {/* <i className="bi bi-arrow-left" onClick={(ev)=>changeAvatar(ev)}></i> */}
                    <div style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                    <Styled.GiftsBannerAvatar>
                        <img className='randomAvatar' src={`https://api.dicebear.com/6.x/micah/svg?seed=${avatarSeed}&mouth=laughing,nervous,smile,smirk,surprised&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&earringsProbability=0&facialHairProbability=0`} 
                        alt={`avatar`}></img>
                    </Styled.GiftsBannerAvatar>
                        <i className="bi bi-shuffle" onClick={() => {
                        setAvatarSeed(crypto.randomUUID());
                        }} style={{alignSelf: 'center', color:'#1E1E1E'}}></i>
                    </div>
                </Styled.PeopleBanner>
                <form onSubmit={handleSubmit}>
                    <Styled.FormField>

                        <Styled.Label htmlFor="name">Full Name</Styled.Label>
                        <Styled.TextInput type="text" id="fullName" name="fullName" onChange={updatePerson} required/>

                    </Styled.FormField>
                    <Styled.FormField>
                        <Styled.Label htmlFor="dob">Date of Birth</Styled.Label>
                        <Styled.TextInput 
                        type="date" 
                        id="dob" name="dob" defaultValue={person.dob} onChange={updatePerson} onClick={(ev)=> {ev.target.showPicker();}}/>
                    </Styled.FormField>
                    <Styled.ButtonsDiv>
                        <Styled.Button type="submit" id='save' className="btn save" onClick={handleSubmit}>Save</Styled.Button>
                    </Styled.ButtonsDiv>
                </form>
            </div>
        )}
    </motion.main>
  );
}
