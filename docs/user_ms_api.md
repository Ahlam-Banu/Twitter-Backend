# API Documentation

The Tweet, User and follow Services APIs provides endpoints for managing the tasks within the Twitter-like application. This documentation outlines the available endpoints, their parameters, expected responses, and authentication requirements.

## API Gateway Base URL

```
http://localhost:8181/
```

## Endpoints for Tweet Service

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

  ## Endpoints for User Service

### Create a User

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
    "fullname": <integer>,
    "email": "<string>",
    "password": "<string>"
  }
  ```
  - `fullname` (required): full name of user.
  - `email` (required): email of user.
  - `password` (required): set a password for user.
  
- **Response:**
  - `201 Created`:
    ```json
    {
      "message": "user created successfully",
      
    }
    ```
  - `400 Bad Request`: Invalid request body.

  ### Login 

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** login for user.
- **Request Body:**
  ```json
  {
    "email": "<string>",
    "password": "<string>"
  }
  ```

  - `email` (required): email of user to login.
  - `password` (required): password for user to login.
  
- **Response:**
  - `201 success`:
    ```json
    {
      "message": "JWT Token",
      "expiration time": "time"
      
    }
    ```
  - `400 Bad Request`: Invalid request body.