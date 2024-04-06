import React, { useState } from 'react';

function TweetForm({ addTweet }) {
  const [text, setText] = useState('');
  const [user, setUser] = useState(''); // Add state for user

  const handleSubmit = (e) => {
    e.preventDefault();
    addTweet(text, user); // Pass user to addTweet function
    setText('');
    setUser(''); // Clear user input after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <br />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        rows="3"
        required
      />
      <br />
      <button type="submit">Tweet</button>
    </form>
  );
}

export default TweetForm;
