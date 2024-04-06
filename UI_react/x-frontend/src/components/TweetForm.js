import React, { useState } from 'react';

function TweetForm({ addTweet }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('username'); // Get username from localStorage
    addTweet(text, user);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows="5"
        required
      />
      <br />
    </form>
  );
}

export default TweetForm;
