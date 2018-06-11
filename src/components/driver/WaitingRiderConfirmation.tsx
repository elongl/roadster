import React, { StatelessComponent } from 'react';
import viewportCenter from '../../styles/viewportCenter';
import { Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserDetails from '../../types/UserDetails';
import MessageLoader from '../common/MessageLoader';
const WaitingRiderConfirmation: StatelessComponent<{
  rider: UserDetails | null;
  unmatchDriver: () => void;
}> = ({ rider, unmatchDriver }) =>
  !rider ? (
    <MessageLoader>Loading your pick up.</MessageLoader>
  ) : (
    (rider.phoneNumber && console.log('972' + rider.phoneNumber.slice(1))) || (
      <div style={{ ...viewportCenter, color: 'white', textAlign: 'center' }}>
        <Image rounded size="small" src={rider.avatar} style={{ height: 150 }} />
        <strong style={{ fontStyle: 'italic', fontSize: '1.5rem', margin: '1.5rem' }}>
          Waiting for {rider.displayName}'s confirmation.
        </strong>
        <p style={{ fontSize: '1.25rem' }}>
          To contact {rider.displayName}:
          <a
            style={{ color: 'lightblue', display: 'block' }}
            href={`tel: ${rider.phoneNumber}`}
          >
            {rider.phoneNumber}.
          </a>
          <span style={{ marginTop: '1rem' }}>(Click To Call)</span>
        </p>

        <Button
          as="a"
          color="green"
          size="large"
          style={{ width: '60%', marginTop: '0.5rem' }}
          icon="whatsapp"
          content={`Notify ${rider.displayName}!`}
          href={`whatsapp://send?phone=972${rider.phoneNumber &&
            rider.phoneNumber.slice(1)}&text=I'm coming to pick you up! Open Roadster.`}
        />
        <Button
          as={Link}
          color="google plus"
          to="/"
          size="large"
          style={{ width: '60%', marginTop: '0.5rem' }}
          icon="cancel"
          content="Nevermind, cancel."
          onClick={unmatchDriver}
        />
      </div>
    )
  );

export default WaitingRiderConfirmation;
