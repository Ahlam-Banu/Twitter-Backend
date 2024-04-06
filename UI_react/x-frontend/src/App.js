import React, { useState, useEffect } from 'react';
import TweetList from './components/TweetList';
import './App.css'; // Import CSS file for styling

function App() {
  const [tweets, setTweets] = useState([]);
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = () => {
    fetch('/tweets')
      .then(response => response.json())
      .then(data => setTweets(data))
      .catch(error => console.error('Error fetching tweets:', error));
  };

  const addTweet = () => {
    fetch('/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweet_content: text, user_id: user }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data); // Log the response from the server
        fetchTweets(); // Fetch tweets again after adding a new tweet
        closeModal(); // Close the modal after adding the tweet
      })
      .catch(error => console.error('Error adding tweet:', error));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setText(''); // Reset text and user inputs
    setUser('');
  };

  return (
    <div className="app-container">
      <div className="top-container">
        <img className="logo" src="https://e0.pxfuel.com/wallpapers/517/24/desktop-wallpaper-pink-cat-beautiful-black-cats.jpg" alt="Logo" />
      </div>
      <div className="app-content">
        <div className="tweet-box" onClick={openModal}>
          <input
            type="text"
            value="What's on your mind?"
            readOnly
          />
        </div>
        <div className="timeline-container">
          <TweetList tweets={tweets} />
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Tweet</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              rows="5"
              required
            />
            <div className="modal-buttons">
              <button onClick={addTweet}>Tweet</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
