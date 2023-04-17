import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //
import CheckAuth from "../../utils/CheckAuth";
import * as Styled from "../../styled/components";
import bannerIllustration from "../../assets/giftAddEditPageIllustration.png";
import { useParams, useNavigate } from "react-router-dom";

const AddEditGift = () => {
  const [authenticatedUser, setAuthenticatedUser] = useUser();
  const { personId, giftId } = useParams();
  const [gift, setGift] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setGift(null);
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

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const giftIdea = formData.get("giftIdea");
    const store = formData.get("store");
    const link = formData.get("url");

    const giftData = {
      giftName: giftIdea,
      store: store,
      website: link,
    };
    console.log(giftData);

    // Edit gift
    if (giftId) {
      accessDb(
        giftData,
        `http://localhost:3001/api/people/${personId}/gifts/${giftId}`,
        "PATCH"
      );
      navigate(-1);
    }
    // Add gift
    else {
      accessDb(
        giftData,
        `http://localhost:3001/api/people/${personId}/gifts`,
        "POST"
      );
      navigate(-1);
    }
  };

  function accessDb(updatedGift, url, method) {
    console.log("accessDb run");
    const request = new Request(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${authenticatedUser}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGift),
    });
    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) {
          throw new Error("Failed to update person data in database");
        }
      })
      .catch(console.warn);
  }

  return (
    <main className="container">
      <CheckAuth />

      {/* TODO: add person Name when we start using Context */}
      <Styled.GiftAddEditH1>
        {giftId ? "Edit" : "Add"} a gift idea for 000
      </Styled.GiftAddEditH1>

      <Styled.GiftAddEditIllustration
        src={bannerIllustration}
        alt="a smiling woman raising her hands with gift boxes"
      ></Styled.GiftAddEditIllustration>

      <Styled.FormForGifts
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit(ev);
        }}
      >
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

        {giftId ? (
          <>
            <Styled.Button
              type="submit"
              className="btn-save"
              style={{ marginTop: "2rem" }}
            >
              Save
            </Styled.Button>

            <Styled.Button
              $secondary
              // Type button prevent this button from submiting the form
              type="button"
              style={{ marginTop: "2rem" }}
            >
              Delete
            </Styled.Button>
          </>
        ) : (
          <Styled.Button type="submit" style={{ marginTop: "2rem" }}>
            Add Gift
          </Styled.Button>
        )}
      </Styled.FormForGifts>
    </main>
  );
};

export default AddEditGift;
