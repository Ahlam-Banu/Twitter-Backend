// Import React library
import React from 'react';
// Import Tweet component
import Tweet from './Tweet';

// Define a functional component TweetList
function TweetList({ tweets, onLove, onComment }) {
  // Render the TweetList component
  return (
    <div className="tweet-list">
      {/* Map through the tweets array passed as a prop and render a Tweet component for each tweet */}
      {tweets.map(tweet => (
        <Tweet key={tweet.tweet_id} tweet={tweet} onLove={onLove} onComment={onComment} />
      ))}
    </div>
  );
}

// Export the TweetList component as the default export
export default TweetList;