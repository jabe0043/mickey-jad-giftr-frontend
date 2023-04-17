import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //user context for fetching.
import { useNavigate } from 'react-router-dom';
import giftImg from "../../assets/pixeltrue-giveaway.png";
import ListCard from "../ListCard";
import { useTheme } from "styled-components";
import { PageBanner, Title, CardsList } from "../../styled/components";
import CheckAuth from "../../utils/CheckAuth";


export default function People() {
  const [people, setPeople] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useUser();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:3001/api/people/`;
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
      .then((data) => {       //TODO:should we exclude gifts from being returned from the client side (like below), or not send the gifts at all for a getAll request from the server side??
        let peopleArr = data.data;
        setPeople(
          peopleArr.map((person) => ({
            ownerID: person.ownerID,
            _id: person._id,
            avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${person._id}&topColor=000000`,
            fullName: person.fullName,
            dob: new Date(person.dob).toString().slice(4, 10),
          }))
        );
      })
      .catch(console.warn);
  }, []);

  // console.log(people);

  const handleCardClick = (personId) => {
    console.log('test');
    navigate(`/gift/${personId}`);
  };


  return (
    <main className="container">
      <CheckAuth />
      <PageBanner className="page-banner">
        <Title>Welcome</Title>
        <div>
          <img src={giftImg} alt="Happy lady with 2 gift boxes"></img>
        </div>
        <h2>Here's your list of giftees</h2>
      </PageBanner>
      <CardsList className="people">
        {people.map((person) => (
          <ListCard key={person._id} person={person} onClick={()=> handleCardClick(person._id)}/> //passing the cardClick handler to the listCard comp.
        ))}
      </CardsList>
    </main>
  );
}
