import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import { disqusId } from '../../config';

class Comment extends React.Component {
  render() {
    return (
      <ReactDisqusComments
        shortname={disqusId}
        // identifier={this.props.url}
        // title={this.props.title}
        // url={this.props.url}
        // category_id={this.props.tag}
      />
    );
  }
}

export default Comment;
