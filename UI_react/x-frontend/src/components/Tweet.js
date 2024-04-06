import React from 'react';

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <p><strong>{tweet.user}:</strong> {tweet.text}</p>
    </div>
  );
}

export default Tweet;
