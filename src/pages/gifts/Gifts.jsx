import React from "react";
import Gift from "./Gift";
import { useEffect, useState } from "react";

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
    <main id="giftsList">
      <div className="profile">
        <div>
          <img
            src={dummyPerson.avatar}
            alt={`avatar for${dummyPerson.fullName}`}
          ></img>
        </div>
        <div>{dummyPerson.fullName}</div>
        <div>{dummyPerson.dob}</div>
      </div>

      <h2>{`Here are your gifts for ${dummyPerson.fullName}`}</h2>

      {/*TODO: change to <ListCard/> later */}
      <div>
        {dummyPerson.gifts.map((gift) => (
          <Gift key={gift._id} gift={gift} />
        ))}
      </div>
    </main>
  );
};

export default Gifts;
