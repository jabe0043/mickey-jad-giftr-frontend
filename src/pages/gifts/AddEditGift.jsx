import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //
import CheckAuth from "../../utils/CheckAuth";
import * as Styled from "../../styled/components";
import bannerIllustration from "../../assets/giftAddEditPageIllustration.png";
import { useParams } from "react-router-dom";

const AddEditGift = () => {
  const [authenticatedUser, setAuthenticatedUser] = useUser();
  const { personId, giftId } = useParams();
  const [gift, setGift] = useState({});

  useEffect(() => {
    if (giftId) {
      let request = new Request(
        `http://localhost:3001/api/people/${personId}/gifts/${giftId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authenticatedUser}`,
          },
        }
      );
      fetch(request)
        .then((res) => {
          if (res.status === 401)
            throw new Error("Unauthorized access to API.");
          if (!res.ok) throw new Error("Invalid response.");
          return res.json();
        })
        .then((res) => {
          console.log(res.data);
          setGift(res.data);
        })
        .catch(console.warn);
    }
  }, []);

  return (
    <main className="container">
      <CheckAuth />
      {/* TODO: add person Name when we start using Context */}
      <Styled.GiftAddEditH1>{`Add a gift idea for Mickey`}</Styled.GiftAddEditH1>
      <Styled.GiftAddEditIllustration
        src={bannerIllustration}
        alt="a smiling woman raising her hands with gift boxes"
      ></Styled.GiftAddEditIllustration>
      <Styled.FormForGifts>
        <label htmlFor="name">Gift Idea</label>
        <Styled.TextInput
          type="text"
          id="giftIdea"
          name="giftIdea"
          defaultValue={gift ? gift.giftName : ""}
        ></Styled.TextInput>
        <label htmlFor="name">Store</label>
        <Styled.TextInput
          type="text"
          id="store"
          name="store"
          defaultValue={gift ? gift.store : ""}
        ></Styled.TextInput>
        <label htmlFor="name">Website URL</label>
        <Styled.TextInput
          type="text"
          id="url"
          name="url"
          defaultValue={gift ? gift.website : ""}
        ></Styled.TextInput>
        {gift ? (
          <>
            <Styled.Button
              type="submit"
              className="btn save"
              style={{ marginTop: "2rem" }}
            >
              Save
            </Styled.Button>
            <Styled.Button
              type="submit"
              className="btn save"
              style={{ marginTop: "2rem" }}
            >
              Delete
            </Styled.Button>
          </>
        ) : (
          <Styled.Button
            type="submit"
            className="btn save"
            style={{ marginTop: "2rem" }}
          >
            Add Gift
          </Styled.Button>
        )}
      </Styled.FormForGifts>
    </main>
  );
};

export default AddEditGift;
