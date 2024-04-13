import React, { useState, useEffect } from 'react';
import TweetBox from './TweetBox';
import Tweet from './Tweet';
import './Home.css';
import TopBar from './TopBar';
import { fetchTimeline, Tweet as TweetType } from '../API/timelineApi';

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
  likes: number;
  comments: Comment[];
}

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const tweets = await fetchTimeline();
      //console.log(tweets)
      setTweets(tweets);
    };

    fetchTweets();
  }, []);

  const handleTweet = (content: string) => {
    if (content.trim() !== '') {
      const newTweet: Tweet = {
        id: Date.now(),
        userName: "John Doe",
        content: content,
        createdAt: new Date().toLocaleString(),
        likes: 0,
        comments: [],
      };
      setTweets([newTweet, ...tweets]);
    }
  };

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return { ...tweet, likes: tweet.likes + 1 };
      }
      return tweet;
    }));
  };
  const handleComment = (tweetId: number, content: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        const newComment: Comment = {
          id: Date.now(),
          userName: "Jane Doe",
          createdAt: new Date().toLocaleString(),
          content: content
        };
  
        // Concatenate the new comment with the existing comments array
        const updatedComments = tweet.comments ? [...tweet.comments, newComment] : [newComment];
        console.log(newComment)
        console.log(tweet.comments); // Log existing comments before update
  
        return { ...tweet, comments: updatedComments };
      }
      return tweet;
    }));
  };
  
  return (
    <div className="Home">
      <TopBar />
      <TweetBox onTweet={handleTweet} />
      <div className="tweets">
        {tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            userName={tweet.userName}
            createdAt={tweet.createdAt}
            content={tweet.content}
            likes={tweet.likes}
            comments={tweet.comments}
            onLike={() => handleLike(tweet.id)}
            onComment={(comment) => handleComment(tweet.id, comment)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
