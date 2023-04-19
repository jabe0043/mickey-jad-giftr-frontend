import React from "react";
import GiftCard from "./GiftCard";
import { useEffect, useState } from "react";
import * as Styled from "../../styled/components";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import CheckAuth from "../../utils/CheckAuth";

const Gifts = () => {
  //Local Server URL
  const localServerURL = `http://localhost:3001`;

  const [authenticatedUserToken, setAuthenticatedUserToken] = useUser();
  const [person, setPerson] = useState({});
  const navigate = useNavigate();
  const { personId } = useParams();

  useEffect(() => {
    // console.log(
    //   "FETCHING FOR SINGLE PERSON OBJ - IT SHOULD RETURN THE GIFTS TOO"
    // );
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
        // console.log(personData);
        setPerson({
          //setting fetched person in state
          ownerID: personData.ownerID,
          _id: personData._id,
          avatar: `https://api.dicebear.com/6.x/croodles/svg?seed=${personData._id}&topColor=000000`,
          fullName: personData.fullName,
          dob: new Date(personData.dob).toUTCString().slice(4, 11).split(" ").reverse().join(" "),  
          gifts: personData.gifts,
        });
      })
      .catch(console.warn);
  }, [authenticatedUserToken, personId]);
  // console.log(person)

  return (
    <main className="container">
      <CheckAuth />
      <Styled.GiftsBanner>
        <Styled.GiftsBannerAvatar>
          {person.avatar && (
            <img src={person.avatar} alt={`avatar for${person.fullName}`}></img>
          )}
        </Styled.GiftsBannerAvatar>
        <Styled.GiftsBannerName>{person.fullName}</Styled.GiftsBannerName>
        <Styled.GiftsBannerDob>
          {person.dob}
        </Styled.GiftsBannerDob>
        <Styled.GiftsBannerEditButton
          onClick={() => {
            navigate(`/people/edit/${personId}`);
          }}
        >
          <i className="bi bi-pencil"></i>
        </Styled.GiftsBannerEditButton>
      </Styled.GiftsBanner>

      <Styled.GiftTitle>
        Here are your gifts for{" "}
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
    </main>
  );
};

export default Gifts;
