# API Documentation

## Endpoints

- `POST /comments/<int:tweet_id>`: Add a comment to a tweet. The request body should include `user_id` and `comment`.
- `DELETE /comments/<int:tweet_id>/<int:comment_id>`: Delete a comment from a tweet.

## Examples

- `POST /comments/123`: Add a comment to the tweet with ID 123.
- `DELETE /comments/123/456`: Delete the comment with ID 456 from the tweet with ID 123.