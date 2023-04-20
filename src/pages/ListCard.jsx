import {Card, CardAvatar, CardInfo, CardTitle, CardSubtitle} from '../styled/components'


// will need to create a context provider or state

// this needs to be conditional rendering depending on person or gift card
export default function ListCard(props){

    const person =  props.person;

    return(
        <Card className='person__card' onClick={props.onClick}> {/*adding the handleCardClick function that was passed down as prop from People comp. */}
            <CardAvatar className='person__avatar'>
                <img src={person.avatar} className="randomAvatar" alt={`avatar for${person.fullName}`}></img>
            </CardAvatar>
            <CardInfo>
                <CardTitle className='person__fullname'>{ person.fullName } </CardTitle>
                <CardSubtitle className='person__dob'>{ person.dob }</CardSubtitle>
            </CardInfo>
        </Card>
    )
}




