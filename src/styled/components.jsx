import styled from 'styled-components';


const PageBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`

const Title = styled.h1`
    color: ${({theme}) => theme.default.colors.text};
`

// ul that holds the list items (cards)
const CardsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding:0;
    margin: 0;
`

// this is the list item styling (for people. Will need to add conditions for gifts)
const Card = styled.li`
    background-color: ${({theme}) => theme.default.colors.backgroundSecondary};
    display: flex;
    align-items: center;
    gap: 2rem;
    border: solid .25rem ${({theme}) => theme.default.colors.text};
    border-radius: 1rem;
    padding: 1rem;
`

// card avatar image styling
const CardAvatar = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: ${({theme}) => theme.default.colors.pureWhite};
    border-radius: 10rem;
    border: solid .15rem ${({theme}) => theme.default.colors.text};
`

// card title and dob
const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

// this is the persons name in the card;
const CardTitle = styled.p`
    font-weight: ${({theme}) => theme.default.fontWeights.semiBold};
`


export{PageBanner, Title, CardsList, Card, CardAvatar, CardInfo, CardTitle};