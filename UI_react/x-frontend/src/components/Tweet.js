// Import React library
import React from 'react';

// Define a functional component Tweet
function Tweet({ tweet, onLove, onComment }) {
  // Define a function to handle the Love button click
  const handleLove = () => {
    // Call the onLove function passed as a prop with the tweet's id
    onLove(tweet.tweet_id);
  };

  // Define a function to handle the Comment button click
  const handleComment = () => {
    // Call the onComment function passed as a prop with the tweet's id
    onComment(tweet.tweet_id);
  };

  // Render the Tweet component
  return (
    <div className="tweet">
      <p><strong>User:</strong> {tweet.user}</p> {/* Display the user of the tweet */}
      <p><strong>Timestamp:</strong> {tweet.timestamp}</p> {/* Display the timestamp of the tweet */}
      <p>{tweet.tweet_content}</p> {/* Display the content of the tweet */}
      <button onClick={handleLove}>Love</button> {/* Love button, calls handleLove when clicked */}
      <button onClick={handleComment}>Comment</button> {/* Comment button, calls handleComment when clicked */}
    </div>
  );
}

// Export the Tweet component as the default export
export default Tweet;