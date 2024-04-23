
export interface Tweet {
    id: number;
    userName: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    authorId: number;
  }
  
  export interface Comment {
    id: number;
    userName: string;
    createdAt: string;
    content: string;
  }
  
  export async function fetchTimeline(): Promise<Tweet[]> {
    try {
      const response = await fetch('http://localhost:3001/timeline');
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      // Extract tweets from the data object
      const tweets: Tweet[] = data.tweets.map((tweet: any) => {
        const authorId = tweet.authorId;
        console.log(authorId)
        const authorName = authorId === 1100 ? `Hamood (${authorId})` : `Unknown (${authorId})`;
        console.log(authorName)
        return {
          id: tweet.id,
          userName: authorName,
          content: tweet.content,
          createdAt: tweet.createdAt,
          likes: tweet.likes !== null ? tweet.likes : 0, // Handling null likes
          comments: tweet.comments !== null ? [{ // Handling null comments
            id: 0, // Provide a dummy ID for the comment
            userName: "Anonymous",
            createdAt: new Date().toISOString(), // Use current time for dummy comment
            content: tweet.comments
          }] : [] // Handling null comments
        };
      });
      return tweets;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      return [];
    }
  }
  
  

  // export async function createTweet(content: string): Promise<void> {
  //   try {
  //     const response = await fetch('http://localhost:3005/tweets/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ content }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to create tweet');
  //     }
  //   } catch (error) {
  //     console.error('Error creating tweet:', error);
  //     throw error;
  //   }
  // }
  
  