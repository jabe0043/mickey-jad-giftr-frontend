import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //user context for fetching.
import { useNavigate } from "react-router-dom";
import giftImg from "../../assets/pixeltrue-giveaway.png";
import ListCard from "../ListCard";
import { useTheme } from "styled-components";
import { PageBanner, Title, CardsList, Subtitle } from "../../styled/components";
import CheckAuth from "../../utils/CheckAuth";
import { motion } from "framer-motion";


export default function People() {
  const [userName, setUserName] = useState("");
  const [people, setPeople] = useState([]);

  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://gift-backend.onrender.com/api/people`;
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
        //TODO:should we exclude gifts from being returned from the client side (like below), or not send the gifts at all for a getAll request from the server side??
        //Mickey(4/19 8pm): I think it's better to not send the gifts at all for a getAll request from the server side.
        let peopleArr = data.data;
        console.log("fetched peopleArr: ", peopleArr);
        setPeople(
          peopleArr.map((person) => ({
            ownerID: person.ownerID,
            _id: person._id,
            avatar: person.avatar,
            fullName: person.fullName,
            dob: new Date(person.dob).toUTCString().slice(4, 11).split(" ").reverse().join(" "),
          }))
        );
        console.log("setPeople to: ", people);
      })
      .catch(console.warn);

      console.log(people);

    const requestForUserName = new Request(`https://gift-backend.onrender.com/api/user/userName/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authenticatedUserToken}`,
        "content-type": "application/json",
      },
    });

    fetch(requestForUserName)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response.");
        return res.json();
      })
      .then((data) => {
        let userName = data.data;
        setUserName(userName.name);
      })
      .catch(console.warn);

  }, []);

  //sort dates calls itself on people page render
  (function sortDates() {
    people.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  })();

  const handleCardClick = (personId) => {
    navigate(`/gift/${personId}`);
  };

  return (
    <motion.main className="container" 
    initial={{ x: "-100%" }}
    animate={{ x: "0" }}
    exit={{ x: "-100%" }}
    transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <CheckAuth />
      <PageBanner className="page-banner">
        <Title>Welcome, <br/> <strong style={{fontSize:"2.5rem", color:'#007b7f'}}> {`${userName.charAt(0).toUpperCase()}${userName.split(" ")[0].slice(1)}`}</strong></Title>
        <div style={{display: "flex", justifyContent:"flex-end", marginTop:"-6rem"}}>
          <img src={giftImg} alt="Happy lady with 2 gift boxes"></img>
        </div>
        <Subtitle>
          {people.length === 0  ? ("There are no people in the list") : ("Here\'s your list of giftees")}
        </Subtitle>
      </PageBanner>
      <CardsList className="people">
        {people.map((person) => (
          <ListCard key={person._id} person={person} onClick={() => handleCardClick(person._id)} /> //passing the cardClick handler to the listCard comp.
        ))}
      </CardsList>
    </motion.main>
  );
}
