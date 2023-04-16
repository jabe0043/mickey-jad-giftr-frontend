import styled from "styled-components";



/*****************************
** LAYOUT - HEADER
******************************/

const AppHeader = styled.div`
    display: flex;
    min-width: 100vw;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.a`
  font-size: ${({ theme }) => theme.default.fontSizes.xl};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;



/*****************************
** PAGE 1 - HOME(PEOPLE) PAGE 
******************************/

const PageBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.default.colors.text};
  font-size: ${({ theme }) => theme.default.fontSizes.l};
`;

// ul that holds the list items (cards)
const CardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

// this is the list item styling (for people. Will need to add conditions for gifts)
const Card = styled.li`
  background-color: ${({ theme }) => theme.default.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  gap: 2rem;
  border: solid 0.25rem ${({ theme }) => theme.default.colors.text};
  border-radius: 1rem;
  padding: 1rem;
`;

// card avatar image styling
const CardAvatar = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.default.colors.pureWhite};
  border-radius: 10rem;
  border: solid 0.15rem ${({ theme }) => theme.default.colors.text};
`;

// card title and dob
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// this is the persons name in the card;
const CardTitle = styled.p`
  font-weight: ${({ theme }) => theme.default.fontWeights.semiBold};
`;



/*****************************
** PAGE 2 - GIFT PAGE 
******************************/

export const GiftsBanner = styled.div`
  background-color: ${({ theme }) => theme.default.colors.backgroundSecondary};
  border: solid 0.1rem ${({ theme }) => theme.default.colors.text};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const GiftsBannerAvatar = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.default.colors.pureWhite};
  border-radius: 10rem;
  border: solid 0.15rem ${({ theme }) => theme.default.colors.text};
`;

export const GiftsBannerName = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.semiBold};
  margin-top: 1rem;
`;

export const GiftsBannerDob = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.m};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
  margin-top: 1rem;
`;

export const GiftsBannerEditButton = styled.div`
  width: ${({ theme }) => theme.default.fontSizes.xxl};
  height: ${({ theme }) => theme.default.fontSizes.xxl};
  position: absolute;
  top: 6rem;
  right: 2rem;
`;

export const GiftTitle = styled.h2`
  color: ${({ theme }) => theme.default.colors.text};
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

export const GiftTitleName = styled.span`
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
`;



/*****************************
** COMPONENT - GIFT CARD
******************************/

export const GiftCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;

export const GiftCard = styled.div`
  background-color: ${({ theme }) => theme.default.colors.pureWhite};
  border-radius: 0.5rem;
  border: solid 0.1rem ${({ theme }) => theme.default.colors.text};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const GiftName = styled.h3`
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
`;

export const GiftStore = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.ls};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

export const GiftUrl = styled.a`
  font-size: ${({ theme }) => theme.default.fontSizes.ls};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`; 

export const GiftCloseButton = styled.div`
  width: ${({ theme }) => theme.default.fontSizes.m};
  height: ${({ theme }) => theme.default.fontSizes.m};
  position: relative;
  align-self: flex-end;
  top: 0;
  right: 0;
`;




//FORM STYLING
// Form styling (used across pages)
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const TextInput = styled.input`
  padding: .5rem;
  border: solid 0.125rem ${({ theme }) => theme.default.colors.text};
  border-radius: .35rem;
`;

const ButtonsDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  padding: .5rem;
  border: solid 0.1rem ${({ theme }) => theme.default.colors.text};
  border-radius: .35rem;
`;



export{PageBanner, Title, CardsList, Card, CardAvatar, CardInfo, CardTitle, AppHeader, Logo, FormField, TextInput, ButtonsDiv, Button};
