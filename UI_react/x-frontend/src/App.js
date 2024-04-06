import React, { useState, useEffect } from 'react';
import TweetList from './components/TweetList';
import TweetForm from './components/TweetForm';
import './App.css'; // Import CSS file for styling

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = () => {
    fetch('/tweets')
      .then(response => response.json())
      .then(data => setTweets(data))
      .catch(error => console.error('Error fetching tweets:', error));
  };

  const addTweet = (text, user) => {
    fetch('/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweet_content: text, user_id: user }),
    })
      .then(response => response.json())
      .then(data => {
        fetchTweets(); // Fetch tweets again after adding a new tweet
      })
      .catch(error => console.error('Error adding tweet:', error));
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h1>My Twitter</h1>
        <TweetForm addTweet={addTweet} />
        <TweetList tweets={tweets} />
      </div>
    </div>
  );
}

export default App;
