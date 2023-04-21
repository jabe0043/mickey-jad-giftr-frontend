import { Card, CardAvatar, CardInfo, CardTitle, CardSubtitle } from "../../styled/components";

export default function PersonCard(props) {
  const person = props.person;

  return (
    <Card className="person__card" onClick={props.onClick}>
      <CardAvatar className="person__avatar">
        <img src={person.avatar} className="randomAvatar" alt={`avatar for ${person.fullName}`} />
      </CardAvatar>

      <CardInfo>
        <CardTitle className="person__fullname">{person.fullName} </CardTitle>
        <CardSubtitle className="person__dob">{person.dob}</CardSubtitle>
      </CardInfo>
    </Card>
  );
}
