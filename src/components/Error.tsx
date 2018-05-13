import React, { StatelessComponent } from 'react';
import viewportCenter from '../styles/viewportCenter';
import { Image, Button } from 'semantic-ui-react';

interface ErrorProps {
  header: string;
  content: string;
}
const Error: StatelessComponent<ErrorProps> = ({ header, content }) => (
  <div
    style={{
      ...viewportCenter,
      textAlign: 'center',
      color: 'white'
    }}
  >
    <Image src="/assets/images/cloud-error.svg" size="small" />
    <h2>{header}</h2>
    <h3 style={{ width: '60%', fontWeight: 100, fontStyle: 'italic' }}>{content}</h3>
    <Button
      inverted
      negative
      circular
      icon="repeat"
      size="big"
      content="Try Again"
      onClick={() => location.replace('/')}
    />
  </div>
);

export default Error;
