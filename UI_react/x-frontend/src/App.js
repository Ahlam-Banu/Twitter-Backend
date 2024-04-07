// Import necessary modules from react and components from local files
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Import necessary modules from react-router-dom
import TweetList from './components/TweetList';
import WelcomePage from './components/WelcomePage'; // Import the WelcomePage component
import './App.css';

// Define the main App component
function App() {
  // Define state variables for tweets, modal visibility, text input, and user input
  const [tweets, setTweets] = useState([]);
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  // Use useEffect hook to fetch tweets when the component mounts
  useEffect(() => {
    fetchTweets();
  }, []);

  // Define function to fetch tweets from the server
  const fetchTweets = () => {
    fetch('/tweets')
      .then(response => response.json())
      .then(data => setTweets(data)) // Update the tweets state with the fetched data
      .catch(error => console.error('Error fetching tweets:', error));
  };

  // Define function to add a new tweet
  const addTweet = () => {
    fetch('/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweet_content: text, user_id: user }), // Send the text and user as the body of the request
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data); // Log the response from the server
        fetchTweets(); // Fetch tweets again after adding a new tweet
        closeModal(); // Close the modal after adding the tweet
      })
      .catch(error => console.error('Error adding tweet:', error));
  };

  // Define function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Define function to close the modal and reset the text and user inputs
  const closeModal = () => {
    setShowModal(false);
    setText(''); // Reset text and user inputs
    setUser('');
  };

  // Render the App component
  return (
    <Router>
      <Switch>
        <Route path="/welcome" component={WelcomePage} /> {/* Add a route for the WelcomePage component */}
        <Route path="/tweets">
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
                <TweetList tweets={tweets} /> {/* Pass the tweets state as a prop to the TweetList component */}
              </div>
            </div>
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Create Tweet</h2>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)} // Update the text state when the textarea value changes
                    placeholder="What's on your mind?"
                    rows="5"
                    required
                  />
                  <div className="modal-buttons">
                    <button onClick={addTweet}>Tweet</button> {/* Call the addTweet function when the Tweet button is clicked */}
                    <button onClick={closeModal}>Cancel</button> {/* Call the closeModal function when the Cancel button is clicked */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

// Export the App component as the default export
export default App;