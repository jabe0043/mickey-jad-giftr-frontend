import React from "react";
import * as Styled from "../../styled/components";
import { useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/utils";

const GiftCard = ({ gift, personId }) => {
  const navigate = useNavigate();

  return (
    <Styled.GiftCard
      className='cardHover'
      onClick={() => {
        navigate(`/gift/${personId}/edit/${gift._id}`);
      }}
    >
      <Styled.GiftName>{capitalizeFirstLetter(gift.giftName)}</Styled.GiftName>
      <Styled.GiftStore>{capitalizeFirstLetter(gift.store)}</Styled.GiftStore>
      <Styled.GiftUrl>{capitalizeFirstLetter(gift.website)}</Styled.GiftUrl>
    </Styled.GiftCard>
  );
}

export default GiftCard;
