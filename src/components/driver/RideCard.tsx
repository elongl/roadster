import React, { StatelessComponent } from 'react';
import { Card, Image } from 'semantic-ui-react';
import UserRide from '../../typings/UserRide';
import { Link } from 'react-router-dom';

const RideCard: StatelessComponent<{
  className?: string;
  userRide: UserRide;
}> = ({ userRide: { user, ride }, className }) => (
  <Card
    link
    raised
    className={className}
    style={{ width: '85%', margin: '0.5rem' }}
    as={Link}
    to={`/drive/${ride.id}`}
  >
    <Card.Content>
      <Image
        avatar
        floated="right"
        size="mini"
        src={user.avatar}
        style={{ margin: 0, width: '3.5rem', height: '3.5rem' }}
      />
      <Card.Header>{user.displayName}</Card.Header>
      <Card.Meta>{user.phoneNumber}</Card.Meta>
      <Card.Description>
        <strong>From:</strong> {ride.origin}
        <br />
        <strong>To:</strong> {ride.destination}
      </Card.Description>
    </Card.Content>
  </Card>
);
export default RideCard;
