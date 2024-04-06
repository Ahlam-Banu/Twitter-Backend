import React from 'react';
import Tweet from './Tweet';

function TweetList({ tweets, onLove, onComment }) {
  return (
    <div className="tweet-list">
      {tweets.map(tweet => (
        <Tweet key={tweet.tweet_id} tweet={tweet} onLove={onLove} onComment={onComment} />
      ))}
    </div>
  );
}

export default TweetList;
