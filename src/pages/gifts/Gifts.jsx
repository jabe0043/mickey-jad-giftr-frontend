import React from "react";
import GiftCard from "./GiftCard";
import { useEffect, useState } from "react";
import * as Styled from "../../styled/components";

import { useUser } from "../../context/userContext";

const Gifts = () => {
  //Local Server URL
  const localServerURL = `http://localhost:3001`;

  //Remote Server URL
  // const localServerURL = `https://gift-backend.onrender.com`

  // useEffect(() => {
  //   const url = `${localServerURL}/api/gifts/`;
  //   const [authenticatedUser, setAuthenticatedUser] = useUser();
  //   let request = new Request(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${authenticatedUser}`,
  //       "content-type": "application/json",
  //     },
  //   });
  //   fetch(request)
  //     .then((res) => {
  //       if (res.status === 401) throw new Error("Unauthorized access to API.");
  //       if (!res.ok) throw new Error("Invalid response.");
  //       return res.json();
  //     })
  //     .then((response) => {
  //       let giftsArr = response.data;
  //       console.log("giftsArr", giftsArr);
  //       setGifts(
  //         giftsArr.map((gift) => ({
  //           _id: gift._id,
  //           txt: gift.txt,
  //           store: gift.store,
  //           url: gift.url,
  //         }))
  //       );
  //     })
  //     .catch(console.warn);
  // }, []);

  const dummyPerson = {
    _id: "6439f1b97ac01bb123463f41",
    ownerID: "162b2649b2e70464f113c04e",
    fullName: "CreatePersonTEST",
    dob: "2023-01-01T00:00:00.000Z",
    avatar:
      "https://api.dicebear.com/6.x/croodles/svg?seed=6439f1b97ac01bb123463f41&topColor=000000",
    gifts: [
      {
        _id: "1",
        txt: "Gift 1",
        store: "Store 1",
        url: "https://www.google.com",
      },
      {
        _id: "2",
        txt: "Gift 2",
        store: "Store 2",
        url: "https://www.google.com",
      },
    ],
  };

  return (
    <main className="container">
      <Styled.GiftsBanner>
        <Styled.GiftsBannerAvatar>
          <img
            src={dummyPerson.avatar}
            alt={`avatar for${dummyPerson.fullName}`}
          ></img>
        </Styled.GiftsBannerAvatar>
        <Styled.GiftsBannerName>{dummyPerson.fullName}</Styled.GiftsBannerName>
        <Styled.GiftsBannerDob>
          {new Date(dummyPerson.dob).toString().slice(4, 10)}
        </Styled.GiftsBannerDob>
        <Styled.GiftsBannerEditButton>
          <svg
            viewBox="0 0 74 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.1773 0.704774C57.0804 -0.234925 58.5446 -0.234925 59.4477 0.704774L73.3227 15.1423C74.2258 16.082 74.2258 17.6055 73.3227 18.5452L27.0727 66.6702C26.8513 66.9006 26.5872 67.0818 26.2964 67.2028L3.17141 76.8278C2.3125 77.1853 1.3315 76.9758 0.677382 76.2952C0.0232632 75.6145 -0.178095 74.5938 0.165465 73.7L9.41546 49.6375C9.53177 49.335 9.70593 49.0602 9.92737 48.8297L56.1773 0.704774ZM51.8329 12.0312L62.4375 23.0658L68.4171 16.8437L57.8125 5.8092L51.8329 12.0312ZM59.1671 26.4687L48.5625 15.4342L18.5001 46.7154V48.125H20.8125C22.0897 48.125 23.125 49.2023 23.125 50.5312V52.9375H25.4375C26.7147 52.9375 27.75 54.0148 27.75 55.3437V57.7499H29.1047L59.1671 26.4687ZM14.0214 51.3756L13.5334 51.8834L6.46363 70.2743L24.138 62.918L24.6261 62.4101C23.7492 62.0681 23.125 61.188 23.125 60.1562V57.7499H20.8125C19.5354 57.7499 18.5001 56.6726 18.5001 55.3437V52.9375H16.1876C15.1959 52.9375 14.3501 52.288 14.0214 51.3756Z"
              fill="#1E1E1E"
            />
          </svg>
        </Styled.GiftsBannerEditButton>
      </Styled.GiftsBanner>

      <Styled.GiftTitle>
        Here are your gifts for{" "}
        <Styled.GiftTitleName>{dummyPerson.fullName}</Styled.GiftTitleName>
      </Styled.GiftTitle>

      <Styled.GiftCardContainer>
        {dummyPerson.gifts.map((gift) => (
          <GiftCard key={gift._id} gift={gift} />
        ))}
      </Styled.GiftCardContainer>
    </main>
  );
};

export default Gifts;
