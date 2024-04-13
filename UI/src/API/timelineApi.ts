
export interface Tweet {
    id: number;
    userName: string;
    content: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
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
      //console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch tweets');
      }
      const data = await response.json();
      //console.log('Fetched tweets:', data);
      return data.tweets;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      return [];
    }
  }
  