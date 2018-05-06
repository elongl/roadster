import SocialNetworkButton from './SocialNetworkButton';
import EntryTransition from './EntryTransition';
import React from 'react';
import center from '../styles/center';
const Introduction = () => (
  <div style={center}>
    <h1
      style={{
        marginTop: '2rem',
        fontSize: '3.1rem',
        color: 'white',
        letterSpacing: 6,
        textTransform: 'uppercase'
      }}
    >
      roadster
    </h1>
    <EntryTransition animation="fade up" duration={2750}>
      <p
        style={{
          width: '85%',
          fontSize: '1.4rem',
          color: 'white',
          margin: '2rem',
          textAlign: 'center'
        }}
      >
        <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Roadster </span>
        is an app that allows you to share a ride with people nearby you.
      </p>
    </EntryTransition>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem'
      }}
    >
      <h1 style={{ color: 'white', marginTop: '1rem' }}>Get Started</h1>
      <SocialNetworkButton name="Google" colorAndIcon="google plus" />
      <SocialNetworkButton name="Facebook" colorAndIcon="facebook" />
      <SocialNetworkButton name="Twitter" colorAndIcon="twitter" />
    </div>
  </div>
);

export default Introduction;
