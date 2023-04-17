import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //
import CheckAuth from "../../utils/CheckAuth";
import * as Styled from "../../styled/components";
import bannerIllustration from "../../assets/giftAddEditPageIllustration.png";

const AddEditGift = () => {
  const person = { name: "Mickey" };

  return (
    <main className="container">
      <CheckAuth />
      <Styled.GiftAddEditH1>{`Add a gift idea for ${person.name}`}</Styled.GiftAddEditH1>
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
        ></Styled.TextInput>
        <label htmlFor="name">Store</label>
        <Styled.TextInput
          type="text"
          id="store"
          name="store"
        ></Styled.TextInput>
        <label htmlFor="name">Website URL</label>
        <Styled.TextInput type="text" id="url" name="url"></Styled.TextInput>
        <Styled.Button
          type="submit"
          className="btn save"
          style={{ marginTop: "2rem" }}
        >
          Add Gift
        </Styled.Button>
      </Styled.FormForGifts>
    </main>
  );
};

export default AddEditGift;
