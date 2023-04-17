import React from "react";
import * as Styled from "../../styled/components";
import { useNavigate } from "react-router-dom";

const GiftCard = ({ gift }) => {
  const navigate = useNavigate();

  return (
    <Styled.GiftCard
      onClick={() => {
        console.log("gift card clicked", gift);
        navigate(`/gift/edit/${gift._id}`);
      }}
    >
      <Styled.GiftCloseButton>
        <i className="bi bi-pencil"></i>
      </Styled.GiftCloseButton>
      <Styled.GiftName>{gift.giftName}</Styled.GiftName>
      <Styled.GiftStore>{gift.store}</Styled.GiftStore>
      <Styled.GiftUrl>{gift.website}</Styled.GiftUrl>
    </Styled.GiftCard>
  );
};

export default GiftCard;
