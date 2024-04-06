import React from 'react';

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <p><strong>User:</strong> {tweet.user}</p>
      <p><strong>Timestamp:</strong> {tweet.timestamp}</p>
      <p>{tweet.tweet_content}</p>
    </div>
  );
}

export default Tweet;
