import React from 'react';
import './Comment.css';

interface CommentProps {
  userName: string;
  postedTime: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ userName, postedTime, content }) => {
  return (
    <div className="comment">
      <div className="comment-user-info">{userName} - {postedTime}</div>
      <div className="comment-content">{content}</div>
    </div>
  );
};

export default Comment;