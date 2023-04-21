import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { PageBanner, Title, CardsList, Subtitle } from "../../styled/components";

import CheckAuth from "../../utils/CheckAuth";
import { useUser } from "../../context/userContext";
import PersonCard from "./PersonCard";

export default function People() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [people, setPeople] = useState([]);
  const [authenticatedUserToken, _setAuthenticatedUserToken] = useUser();

  const handleCardClick = (personId) => {
    navigate(`/gift/${personId}`);
  };

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
        let peopleArr = data.data;
        setPeople(
          peopleArr.map((person) => ({
            ownerID: person.ownerID,
            _id: person._id,
            avatar: person.avatar,
            fullName: person.fullName,
            dob: new Date(person.dob).toUTCString().slice(4, 11).split(" ").reverse().join(" "),
          }))
        );
      })
      .catch(console.warn);

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

  //sort dates calls itself on page render
  (function sortDates() {
    people.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  })();

  return (
    <motion.main initial={{ x: "-100%" }} animate={{ x: "0" }} exit={{ x: "-100%" }} transition={{ duration: 0.2, ease: "easeIn" }}>
      <CheckAuth />
      <PageBanner className="page-banner">
        <Title>
          Welcome, <br />{" "}
          <strong style={{ fontSize: "2.5rem", color: "#1E1E1E" }}> {`${userName.charAt(0).toUpperCase()}${userName.split(" ")[0].slice(1)}`}</strong>
        </Title>
      </PageBanner>

      <Subtitle>{people.length === 0 ? "There are no people in the list" : "Here's your list of giftees"}</Subtitle>

      <div>
        <CardsList>
          {people.map((person) => (
            <PersonCard key={person._id} person={person} onClick={() => handleCardClick(person._id)} /> //passing the cardClick handler to the PersonCard comp.
          ))}
        </CardsList>
      </div>
    </motion.main>
  );
}
