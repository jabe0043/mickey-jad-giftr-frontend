import styled from "styled-components";
import { useTheme } from "styled-components";
import homeImg from "../assets/pastel_gradient_2.jpg";

function RandomBgColor() {
  const theme = useTheme();
  const bgOptions = theme.default.colors.bgOptions;

  const randomNum = Math.floor(Math.random() * bgOptions.length);
  return `#${bgOptions[randomNum]}`;
}

/*****************************
 ** LAYOUT - HEADER
 ******************************/

const AppHeader = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  margin-top: 1rem;
  padding-left: .5rem;
  padding-right: .1rem;

`;

const HeaderIconLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderIconRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.default.fontSizes.xl};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

/*****************************
 ** PAGE 0 - LOGIN PAGE
 ******************************/

const Login = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginH1 = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
  align-self: flex-start;
`;

export const LoginH2 = styled.h2`
  font-family: ${({ theme }) => theme.default.fonts[0]};
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

/*************************************
 ** PAGE 1 - HOME(PEOPLE) PAGE
 ************************************/

const PageBanner = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem !important;
  border-radius: 0.45rem;
  background-image: url(${homeImg});
  background-fit: contain;
  background-position: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.default.colors.text};
  font-family: ${({ theme }) => theme.default.fonts[0]};
  font-size: ${({ theme }) => theme.default.fontSizes.xxl};
  font: ${({ theme }) => theme.default.fontWeights.semiBold};
  align-self: flex-start;
  padding: 2rem 0 0 2rem;
`;

const Subtitle = styled.h2`
  align-self: flex-start;
  color: ${({ theme }) => theme.default.colors.text};
  font-family: ${({ theme }) => theme.default.fonts[0]};
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
  font-size: ${({ theme }) => theme.default.fontSizes.m};
  margin: 0rem;
  margin-top: 2rem;
`;

// ul that holds the list items (cards)
const CardsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(${({ theme }) => theme.default.layout.cardColumnCount}, 1fr);
  column-gap: 0.75rem;
  padding: 0;
  margin: 1rem 0;
  gap: 0.75rem;
`;

// this is the list item styling (for people. Will need to add conditions for gifts)
const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  transition: all 0.25s ease-in-out;
  border-radius: 0.35rem;
  cursor: pointer;
  background-color: ${RandomBgColor};
  break-inside: avoid-column;
  margin-bottom: 0.75rem;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: -3px 10px 10px -2px rgba(0, 0, 0, 0.29);
    background-color: ${({ theme }) => theme.default.colors.backgroundSecondary};
  }
`;

// card avatar image styling      //avatar div on people page
const CardAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  align-self: center;
`;

// card title and dob
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// this is the persons name in the card;
const CardTitle = styled.p`
  font-weight: ${({ theme }) => theme.default.fonts[0]};
  font-weight: ${({ theme }) => theme.default.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.default.fontSizes.m};
`;

const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.default.colors.text};
`;

/*****************************
 ** PAGE 2 - GIFT PAGE
 ******************************/

export const GiftsBanner = styled.div`
  background-color: ${({ theme }) => theme.default.colors.backgroundSecondary};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-image: url(${homeImg});
  background-fit: contain;
  background-position: center;
`;

export const GiftsBannerAvatar = styled.div`
  //ADD/EDIT PERSON PAGE
  width: 10rem;
  height: 10rem;
  padding: 0rem;
  margin: 0rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GiftsBannerName = styled.h1`
  font-weight: ${({ theme }) => theme.default.fontWeights.semiBold};
  margin-top: 1rem;
`;

export const GiftsBannerDob = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.m};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
  margin-top: 1rem;
`;

export const GiftsBannerEditButton = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  align-self: flex-end;
  background-color: ${({ theme }) => theme.default.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

export const GiftTitle = styled.h2`
  padding-top: 1rem;
  color: ${({ theme }) => theme.default.colors.text};
  font-size: ${({ theme }) => theme.default.fontSizes.m};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

//here are your gifts for ...
export const GiftTitleName = styled.span`
  font-weight: ${({ theme }) => theme.default.fontWeights.medium};
`;

/*****************************
 ** COMPONENT - GIFT CARD
 ******************************/

export const GiftCardContainer = styled.div`
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(${({ theme }) => theme.default.layout.cardColumnCount}, 1fr);
  column-gap: 0.75rem;
  // padding: 0;
  // margin: 1rem 0;
  gap: 0.75rem;
`;

export const GiftCard = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 0.75rem;
  padding: 1rem;
  transition: all 0.25s ease-in-out;
  background-color: ${RandomBgColor};
  overflow: hidden;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: -3px 11px 12px -2px rgba(0, 0, 0, 0.29);
    background-color: ${({ theme }) => theme.default.colors.white};
  }
`;

export const GiftName = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.m};
  word-wrap: break-word;
  font-weight: ${({ theme }) => theme.default.fontWeights.semiBold};
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
  margin-top: -0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

/*****************************
 ** FORM STYLING
 ******************************/
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.default.fonts[3]};
  font-size: ${({ theme }) => theme.default.fontSizes.s};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.default.margins.regular};
`;

const TextInput = styled.input`
  padding: 0.5rem;
  border: solid 0.05rem ${({ theme }) => theme.default.colors.text};
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const ButtonsDiv = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.35rem;
  background-color: ${(props) => (props.$secondary ? props.theme.default.colors.white : props.theme.default.colors.button)};
  border: .15rem solid;
  // border: none;
  border-color:  ${(props) => (props.$secondary ? props.theme.default.colors.buttonSecondaryHover : props.theme.default.colors.button)};
  transition: all 0.25s ease-in-out;

  &:hover {
    cursor: pointer;
    border: .15rem solid;
    border-color:  ${(props) => (props.$secondary ? props.theme.default.colors.buttonSecondary : props.theme.default.colors.buttonHover)};
    background-color: ${(props) => (props.$secondary ? props.theme.default.colors.buttonSecondary : props.theme.default.colors.buttonHover)};
    color: ${(props) => (props.$secondary ? props.theme.default.colors.text : props.theme.default.colors.white)}
    font-weight: ${({ theme }) => theme.default.fontWeights.semiBold}
    // border-color:  ${(props) => (props.$secondary ? props.theme.default.colors.buttonSecondary : props.theme.default.colors.button)};

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem 0 2rem;
  border-radius: 0.45rem;

  background-image: url(${homeImg});
  background-fit: contain;
  background-position: center;
`;

export const PersonAddEditTitle = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.xl};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
`;

const SelectAvatarPrompt = styled.p`
  font-size: ${({ theme }) => theme.default.fontSizes.s};
  align-self: center;
`;

/*****************************
 ** ADD/EDIT GIFT COMPONENT
 ******************************/

export const GiftAddEditH1 = styled.h1`
  font-size: ${({ theme }) => theme.default.fontSizes.l};
  font-weight: ${({ theme }) => theme.default.fontWeights.regular};
  padding: 0.75rem;
  align-self: flex-start;
`;

export const GiftAddEditIllustration = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: contain;
`;

export {
  Login,
  PageBanner,
  Title,
  Subtitle,
  CardsList,
  Card,
  CardAvatar,
  CardInfo,
  CardTitle,
  CardSubtitle,
  AppHeader,
  HeaderIconLeft,
  HeaderIconRight,
  Logo,
  FormField,
  TextInput,
  ButtonsDiv,
  Button,
  PeopleBanner,
  SelectAvatarPrompt,
};
