import React from 'react';
import UserDetails from '../ORM/UserDetails';
const Home: React.StatelessComponent<{
  user: UserDetails | boolean;
}> = props => {
  console.log(props.user);
  return (
    <div>
      <h1>This is the home page.</h1>
    </div>
  );
};
export default Home;
