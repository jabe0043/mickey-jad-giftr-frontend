import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import CheckAuth from "../../utils/CheckAuth";
import * as Styled from "../../styled/components";
import bannerIllustration from "../../assets/giftAddEditPageIllustration.png";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAccessDbHook from "../../hooks/useAccessDb";

const AddEditGift = () => {
  console.log("AddEditGift rendered");
  const [authenticatedUserToken, _setAuthenticatedUserToken] = useUser();
  const { personId, giftId } = useParams();
  const [gift, setGift] = useState(null);
  const [personName, setPersonName] = useState("");
  const accessDb = useAccessDbHook();

  useEffect(() => {
    setGift(null);
    let request = new Request(`https://gift-backend.onrender.com/api/people/${personId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticatedUserToken}`,
      },
    });
    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Invalid response.");
        return res.json();
      })
      .then((res) => {
        const gift = res.data.gifts.find((gift) => gift._id === giftId);
        setGift(gift);
        setPersonName(res.data.fullName.split(" ")[0].slice(0));
      })
      .catch(console.warn);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const giftIdea = formData.get("giftIdea");
    const store = formData.get("store");
    const link = formData.get("url");

    const giftData = {
      giftName: giftIdea,
      store: store,
      website: link,
    };

    // Edit gift
    if (giftId) {
      accessDb(
        giftData,
        `https://gift-backend.onrender.com/api/people/${personId}/gifts/${giftId}`,
        e.target.id === "save" ? "PATCH" : "DELETE",
        authenticatedUserToken,
        -1
      );
    }
    // Add gift
    else {
      accessDb(giftData, `https://gift-backend.onrender.com/api/people/${personId}/gifts`, "POST", authenticatedUserToken, -1);
    }
  };

  return (
    <motion.main
      className="container"
      initial={{ y: "100%", opacity: "0" }}
      animate={{ y: 0, opacity: "1" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <CheckAuth />
      <Styled.GiftAddEditH1>
        {giftId ? "Edit" : "Add"} {`a gift idea for ${personName}`}
      </Styled.GiftAddEditH1>

      <Styled.GiftAddEditIllustration
        src={bannerIllustration}
        alt="a smiling woman raising her hands with gift boxes"
      ></Styled.GiftAddEditIllustration>

      <Styled.FormForGifts>
        <label htmlFor="name">Gift Idea</label>
        <Styled.TextInput type="text" id="giftIdea" name="giftIdea" defaultValue={gift ? gift.giftName : ""}></Styled.TextInput>

        <label htmlFor="name">Store</label>
        <Styled.TextInput type="text" id="store" name="store" defaultValue={gift ? gift.store : ""}></Styled.TextInput>

        <label htmlFor="name">Website URL</label>
        <Styled.TextInput type="text" id="url" name="url" defaultValue={gift ? gift.website : ""}></Styled.TextInput>

        {giftId ? (
          <>
            <Styled.Button type="submit" id="save" className="btn-save" style={{ marginTop: "2rem" }} onClick={handleSubmit}>
              Save
            </Styled.Button>

            <Styled.Button $secondary type="button" id="del" onClick={handleSubmit} style={{ marginTop: "2rem" }}>
              Delete
            </Styled.Button>
          </>
        ) : (
          <Styled.Button type="submit" style={{ marginTop: "2rem" }} onClick={handleSubmit}>
            Add Gift
          </Styled.Button>
        )}
      </Styled.FormForGifts>
    </motion.main>
  );
};

export default AddEditGift;
