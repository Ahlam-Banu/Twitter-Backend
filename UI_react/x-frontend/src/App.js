import React, { useState } from 'react';
import TweetList from './components/TweetList';
import TweetForm from './components/TweetForm';

function App() {
  const [tweets, setTweets] = useState([]);

  const addTweet = (text, user) => {
    const newTweet = {
      id: tweets.length + 1,
      text: text,
      user: user
    };
    setTweets([...tweets, newTweet]);
  };

  return (
    <div className="App">
      <h1>My Twitter</h1>
      <TweetList tweets={tweets} />
      <TweetForm addTweet={addTweet} />
    </div>
  );
}

export default App;
