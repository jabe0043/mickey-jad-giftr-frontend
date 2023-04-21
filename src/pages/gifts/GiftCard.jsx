import { useNavigate } from "react-router-dom";

import * as Styled from "../../styled/components";

const GiftCard = ({ gift, personId }) => {
  const navigate = useNavigate();

  return (
    <Styled.GiftCard
      onClick={() => {
        navigate(`/gift/${personId}/edit/${gift._id}`);
      }}
    >
      <Styled.GiftName>{gift.giftName}</Styled.GiftName>
      <Styled.GiftStore>{gift.store}</Styled.GiftStore>
      <Styled.GiftUrl>{gift.website}</Styled.GiftUrl>
    </Styled.GiftCard>
  );
};

export default GiftCard;
