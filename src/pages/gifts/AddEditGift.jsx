import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUser } from "../../context/userContext";
import CheckAuth from "../../utils/CheckAuth";
import useAccessDbHook from "../../hooks/useAccessDb";

import * as Styled from "../../styled/components";
import { motion } from "framer-motion";

const AddEditGift = () => {
  const [gift, setGift] = useState(null);
  const [personName, setPersonName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const { personId, giftId } = useParams();
  const [authenticatedUserToken, _setAuthenticatedUserToken] = useUser();
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
      website: link.includes("http") ? link : "https://" + link,
    };

    if (e.target.id === "save") {
      // console.log('yes')
      if (!validateForm(giftData)) {
        return;
      }
    } else {
      if (confirm("Are you sure you want to delete this gift?")) {
      } else {
        return;
      }
    }

    // Edit/Delete gift
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

  function validateForm(data) {
    let errors = {};
    let isValid = data.giftName && data.store && data.website ? true : false;
    const pathname = location.pathname;

    if (!isValid) {
      errors.postErr = "Please include the gifts name, store and website.";
      errors.patchErr = "Please include the gifts name, store and website.";
      // switch (pathname) {
      //   case `/gift/${pathname.split("/")[2]}/add`:
      //     errors.postErr = "Please include the gifts name, store and website.";
      //     break;
      //   case `/gift/${pathname.split("/")[2]}/edit/${pathname.split("/")[4]}`:
      //     // console.log(isValid);
      //     errors.patchErr = "Please add an update before saving.";
      //     isValid = data.giftName !== gift.giftName || data.store !== gift.store || data.website !== gift.website ? true : false;
      setFormErrors(errors);
    }
    setFormValid(isValid);
    return isValid;
  }

  return (
    <motion.main
      className="container"
      initial={{ y: "100%", opacity: "0" }}
      animate={{ y: 0, opacity: "1" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <CheckAuth />
      <Styled.PageBanner>
        <Styled.GiftAddEditH1>
          {giftId ? "Edit" : "Add"} {`a gift idea for`}
          <br />
          <strong>{`${personName}`}</strong>
        </Styled.GiftAddEditH1>
      </Styled.PageBanner>

      <Styled.FormForGifts>
        {formErrors.postErr && <span className="error">{formErrors.postErr}</span>}
        {formErrors.patchErr && <span className="error">{formErrors.patchErr}</span>}
        <label htmlFor="name">Gift Idea</label>

        <Styled.TextInput required type="text" id="giftIdea" name="giftIdea" defaultValue={gift ? gift.giftName : ""}></Styled.TextInput>

        <label htmlFor="name">Store</label>
        <Styled.TextInput required type="text" id="store" name="store" defaultValue={gift ? gift.store : ""}></Styled.TextInput>

        <label htmlFor="name">Website URL</label>
        <Styled.TextInput required type="text" id="url" name="url" defaultValue={gift ? gift.website : ""}></Styled.TextInput>

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
          <Styled.Button id="save" type="submit" style={{ marginTop: "2rem" }} onClick={handleSubmit}>
            Add Gift
          </Styled.Button>
        )}
      </Styled.FormForGifts>
    </motion.main>
  );
};

export default AddEditGift;
