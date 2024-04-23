
export interface Tweet {
    tweet_id: number;
    // id: number;
    userName: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    authorId: number;
    //translatedContent: string;
  }
  
  export interface Comment {
    id: number;
    userName: string;
    createdAt: string;
    content: string;
  }
  
  export async function fetchTimeline(): Promise<Tweet[]> {
    try {
        const response = await fetch('http://localhost:30006/tweets');
        console.log("response: ", response)
        if (!response.ok) {
            throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        
        // Extract tweets from the data object
        const tweets: Tweet[] = data.map((tweetData: any) => {
          
            return {
                "tweet_id": tweetData["tweet_id"],
                "userName": `user (${tweetData["user_id"]})`,
                "content": tweetData["tweet_content"],
                "createdAt": tweetData["timestamp"],
                "likes": tweetData["likes_count"],
                "comments": [] // No comments provided in the JSON output
            };
        });
        
        return tweets;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return [];
    }
}