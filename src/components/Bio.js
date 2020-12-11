import React from 'react';
import avatar from '../assets/avatar.jpeg';
import { rhythm } from '../utils/typography';
import { username, description } from '../../config';

class Bio extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        {/* {avatar && (
          <img
            src={avatar}
            alt={username}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
              borderRadius: '50%',
            }}
          />
        )} */}

        <span style={{ display: 'flex', alignItems: 'center' }}>
          {description}
        </span>
      </div>
    );
  }
}

export default Bio;
