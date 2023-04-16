import {useTheme} from 'styled-components';
import {Card, CardAvatar, CardInfo, CardTitle} from '../styled/components'


// will need to create a context provider or state

// this needs to be conditional rendering depending on person or gift card
export default function ListCard(props){

    const person =  props.person;
    const theme = useTheme();



    return(
        <Card className='person__card' onClick={props.onClick}> {/*adding the handleCardClick function that was passed down as prop from People comp. */}
            <CardAvatar className='person__avatar'>
                <img src={person.avatar} alt={`avatar for${person.fullName}`}></img>
            </CardAvatar>
            <CardInfo>
                <CardTitle className='person__fullname'>{ person.fullName } </CardTitle>
                <p className='person__dob'>{ person.dob }</p>
            </CardInfo>
        </Card>
    )
}




