// Import React library and useState hook
import React, { useState } from 'react';

// Define a functional component TweetForm
function TweetForm({ addTweet }) {
  // Define a state variable for the text of the tweet
  const [text, setText] = useState('');

  // Define a function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const user = localStorage.getItem('username'); // Get username from localStorage
    addTweet(text, user); // Call the addTweet function passed as a prop with the text and user
    setText(''); // Reset the text state variable
  };

  // Render the TweetForm component
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text} // Bind the text state variable to the textarea
        onChange={(e) => setText(e.target.value)} // Update the text state variable when the textarea changes
        placeholder="What's on your mind?" // Placeholder text for the textarea
        rows="5" // Set the number of rows for the textarea
        required // Make the textarea required
      />
      <br />
    </form>
  );
}

// Export the TweetForm component as the default export
export default TweetForm;