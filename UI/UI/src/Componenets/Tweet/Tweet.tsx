import React, { useState } from 'react';
import './Tweet.css';
import { translateContent } from '../../API/SoapAPI';
import heart_icon from '../../heart-icon.png'
import comment_icon from '../../comment.png'


interface Comment {
  userName: string;
  createdAt: string;
  content: string;
}

interface TweetProps {
  authorId: number;
  userName: string;
  createdAt: string;
  content: string;
  likes: number;
  comments: string | Comment[] | undefined;
  onLike: () => void;
  onComment: (comment: string) => void;
}

const Tweet: React.FC<TweetProps> = ({ userName, createdAt, authorId, content, likes, comments, onLike, onComment }) => {
  
  const [translatedContent, setTranslatedContent] = useState<string | null>(null); // State to hold translated content


  // Construct author name with ID
  const authorName = authorId === 1100 ? `Ahlam (${authorId})` : `Unknown (${authorId})`;

  // Convert single comment string to an array
  const commentsArray: Comment[] | undefined = typeof comments === 'string' ? [{ userName: 'null', createdAt: 'null', content: comments }] : comments;

  // Function to handle translation button click
  const handleTranslate = async () => {
    try {
      const translatedText = await translateContent(content);
      setTranslatedContent(translatedText);
    } catch (error) {
      console.error('Error translating content:', error);
      // Handle error, maybe display a message to the user
    }
  };

  return (
    <div className="tweet">
      <div className="user-info">{userName}</div>
      <div className="posted-time">{createdAt}</div>
      <div className="tweet-content">{content}</div>
      {translatedContent && (
        <div className="translated-content">Translated: {translatedContent}</div>
      )}
      <div className="interaction-section">
      <img src={heart_icon} alt="Like" onClick={onLike} className="h-icon"/>
        <span>({likes})</span>
        <button onClick={() => {
          const comment = prompt('Enter your comment:');
          if (comment) {
            onComment(comment);
          }
        }}><img src={comment_icon} alt="Comment"/></button>
          <button onClick={handleTranslate} className="translate-button">Translate Post</button>
      </div>
      <div className="comments">
        {Array.isArray(commentsArray) && commentsArray.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-user-info">{comment.userName} - {comment.createdAt}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweet;
