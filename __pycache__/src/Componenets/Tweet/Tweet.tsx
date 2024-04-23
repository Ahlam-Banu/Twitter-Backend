import React from 'react';
import './Tweet.css';

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
  
  // Construct author name with ID
  const authorName = authorId === 1100 ? `Hamood (${authorId})` : `Unknown (${authorId})`;

  // Convert single comment string to an array
  const commentsArray: Comment[] | undefined = typeof comments === 'string' ? [{ userName: 'null', createdAt: 'null', content: comments }] : comments;

  return (
    <div className="tweet">
      <div className="user-info">{userName}</div>
      <div className="posted-time">{createdAt}</div>
      <div className="tweet-content">{content}</div>
      <div className="interaction-section">
        <button onClick={onLike}>Like ({likes})</button>
        <button onClick={() => {
          const comment = prompt('Enter your comment:');
          if (comment) {
            onComment(comment);
          }
        }}>Comment</button>
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
