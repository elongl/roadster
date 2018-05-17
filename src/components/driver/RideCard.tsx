import React, { StatelessComponent } from 'react';
import { Card, Image } from 'semantic-ui-react';
import Location from '../../typings/Location';
const RideCard: StatelessComponent<RideCard> = props => (
  <Card link style={{ width: '85%', margin: '0.5rem' }}>
    <Card.Content>
      <Image floated="right" size="mini" src={props.riderAvatar} style={{ margin: 0 }} />
      <Card.Header>{props.riderName}</Card.Header>
      <Card.Meta>King of the Road.</Card.Meta>
      <Card.Description>
        <strong>From:</strong> Shoham, Lakish, 123.
        <br />
        <strong>To:</strong> Tel Aviv, Reines, 23
      </Card.Description>
    </Card.Content>
  </Card>
);
interface RideCard {
  riderName: string;
  startPoint: Location;
  endPoint: Location;
  riderAvatar: string;
}
export default RideCard;
