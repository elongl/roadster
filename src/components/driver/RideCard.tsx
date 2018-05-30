import React, { StatelessComponent } from 'react';
import { Card, Image } from 'semantic-ui-react';
import UserRide from '../../typings/UserRide';
import { Link } from 'react-router-dom';
const RideCard: StatelessComponent<RideCard> = ({ userRide, className }) => (
  <Card
    link
    raised
    className={className}
    style={{ width: '85%', margin: '0.5rem' }}
    as={Link}
    to={`/drive/${userRide.ride.id}`}
  >
    <Card.Content>
      <Image
        avatar
        floated="right"
        size="mini"
        src={userRide.user.avatar}
        style={{ margin: 0, width: '3.5rem', height: '3.5rem' }}
      />
      <Card.Header>{userRide.user.displayName}</Card.Header>
      <Card.Meta>King of the Road.</Card.Meta>
      <Card.Description>
        <strong>From:</strong> {userRide.ride.origin}
        <br />
        <strong>To:</strong> {userRide.ride.destination}
      </Card.Description>
    </Card.Content>
  </Card>
);

interface RideCard {
  className?: string;
  userRide: UserRide;
}
export default RideCard;
