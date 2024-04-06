import React from 'react';

function Tweet({ tweet, onLove, onComment }) {
  const handleLove = () => {
    onLove(tweet.tweet_id);
  };

  const handleComment = () => {
    onComment(tweet.tweet_id);
  };

  return (
    <div className="tweet">
      <p><strong>User:</strong> {tweet.user}</p>
      <p><strong>Timestamp:</strong> {tweet.timestamp}</p>
      <p>{tweet.tweet_content}</p>
      <button onClick={handleLove}>Love</button>
      <button onClick={handleComment}>Comment</button>
    </div>
  );
}

export default Tweet;
