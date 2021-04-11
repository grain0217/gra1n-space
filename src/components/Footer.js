import React from 'react';
import { Link } from 'gatsby';

import { username } from '../../config';
import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    const { hideTag, hideAbout } = this.props;
    return (
      <footer
        className="footer"
        style={{
          paddingTop: rhythm(1),
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div> © 2021 {username} </div>
        <div className="anchor">
          {!hideTag && (
            <Link to="/tags" style={{ marginRight: rhythm(1 / 4) }}>
              分类
            </Link>
          )}
          {!hideAbout && <Link to="/about">关于</Link>}
        </div>
      </footer>
    );
  }
}

export default Footer;
