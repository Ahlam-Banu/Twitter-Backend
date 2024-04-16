export async function createTweet(tweet_content: string, user_id: number){
    try {
      const response = await fetch('http://localhost:5000/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet_content, user_id }),
      });
      if (!response.ok) {
        throw new Error('Failed to create tweet');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw error;
    }
  }