import React, { useState } from 'react';
import './TweetBox.css'

const TweetBox: React.FC<{ onTweet: (content: string) => void }> = ({ onTweet }) => {
  const [tweetContent, setTweetContent] = useState('');

  const handleTweet = () => {
    if (tweetContent.trim() !== '') {
      onTweet(tweetContent);
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
      <button onClick={handleTweet}>Tweet</button>
    </div>
  );
};

export default TweetBox;
