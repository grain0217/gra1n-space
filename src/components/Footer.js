import React from 'react';
import { Link } from 'gatsby';

import { username } from '../../config';
import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    const hideTag = this.props.hideTag;
    const hideAbout = this.props.hideAbout;
    return (
      <footer
        className="footer"
        style={{
          paddingTop: rhythm(1),
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div> © 2020 {username} </div>
        <div>
          {/* {!hideTag && (
            <Link to="/tag" style={{ marginRight: rhythm(1 / 5), color: '#42b983' }}>
              分类
            </Link>
          )} */}
          {!hideAbout && <Link to="/about">关于</Link>}
        </div>
      </footer>
    );
  }
}

export default Footer;
