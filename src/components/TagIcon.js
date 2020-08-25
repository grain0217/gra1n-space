import React from 'react';

class TagIcon extends React.Component {
  render() {
    return (
      <svg
        className="i-tag"
        viewBox="0 0 32 32"
        width="16"
        height="16"
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="24" cy="8" r="2"></circle>
        <path d="M2 18 L18 2 30 2 30 14 14 30 Z"></path>
      </svg>
    );
  }
}

export default TagIcon;
