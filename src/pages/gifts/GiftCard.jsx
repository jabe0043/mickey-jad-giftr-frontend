import React from "react";
import * as Styled from "../../styled/components";

const GiftCard = ({ gift, personId, onClick }) => {
  console.log('GIFTCARD')

  return (
    <Styled.GiftCard onClick={onClick}>
      <Styled.GiftCloseButton >
        <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="black" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L4 3.29289L6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447C7.54882 0.841709 7.54882 1.15829 7.35355 1.35355L4.70711 4L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L4 4.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L3.29289 4L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"/>
        </svg>
      </Styled.GiftCloseButton>
      <Styled.GiftName>{gift.giftName}</Styled.GiftName>
      <Styled.GiftStore>{gift.store}</Styled.GiftStore>
      <Styled.GiftUrl>{gift.website}</Styled.GiftUrl>
    </Styled.GiftCard>
  );
};

export default GiftCard;
