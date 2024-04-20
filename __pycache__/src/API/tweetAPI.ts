export async function createTweet(content: string, authorId: number){
    try {
      const response = await fetch('http://localhost:3005/tweets/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, authorId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create tweet');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw error;
    }
  }