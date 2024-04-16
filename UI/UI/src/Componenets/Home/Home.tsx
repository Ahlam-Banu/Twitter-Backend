import React, { useState, useEffect } from 'react';
import TweetBox from '../TweetBox/TweetBox';
import Tweet from '../Tweet/Tweet';
import './Home.css';
import TopBar from '../TopBar/TopBar';
import { fetchTimeline, Tweet as TweetType, Comment as CommentType } from '../../API/timelineApi';

interface Comment {
  id: number;
  userName: string;
  createdAt: string;
  content: string;
}

interface Tweet {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  likes: number; // Update type to handle null values
  comments: Comment[]; // Update type to handle null values
  authorId: number;
}

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsData = await fetchTimeline();
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);


  const handleTweet = (content: string) => {
    if (content.trim() !== '') {
      const authorId = 1100; // Assuming author ID is hardcoded to 1100
      const authorName = authorId === 1100 ? "Ahlam" : "Unknown"; // Check if author ID is 1100
      const newTweet: Tweet = {
        id: Date.now(),
        userName: `${authorName} (${authorId})`,
        content: content,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        authorId: authorId, // Set the authorId property
      };
      setTweets([newTweet, ...tweets]);
    }
  };
  

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        // Ensure likes is not null before incrementing
        const newLikes = tweet.likes !== null ? tweet.likes + 1 : 1;
        return { ...tweet, likes: newLikes };
      }
      return tweet;
    }));
  };

  const handleComment = (tweetId: number, content: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        const newComment: Comment = {
          id: Date.now(),
          userName: "Ahlam (0006)",
          createdAt: new Date().toISOString(), // Adjust to match JSON format
          content: content
        };
  
        // Concatenate the new comment with the existing comments array
        const updatedComments = tweet.comments !== null ? [...tweet.comments, newComment] : [newComment];
  
        return { ...tweet, comments: updatedComments };
      }
      return tweet;
    }));
  };
  
  return (
    <div className="Home">
      <TopBar />
      <TweetBox onTweet={handleTweet} />
      <hr className="divider" />
      <div className="tweets">
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            userName={tweet.userName}
            authorId={tweet.authorId} // Pass the authorId prop
            createdAt={tweet.createdAt}
            content={tweet.content}
            likes={tweet.likes !== null ? tweet.likes : 0} // Handle null likes
            comments={tweet.comments !== null ? tweet.comments : []} // Handle null comments
            onLike={() => handleLike(tweet.id)}
            onComment={(comment: string) => handleComment(tweet.id, comment)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
