import React from "react";
import GiftCard from "./GiftCard";
import { useEffect, useState } from "react";
import * as Styled from "../../styled/components";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import CheckAuth from "../../utils/CheckAuth";
import { motion } from "framer-motion";

const Gifts = () => {
  console.log("Gifts rendered");
  //Local Server URL
  const localServerURL = `http://localhost:3001`;

  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();
  const [person, setPerson] = useState({});
  const navigate = useNavigate();
  const { personId } = useParams();

  useEffect(() => {
    console.log("Gifts useEffect rendered");
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
          //setting fetched person in state
          ownerID: personData.ownerID,
          _id: personData._id,
          avatar: personData.avatar,
          fullName: personData.fullName,
          dob: new Date(personData.dob).toUTCString().slice(4, 11).split(" ").reverse().join(" "),
          gifts: personData.gifts,
        });
      })
      .catch(console.warn);
  }, [authenticatedUserToken, personId]);

  console.log(person);
  // console.log(person.gifts.length);

  return (
    <motion.main className="container"
    initial={{ x: "-100%" }}
    animate={{ x: "0" }}
    exit={{ x: "-100%" }}
    transition={{ duration: 0.2, ease: "easeIn" }}>
      <CheckAuth />
      <Styled.GiftsBanner>
        <div style={{ display: "flex", flexDirection:'column', width:'100%' }}>
          <Styled.GiftsBannerEditButton onClick={() => { navigate(`/people/edit/${personId}`)}}>
          <i class="bi-pencil-fill" style={({color:'#1E1E1E'})}></i>
          </Styled.GiftsBannerEditButton>
          <Styled.GiftsBannerAvatar>{person.avatar && (<img className="randomAvatar" src={person.avatar} alt={`avatar for${person.fullName}`}></img>)} </Styled.GiftsBannerAvatar>
        </div>
        <div style={({textAlign:"center"})}>
          <Styled.GiftsBannerName>{person.fullName}</Styled.GiftsBannerName>
          <Styled.GiftsBannerDob>{person.dob}</Styled.GiftsBannerDob>
        </div>
      </Styled.GiftsBanner>

      <Styled.GiftTitle>
        {person.gifts && person.gifts.length === 0 
        ? ('There are currently no gifts for ') 
        : ('Here are your gifts for ')}
        <Styled.GiftTitleName>{person.fullName}</Styled.GiftTitleName>
      </Styled.GiftTitle>

      {person && person.gifts && (
        <Styled.GiftCardContainer>
          {person.gifts.map((gift) => (
            <GiftCard
              key={gift._id}
              gift={gift}
              personId={personId}
            />
          ))}
        </Styled.GiftCardContainer>
      )}
    </motion.main>
  );
};

export default Gifts;
