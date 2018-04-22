import React from 'react';
import UserDetails from '../ORM/UserDetails';
const Home: React.StatelessComponent<{
  user: UserDetails | undefined;
}> = props => {
  console.log(props.user);
  if (props.user) {
    return (
      <div>
        <img src={props.user.avatar} />
        <h3>Display name: {props.user.displayName}</h3>
        <h3>Phone number: {props.user.phoneNumber}</h3>
        <h3>Is Driver: {props.user.isDriver}</h3>
      </div>
    );
  }
  return <h1>No user logged in</h1>;
};
export default Home;
