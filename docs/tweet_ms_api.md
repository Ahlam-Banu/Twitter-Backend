# Tweet Service API Documentation

The Tweet Service API provides endpoints for managing tweets within the Twitter-like application. This documentation outlines the available endpoints, their parameters, expected responses, and authentication requirements.

## Base URL

```
http://<your-domain>/tweets
```

## Endpoints

### Create a Tweet

- **URL:** `/tweets`
- **Method:** `POST`
- **Description:** Create a new tweet.
- **Request Body:**
  ```json
  {
    "user_id": <integer>,
    "tweet_content": "<string>"
  }
  ```
  - `user_id` (required): The ID of the user creating the tweet.
  - `tweet_content` (required): The content of the tweet.
- **Response:**
  - `201 Created`:
    ```json
    {
      "message": "Tweet created successfully",
      "tweet_id": <integer>
    }
    ```
  - `400 Bad Request`: Invalid request body.

### Retrieve Tweets by User ID

- **URL:** `/tweets/<user_id>`
- **Method:** `GET`
- **Description:** Retrieve tweets for a specific user.
- **Parameters:**
  - `user_id` (required): The ID of the user whose tweets to retrieve.
- **Response:**
  - `200 OK`:
    ```json
    [
      {
        "tweet_id": <integer>,
        "user_id": <integer>,
        "tweet_content": "<string>",
        "timestamp": "<string>",
        "likes_count": <integer>
      },
      ...
    ]
    ```
  - `404 Not Found`: No tweets found for the specified user.

### Retrieve All Tweets

- **URL:** `/tweets`
- **Method:** `GET`
- **Description:** Retrieve all tweets.
- **Response:**
  - `200 OK`:
    ```json
    [
      {
        "tweet_id": <integer>,
        "user_id": <integer>,
        "tweet_content": "<string>",
        "timestamp": "<string>",
        "likes_count": <integer>
      },
      ...
    ]
    ```

### Update a Tweet

- **URL:** `/tweets/<tweet_id>`
- **Method:** `PUT`
- **Description:** Update the content of a tweet.
- **Parameters:**
  - `tweet_id` (required): The ID of the tweet to update.
- **Request Body:**
  ```json
  {
    "tweet_content": "<string>"
  }
  ```
  - `tweet_content` (required): The updated content of the tweet.
- **Response:**
  - `200 OK`: Tweet updated successfully.
  - `404 Not Found`: Tweet not found.

### Delete a Tweet

- **URL:** `/tweets/<tweet_id>`
- **Method:** `DELETE`
- **Description:** Delete a tweet.
- **Parameters:**
  - `tweet_id` (required): The ID of the tweet to delete.
- **Response:**
  - `200 OK`: Tweet deleted successfully.
  - `404 Not Found`: Tweet not found.

### Like a Tweet

- **URL:** `/tweets/<tweet_id>/like`
- **Method:** `POST`
- **Description:** Like a tweet.
- **Parameters:**
  - `tweet_id` (required): The ID of the tweet to like.
- **Response:**
  - `200 OK`: Tweet liked successfully.
  - `404 Not Found`: Tweet not found.