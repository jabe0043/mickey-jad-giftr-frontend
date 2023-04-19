import styled from "styled-components";

/*****************************
 ** LAYOUT - HEADER
 ******************************/

const AppHeader = styled.div`
  display: flex;
  min-width: 100vw;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.default.fontSizes.xl};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

/*****************************
 ** PAGE 0 - LOGIN PAGE
 ******************************/

export const LoginH1 = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
`;

export const LoginH2 = styled.h2`
  font-family: ${({ theme }) => theme.default.fonts["Lato"]};
  font-size: ${({ theme }) => theme.default.fontSizes.l};
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
  transition: all 0.25s ease-in-out;

  &:hover{
    transform: translateY(-.25rem);  
    box-shadow:-3px 11px 12px -2px rgba(0,0,0,0.29);
  }
`;

// card avatar image styling
const CardAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 1rem;
`;

export const GiftsBannerAvatar = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.default.colors.pureWhite};
  border-radius: 10rem;
  border: solid 0.15rem ${({ theme }) => theme.default.colors.text};
  padding: .5rem;
  align-self: center;
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
  align-self: flex-end;
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
  // gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.25s ease-in-out;

  &:hover{
    transform: translateY(-.25rem);  
    box-shadow:-3px 11px 12px -2px rgba(0,0,0,0.29);
    background-color: ${({ theme }) => theme.default.colors.button} 
  }
`;

export const GiftName = styled.h3`
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
  margin-top: -1rem;
`;

export const GiftStore = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.ls};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

export const GiftUrl = styled.a`
  font-size: ${({ theme }) => theme.default.fontSizes.ls};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
  color: ${({ theme }) => theme.default.colors.text};
  width: max-content;
`;

export const GiftCloseButton = styled.div`
  width: ${({ theme }) => theme.default.fontSizes.m};
  height: ${({ theme }) => theme.default.fontSizes.m};
  position: relative;
  align-self: flex-end;
  top: 0;
  right: 0;
  margin-top:-.5rem;
`;

/*****************************
 ** FORM STYLING
 ******************************/
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const TextInput = styled.input`
  padding: 0.5rem;
  border: solid 0.125rem ${({ theme }) => theme.default.colors.text};
  border-radius: 0.35rem;
`;

const ButtonsDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: solid 0.1rem ${({ theme }) => theme.default.colors.text};
  border-radius: 0.35rem;
  background-color: ${(props) =>
    props.$secondary
      ? props.theme.default.colors.buttonSecondary
      : props.theme.default.colors.button};
  transition: background-color 0.25s ease-in-out;

  &:hover{
    background-color: ${(props) => props.$secondary 
      ? props.theme.default.colors.buttonSecondaryHover
      : props.theme.default.colors.buttonHover};
  }

`;

export const FormForGifts = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/*****************************
 ** ADD/EDIT PERSON COMPONENT
 ******************************/

const PeopleBanner = styled.div`
  background-color: ${({ theme }) => theme.default.colors.backgroundSecondary};
  border: solid 0.1rem ${({ theme }) => theme.default.colors.text};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem;
`;

const SelectAvatarPrompt = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.s};
  align-self: center;
`;

/*****************************
 ** ADD/EDIT GIFT COMPONENT
 ******************************/

export const GiftAddEditH1 = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.xl};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

export const GiftAddEditIllustration = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: contain;
`;

export {
  PageBanner,
  Title,
  CardsList,
  Card,
  CardAvatar,
  CardInfo,
  CardTitle,
  AppHeader,
  Logo,
  FormField,
  TextInput,
  ButtonsDiv,
  Button,
  PeopleBanner,
  SelectAvatarPrompt,
};
