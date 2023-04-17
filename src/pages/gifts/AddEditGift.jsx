import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext"; //
import CheckAuth from "../../utils/CheckAuth";
import * as Styled from "../../styled/components";

const AddEditGift = () => {
  return (
    <main className="container">
      <CheckAuth />
      <div>AddEditGift</div>
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
      </Styled.FormForGifts>
    </main>
  );
};

export default AddEditGift;
