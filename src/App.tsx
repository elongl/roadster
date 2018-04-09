import * as React from 'react';
import { Component } from 'react';

interface Props {
  hello: string;
}
class App extends Component<Props> {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <h1
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Welcome to Roadster!
        </h1>
      </div>
    );
  }
}
export default App;
