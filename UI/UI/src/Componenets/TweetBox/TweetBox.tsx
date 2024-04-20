import React, { useState } from 'react';
import './TweetBox.css'
import { createTweet } from '../../API/tweetAPI';

const TweetBox: React.FC<{ onTweet: (tweet_id: number, content: string) => void }> = ({ onTweet }) => {
  const [tweetContent, setTweetContent] = useState('');

  const handleTweet = async () => {
    if (tweetContent.trim() !== '') {

      const authorId = 1100; // Replace with the actual author ID
      await createTweet(tweetContent, authorId);
      
      onTweet(0, tweetContent); // Update the onTweet function to accept two arguments
      setTweetContent('');
      
    }
  };

  return (
    <div className="tweet-box">
      <textarea
        placeholder="What's happening?"
        value={tweetContent}
        onChange={e => setTweetContent(e.target.value)}
      ></textarea>
      <button onClick={handleTweet}>Post</button>
    </div>
  );
};

export default TweetBox;
