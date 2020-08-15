import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import { disqusId } from '../../config';

class Comment extends React.Component {
  render() {
    const identifier = `grainnn/${window.location.pathname}`;
    return (
      <ReactDisqusComments
        shortname={disqusId}
        identifier={identifier}
        title={this.props.title}
        url={this.props.url}
        category_id={this.props.tag}
      />
    );
  }
}

export default Comment;
