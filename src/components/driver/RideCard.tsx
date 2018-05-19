import React, { StatelessComponent } from 'react';
import { Card, Image } from 'semantic-ui-react';
import RideWithUser from '../../typings/RideWithUser';
const RideCard: StatelessComponent<RideCard> = ({ ride, onClick, className }) => (
  <Card
    link
    raised
    className={className}
    style={{ width: '85%', margin: '0.5rem' }}
    onClick={() => onClick(ride.id)}
  >
    <Card.Content>
      <Image
        floated="right"
        size="mini"
        src={ride.user.avatar.substring(0, ride.user.avatar.indexOf('?')) + '?sz=200'}
        style={{ margin: 0, width: '3.5rem', height: '3.5rem' }}
      />
      <Card.Header>{ride.user.displayName}</Card.Header>
      <Card.Meta>King of the Road.</Card.Meta>
      <Card.Description>
        <strong>From:</strong> Shoham, Lakish, 123.
        <br />
        <strong>To:</strong> Tel Aviv, Reines, 23.
      </Card.Description>
    </Card.Content>
  </Card>
);
interface RideCard {
  className?: string;
  ride: RideWithUser;
  onClick: (id: number) => void;
}
export default RideCard;
