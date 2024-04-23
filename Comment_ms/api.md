# API Documentation

This document describes the API endpoints available in our application.

## Endpoints

### POST /comments/<tweet_id>

Adds a comment to a tweet.

**Parameters:**

- `tweet_id` (integer): The ID of the tweet.
- `user_id` (integer): The ID of the user making the comment.
- `comment` (string): The text of the comment.

**Response:**

A JSON object with a success message if the comment was added successfully, or an error message if the comment could not be added.

### DELETE /comments/<tweet_id>/<comment_id>

Deletes a comment from a tweet.

**Parameters:**

- `tweet_id` (integer): The ID of the tweet.
- `comment_id` (integer): The ID of the comment to delete.

**Response:**

A JSON object with a success message if the comment was deleted successfully, or an error message if the comment could not be deleted.